
const getRequestStatus = (matchDate) => {
  try {
    const now = new Date();
    const gameDate = new Date(matchDate);

    if (Number.isNaN(gameDate.getTime())) {
      return "closed";
    }

    // Anfragen öffnen 3 Monate vor dem Spiel
    const openDate = new Date(gameDate);
    openDate.setMonth(openDate.getMonth() - 3);

    // Anfragen schließen 16 Tage vor dem Spiel
    const closeDate = new Date(gameDate);
    closeDate.setDate(closeDate.getDate() - 16);

    if (now < openDate) {
      return "not_open_yet";
    }

    if (now >= openDate && now <= closeDate) {
      return "open";
    }

    return "closed";
  } catch {
    return "closed";
  }
};
