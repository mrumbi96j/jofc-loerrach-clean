
export default async function handler(req, res) {
  // Cache CDN Vercel: 15 minuti, con aggiornamento in background
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=900, stale-while-revalidate=3600"
  );

  const TOKEN =
    process.env.FOOTBALL_DATA_TOKEN ||
    process.env.FOOTBALL_DATA_KEY ||
    process.env.FOOTBALL_DATA_API_KEY;

  const COMPETITION = "SA";
  const TIMEZONE = "Europe/Zurich";

  const currentSeason =
    new Date().getMonth() >= 6
      ? new Date().getFullYear()
      : new Date().getFullYear() - 1;

  if (!TOKEN) {
    return res.status(500).json({
      standings: [],
      pastMatches: [],
      nextMatches: [],
      error: "Token Football-Data.org mancante in Vercel",
    });
  }

  const api = async (url) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Auth-Token": TOKEN,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        data.error ||
        `Football-Data.org HTTP ${response.status}`
      );
    }

    return data;
  };

  const normalizeStandings = (data) => {
    const table =
      data.standings?.find((item) => item.type === "TOTAL")?.table ||
      data.standings?.[0]?.table ||
      [];

    return table.map((row) => ({
      position: row.position,
      team: row.team?.name || "",
      crest: row.team?.crest || "",
      playedGames: row.playedGames ?? 0,
      won: row.won ?? 0,
      draw: row.draw ?? 0,
      lost: row.lost ?? 0,
      points: row.points ?? 0,
      goalDifference: row.goalDifference ?? 0,
    }));
  };

  const normalizeMatch = (match) => ({
    id: match.id,
    competition: match.competition?.name || "Serie A",
    date: match.utcDate,
    homeTeam: match.homeTeam?.name || "",
    awayTeam: match.awayTeam?.name || "",
    homeScore: match.score?.fullTime?.home ?? "-",
    awayScore: match.score?.fullTime?.away ?? "-",
    status: match.status || "",
  });

  try {
    const [standingsData, matchesData] = await Promise.all([
      api(
        `https://api.football-data.org/v4/competitions/${COMPETITION}/standings?season=${currentSeason}`
      ),

      api(
        `https://api.football-data.org/v4/competitions/${COMPETITION}/matches?season=${currentSeason}`
      ),
    ]);

    const now = new Date();

    const juventusMatches = (matchesData.matches || [])
      .filter((match) => {
        const home = match.homeTeam?.name?.toLowerCase() || "";
        const away = match.awayTeam?.name?.toLowerCase() || "";

        return (
          home.includes("juventus") ||
          away.includes("juventus")
        );
      })
      .map(normalizeMatch)
      .filter((match) => {
        return (
          match.date &&
          match.homeTeam &&
          match.awayTeam &&
          !Number.isNaN(new Date(match.date).getTime())
        );
      });

    const pastMatches = juventusMatches
      .filter((match) => {
        return (
          new Date(match.date) < now &&
          match.status === "FINISHED"
        );
      })
      .sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
      .slice(0, 10);

    const nextMatches = juventusMatches
      .filter((match) => {
        return (
          new Date(match.date) >= now &&
          match.status !== "FINISHED" &&
          match.status !== "CANCELLED"
        );
      })
      .sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

    const standings = normalizeStandings(standingsData);

    return res.status(200).json({
      standings,
      pastMatches,
      nextMatches,
      updatedAt: new Date().toISOString(),
      source: "football-data.org",
      seasonUsedForStandings: currentSeason,
      timezone: TIMEZONE,
    });
  } catch (error) {
    console.error("Juventus API error:", error);

    return res.status(502).json({
      standings: [],
      pastMatches: [],
      nextMatches: [],
      updatedAt: new Date().toISOString(),
      source: "football-data.org",
      error: error.message,
    });
  }
}
