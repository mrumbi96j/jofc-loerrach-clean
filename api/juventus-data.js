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

    const urls = {
      standings:
        "https://api.football-data.org/v4/competitions/SA/standings",
      finished: `https://api.football-data.org/v4/teams/${TEAM_ID}/matches?status=FINISHED&limit=20`,
      scheduled: `https://api.football-data.org/v4/teams/${TEAM_ID}/matches?status=SCHEDULED&limit=30`,
      timed: `https://api.football-data.org/v4/teams/${TEAM_ID}/matches?status=TIMED&limit=30`,
    };

    const [standingsRes, finishedRes, scheduledRes, timedRes] =
      await Promise.all([
        fetch(urls.standings, { headers }),
        fetch(urls.finished, { headers }),
        fetch(urls.scheduled, { headers }),
        fetch(urls.timed, { headers }),
      ]);

    if (!standingsRes.ok || !finishedRes.ok) {
      return res.status(500).json({
        error: "Errore nel recupero dati calcio",
        details: {
          standings: standingsRes.status,
          finished: finishedRes.status,
          scheduled: scheduledRes.status,
          timed: timedRes.status,
        },
      });
    }

    const standingsData = await standingsRes.json();
    const finishedData = await finishedRes.json();

    let scheduledData = { matches: [] };
    let timedData = { matches: [] };

    if (scheduledRes.ok) {
      scheduledData = await scheduledRes.json();
    }

    if (timedRes.ok) {
      timedData = await timedRes.json();
    }

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

    const normalizeMatch = (match) => ({
      id: match.id,
      competition: match.competition?.name || "Amichevole",
      date: match.utcDate,
      homeTeam: match.homeTeam?.shortName || match.homeTeam?.name || "",
      awayTeam: match.awayTeam?.shortName || match.awayTeam?.name || "",
      homeScore: match.score?.fullTime?.home ?? "-",
      awayScore: match.score?.fullTime?.away ?? "-",
      status: match.status || "",
    });

    const pastMatches = (finishedData?.matches || [])
      .map(normalizeMatch)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    const nextMatches = [
      ...(scheduledData?.matches || []),
      ...(timedData?.matches || []),
    ]
      .map(normalizeMatch)
      .filter((match) => new Date(match.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 20);

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
