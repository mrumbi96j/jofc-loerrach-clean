import React, { useMemo, useState } from "react";

export default function App() {
  const [lang, setLang] = useState("it");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    memberNumber: "",
    match: "",
    notes: "",
  });

  const text = {
    it: {
      navHome: "Home",
      navMatches: "Partite",
      navTickets: "Biglietti",
      navTrophies: "Trofei",
      navContacts: "Contatti",
      heroBadge: "Juventus Official Fan Club Lörrach • Fino alla fine",
      heroTitle: "Il punto di riferimento del nostro Juventus Fan Club.",
      heroText:
        "Richieste biglietti, partite della Juventus, trasferte, vantaggi soci e informazioni utili in un sito elegante, veloce e bilingue.",
      chip1: "Ticket request",
      chip2: "Trasferte / Reisen",
      chip3: "Soci & Priorità",
      cta1: "Richiedi biglietti",
      cta2: "Guarda le partite",
      contactBoxTitle: "Per soci e tifosi",
      contactBoxText: "Richieste biglietti e informazioni.",
      emailBtn: "Scrivi una e-mail",
      waDeBtn: "WhatsApp Germania",
      waChBtn: "WhatsApp Svizzera",
      mini1Title: "Area soci",
      mini1Text: "Vantaggi soci.",
      mini2Title: "Trasferte",
      mini2Text: "Viaggi organizzati.",
      mini3Title: "Richieste",
      mini3Text: "Gestione richieste.",
      matchesTitle: "Prossime partite",
      langMode: "Modalità IT / DE",
      requestOpen: "Richiesta aperta",
      requestClosed: "Richiesta chiusa",
      formTitle: "Richiesta biglietti",
      formText: "Compila il modulo per inviare una richiesta al club.",
      formName: "Nome e cognome",
      formEmail: "Email",
      formPhone: "Telefono",
      formMember: "Numero socio",
      formMatch: "Seleziona partita",
      formNotes: "Note",
      formNotesPlaceholder: "Inserisci eventuali note...",
      formSubmit: "Invia richiesta",
      formClear: "Svuota",
      membersTitle: "Soci",
      membersText: "Juventus Official Fan Club Lörrach",
      membersPriority: "Priorità",
      memberBullet1: "Priorità richieste",
      memberBullet2: "Comunicazioni dedicate",
      memberBullet3: "Supporto trasferte",
      alertRequired: "Compila tutti i campi obbligatori.",
      alertSent: "Richiesta inviata correttamente.",
      noOpenMatches: "Nessuna partita attualmente aperta.",
    },
    de: {
      navHome: "Home",
      navMatches: "Spiele",
      navTickets: "Tickets",
      navTrophies: "Trophäen",
      navContacts: "Kontakte",
      heroBadge: "Juventus Official Fan Club Lörrach • Fino alla fine",
      heroTitle: "Der Bezugspunkt unseres Juventus Fan Clubs.",
      heroText:
        "Ticketanfragen, Juventus-Spiele, Reisen, Mitgliedervorteile und nützliche Informationen in einer eleganten, schnellen und zweisprachigen Website.",
      chip1: "Ticket request",
      chip2: "Auswärts / Reisen",
      chip3: "Mitglieder & Priorität",
      cta1: "Tickets anfragen",
      cta2: "Spiele ansehen",
      contactBoxTitle: "Für Mitglieder und Fans",
      contactBoxText: "Ticketanfragen und Informationen.",
      emailBtn: "E-Mail schreiben",
      waDeBtn: "WhatsApp Deutschland",
      waChBtn: "WhatsApp Schweiz",
      mini1Title: "Mitgliederbereich",
      mini1Text: "Mitgliedervorteile.",
      mini2Title: "Reisen",
      mini2Text: "Organisierte Fahrten.",
      mini3Title: "Anfragen",
      mini3Text: "Anfrageverwaltung.",
      matchesTitle: "Nächste Spiele",
      langMode: "Modus IT / DE",
      requestOpen: "Anfrage offen",
      requestClosed: "Anfrage geschlossen",
      formTitle: "Ticketanfrage",
      formText: "Fülle das Formular aus, um eine Anfrage an den Club zu senden.",
      formName: "Vor- und Nachname",
      formEmail: "E-Mail",
      formPhone: "Telefon",
      formMember: "Mitgliedsnummer",
      formMatch: "Spiel auswählen",
      formNotes: "Notizen",
      formNotesPlaceholder: "Weitere Notizen eingeben...",
      formSubmit: "Anfrage senden",
      formClear: "Leeren",
      membersTitle: "Mitglieder",
      membersText: "Juventus Official Fan Club Lörrach",
      membersPriority: "Priorität",
      memberBullet1: "Priorität bei Anfragen",
      memberBullet2: "Direkte Mitteilungen",
      memberBullet3: "Reiseunterstützung",
      alertRequired: "Bitte alle Pflichtfelder ausfüllen.",
      alertSent: "Anfrage erfolgreich gesendet.",
      noOpenMatches: "Aktuell kein offenes Spiel verfügbar.",
    },
  };

  const t = text[lang];

  const matches = [
    {
      league: "SERIE A",
      match: "Juventus vs Genoa",
      date: "2026-04-06T18:00:00",
    },
    {
      league: "SERIE A",
      match: "Atalanta vs Juventus",
      date: "2026-04-11T20:45:00",
    },
    {
      league: "SERIE A",
      match: "Juventus vs Bologna",
      date: "2026-04-19T20:45:00",
    },
  ];

  const getRequestStatus = (matchDate) => {
    const now = new Date();
    const gameDate = new Date(matchDate);

    const openDate = new Date(gameDate);
    openDate.setMonth(openDate.getMonth() - 1);

    const closeDate = new Date(gameDate);
    closeDate.setDate(closeDate.getDate() + 16);

    if (now >= openDate && now <= closeDate) {
      return "open";
    }

    return "closed";
  };

  const formatMatchDate = (matchDate) => {
    const date = new Date(matchDate);
    return date.toLocaleString(lang === "it" ? "it-IT" : "de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openMatches = useMemo(() => {
    return matches.filter((item) => getRequestStatus(item.date) === "open");
  }, [matches]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.memberNumber || !form.match) {
      alert(t.alertRequired);
      return;
    }

    alert(t.alertSent);

    setForm({
      name: "",
      email: "",
      phone: "",
      memberNumber: "",
      match: "",
      notes: "",
    });
  };

  const scrollToTickets = () => {
    const el = document.getElementById("ticket-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMatches = () => {
    const el = document.getElementById("matches");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_35%),linear-gradient(to_bottom,rgba(255,255,255,0.02),rgba(0,0,0,1))]">
        <header className="border-b border-white/5 bg-black/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="JOFC Lörrach"
                className="h-12 w-12 rounded-2xl bg-white object-cover"
              />
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/50 md:text-xs">
                  Juventus Official Fan Club
                </p>
                <p className="text-2xl font-extrabold tracking-tight text-white">
                  Lörrach
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-6 md:flex">
              <button className="text-sm text-white/80 transition hover:text-white">
                {t.navHome}
              </button>
              <button
                onClick={scrollToMatches}
                className="text-sm text-white/80 transition hover:text-white"
              >
                {t.navMatches}
              </button>
              <button
                onClick={scrollToTickets}
                className="text-sm text-white/80 transition hover:text-white"
              >
                {t.navTickets}
              </button>
              <button className="text-sm text-white/80 transition hover:text-white">
                {t.navTrophies}
              </button>
              <button className="text-sm text-white/80 transition hover:text-white">
                {t.navContacts}
              </button>

              <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
                <button
                  onClick={() => setLang("it")}
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    lang === "it"
                      ? "bg-white text-black"
                      : "text-white/70"
                  }`}
                >
                  IT
                </button>
                <button
                  onClick={() => setLang("de")}
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    lang === "de"
                      ? "bg-white text-black"
                      : "text-white/70"
                  }`}
                >
                  DE
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <section>
              <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                ✩ <span className="ml-2">{t.heroBadge}</span>
              </div>

              <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
                {t.heroTitle}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
                {t.heroText}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  {t.chip1}
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  {t.chip2}
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  {t.chip3}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={scrollToTickets}
                  className="rounded-2xl bg-white px-6 py-4 font-bold text-black transition hover:scale-[1.02]"
                >
                  {t.cta1}
                </button>
                <button
                  onClick={scrollToMatches}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-bold text-white transition hover:bg-white/10"
                >
                  {t.cta2}
                </button>
              </div>

              <div className="mt-8 rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5 shadow-2xl">
                <p className="text-lg font-bold">{t.contactBoxTitle}</p>
                <p className="mt-2 text-white/65">{t.contactBoxText}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="mailto:info@jofc-loerrach.com"
                    className="rounded-2xl border border-white/10 bg-black/50 px-5 py-3 font-semibold text-white transition hover:bg-black/70"
                  >
                    ✉ {t.emailBtn}
                  </a>
                  <a
                    href="#"
                    className="rounded-2xl border border-white/10 bg-black/50 px-5 py-3 font-semibold text-white transition hover:bg-black/70"
                  >
                    ◔ {t.waDeBtn}
                  </a>
                  <a
                    href="#"
                    className="rounded-2xl border border-white/10 bg-black/50 px-5 py-3 font-semibold text-white transition hover:bg-black/70"
                  >
                    ◔ {t.waChBtn}
                  </a>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5">
                  <div className="text-xl">⌘</div>
                  <p className="mt-4 font-bold">{t.mini1Title}</p>
                  <p className="mt-2 text-white/60">{t.mini1Text}</p>
                </div>
                <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5">
                  <div className="text-xl">✈</div>
                  <p className="mt-4 font-bold">{t.mini2Title}</p>
                  <p className="mt-2 text-white/60">{t.mini2Text}</p>
                </div>
                <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5">
                  <div className="text-xl">◌</div>
                  <p className="mt-4 font-bold">{t.mini3Title}</p>
                  <p className="mt-2 text-white/60">{t.mini3Text}</p>
                </div>
              </div>
            </section>

            <section
              id="matches"
              className="rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),rgba(0,0,0,0.92))] p-5 shadow-2xl"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                    BLACK & WHITE
                  </p>
                  <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-white">
                    {t.matchesTitle}
                  </h2>
                </div>

                <button
                  onClick={() => setLang(lang === "it" ? "de" : "it")}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  🌐 {t.langMode}
                </button>
              </div>

              <div className="space-y-4">
                {matches.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-[28px] border border-white/10 bg-black/70 p-5 transition hover:border-white/20"
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                          {item.league}
                        </p>
                      </div>

                      <div
                        className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                          getRequestStatus(item.date) === "open"
                            ? "border-green-500/30 bg-green-500/10 text-green-300"
                            : "border-red-500/30 bg-red-500/10 text-red-300"
                        }`}
                      >
                        {getRequestStatus(item.date) === "open"
                          ? t.requestOpen
                          : t.requestClosed}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white">
                      {item.match}
                    </h3>

                    <div className="mt-4 flex items-center gap-2 text-white/65">
                      <span className="text-lg">📅</span>
                      <span>{formatMatchDate(item.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-12 grid gap-8 xl:grid-cols-[1fr_0.85fr]">
            <section
              id="ticket-form"
              className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-2xl"
            >
              <h2 className="text-5xl font-extrabold tracking-tight">
                {t.formTitle}
              </h2>
              <p className="mt-4 text-lg text-white/70">{t.formText}</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder={t.formName}
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full rounded-[22px] border border-white/10 bg-black/60 px-5 py-4 text-white outline-none transition focus:border-white/25"
                />

                <input
                  type="email"
                  placeholder={t.formEmail}
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full rounded-[22px] border border-white/10 bg-black/60 px-5 py-4 text-white outline-none transition focus:border-white/25"
                />

                <input
                  type="text"
                  placeholder={t.formPhone}
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full rounded-[22px] border border-white/10 bg-black/60 px-5 py-4 text-white outline-none transition focus:border-white/25"
                />

                <input
                  type="text"
                  placeholder={t.formMember}
                  value={form.memberNumber}
                  onChange={(e) => handleChange("memberNumber", e.target.value)}
                  className="w-full rounded-[22px] border border-white/10 bg-black/60 px-5 py-4 text-white outline-none transition focus:border-white/25"
                />

                <select
                  value={form.match}
                  onChange={(e) => handleChange("match", e.target.value)}
                  className="w-full rounded-[22px] border border-white/10 bg-black/60 px-5 py-4 text-white outline-none transition focus:border-white/25"
                >
                  <option value="">{t.formMatch}</option>
                  {openMatches.map((item) => (
                    <option key={item.match} value={item.match}>
                      {item.match}
                    </option>
                  ))}
                </select>

                {openMatches.length === 0 && (
                  <div className="rounded-[22px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {t.noOpenMatches}
                  </div>
                )}

                <textarea
                  placeholder={t.formNotesPlaceholder}
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  rows={5}
                  className="w-full rounded-[22px] border border-white/10 bg-black/60 px-5 py-4 text-white outline-none transition focus:border-white/25"
                />

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="rounded-2xl bg-white px-6 py-4 font-bold text-black transition hover:scale-[1.02]"
                  >
                    {t.formSubmit}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        memberNumber: "",
                        match: "",
                        notes: "",
                      })
                    }
                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-bold text-white transition hover:bg-white/10"
                  >
                    {t.formClear}
                  </button>
                </div>
              </form>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-2xl">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h3 className="text-4xl font-extrabold">{t.membersTitle}</h3>
                  <p className="mt-2 text-lg text-white/70">{t.membersText}</p>
                </div>

                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  {t.membersPriority}
                </div>
              </div>

              <ul className="space-y-4 text-lg text-white/80">
                <li>• {t.memberBullet1}</li>
                <li>• {t.memberBullet2}</li>
                <li>• {t.memberBullet3}</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
