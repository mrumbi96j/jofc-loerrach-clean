import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Trophy,
  Users,
  Bus,
  Mail,
  Globe,
  ShieldCheck,
  ChevronRight,
  Star,
  MessageCircle,
  ExternalLink,
  MapPin,
  Crown,
  Ticket,
  Phone,
} from "lucide-react";

export default function JOFCLoerrachWebsite() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    match: "",
    quantity: "",
    membership: "",
    sector: "",
    extras: "",
    notes: "",
  });

  const [language, setLanguage] = useState("it");

  const [liveData, setLiveData] = useState({
    standings: [],
    pastMatches: [],
    nextMatches: [],
    updatedAt: null,
  });

  const [loadingLiveData, setLoadingLiveData] = useState(true);
  const [liveDataError, setLiveDataError] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    let intervalId;

    const fetchLiveData = async () => {
      try {
        setLoadingLiveData(true);
        setLiveDataError(false);

        const response = await fetch(`/api/juventus-data?t=${Date.now()}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Errore nel recupero dati");
        }

        const data = await response.json();

        setLiveData({
          standings: data.standings || [],
          pastMatches: data.pastMatches || [],
          nextMatches: data.nextMatches || [],
          updatedAt: data.updatedAt || null,
        });
      } catch (error) {
        console.error(error);
        setLiveDataError(true);
      } finally {
        setLoadingLiveData(false);
      }
    };

    fetchLiveData();
    intervalId = setInterval(fetchLiveData, 15 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);

      if (Number.isNaN(date.getTime())) {
        return dateString;
      }

      return new Intl.DateTimeFormat(language === "it" ? "it-IT" : "de-DE", {
        timeZone: "Europe/Zurich",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const getRequestStatus = (matchDate) => {
    try {
      const now = new Date();
      const gameDate = new Date(matchDate);

      if (Number.isNaN(gameDate.getTime())) {
        return "closed";
      }

      const openDate = new Date(gameDate);
      openDate.setMonth(openDate.getMonth() - 1);

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

  const getRequestStatusLabel = (matchDate) => {
    const status = getRequestStatus(matchDate);

    if (language === "it") {
      if (status === "open") return "Richiesta aperta";
      if (status === "not_open_yet") return "Richiesta non aperta";
      return "Richiesta chiusa";
    }

    if (status === "open") return "Anfrage offen";
    if (status === "not_open_yet") return "Anfrage noch nicht offen";
    return "Anfrage geschlossen";
  };

  const content_it = {
    nav: {
      home: "Home",
      matches: "Partite",
      tickets: "Biglietti",
      trophies: "Trofei",
      contact: "Contatti",
    },
    heroBadge: "Juventus Official Fan Club Lörrach • Fino alla fine",
    heroTitle: "Il punto di riferimento del nostro Juventus Fan Club.",
    heroText:
      "Richieste biglietti, partite della Juventus, trasferte, vantaggi soci e informazioni utili in un sito elegante, veloce e bilingue.",
    heroPrimary: "Richiedi biglietti",
    heroSecondary: "Guarda le partite",
    heroCardTitle: "Prossime partite",
    heroCardBadge: "Modalità IT / DE",
    ticketTitle: "Richiesta biglietti",
    ticketText: "Compila il modulo per inviare una richiesta al club.",
    ticketsCta: "Invia richiesta",
    quickContact: "Contatto rapido",
    whatsappGermany: "WhatsApp Germania",
    whatsappSwitzerland: "WhatsApp Svizzera",
    emailDirect: "Scrivi una e-mail",
    memberAreaTitle: "Per soci e tifosi",
    memberAreaText: "Richieste biglietti e informazioni.",
    sectionMatches: "Partite della Juventus",
    sectionMatchesText:
      "Risultati passati e partite future aggiornati automaticamente.",
    trophiesTitle: "Trofei Juventus",
    trophiesText: "La storia gloriosa del club bianconero.",
    contactTitle: "Contatta il club",
    contactText:
      "Contattaci direttamente per informazioni e richieste biglietti.",
    standingsTitle: "Classifica Serie A",
    standingsText: "Classifica aggiornata automaticamente.",
    pastMatchesTitle: "Ultimi risultati Juventus",
    pastMatchesText: "Risultati passati aggiornati automaticamente.",
    nextMatchesTitle: "Prossime partite Juventus",
    nextMatchesText: "Calendario aggiornato automaticamente.",
    loadingData: "Caricamento dati...",
    errorData: "Errore nel caricamento dei dati.",
    labels: {
      firstName: "Nome",
      lastName: "Cognome",
      email: "E-mail",
      phone: "Telefono",
      match: "Partita",
      quantity: "Numero biglietti",
      membership: "Categoria",
      sector: "Settore Allianz Stadium",
      extras: "Opzione",
      notes: "Note",
      member: "Socio",
      nonMember: "Non socio",
      onlyTicket: "Solo biglietto",
      ticketBus: "Biglietto + bus",
      vip: "VIP",
    },
    cards: [
      { icon: Users, title: "Area soci", text: "Vantaggi soci." },
      { icon: Bus, title: "Trasferte", text: "Viaggi organizzati." },
      { icon: ShieldCheck, title: "Richieste", text: "Gestione richieste." },
    ],
    packages: [
      {
        title: "Soci",
        price: "Priorità",
        items: [
          "Priorità richieste",
          "Informazioni dedicate",
          "Supporto diretto",
        ],
      },
      {
        title: "Non soci",
        price: "Disponibilità",
        items: [
          "Disponibilità standard",
          "Ordine cronologico",
          "Lista attesa",
        ],
      },
      {
        title: "Bus & VIP",
        price: "Su richiesta",
        items: [
          "Pacchetti personalizzati",
          "Viaggio bus",
          "Esperienze VIP",
        ],
      },
    ],
    heroMatches: [
      {
        competition: "Serie A",
        home: "Juventus",
        away: "Inter",
        date: "05 Apr",
        time: "20:45",
        status: "Live data",
      },
    ],
    trophies: [
      { label: "Scudetti", value: "38" },
      { label: "Coppa Italia", value: "15" },
      { label: "Supercoppa Italiana", value: "9" },
      { label: "Titoli UEFA", value: "11" },
    ],
    travelTitle: "Trasferte",
    travelText: "Viaggi organizzati.",
    membersTitle: "Area soci",
    membersText: "Vantaggi dedicati ai membri del club.",
    contactBoxTitle: "Info",
    footer: "JOFC Lörrach",
    teamLabel: "Squadra",
    playedLabel: "PG",
    wonLabel: "V",
    drawLabel: "N",
    lostLabel: "P",
    gdLabel: "Diff",
    ptsLabel: "Pt",
    updatedAtLabel: "Ultimo aggiornamento",
  };

  const content_de = {
    nav: {
      home: "Start",
      matches: "Spiele",
      tickets: "Tickets",
      trophies: "Trophäen",
      contact: "Kontakt",
    },
    heroBadge: "Juventus Official Fan Club Lörrach",
    heroTitle: "Der Treffpunkt unseres Juventus Fanclubs.",
    heroText:
      "Ticketanfragen, Juventus Spiele, Reisen, Mitgliedervorteile und nützliche Informationen auf einer eleganten, schnellen und zweisprachigen Website.",
    heroPrimary: "Tickets anfragen",
    heroSecondary: "Spiele ansehen",
    heroCardTitle: "Nächste Spiele",
    heroCardBadge: "IT / DE",
    ticketTitle: "Ticketanfrage",
    ticketText:
      "Fülle das Formular aus, um eine Anfrage an den Club zu senden.",
    ticketsCta: "Anfrage senden",
    quickContact: "Schnellkontakt",
    whatsappGermany: "WhatsApp Deutschland",
    whatsappSwitzerland: "WhatsApp Schweiz",
    emailDirect: "E-Mail schreiben",
    memberAreaTitle: "Für Mitglieder und Fans",
    memberAreaText: "Ticketanfragen und Informationen.",
    sectionMatches: "Juventus Spiele",
    sectionMatchesText:
      "Vergangene Ergebnisse und kommende Spiele werden automatisch aktualisiert.",
    trophiesTitle: "Juventus Trophäen",
    trophiesText: "Die glorreiche Geschichte des Vereins.",
    contactTitle: "Kontaktiere den Club",
    contactText: "Kontaktiere uns direkt für Infos und Ticketanfragen.",
    standingsTitle: "Serie A Tabelle",
    standingsText: "Automatisch aktualisierte Tabelle.",
    pastMatchesTitle: "Letzte Juventus Ergebnisse",
    pastMatchesText: "Automatisch aktualisierte Ergebnisse.",
    nextMatchesTitle: "Nächste Juventus Spiele",
    nextMatchesText: "Automatisch aktualisierter Spielplan.",
    loadingData: "Daten werden geladen...",
    errorData: "Fehler beim Laden der Daten.",
    labels: {
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      phone: "Telefon",
      match: "Spiel",
      quantity: "Anzahl Tickets",
      membership: "Kategorie",
      sector: "Allianz Stadium Bereich",
      extras: "Option",
      notes: "Notizen",
      member: "Mitglied",
      nonMember: "Nicht-Mitglied",
      onlyTicket: "Nur Ticket",
      ticketBus: "Ticket + Bus",
      vip: "VIP",
    },
    cards: [
      { icon: Users, title: "Mitgliederbereich", text: "Mitgliedervorteile." },
      { icon: Bus, title: "Reisen", text: "Organisierte Fahrten." },
      { icon: ShieldCheck, title: "Anfragen", text: "Anfragen verwalten." },
    ],
    packages: [
      {
        title: "Mitglieder",
        price: "Priorität",
        items: ["Priorität", "Direkte Infos", "Support"],
      },
      {
        title: "Nicht-Mitglieder",
        price: "Verfügbarkeit",
        items: ["Standard", "Reihenfolge", "Warteliste"],
      },
      {
        title: "Bus & VIP",
        price: "Auf Anfrage",
        items: ["Pakete", "Busfahrt", "VIP"],
      },
    ],
    heroMatches: [
      {
        competition: "Serie A",
        home: "Juventus",
        away: "Inter",
        date: "05 Apr",
        time: "20:45",
        status: "Live data",
      },
    ],
    trophies: [
      { label: "Meistertitel", value: "38" },
      { label: "Coppa Italia", value: "15" },
      { label: "Italienischer Supercup", value: "9" },
      { label: "UEFA-Titel", value: "11" },
    ],
    travelTitle: "Reisen",
    travelText: "Organisierte Fahrten.",
    membersTitle: "Mitgliederbereich",
    membersText: "Vorteile für Clubmitglieder.",
    contactBoxTitle: "Info",
    footer: "JOFC Lörrach",
    teamLabel: "Team",
    playedLabel: "SP",
    wonLabel: "S",
    drawLabel: "U",
    lostLabel: "N",
    gdLabel: "Diff",
    ptsLabel: "Pkt",
    updatedAtLabel: "Letztes Update",
  };

  const content = { it: content_it, de: content_de };
  const t = content[language] || content.it;
  const features = useMemo(() => t.cards, [t]);

  const JuveMark = () => (
    <div className="h-16 w-16 overflow-hidden rounded-[1.25rem] border border-white/10 bg-white shadow-2xl">
      <img
        src="/logo-club.jpg"
        alt="JOFC Lörrach"
        className="h-full w-full object-cover"
      />
    </div>
  );

  const openNextMatches = useMemo(() => {
    return liveData.nextMatches.filter(
      (match) => getRequestStatus(match.date) === "open"
    );
  }, [liveData.nextMatches]);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_30%)]" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <JuveMark />
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-400">
                Juventus Official Fan Club
              </p>
              <h1 className="text-2xl font-black tracking-tight">Lörrach</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
              <a href="#home" className="hover:text-white">
                {t.nav.home}
              </a>
              <a href="#matches" className="hover:text-white">
                {t.nav.matches}
              </a>
              <a href="#tickets" className="hover:text-white">
                {t.nav.tickets}
              </a>
              <a href="#trophies" className="hover:text-white">
                {t.nav.trophies}
              </a>
              <a href="#contact" className="hover:text-white">
                {t.nav.contact}
              </a>
            </nav>

            <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => setLanguage("it")}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  language === "it" ? "bg-white text-black" : "text-zinc-300"
                }`}
              >
                IT
              </button>
              <button
                onClick={() => setLanguage("de")}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  language === "de" ? "bg-white text-black" : "text-zinc-300"
                }`}
              >
                DE
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section
          id="home"
          className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300 backdrop-blur">
              <Star className="h-3.5 w-3.5" />
              {t.heroBadge}
            </div>

            <div className="space-y-4">
              <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                {t.heroTitle}
              </h2>
              <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
                {t.heroText}
              </p>

              <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                  <Ticket className="h-4 w-4" /> Ticket request
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                  <Bus className="h-4 w-4" /> Trasferte / Reisen
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                  <Crown className="h-4 w-4" /> Soci & Priorità
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#tickets"
                className="rounded-2xl bg-white px-5 py-3 font-semibold text-black shadow-lg transition hover:scale-[1.02]"
              >
                {t.heroPrimary}
              </a>
              <a
                href="#matches"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                {t.heroSecondary}
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur">
              <p className="text-sm font-semibold">{t.memberAreaTitle}</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                {t.memberAreaText}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="mailto:jcdgagnelli@gmx.de?subject=Richiesta%20informazioni%20Juventus%20Official%20Fan%20Club%20L%C3%B6rrach"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/60"
                >
                  <Mail className="h-4 w-4" />
                  {t.emailDirect}
                </a>

                <a
                  href="https://wa.me/491724385671"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/60"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.whatsappGermany}
                </a>

                <a
                  href="https://wa.me/41782483401"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/60"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.whatsappSwitzerland}
                </a>
              </div>
            </div>

            <div className="grid gap-4 pt-4 md:grid-cols-3">
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur"
                  >
                    <Icon className="mb-3 h-5 w-5 text-white" />
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                  Black & White
                </p>
                <h3 className="text-xl font-bold">{t.heroCardTitle}</h3>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-zinc-200">
                <Globe className="h-3.5 w-3.5" />
                {t.heroCardBadge}
              </span>
            </div>

            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {liveData.nextMatches.length > 0 ? (
                liveData.nextMatches.map((match) => (
                  <div
                    key={match.id}
                    className="rounded-[1.5rem] border border-white/10 bg-black/40 p-4 transition hover:bg-black/60"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-wide text-zinc-400">
                        {match.competition}
                      </span>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs ${
                          getRequestStatus(match.date) === "open"
                            ? "border-green-500/30 bg-green-500/10 text-green-300"
                            : getRequestStatus(match.date) === "not_open_yet"
                            ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-300"
                            : "border-red-500/30 bg-red-500/10 text-red-300"
                        }`}
                      >
                        {getRequestStatusLabel(match.date)}
                      </span>
                    </div>
                    <p className="text-lg font-bold">
                      {match.homeTeam} vs {match.awayTeam}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
                      <CalendarDays className="h-4 w-4" />
                      {formatDate(match.date)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-100">
                  {language === "it"
                    ? "Calendario non disponibile al momento. Controlla la chiave API o riprova dopo il redeploy."
                    : "Spielplan momentan nicht verfügbar. Bitte API-Key prüfen oder nach dem Redeploy erneut laden."}
                </div>
              )}
            </div>
          </motion.div>
        </section>

        <section id="tickets" className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <h3 className="text-3xl font-black">{t.ticketTitle}</h3>
              <p className="mt-3 max-w-2xl text-zinc-300">{t.ticketText}</p>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
                <p className="font-semibold">Allianz Stadium</p>
                <p className="mt-2 text-zinc-400">
                  {language === "it"
                    ? "I soci possono indicare il settore desiderato, incluse curve e tribune con 1° e 2° anello, così il club può gestire le richieste in modo più preciso."
                    : "Mitglieder können den gewünschten Bereich angeben, einschließlich Kurven und Tribünen mit 1. und 2. Rang, damit der Club die Anfragen genauer verwalten kann."}
                </p>
              </div>

              <form
                className="mt-6 grid gap-4 md:grid-cols-2"
                action="https://formsubmit.co/jcdgagnelli@gmx.de"
                method="POST"
              >
                <input
                  type="hidden"
                  name="_subject"
                  value="Nuova richiesta biglietti - JOFC Lörrach"
                />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <input
                  type="text"
                  name="Nome"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500"
                  placeholder={t.labels.firstName}
                />
                <input
                  type="text"
                  name="Cognome"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500"
                  placeholder={t.labels.lastName}
                />
                <input
                  type="email"
                  name="Email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500"
                  placeholder={t.labels.email}
                />
                <input
                  type="text"
                  name="Telefono"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500"
                  placeholder={t.labels.phone}
                />
                <select
                  name="Partita"
                  value={formData.match}
                  onChange={(e) => handleChange("match", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-zinc-300 outline-none md:col-span-2"
                >
                  <option value="">{t.labels.match}</option>
                  {openNextMatches.map((match) => (
                    <option
                      key={match.id}
                      value={`${match.homeTeam} vs ${match.awayTeam}`}
                    >
                      {match.homeTeam} vs {match.awayTeam}
                    </option>
                  ))}
                </select>
                <select
                  name="Numero biglietti"
                  value={formData.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-zinc-300 outline-none"
                >
                  <option value="">{t.labels.quantity}</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
                <select
                  name="Categoria"
                  value={formData.membership}
                  onChange={(e) => handleChange("membership", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-zinc-300 outline-none"
                >
                  <option value="">{t.labels.membership}</option>
                  <option>{t.labels.member}</option>
                  <option>{t.labels.nonMember}</option>
                </select>
                <select
                  name="Settore Allianz Stadium"
                  value={formData.sector}
                  onChange={(e) => handleChange("sector", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-zinc-300 outline-none md:col-span-2"
                >
                  <option value="">{t.labels.sector}</option>
                  <option>Curva Sud 1° Anello</option>
                  <option>Curva Sud 2° Anello</option>
                  <option>Curva Nord 1° Anello</option>
                  <option>Curva Nord 2° Anello</option>
                  <option>Tribuna Est 1° Anello</option>
                  <option>Tribuna Est 2° Anello</option>
                  <option>Tribuna Ovest 1° Anello</option>
                  <option>Tribuna Ovest 2° Anello</option>
                  <option>Tribuna Family 1° Anello</option>
                  <option>Tribuna Family 2° Anello</option>
                  <option>Settore Ospiti</option>
                </select>
                <select
                  name="Opzione"
                  value={formData.extras}
                  onChange={(e) => handleChange("extras", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-zinc-300 outline-none"
                >
                  <option value="">{t.labels.extras}</option>
                  <option>{t.labels.onlyTicket}</option>
                  <option>{t.labels.ticketBus}</option>
                  <option>{t.labels.vip}</option>
                </select>
                <textarea
                  name="Note"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  className="min-h-[130px] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500 md:col-span-2"
                  placeholder={t.labels.notes}
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-black shadow-lg transition hover:scale-[1.01] md:col-span-2"
                >
                  {t.ticketsCta}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            <div className="space-y-4">
              {t.packages.map((item, index) => (
                <div
                  key={index}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <p className="mt-1 text-sm text-zinc-400">
                        Juventus Official Fan Club Lörrach
                      </p>
                    </div>
                    <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                      {item.price}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                    {item.items.map((point, idx) => (
                      <li key={idx}>• {point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <div className="mb-4 inline-flex rounded-2xl bg-white p-3 text-black">
                <Bus className="h-6 w-6" />
              </div>

              <h3 className="text-3xl font-black">{t.travelTitle}</h3>
              <p className="mt-3 text-zinc-300">{t.travelText}</p>

              <div className="mt-5 space-y-4 text-sm text-zinc-300">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="leading-6">
                    Lörrach / Germania / Svizzera
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  <div className="flex flex-col leading-6">
                    <span>WhatsApp DE: +49 172 438 56 71</span>
                    <span>WhatsApp CH: +41 78 248 3401</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <div className="mb-4 inline-flex rounded-2xl bg-white p-3 text-black">
                <Users className="h-6 w-6" />
              </div>

              <h3 className="text-3xl font-black">{t.membersTitle}</h3>
              <p className="mt-3 text-zinc-300">{t.membersText}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-zinc-300">
                  Priorità richieste biglietti / Ticket-Priorität
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-zinc-300">
                  Comunicazioni dedicate / Direkte Infos
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-zinc-300">
                  Supporto trasferte / Reise-Support
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-zinc-300">
                  Contatto diretto col club / Direkter Kontakt
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="matches" className="mx-auto max-w-7xl px-6 py-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="text-3xl font-black">{t.sectionMatches}</h3>
                <p className="mt-3 max-w-3xl text-zinc-300">
                  {t.sectionMatchesText}
                </p>
              </div>

              {liveData.updatedAt && !loadingLiveData && !liveDataError && (
                <p className="text-sm text-zinc-500">
                  {t.updatedAtLabel}: {formatDate(liveData.updatedAt)}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
            <h3 className="text-3xl font-black">{t.standingsTitle}</h3>
            <p className="mt-3 text-zinc-300">{t.standingsText}</p>

            {loadingLiveData ? (
              <p className="mt-6 text-zinc-400">{t.loadingData}</p>
            ) : liveDataError ? (
              <p className="mt-6 text-red-400">{t.errorData}</p>
            ) : (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-sm text-zinc-300">
                  <thead className="border-b border-white/10 text-zinc-400">
                    <tr>
                      <th className="px-3 py-3">#</th>
                      <th className="px-3 py-3">{t.teamLabel}</th>
                      <th className="px-3 py-3">{t.playedLabel}</th>
                      <th className="px-3 py-3">{t.wonLabel}</th>
                      <th className="px-3 py-3">{t.drawLabel}</th>
                      <th className="px-3 py-3">{t.lostLabel}</th>
                      <th className="px-3 py-3">{t.gdLabel}</th>
                      <th className="px-3 py-3">{t.ptsLabel}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveData.standings.map((team) => (
                      <tr
                        key={`${team.position}-${team.team}`}
                        className={`border-b border-white/5 ${
                          team.team?.toLowerCase().includes("juventus")
                            ? "bg-white/10"
                            : ""
                        }`}
                      >
                        <td className="px-3 py-3">{team.position}</td>
                        <td className="px-3 py-3 font-semibold">{team.team}</td>
                        <td className="px-3 py-3">{team.playedGames}</td>
                        <td className="px-3 py-3">{team.won}</td>
                        <td className="px-3 py-3">{team.draw}</td>
                        <td className="px-3 py-3">{team.lost}</td>
                        <td className="px-3 py-3">{team.goalDifference}</td>
                        <td className="px-3 py-3 font-bold">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <h3 className="text-3xl font-black">{t.pastMatchesTitle}</h3>
              <p className="mt-3 text-zinc-300">{t.pastMatchesText}</p>

              <div className="mt-6 space-y-3">
                {loadingLiveData ? (
                  <p className="text-zinc-400">{t.loadingData}</p>
                ) : liveDataError ? (
                  <p className="text-red-400">{t.errorData}</p>
                ) : (
                  liveData.pastMatches.map((match) => (
                    <div
                      key={match.id}
                      className="rounded-[1.5rem] border border-white/10 bg-black/40 p-4"
                    >
                      <p className="text-xs uppercase tracking-wide text-zinc-500">
                        {match.competition}
                      </p>
                      <p className="mt-2 text-lg font-bold">
                        {match.homeTeam} {match.homeScore} - {match.awayScore}{" "}
                        {match.awayTeam}
                      </p>
                      <p className="mt-1 text-sm text-zinc-400">
                        {formatDate(match.date)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <h3 className="text-3xl font-black">{t.nextMatchesTitle}</h3>
              <p className="mt-3 text-zinc-300">{t.nextMatchesText}</p>

              <div className="mt-6 space-y-3">
                {loadingLiveData ? (
                  <p className="text-zinc-400">{t.loadingData}</p>
                ) : liveDataError ? (
                  <p className="text-red-400">{t.errorData}</p>
                ) : (
                  liveData.nextMatches.map((match) => (
                    <div
                      key={match.id}
                      className="rounded-[1.5rem] border border-white/10 bg-black/40 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="text-xs uppercase tracking-wide text-zinc-500">
                          {match.competition}
                        </p>
                        <span
                          className={`rounded-full border px-3 py-1 text-xs ${
                            getRequestStatus(match.date) === "open"
                              ? "border-green-500/30 bg-green-500/10 text-green-300"
                              : getRequestStatus(match.date) === "not_open_yet"
                              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-300"
                              : "border-red-500/30 bg-red-500/10 text-red-300"
                          }`}
                        >
                          {getRequestStatusLabel(match.date)}
                        </span>
                      </div>
                      <p className="mt-2 text-lg font-bold">
                        {match.homeTeam} vs {match.awayTeam}
                      </p>
                      <p className="mt-1 text-sm text-zinc-400">
                        {formatDate(match.date)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="trophies" className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-white p-3 text-black">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Juventus
                  </p>
                  <h3 className="text-3xl font-black">{t.trophiesTitle}</h3>
                </div>
              </div>

              <p className="max-w-xl text-zinc-300">{t.trophiesText}</p>

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                  1897
                </p>
                <p className="mt-3 text-2xl font-black">
                  Juventus • Black & White Legacy
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {language === "it"
                    ? "Sezione pensata per valorizzare la storia del club con un look moderno ispirato ai colori bianconeri."
                    : "Bereich zur Aufwertung der Vereinsgeschichte mit modernem Look in den schwarz-weißen Farben."}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
              {t.trophies.map((item, index) => (
                <div
                  key={index}
                  className="min-h-[140px] rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
                >
                  <p className="text-4xl font-black">{item.value}</p>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur md:p-8">
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <h3 className="text-3xl font-black">{t.contactTitle}</h3>
                <p className="mt-3 max-w-2xl text-zinc-300">{t.contactText}</p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
                <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-zinc-200">
                  <Globe className="h-4 w-4" /> {t.quickContact}
                </p>

                <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
                  {t.contactBoxTitle}
                </p>

                <div className="space-y-4 text-sm text-zinc-300">
                  <a
                    href="mailto:jcdgagnelli@gmx.de?subject=Juventus%20Official%20Fan%20Club%20L%C3%B6rrach"
                    className="flex items-center gap-3 transition hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="break-all">jcdgagnelli@gmx.de</span>
                  </a>

                  <a
                    href="https://wa.me/491724385671"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 transition hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    <span>{t.whatsappGermany}</span>
                  </a>

                  <a
                    href="https://wa.me/41782483401"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 transition hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    <span>{t.whatsappSwitzerland}</span>
                  </a>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href="mailto:jcdgagnelli@gmx.de?subject=Juventus%20Official%20Fan%20Club%20L%C3%B6rrach"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
                  >
                    {t.emailDirect}
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  <a
                    href="https://wa.me/491724385671"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {t.whatsappGermany}
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  <a
                    href="https://wa.me/41782483401"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {t.whatsappSwitzerland}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <p className="mt-4 text-sm leading-6 text-zinc-500">
                  {language === "it"
                    ? "Modulo contatti, WhatsApp diretto, area soci e workflow biglietti collegati nella versione finale."
                    : "Kontaktformular, direktes WhatsApp, Mitgliederbereich und Ticket-Workflow in der finalen Version verbunden."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-6 py-6 text-center text-sm text-zinc-500">
        {t.footer}
      </footer>
    </div>
  );
}
