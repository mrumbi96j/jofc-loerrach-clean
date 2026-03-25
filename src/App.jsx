import React, { useEffect, useMemo, useState } from "react";

export default function App() {
  const [lang, setLang] = useState("it");
  const [submitted, setSubmitted] = useState(false);

  const matches = [
    {
      id: 1,
      name: "Juventus vs Inter",
      date: "2026-09-13",
      stadium: "Allianz Stadium",
    },
    {
      id: 2,
      name: "Juventus vs Milan",
      date: "2026-10-04",
      stadium: "Allianz Stadium",
    },
    {
      id: 3,
      name: "Juventus vs Napoli",
      date: "2026-10-25",
      stadium: "Allianz Stadium",
    },
    {
      id: 4,
      name: "Juventus vs Roma",
      date: "2026-11-08",
      stadium: "Allianz Stadium",
    },
    {
      id: 5,
      name: "Juventus vs Lazio",
      date: "2026-11-29",
      stadium: "Allianz Stadium",
    },
    {
      id: 6,
      name: "Juventus vs Torino",
      date: "2026-12-13",
      stadium: "Allianz Stadium",
    },
    {
      id: 7,
      name: "Juventus vs Atalanta",
      date: "2027-01-17",
      stadium: "Allianz Stadium",
    },
    {
      id: 8,
      name: "Juventus vs Fiorentina",
      date: "2027-02-07",
      stadium: "Allianz Stadium",
    },
  ];

  const sectors = [
    { name: "Curva", price: 45 },
    { name: "Tribuna", price: 75 },
    { name: "Ospiti", price: 55 },
    { name: "VIP", price: 180 },
  ];

  const translations = {
    it: {
      siteTitle: "JOFC Lörrach",
      siteSub: "Richiesta Biglietti Soci",
      heroTitle: "Prenota la tua richiesta biglietti",
      heroText:
        "Il socio può scegliere la partita direttamente dal menu, selezionare settore e quantità, poi inviare la richiesta.",
      formTitle: "Modulo richiesta",
      requestListTitle: "Richieste salvate",
      noRequests: "Nessuna richiesta salvata",
      fullName: "Nome e cognome",
      email: "Email",
      phone: "Telefono",
      memberNumber: "Numero socio",
      match: "Seleziona partita",
      sector: "Seleziona settore",
      quantity: "Quantità",
      notes: "Note",
      notesPlaceholder: "Inserisci eventuali note...",
      privacy: "Confermo che i dati inseriti sono corretti",
      submit: "Salva richiesta",
      sendEmail: "Invia via email",
      clearForm: "Svuota form",
      delete: "Elimina",
      summary: "Riepilogo",
      selectedMatch: "Partita",
      selectedDate: "Data",
      selectedStadium: "Stadio",
      selectedSector: "Settore",
      selectedQuantity: "Biglietti",
      totalPrice: "Totale",
      member: "Socio",
      success: "Richiesta salvata correttamente",
      required: "Compila tutti i campi obbligatori",
      emailSubject: "Richiesta biglietti JOFC Lörrach",
      footer: "Juventus Official Fan Club Lörrach",
      languageButton: "DE",
    },
    de: {
      siteTitle: "JOFC Lörrach",
      siteSub: "Ticketanfrage Mitglieder",
      heroTitle: "Sende deine Ticketanfrage",
      heroText:
        "Das Mitglied kann das Spiel direkt aus dem Menü auswählen, den Sektor und die Anzahl bestimmen und dann die Anfrage senden.",
      formTitle: "Anfrageformular",
      requestListTitle: "Gespeicherte Anfragen",
      noRequests: "Keine gespeicherten Anfragen",
      fullName: "Vor- und Nachname",
      email: "E-Mail",
      phone: "Telefon",
      memberNumber: "Mitgliedsnummer",
      match: "Spiel auswählen",
      sector: "Sektor auswählen",
      quantity: "Anzahl",
      notes: "Notizen",
      notesPlaceholder: "Weitere Notizen eingeben...",
      privacy: "Ich bestätige, dass die eingegebenen Daten korrekt sind",
      submit: "Anfrage speichern",
      sendEmail: "Per E-Mail senden",
      clearForm: "Formular leeren",
      delete: "Löschen",
      summary: "Übersicht",
      selectedMatch: "Spiel",
      selectedDate: "Datum",
      selectedStadium: "Stadion",
      selectedSector: "Sektor",
      selectedQuantity: "Tickets",
      totalPrice: "Gesamt",
      member: "Mitglied",
      success: "Anfrage erfolgreich gespeichert",
      required: "Bitte alle Pflichtfelder ausfüllen",
      emailSubject: "Ticketanfrage JOFC Lörrach",
      footer: "Juventus Official Fan Club Lörrach",
      languageButton: "IT",
    },
  };

  const t = translations[lang];

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    memberNumber: "",
    match: "",
    sector: "",
    quantity: "1",
    notes: "",
    privacy: false,
  });

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("jofc_ticket_requests");
    if (saved) {
      setRequests(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jofc_ticket_requests", JSON.stringify(requests));
  }, [requests]);

  const selectedMatch = useMemo(
    () => matches.find((m) => m.name === form.match),
    [form.match]
  );

  const selectedSector = useMemo(
    () => sectors.find((s) => s.name === form.sector),
    [form.sector]
  );

  const totalPrice = useMemo(() => {
    const qty = Number(form.quantity || 0);
    const price = Number(selectedSector?.price || 0);
    return qty * price;
  }, [form.quantity, selectedSector]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
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

    const newRequest = {
      id: Date.now(),
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      memberNumber: form.memberNumber,
      match: form.match,
      date: selectedMatch?.date || "",
      stadium: selectedMatch?.stadium || "",
      sector: form.sector,
      quantity: form.quantity,
      totalPrice,
      notes: form.notes,
      createdAt: new Date().toLocaleString(),
    };

    setRequests((prev) => [newRequest, ...prev]);
    setSubmitted(true);

    setForm({
      fullName: "",
      email: "",
      phone: "",
      memberNumber: "",
      match: "",
      sector: "",
      quantity: "1",
      notes: "",
      privacy: false,
    });

    setTimeout(() => setSubmitted(false), 2500);
  };

  const handleDelete = (id) => {
    setRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const clearForm = () => {
    setForm({
      fullName: "",
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

  const emailBody = encodeURIComponent(
    `${t.member}: ${form.fullName}
${t.email}: ${form.email}
${t.phone}: ${form.phone}
${t.memberNumber}: ${form.memberNumber}
${t.selectedMatch}: ${form.match}
${t.selectedDate}: ${selectedMatch?.date || "-"}
${t.selectedStadium}: ${selectedMatch?.stadium || "-"}
${t.selectedSector}: ${form.sector}
${t.selectedQuantity}: ${form.quantity}
${t.totalPrice}: €${totalPrice}
${t.notes}: ${form.notes || "-"}`
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="JOFC Lörrach"
              className="h-16 w-16 rounded-full border border-white/20 object-cover"
            />
            <div>
              <h1 className="text-2xl font-extrabold text-yellow-400">
                {t.siteTitle}
              </h1>
              <p className="text-sm text-white/70">{t.siteSub}</p>
            </div>
          </div>

          <button
            onClick={() => setLang(lang === "it" ? "de" : "it")}
            className="w-fit rounded-2xl border border-yellow-400 px-4 py-2 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
          >
            {t.languageButton}
          </button>
        </header>

        <section className="mb-8 rounded-3xl border border-white/10 bg-gradient-to-br from-yellow-400/10 to-white/5 p-6">
          <h2 className="text-3xl font-extrabold">{t.heroTitle}</h2>
          <p className="mt-3 max-w-3xl text-white/75">{t.heroText}</p>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-6 text-2xl font-bold text-yellow-400">
              {t.formTitle}
            </h3>

            {submitted && (
              <div className="mb-5 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                {t.success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder={t.fullName}
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none transition focus:border-yellow-400"
              />

              <input
                type="email"
                placeholder={t.email}
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none transition focus:border-yellow-400"
              />

              <input
                type="text"
                placeholder={t.phone}
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none transition focus:border-yellow-400"
              />

              <input
                type="text"
                placeholder={t.memberNumber}
                value={form.memberNumber}
                onChange={(e) => handleChange("memberNumber", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none transition focus:border-yellow-400"
              />

              <select
                value={form.match}
                onChange={(e) => handleChange("match", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none transition focus:border-yellow-400"
              >
                <option value="">{t.match}</option>
                {matches.map((match) => (
                  <option key={match.id} value={match.name}>
                    {match.name}
                  </option>
                ))}
              </select>

              <select
                value={form.sector}
                onChange={(e) => handleChange("sector", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none transition focus:border-yellow-400"
              >
                <option value="">{t.sector}</option>
                {sectors.map((sector) => (
                  <option key={sector.name} value={sector.name}>
                    {sector.name} - €{sector.price}
                  </option>
                ))}
              </select>

              <select
                value={form.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none transition focus:border-yellow-400"
              >
                {[1, 2, 3, 4, 5, 6].map((qty) => (
                  <option key={qty} value={qty}>
                    {t.quantity}: {qty}
                  </option>
                ))}
              </select>

              <textarea
                placeholder={t.notesPlaceholder}
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none transition focus:border-yellow-400"
              />

              <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white/80">
                <input
                  type="checkbox"
                  checked={form.privacy}
                  onChange={(e) => handleChange("privacy", e.target.checked)}
                  className="mt-1"
                />
                <span>{t.privacy}</span>
              </label>

              <div className="grid gap-3 sm:grid-cols-3">
                <button
                  type="submit"
                  className="rounded-2xl bg-yellow-400 px-4 py-3 font-bold text-black transition hover:scale-[1.02]"
                >
                  {t.submit}
                </button>

                <a
                  href={`mailto:info@jofc-loerrach.com?subject=${encodeURIComponent(
                    t.emailSubject
                  )}&body=${emailBody}`}
                  className="rounded-2xl border border-yellow-400 px-4 py-3 text-center font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                >
                  {t.sendEmail}
                </a>

                <button
                  type="button"
                  onClick={clearForm}
                  className="rounded-2xl border border-white/20 px-4 py-3 font-bold text-white transition hover:border-white/40"
                >
                  {t.clearForm}
                </button>
              </div>
            </form>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-5 text-2xl font-bold text-yellow-400">
                {t.summary}
              </h3>

              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <InfoCard label={t.selectedMatch} value={form.match || "-"} />
                <InfoCard
                  label={t.selectedDate}
                  value={selectedMatch?.date || "-"}
                />
                <InfoCard
                  label={t.selectedStadium}
                  value={selectedMatch?.stadium || "-"}
                />
                <InfoCard label={t.selectedSector} value={form.sector || "-"} />
                <InfoCard
                  label={t.selectedQuantity}
                  value={form.quantity || "-"}
                />
                <InfoCard label={t.totalPrice} value={`€${totalPrice}`} />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-5 text-2xl font-bold text-yellow-400">
                {t.requestListTitle}
              </h3>

              {requests.length === 0 ? (
                <p className="text-white/60">{t.noRequests}</p>
              ) : (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div
                      key={request.id}
                      className="rounded-2xl border border-white/10 bg-black/50 p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-lg font-bold text-white">
                            {request.fullName}
                          </p>
                          <p className="text-sm text-white/70">
                            {request.match}
                          </p>
                          <p className="text-sm text-white/60">
                            {request.sector} • {request.quantity} • €
                            {request.totalPrice}
                          </p>
                          <p className="mt-1 text-xs text-white/40">
                            {request.createdAt}
                          </p>
                        </div>

                        <button
                          onClick={() => handleDelete(request.id)}
                          className="rounded-xl border border-red-500/40 px-3 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
                        >
                          {t.delete}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <footer className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          {t.footer}
        </footer>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/50 p-4">
      <p className="text-xs uppercase tracking-widest text-white/45">{label}</p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
    </div>
  );
}
