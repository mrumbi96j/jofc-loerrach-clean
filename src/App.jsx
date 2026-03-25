import React, { useState } from "react";

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
      formTitle: "Modulo richiesta",
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
      langButton: "DE",
    },
    de: {
      siteTitle: "JOFC Lörrach",
      siteSubtitle: "Ticketanfrage Mitglieder",
      heroTitle: "Sende deine Ticketanfrage",
      heroText:
        "Das Mitglied kann das Spiel direkt aus dem Menü auswählen und die Anfrage einfach und schnell senden.",
      formTitle: "Anfrageformular",
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
      langButton: "IT",
    },
  };

  const t = content[lang];

  // QUI INSERISCI LE PARTITE CHE VUOI FAR SCEGLIERE
  const matches = [
    "Juventus - Inter",
    "Juventus - Milan",
    "Juventus - Napoli",
    "Juventus - Roma",
    "Juventus - Lazio",
    "Juventus - Torino",
    "Juventus - Atalanta",
    "Juventus - Fiorentina",
  ];

  const sectors = ["Curva", "Tribuna", "Ospiti", "VIP"];

  const quantities = ["1", "2", "3", "4", "5", "6"];

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
      alert(lang === "it" ? "Compila tutti i campi obbligatori" : "Bitte alle Pflichtfelder ausfüllen");
      return;
    }

    alert(lang === "it" ? "Richiesta salvata!" : "Anfrage gespeichert!");
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
    <div className="min-h-screen bg-black px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="mb-8 flex items-center justify-between rounded-3xl border border-white/10 bg-black p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="JOFC Lörrach"
              className="h-16 w-16 rounded-full border border-white/20 object-cover"
            />
            <div>
              <h1 className="text-2xl font-extrabold text-yellow-400 md:text-3xl">
                {t.siteTitle}
              </h1>
              <p className="text-sm text-white/70">{t.siteSubtitle}</p>
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
        <section className="mb-8 rounded-3xl border border-yellow-400/20 bg-gradient-to-r from-yellow-400/10 to-transparent p-6">
          <h2 className="text-3xl font-extrabold md:text-4xl">{t.heroTitle}</h2>
          <p className="mt-3 max-w-4xl text-lg text-white/80">{t.heroText}</p>
        </section>

        {/* FORM */}
        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-black p-6 shadow-lg">
            <h3 className="mb-6 text-2xl font-extrabold text-yellow-400">
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
                onChange={(e) => handleChange("memberNumber", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-yellow-400"
              />

              {/* PARTITA SCELTA DA MENU */}
              <select
                value={form.match}
                onChange={(e) => handleChange("match", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition focus:border-yellow-400"
              >
                <option value="">{t.match}</option>
                {matches.map((match) => (
                  <option key={match} value={match}>
                    {match}
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

          {/* COLONNA DESTRA VUOTA / PULITA COME STILE */}
          <section className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-black p-6 shadow-lg">
              <h3 className="mb-4 text-2xl font-extrabold text-yellow-400">
                {lang === "it" ? "Partita selezionata" : "Ausgewähltes Spiel"}
              </h3>
              <div className="rounded-2xl border border-white/10 bg-black px-4 py-5 text-white/80">
                {form.match || (lang === "it" ? "Nessuna partita selezionata" : "Kein Spiel ausgewählt")}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black p-6 shadow-lg">
              <h3 className="mb-4 text-2xl font-extrabold text-yellow-400">
                {lang === "it" ? "Informazioni" : "Informationen"}
              </h3>
              <p className="text-white/70">
                {lang === "it"
                  ? "Qui puoi lasciare il form semplice e pulito. L’unica funzione aggiunta è la scelta della partita da elenco."
                  : "Hier bleibt das Formular einfach und sauber. Die einzige hinzugefügte Funktion ist die Spielauswahl aus einer Liste."}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
