import { useMemo, useState } from "react";
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

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const subject = encodeURIComponent(
      "Richiesta biglietti - Juventus Official Fan Club Lörrach G. Agnelli"
    );
    const body = encodeURIComponent(
      `Nome: ${formData.firstName}
Cognome: ${formData.lastName}
E-mail: ${formData.email}
Telefono: ${formData.phone}
Partita: ${formData.match}
Numero biglietti: ${formData.quantity}
Categoria: ${formData.membership}
Settore Allianz Stadium: ${formData.sector}
Opzione: ${formData.extras}
Note: ${formData.notes}`
    );

    window.location.href = `mailto:jcdgagnelli@gmx.de?subject=${subject}&body=${body}`;
  };

  const content_it = {
    nav: {
      home: "Home",
      matches: "Partite",
      tickets: "Biglietti",
      trophies: "Trofei",
      contact: "Contatti",
    },
    heroBadge: "Juventus Official Fan Club Lörrach G. Agnelli • Fino alla fine",
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
    sectionMatchesText: "Partite demo.",
    trophiesTitle: "Trofei Juventus",
    trophiesText: "Storia del club.",
    contactTitle: "Contatta il club",
    contactText: "Contattaci.",
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
      { icon: Bus, title: "Trasferte", text: "Viaggi." },
      { icon: ShieldCheck, title: "Richieste", text: "Gestione richieste." },
    ],
    packages: [
      {
        title: "Soci",
        price: "Priorità",
        items: ["Priorità", "Info", "Supporto"],
      },
      {
        title: "Non soci",
        price: "Disponibilità",
        items: ["Standard", "Ordine", "Attesa"],
      },
      {
        title: "Bus & VIP",
        price: "Su richiesta",
        items: ["Pacchetti", "Bus", "VIP"],
      },
    ],
    matches: [
      {
        competition: "Serie A",
        home: "Juventus",
        away: "Inter",
        date: "05 Apr",
        time: "20:45",
        status: "Richiesta aperta",
      },
    ],
    trophies: [{ label: "Scudetti", value: "38" }],
    travelTitle: "Trasferte",
    travelText: "Viaggi organizzati.",
    membersTitle: "Area soci",
    membersText: "Vantaggi.",
    contactBoxTitle: "Info",
    footer: "JOFC Lörrach",
  };

  const content_de = {
    nav: {
      home: "Start",
      matches: "Spiele",
      tickets: "Tickets",
      trophies: "Trophäen",
      contact: "Kontakt",
    },
    heroBadge: "Juventus Official Fan Club Lörrach G. Agnelli",
    heroTitle: "Der Treffpunkt unseres Juventus Fanclubs.",
    heroText: "Ticketanfragen, Spiele und Reisen.",
    heroPrimary: "Tickets anfragen",
    heroSecondary: "Spiele sehen",
    heroCardTitle: "Nächste Spiele",
    heroCardBadge: "IT / DE",
    ticketTitle: "Ticketanfrage",
    ticketText: "Formular ausfüllen.",
    ticketsCta: "Anfrage senden",
    quickContact: "Kontakt",
    whatsappGermany: "WhatsApp Deutschland",
    whatsappSwitzerland: "WhatsApp Schweiz",
    emailDirect: "E-Mail schreiben",
    memberAreaTitle: "Mitglieder",
    memberAreaText: "Infos.",
    sectionMatches: "Spiele",
    sectionMatchesText: "Demo Spiele.",
    trophiesTitle: "Trophäen",
    trophiesText: "Erfolge.",
    contactTitle: "Kontakt",
    contactText: "Kontaktiere uns.",
    labels: {
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      phone: "Telefon",
      match: "Spiel",
      quantity: "Tickets",
      membership: "Kategorie",
      sector: "Bereich",
      extras: "Option",
      notes: "Notizen",
      member: "Mitglied",
      nonMember: "Nicht-Mitglied",
      onlyTicket: "Nur Ticket",
      ticketBus: "Ticket + Bus",
      vip: "VIP",
    },
    cards: [
      { icon: Users, title: "Mitglieder", text: "Vorteile." },
      { icon: Bus, title: "Reisen", text: "Bus." },
      { icon: ShieldCheck, title: "Anfragen", text: "Verwaltung." },
    ],
    packages: [
      { title: "Mitglieder", price: "Priorität", items: ["Priorität"] },
      {
        title: "Nicht-Mitglieder",
        price: "Verfügbarkeit",
        items: ["Standard"],
      },
    ],
    matches: [
      {
        competition: "Serie A",
        home: "Juventus",
        away: "Inter",
        date: "05 Apr",
        time: "20:45",
        status: "Offen",
      },
    ],
    trophies: [{ label: "Titel", value: "38" }],
    travelTitle: "Reisen",
    travelText: "Organisiert.",
    membersTitle: "Mitgliederbereich",
    membersText: "Infos.",
    contactBoxTitle: "Info",
    footer: "JOFC Lörrach",
  };

  const content = {
    it: content_it,
    de: content_de,
  };

  const t = content[language] || content.it;

  const features = useMemo(() => t.cards, [t]);

  const JuveMark = () => (
    <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.75rem] border border-white/10 bg-white text-black shadow-2xl">
      <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-b from-white to-zinc-200" />
      <div className="relative flex items-center justify-center">
        <span className="text-4xl font-black tracking-tight">J</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_30%)]" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <JuveMark />
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-400">
                Juventus Official Fan Club
              </p>
              <h1 className="text-2xl font-black tracking-tight">
                Lörrach G. Agnelli
              </h1>
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
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300">
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
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <Ticket className="h-4 w-4" /> Ticket request
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <Bus className="h-4 w-4" /> Trasferte / Reisen
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
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

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-xl">
              <p className="text-sm font-semibold">{t.memberAreaTitle}</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                {t.memberAreaText}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="mailto:jcdgagnelli@gmx.de?subject=Richiesta%20informazioni%20Juventus%20Official%20Fan%20Club%20L%C3%B6rrach%20G.%20Agnelli"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/60"
                >
                  <Mail className="h-4 w-4" />
                  {t.emailDirect}
                </a>

                <a
                  href="https://wa.me/491724385672"
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
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 shadow-xl"
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
            className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl"
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

            <div className="space-y-3">
              {t.matches.map((match, index) => (
                <div
                  key={index}
                  className="rounded-[1.5rem] border border-white/10 bg-black/40 p-4 transition hover:bg-black/60"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-wide text-zinc-400">
                      {match.competition}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">
                      {match.status}
                    </span>
                  </div>

                  <p className="text-lg font-bold">
                    {match.home} vs {match.away}
                  </p>

                  <p className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
                    <CalendarDays className="h-4 w-4" /> {match.date} •{" "}
                    {match.time}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="tickets" className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl">
              <h3 className="text-3xl font-black">{t.ticketTitle}</h3>
              <p className="mt-3 max-w-2xl text-zinc-300">{t.ticketText}</p>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
                <p className="font-semibold">Allianz Stadium</p>
                <p className="mt-2 text-zinc-400">
                  I soci possono indicare il settore desiderato, incluse curve e
                  tribune con 1° e 2° anello, così il club può gestire le
                  richieste in modo più preciso.
                </p>
              </div>

              <form
                className="mt-6 grid gap-4 md:grid-cols-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500"
                  placeholder={t.labels.firstName}
                />
                <input
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500"
                  placeholder={t.labels.lastName}
                />
                <input
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500"
                  placeholder={t.labels.email}
                />
                <input
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500"
                  placeholder={t.labels.phone}
                />
                <select
                  value={formData.match}
                  onChange={(e) => handleChange("match", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-zinc-300 outline-none"
                >
                  <option value="">{t.labels.match}</option>
                  <option>Juventus vs Inter</option>
                  <option>Milan vs Juventus</option>
                  <option>Juventus vs Roma</option>
                </select>
                <select
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
                  value={formData.membership}
                  onChange={(e) => handleChange("membership", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-zinc-300 outline-none"
                >
                  <option value="">{t.labels.membership}</option>
                  <option>{t.labels.member}</option>
                  <option>{t.labels.nonMember}</option>
                </select>
                <select
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
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  className="min-h-[130px] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500 md:col-span-2"
                  placeholder={t.labels.notes}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
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
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <p className="mt-1 text-sm text-zinc-400">
                        Juventus Official Fan Club Lörrach G. Agnelli
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
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl">
              <div className="mb-4 inline-flex rounded-2xl bg-white p-3 text-black">
                <Bus className="h-6 w-6" />
              </div>

              <h3 className="text-3xl font-black">{t.travelTitle}</h3>
              <p className="mt-3 text-zinc-300">{t.travelText}</p>

              <div className="mt-5 flex flex-col gap-3 text-sm text-zinc-300">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>Lörrach / Germania / Svizzera</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>WhatsApp DE: +49 172 438 5672</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>WhatsApp CH: +41 78 248 3401</span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl">
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
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl">
            <h3 className="text-3xl font-black">{t.sectionMatches}</h3>
            <p className="mt-3 max-w-3xl text-zinc-300">
              {t.sectionMatchesText}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {t.matches.map((match, index) => (
                <div
                  key={index}
                  className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    {match.competition}
                  </p>
                  <p className="mt-3 text-xl font-bold leading-tight">
                    {match.home}
                  </p>
                  <p className="text-sm text-zinc-500">vs</p>
                  <p className="text-xl font-bold leading-tight">
                    {match.away}
                  </p>
                  <p className="mt-4 text-sm text-zinc-400">
                    {match.date} • {match.time}
                  </p>
                  <p className="mt-2 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">
                    {match.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="trophies" className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl">
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
                  Sezione pensata per valorizzare la storia del club con un look
                  moderno ispirato ai colori bianconeri e a un monogramma a
                  forma di J nello stile Juventus.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.trophies.map((item, index) => (
                <div
                  key={index}
                  className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-xl"
                >
                  <p className="text-4xl font-black">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl md:p-8">
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

                <div className="space-y-3 text-sm text-zinc-300">
                  <a
                    href="mailto:jcdgagnelli@gmx.de?subject=Juventus%20Official%20Fan%20Club%20L%C3%B6rrach%20G.%20Agnelli"
                    className="inline-flex items-center gap-2 transition hover:text-white"
                  >
                    <Mail className="h-4 w-4" /> jcdgagnelli@gmx.de
                  </a>

                  <a
                    href="https://wa.me/491724385672"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 transition hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4" />{" "}
                    {t.whatsappGermany}
                  </a>

                  <a
                    href="https://wa.me/41782483401"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 transition hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4" />{" "}
                    {t.whatsappSwitzerland}
                  </a>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="mailto:jcdgagnelli@gmx.de?subject=Juventus%20Official%20Fan%20Club%20L%C3%B6rrach%20G.%20Agnelli"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02]"
                  >
                    {t.emailDirect}
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  <a
                    href="https://wa.me/491724385672"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {t.whatsappGermany}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <p className="mt-4 text-sm text-zinc-500">
                  Modulo contatti, WhatsApp diretto, area soci e workflow
                  biglietti possono essere collegati nella versione finale
                  pubblicata.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-6 text-center text-sm text-zinc-500">
        {t.footer}
      </footer>
    </div>
  );
}
