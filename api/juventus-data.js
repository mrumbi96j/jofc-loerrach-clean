export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  const API_KEY = process.env.API_FOOTBALL_KEY;

  const TEAM_ID = 496; // Juventus
  const SERIE_A_ID = 135;
  const TIMEZONE = "Europe/Zurich";

  // Im Juli 2026 ist die neue Saison 2026/27 = season 2026
  const CURRENT_SEASON = 2026;
  const PREVIOUS_SEASON = 2025;

  const backupNextMatches = [
    {
      id: "backup-basel-juventus",
      competition: "Friendly",
      date: "2026-07-18T13:30:00.000Z", // 15:30 Schweiz
      homeTeam: "Basilea",
      awayTeam: "Juventus",
      homeScore: "-",
      awayScore: "-",
      status: "NS",
    },
    {
      id: "backup-standard-juventus",
      competition: "Friendly",
      date: "2026-07-25T18:00:00.000Z", // 20:00 Schweiz, falls API keine Zeit liefert
      homeTeam: "Standard Liegi",
      awayTeam: "Juventus",
      homeScore: "-",
      awayScore: "-",
      status: "NS",
    },
    {
      id: "backup-chelsea-juventus",
      competition: "Friendly",
      date: "2026-08-05T18:00:00.000Z", // 20:00 Schweiz, falls API keine Zeit liefert
      homeTeam: "Chelsea",
      awayTeam: "Juventus",
      homeScore: "-",
      awayScore: "-",
      status: "NS",
    },
  ];

  const emptyResponse = {
    standings: [],
    pastMatches: [],
    nextMatches: backupNextMatches,
    updatedAt: new Date().toISOString(),
    source: "backup",
  };

  if (!API_KEY) {
    return res.status(200).json({
      ...emptyResponse,
      warning: "API_FOOTBALL_KEY fehlt in Vercel",
    });
  }

  const headers = {
    "x-apisports-key": API_KEY,
  };

  const api = async (url) => {
    try {
      const response = await fetch(url, {
        headers,
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("API-Football error:", data);
        return [];
      }

      return data.response || [];
    } catch (error) {
      console.error("Fetch error:", error.message);
      return [];
    }
  };

  const normalizeMatch = (item) => ({
    id: item.fixture?.id || `${item.teams?.home?.name}-${item.teams?.away?.name}-${item.fixture?.date}`,
    competition: item.league?.name || "Friendly",
    date: item.fixture?.date,
    homeTeam: item.teams?.home?.name || "",
    awayTeam: item.teams?.away?.name || "",
    homeScore: item.goals?.home ?? "-",
    awayScore: item.goals?.away ?? "-",
    status: item.fixture?.status?.short || "",
  });

  const normalizeStandings = (standingsData) => {
    const raw = standingsData?.[0]?.league?.standings?.[0] || [];

    return raw.map((row) => ({
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
  };

  const removeDuplicates = (matches) => {
    const seen = new Set();

    return matches.filter((match) => {
      const key = match.id || `${match.homeTeam}-${match.awayTeam}-${match.date}`;

      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    });
  };

  try {
    const today = new Date();
    const from = today.toISOString().split("T")[0];

    const toDate = new Date();
    toDate.setMonth(toDate.getMonth() + 12);
    const to = toDate.toISOString().split("T")[0];

    const [
      standingsCurrent,
      standingsPrevious,
      nextCurrent,
      nextPrevious,
      pastCurrent,
      pastPrevious,
    ] = await Promise.all([
      api(
        `https://v3.football.api-sports.io/standings?league=${SERIE_A_ID}&season=${CURRENT_SEASON}`
      ),
      api(
        `https://v3.football.api-sports.io/standings?league=${SERIE_A_ID}&season=${PREVIOUS_SEASON}`
      ),
      api(
        `https://v3.football.api-sports.io/fixtures?team=${TEAM_ID}&season=${CURRENT_SEASON}&from=${from}&to=${to}&timezone=${TIMEZONE}`
      ),
      api(
        `https://v3.football.api-sports.io/fixtures?team=${TEAM_ID}&season=${PREVIOUS_SEASON}&from=${from}&to=${to}&timezone=${TIMEZONE}`
      ),
      api(
        `https://v3.football.api-sports.io/fixtures?team=${TEAM_ID}&season=${CURRENT_SEASON}&last=10&timezone=${TIMEZONE}`
      ),
      api(
        `https://v3.football.api-sports.io/fixtures?team=${TEAM_ID}&season=${PREVIOUS_SEASON}&last=10&timezone=${TIMEZONE}`
      ),
    ]);

    const standingsCurrentNormalized = normalizeStandings(standingsCurrent);
    const standingsPreviousNormalized = normalizeStandings(standingsPrevious);

    const standings =
      standingsCurrentNormalized.length > 0
        ? standingsCurrentNormalized
        : standingsPreviousNormalized;

    const apiNextMatches = removeDuplicates([
      ...nextCurrent.map(normalizeMatch),
      ...nextPrevious.map(normalizeMatch),
    ])
      .filter((match) => {
        const date = new Date(match.date);

        return (
          match.date &&
          match.homeTeam &&
          match.awayTeam &&
          !Number.isNaN(date.getTime()) &&
          date >= new Date()
        );
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const nextMatches =
      apiNextMatches.length > 0 ? apiNextMatches : backupNextMatches;

    const pastMatches = removeDuplicates([
      ...pastCurrent.map(normalizeMatch),
      ...pastPrevious.map(normalizeMatch),
    ])
      .filter((match) => match.date && match.homeTeam && match.awayTeam)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    return res.status(200).json({
      standings,
      pastMatches,
      nextMatches,
      updatedAt: new Date().toISOString(),
      source: apiNextMatches.length > 0 ? "api-football" : "backup",
      seasonUsedForStandings:
        standingsCurrentNormalized.length > 0 ? CURRENT_SEASON : PREVIOUS_SEASON,
    });
  } catch (error) {
    return res.status(200).json({
      ...emptyResponse,
      error: error.message,
    });
  }
}
