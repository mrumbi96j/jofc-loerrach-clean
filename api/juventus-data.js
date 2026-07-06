export default async function handler(req, res) {
  try {
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );

    const API_KEY = process.env.FOOTBALL_DATA_API_KEY;
    const TEAM_ID = process.env.FOOTBALL_DATA_TEAM_ID || "109";

    const backupNextMatches = [
      {
        id: "backup-1",
        competition: "Friendly",
        date: "2026-07-18T04:30:00.000Z",
        homeTeam: "Basilea",
        awayTeam: "Juventus",
        status: "TIMED",
      },
      {
        id: "backup-2",
        competition: "Friendly",
        date: "2026-07-25T09:00:00.000Z",
        homeTeam: "Standard Liegi",
        awayTeam: "Juventus",
        status: "TIMED",
      },
      {
        id: "backup-3",
        competition: "Friendly",
        date: "2026-08-05T02:30:00.000Z",
        homeTeam: "Chelsea",
        awayTeam: "Juventus",
        status: "TIMED",
      },
      {
        id: "backup-4",
        competition: "Friendly",
        date: "2026-08-11T18:45:00.000Z",
        homeTeam: "Juventus",
        awayTeam: "Palermo",
        status: "TIMED",
      },
    ];

    if (!API_KEY) {
      return res.status(200).json({
        standings: [],
        pastMatches: [],
        nextMatches: backupNextMatches,
        updatedAt: new Date().toISOString(),
        source: "backup-no-api-key",
      });
    }

    const headers = {
      "X-Auth-Token": API_KEY,
    };

    const standingsUrl =
      "https://api.football-data.org/v4/competitions/SA/standings";

    const finishedUrl = `https://api.football-data.org/v4/teams/${TEAM_ID}/matches?status=FINISHED&limit=20`;
    const scheduledUrl = `https://api.football-data.org/v4/teams/${TEAM_ID}/matches?status=SCHEDULED&limit=30`;
    const timedUrl = `https://api.football-data.org/v4/teams/${TEAM_ID}/matches?status=TIMED&limit=30`;

    const [standingsRes, finishedRes, scheduledRes, timedRes] =
      await Promise.allSettled([
        fetch(standingsUrl, { headers, cache: "no-store" }),
        fetch(finishedUrl, { headers, cache: "no-store" }),
        fetch(scheduledUrl, { headers, cache: "no-store" }),
        fetch(timedUrl, { headers, cache: "no-store" }),
      ]);

    const safeJson = async (result) => {
      if (result.status !== "fulfilled") return null;
      if (!result.value.ok) return null;
      return await result.value.json();
    };

    const standingsData = await safeJson(standingsRes);
    const finishedData = await safeJson(finishedRes);
    const scheduledData = await safeJson(scheduledRes);
    const timedData = await safeJson(timedRes);

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
      competition: match.competition?.name || "Friendly",
      date: match.utcDate,
      homeTeam: match.homeTeam?.shortName || match.homeTeam?.name || "",
      awayTeam: match.awayTeam?.shortName || match.awayTeam?.name || "",
      homeScore: match.score?.fullTime?.home ?? "-",
      awayScore: match.score?.fullTime?.away ?? "-",
      status: match.status || "",
    });

    const pastMatches = (finishedData?.matches || [])
      .map(normalizeMatch)
      .filter((match) => match.homeTeam && match.awayTeam && match.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    const apiNextMatches = [
      ...(scheduledData?.matches || []),
      ...(timedData?.matches || []),
    ]
      .map(normalizeMatch)
      .filter((match) => {
        const date = new Date(match.date);
        return (
          match.homeTeam &&
          match.awayTeam &&
          !Number.isNaN(date.getTime()) &&
          date >= new Date()
        );
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const nextMatches =
      apiNextMatches.length > 0 ? apiNextMatches : backupNextMatches;

    return res.status(200).json({
      standings,
      pastMatches,
      nextMatches,
      updatedAt: new Date().toISOString(),
      source: apiNextMatches.length > 0 ? "football-data" : "backup",
    });
  } catch (error) {
    return res.status(200).json({
      standings: [],
      pastMatches: [],
      nextMatches: [
        {
          id: "backup-error-1",
          competition: "Friendly",
          date: "2026-07-18T04:30:00.000Z",
          homeTeam: "Basilea",
          awayTeam: "Juventus",
          status: "TIMED",
        },
      ],
      updatedAt: new Date().toISOString(),
      source: "backup-error",
      error: error.message,
    });
  }
}
