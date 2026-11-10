
export default async function handler(req, res) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=900, stale-while-revalidate=3600"
  );

  const FOOTBALL_TOKEN =
    process.env.FOOTBALL_DATA_TOKEN ||
    process.env.FOOTBALL_DATA_KEY ||
    process.env.FOOTBALL_DATA_API_KEY;

  const NINJAS_KEY = process.env.API_NINJAS_KEY;

  const currentSeason =
    new Date().getMonth() >= 6
      ? new Date().getFullYear()
      : new Date().getFullYear() - 1;

  if (!FOOTBALL_TOKEN) {
    return res.status(500).json({
      standings: [],
      pastMatches: [],
      nextMatches: [],
      error: "Token Football-Data.org mancante",
    });
  }

  const footballApi = async (url) => {
    const response = await fetch(url, {
      headers: { "X-Auth-Token": FOOTBALL_TOKEN },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Football-Data HTTP ${response.status}`
      );
    }

    return data;
  };

  const ninjasApi = async () => {
    if (!NINJAS_KEY) {
      throw new Error("API_NINJAS_KEY mancante");
    }

    const url =
      "https://api.api-ninjas.com/v1/soccermatches" +
      `?league=uel&team=soccer-juventus&season=${currentSeason}`;

    const response = await fetch(url, {
      headers: { "X-Api-Key": NINJAS_KEY },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || `API Ninjas HTTP ${response.status}`
      );
    }

    if (!Array.isArray(data)) {
      throw new Error("Risposta API Ninjas non valida");
    }

    return data;
  };

  const normalizeStandings = (data) => {
    const table =
      data.standings?.find((x) => x.type === "TOTAL")?.table ||
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

  const normalizeSerieA = (match) => ({
    id: match.id,
    competition: match.competition?.name || "Serie A",
    date: match.utcDate,
    homeTeam: match.homeTeam?.name || "",
    awayTeam: match.awayTeam?.name || "",
    homeScore: match.score?.fullTime?.home ?? "-",
    awayScore: match.score?.fullTime?.away ?? "-",
    status: match.status || "",
  });

  const normalizeEuropa = (match) => {
    const statusMap = {
      final: "FINISHED",
      scheduled: "SCHEDULED",
      in_progress: "IN_PLAY",
      postponed: "POSTPONED",
      canceled: "CANCELLED",
      abandoned: "ABANDONED",
    };

    return {
      id: match.game_id,
      competition: "UEFA Europa League",
      date: match.start_time || match.date,
      homeTeam: match.home_team?.name || "",
      awayTeam: match.away_team?.name || "",
      homeScore: match.home_score ?? "-",
      awayScore: match.away_score ?? "-",
      status:
        statusMap[String(match.status).toLowerCase()] ||
        String(match.status || "").toUpperCase(),
    };
  };

  const isJuventus = (match) => {
    const home = match.homeTeam.toLowerCase();
    const away = match.awayTeam.toLowerCase();

    return (
      home.includes("juventus") ||
      away.includes("juventus")
    );
  };

  const isValid = (match) =>
    match.date &&
    match.homeTeam &&
    match.awayTeam &&
    !Number.isNaN(new Date(match.date).getTime());

  try {
    const [standingsData, serieData] = await Promise.all([
      footballApi(
        `https://api.football-data.org/v4/competitions/SA/standings?season=${currentSeason}`
      ),
      footballApi(
        `https://api.football-data.org/v4/competitions/SA/matches?season=${currentSeason}`
      ),
    ]);

    const serieMatches = (serieData.matches || [])
      .map(normalizeSerieA)
      .filter(isValid)
      .filter(isJuventus);

    let europaMatches = [];
    let europaError = null;

    try {
      const data = await ninjasApi();

      europaMatches = data
        .map(normalizeEuropa)
        .filter(isValid)
        .filter(isJuventus);
    } catch (error) {
      europaError = error.message;
      console.error("Europa League:", error);
    }

    const allMatches = [
      ...serieMatches,
      ...europaMatches,
    ];

    const uniqueMatches = Array.from(
      new Map(
        allMatches.map((match) => [
          `${match.competition}-${match.id}`,
          match,
        ])
      ).values()
    );

    const now = new Date();

    const pastMatches = uniqueMatches
      .filter(
        (match) =>
          new Date(match.date) < now &&
          match.status === "FINISHED"
      )
      .sort(
        (a, b) =>
          new Date(b.date) - new Date(a.date)
      )
      .slice(0, 10);

    const nextMatches = uniqueMatches
      .filter(
        (match) =>
          new Date(match.date) >= now &&
          match.status !== "FINISHED" &&
          match.status !== "CANCELLED"
      )
      .sort(
        (a, b) =>
          new Date(a.date) - new Date(b.date)
      );

    return res.status(200).json({
      standings: normalizeStandings(standingsData),
      pastMatches,
      nextMatches,
      updatedAt: new Date().toISOString(),
      source: "Football-Data.org + API Ninjas",
      seasonUsedForStandings: currentSeason,
      timezone: "Europe/Zurich",
      europaLeagueError,
    });
  } catch (error) {
    console.error("Juventus API error:", error);

    return res.status(502).json({
      standings: [],
      pastMatches: [],
      nextMatches: [],
      updatedAt: new Date().toISOString(),
      error: error.message,
    });
  }
}
