export default async function handler(req, res) {
  try {
    const API_KEY = process.env.FOOTBALL_DATA_API_KEY;
    const TEAM_ID = process.env.FOOTBALL_DATA_TEAM_ID || "109";

    if (!API_KEY) {
      return res.status(500).json({
        error: "FOOTBALL_DATA_API_KEY mancante",
      });
    }

    const headers = {
      "X-Auth-Token": API_KEY,
    };

    const standingsUrl = "https://api.football-data.org/v4/competitions/SA/standings";
    const finishedMatchesUrl = `https://api.football-data.org/v4/teams/${TEAM_ID}/matches?status=FINISHED&limit=10`;
    const upcomingMatchesUrl = `https://api.football-data.org/v4/teams/${TEAM_ID}/matches?status=SCHEDULED&limit=10`;

    const [standingsRes, finishedRes, upcomingRes] = await Promise.all([
      fetch(standingsUrl, { headers }),
      fetch(finishedMatchesUrl, { headers }),
      fetch(upcomingMatchesUrl, { headers }),
    ]);

    if (!standingsRes.ok || !finishedRes.ok || !upcomingRes.ok) {
      return res.status(500).json({
        error: "Errore nel recupero dati calcio",
        details: {
          standings: standingsRes.status,
          finished: finishedRes.status,
          upcoming: upcomingRes.status,
        },
      });
    }

    const standingsData = await standingsRes.json();
    const finishedData = await finishedRes.json();
    const upcomingData = await upcomingRes.json();

    const table =
      standingsData?.standings?.find((s) => s.type === "TOTAL")?.table || [];

    const standings = table.map((row) => ({
      position: row.position,
      team: row.team?.shortName || row.team?.name || "",
      crest: row.team?.crest || "",
      playedGames: row.playedGames,
      won: row.won,
      draw: row.draw,
      lost: row.lost,
      points: row.points,
      goalDifference: row.goalDifference,
    }));

    const pastMatches = (finishedData?.matches || [])
      .slice(-10)
      .reverse()
      .map((match) => ({
        id: match.id,
        competition: match.competition?.name || "",
        date: match.utcDate,
        homeTeam: match.homeTeam?.shortName || match.homeTeam?.name || "",
        awayTeam: match.awayTeam?.shortName || match.awayTeam?.name || "",
        homeScore: match.score?.fullTime?.home ?? "-",
        awayScore: match.score?.fullTime?.away ?? "-",
        status: match.status || "",
      }));

    const nextMatches = (upcomingData?.matches || []).map((match) => ({
      id: match.id,
      competition: match.competition?.name || "",
      date: match.utcDate,
      homeTeam: match.homeTeam?.shortName || match.homeTeam?.name || "",
      awayTeam: match.awayTeam?.shortName || match.awayTeam?.name || "",
      status: match.status || "",
    }));

    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=3600");

    return res.status(200).json({
      standings,
      pastMatches,
      nextMatches,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      error: "Errore interno server",
      message: error.message,
    });
  }
}
