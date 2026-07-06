export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  const API_KEY = process.env.API_FOOTBALL_KEY;
  const TEAM_ID = 496; // Juventus
  const SERIE_A_ID = 135;
  const SEASON = new Date().getFullYear();
  const TIMEZONE = "Europe/Zurich";

  if (!API_KEY) {
    return res.status(500).json({
      error: "API_FOOTBALL_KEY fehlt in Vercel",
    });
  }

  const headers = {
    "x-apisports-key": API_KEY,
  };

  const api = async (url) => {
    const response = await fetch(url, { headers, cache: "no-store" });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || `API Fehler ${response.status}`);
    }

    return data.response || [];
  };

  const normalizeMatch = (item) => ({
    id: item.fixture?.id,
    competition: item.league?.name || "",
    date: item.fixture?.date,
    homeTeam: item.teams?.home?.name || "",
    awayTeam: item.teams?.away?.name || "",
    homeScore: item.goals?.home ?? "-",
    awayScore: item.goals?.away ?? "-",
    status: item.fixture?.status?.short || "",
  });

  try {
    const today = new Date();
    const from = today.toISOString().split("T")[0];

    const toDate = new Date();
    toDate.setFullYear(today.getFullYear() + 1);
    const to = toDate.toISOString().split("T")[0];

    const [standingsData, nextAll, pastAll] = await Promise.all([
      api(
        `https://v3.football.api-sports.io/standings?league=${SERIE_A_ID}&season=${SEASON}`
      ),
      api(
        `https://v3.football.api-sports.io/fixtures?team=${TEAM_ID}&season=${SEASON}&from=${from}&to=${to}&timezone=${TIMEZONE}`
      ),
      api(
        `https://v3.football.api-sports.io/fixtures?team=${TEAM_ID}&season=${SEASON}&last=10&timezone=${TIMEZONE}`
      ),
    ]);

    const standingsRaw =
      standingsData?.[0]?.league?.standings?.[0] || [];

    const standings = standingsRaw.map((row) => ({
      position: row.rank,
      team: row.team?.name || "",
      crest: row.team?.logo || "",
      playedGames: row.all?.played ?? 0,
      won: row.all?.win ?? 0,
      draw: row.all?.draw ?? 0,
      lost: row.all?.lose ?? 0,
      points: row.points ?? 0,
      goalDifference: row.goalsDiff ?? 0,
    }));

    const nextMatches = nextAll
      .map(normalizeMatch)
      .filter((m) => m.date && m.homeTeam && m.awayTeam)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const pastMatches = pastAll
      .map(normalizeMatch)
      .filter((m) => m.date && m.homeTeam && m.awayTeam)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return res.status(200).json({
      standings,
      pastMatches,
      nextMatches,
      updatedAt: new Date().toISOString(),
      source: "api-football",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Fehler beim Laden der Juventus Daten",
      message: error.message,
    });
  }
}
