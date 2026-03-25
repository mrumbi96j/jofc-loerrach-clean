import React, { useMemo, useState } from "react";

export default function App() {
  const [lang, setLang] = useState("it");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    memberNumber: "",
    match: "",
    sector: "",
    quantity: "1",
    notes: "",
    privacy: false,
  });

  const content = {
    it: {
      siteTitle: "JOFC Lörrach",
      siteSubtitle: "Richiesta Biglietti Soci",
      heroTitle: "Prenota la tua richiesta biglietti",
      heroText:
        "Il socio può scegliere la partita direttamente dal menu e inviare la richiesta in modo semplice e veloce.",
      upcomingTitle: "Prossime partite",
      mode: "Modalità IT / DE",
      formTitle: "Modulo richiesta",
      selectedTitle: "Partita selezionata",
      selectedEmpty: "Nessuna partita selezionata",
      infoTitle: "Informazioni",
      infoText:
        "Nel menu di selezione compaiono solo le partite con richiesta aperta.",
      name: "Nome e cognome",
      email: "Email",
      phone: "Telefono",
      memberNumber: "Numero socio",
      match: "Seleziona partita",
      sector: "Seleziona settore",
      quantity: "Quantità",
      notes: "Inserisci eventuali note...",
      privacy: "Confermo che i dati inseriti sono corretti",
      submit: "Salva richiesta",
      clear: "Svuota form",
      open: "Richiesta aperta",
      closed: "Richiesta chiusa",
      required: "Compila tutti i campi obbligatori",
      saved: "Richiesta salvata!",
      langButton: "DE",
    },
    de: {
      siteTitle: "JOFC Lörrach",
      siteSubtitle: "Ticketanfrage Mitglieder",
      heroTitle: "Sende deine Ticketanfrage",
      heroText:
        "Das Mitglied kann das Spiel direkt aus dem Menü auswählen und die Anfrage einfach und schnell senden.",
      upcomingTitle: "Nächste Spiele",
      mode: "Modus IT / DE",
      formTitle: "Anfrageformular",
      selectedTitle: "Ausgewähltes Spiel",
      selectedEmpty: "Kein Spiel ausgewählt",
      infoTitle: "Informationen",
      infoText:
        "Im Auswahlmenü erscheinen nur Spiele mit offener Anfrage.",
      name: "Vor- und Nachname",
      email: "E-Mail",
      phone: "Telefon",
      memberNumber: "Mitgliedsnummer",
      match: "Spiel auswählen",
      sector: "Sektor auswählen",
      quantity: "Menge",
      notes: "Weitere Notizen eingeben...",
      privacy: "Ich bestätige, dass die eingegebenen Daten korrekt sind",
      submit: "Anfrage speichern",
      clear: "Formular leeren",
      open: "Anfrage offen",
      closed: "Anfrage geschlossen",
      required: "Bitte alle Pflichtfelder ausfüllen",
      saved: "Anfrage gespeichert!",
      langButton: "IT",
    },
  };

  const t = content[lang];

  const matches = [
    {
      league: "SERIE A",
      match: "Juventus vs Genoa",
      date: "06/04/2026, 18:00",
      status: "open",
    },
    {
      league: "SERIE A",
      match: "Atalanta vs Juventus",
      date: "11/04/2026, 20:45",
      status: "closed",
    },
    {
      league: "SERIE A",
      match: "Juventus vs Bologna",
      date: "19/04/2026, 20:45",
      status: "open",
    },
  ];

  const sectors = ["Curva", "Tribuna", "Ospiti", "VIP"];
  const quantities = ["1", "2", "3", "4", "5", "6"];

  const openMatches = useMemo(
    () => matches.filter((item) => item.status === "open"),
    [matches]
  );

  const selectedMatchData = useMemo(
    () => matches.find((item) => item.match === form.match),
    [form.match]
  );

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.memberNumber ||
      !form.match ||
      !form.sector ||
      !form.quantity ||
      !form.privacy
    ) {
      alert(t.required);
      return;
    }

    alert(t.saved);
  };

  const clearForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      memberNumber: "",
      match: "",
      sector: "",
      quantity: "1",
      notes: "",
      privacy: false,
    });
  };

  return (
    <div className="min-h-screen bg-black px-3 py-4 text-white md:px-6 md:py-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="mb-8 flex items-center justify-between rounded-[32px] border border-white/10 bg-black/95 p-5 shadow-2xl">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="JOFC Lörrach"
              className="h-16 w-16 rounded-full border border-white/15 object-cover"
            />
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-yellow-400 md:text-4xl">
                {t.siteTitle}
              </h1>
              <p className="text-sm text-white/70 md:text-lg">
                {t.siteSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => setLang(lang === "it" ? "de" : "it")}
            className="rounded-2xl border border-yellow-400 px-4 py-3 font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
          >
            {t.langButton}
          </button>
        </header>

        {/* HERO */}
        <section className="mb-8 rounded-[32px] border border-yellow-400/10 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.08),rgba(255,255,255,0.02),rgba(0,0,0,0.96))] p-6 shadow-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            {t.heroTitle}
          </h2>
          <p className="mt-4 max-w-4xl text-base text-white/80 md:text-xl">
            {t.heroText}
          </p>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT */}
          <div className="space-y-8">
            {/* UPCOMING MATCHES */}
            <section className="rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),rgba(0,0,0,0.92))] p-5 shadow-2xl">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                    BLACK & WHITE
                  </p>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    {t.upcomingTitle}
                  </h2>
                </div>

                <button
                  onClick={() => setLang(lang === "it" ? "de" : "it")}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <span>🌐</span>
                  {t.mode}
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
                          item.status === "open"
                            ? "border-green-500/30 bg-green-500/10 text-green-300"
                            : "border-red-500/30 bg-red-500/10 text-red-300"
                        }`}
                      >
                        {item.status === "open" ? t.open : t.closed}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white">
                      {item.match}
                    </h3>

                    <div className="mt-4 flex items-center gap-2 text-white/65">
                      <span className="text-lg">📅</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FORM */}
            <section className="rounded-[32px] border border-white/10 bg-black/95 p-6 shadow-2xl">
              <h3 className="mb-6 text-2xl font-extrabold text-yellow-400 md:text-4xl">
                {t.formTitle}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder={t.name}
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-yellow-400"
                />

                <input
                  type="email"
                  placeholder={t.email}
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-yellow-400"
                />

                <input
                  type="text"
                  placeholder={t.phone}
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-yellow-400"
                />

                <input
                  type="text"
                  placeholder={t.memberNumber}
                  value={form.memberNumber}
                  onChange={(e) =>
                    handleChange("memberNumber", e.target.value)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-yellow-400"
                />

                <select
                  value={form.match}
                  onChange={(e) => handleChange("match", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-yellow-400"
                >
                  <option value="">{t.match}</option>
                  {openMatches.map((item) => (
                    <option key={item.match} value={item.match}>
                      {item.match}
                    </option>
                  ))}
                </select>

                <select
                  value={form.sector}
                  onChange={(e) => handleChange("sector", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-yellow-400"
                >
                  <option value="">{t.sector}</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>

                <select
                  value={form.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-yellow-400"
                >
                  {quantities.map((qty) => (
                    <option key={qty} value={qty}>
                      {t.quantity}: {qty}
                    </option>
                  ))}
                </select>

                <textarea
                  placeholder={t.notes}
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-yellow-400"
                />

                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black px-4 py-3 text-white">
                  <input
                    type="checkbox"
                    checked={form.privacy}
                    onChange={(e) => handleChange("privacy", e.target.checked)}
                  />
                  <span>{t.privacy}</span>
                </label>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <button
                    type="submit"
                    className="rounded-2xl bg-yellow-400 px-6 py-4 font-bold text-black transition hover:scale-[1.02]"
                  >
                    {t.submit}
                  </button>

                  <button
                    type="button"
                    onClick={clearForm}
                    className="rounded-2xl border border-yellow-400 px-6 py-4 font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                  >
                    {t.clear}
                  </button>
                </div>
              </form>
            </section>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            <section className="rounded-[32px] border border-white/10 bg-black/95 p-6 shadow-2xl">
              <h3 className="mb-4 text-2xl font-extrabold text-yellow-400 md:text-4xl">
                {t.selectedTitle}
              </h3>

              <div className="rounded-2xl border border-white/10 bg-black px-4 py-5 text-lg text-white/80">
                {form.match || t.selectedEmpty}
              </div>

              {selectedMatchData && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-black px-4 py-5 text-white/70">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{selectedMatchData.date}</span>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-[32px] border border-white/10 bg-black/95 p-6 shadow-2xl">
              <h3 className="mb-4 text-2xl font-extrabold text-yellow-400 md:text-4xl">
                {t.infoTitle}
              </h3>
              <p className="text-white/70 md:text-lg">{t.infoText}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
