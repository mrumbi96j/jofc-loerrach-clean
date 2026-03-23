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
} from "lucide-react";

export default function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    match: "",
    quantity: "",
    membership: "",
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
      `Nome: ${formData.firstName}\nCognome: ${formData.lastName}\nE-mail: ${formData.email}\nTelefono: ${formData.phone}\nPartita: ${formData.match}\nNumero biglietti: ${formData.quantity}\nCategoria: ${formData.membership}\nOpzione: ${formData.extras}\nNote: ${formData.notes}`
    );
    window.location.href = `mailto:jcdgagnelli@gmx.de?subject=${subject}&body=${body}`;
  };

  const content = {
    it: {
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
        "Richieste biglietti, partite della Juventus, trasferte, vantaggi soci e informazioni utili in un sito elegante, veloce e bilingue. Pensato per i tifosi, costruito per il club.",
      heroPrimary: "Richiedi biglietti",
      heroSecondary: "Guarda le partite",
      heroCardTitle: "Prossime partite",
      heroCardBadge: "Modalità IT / DE",
      ticketTitle: "Richiesta biglietti",
      ticketText:
        "Compila il modulo per inviare una richiesta al club. In questa versione il modulo apre direttamente una e-mail pronta da inviare al club.",
      ticketsCta: "Invia richiesta",
      quickContact: "Contatto rapido",
      whatsappGermany: "WhatsApp Germania",
      whatsappSwitzerland: "WhatsApp Svizzera",
      emailDirect: "Scrivi una e-mail",
      memberAreaTitle: "Per soci e tifosi",
      memberAreaText:
        "Richieste biglietti, informazioni trasferte, priorità soci e contatto diretto con il club in un'unica piattaforma.",
      sectionMatches: "Partite della Juventus",
      sectionMatchesText:
        "Le partite qui sotto sono dimostrative. Nella versione finale possono essere collegate automaticamente a una fonte dati esterna con data, orario e stato disponibilità.",
      trophiesTitle: "Il palmarès della Juventus",
      trophiesText:
        "Una sezione storica dedicata ai successi del club, ideale per dare prestigio al sito del fan club e rafforzare l'identità bianconera.",
      contactTitle: "Contatta il club",
      contactText:
        "Possiamo aggiungere e-mail diretta, WhatsApp, modulo contatti, area soci e persino una lista d'attesa per le partite più richieste.",
      labels: {
        firstName: "Nome",
        lastName: "Cognome",
        email: "E-mail",
        phone: "Telefono",
        match: "Partita",
        quantity: "Numero biglietti",
        membership: "Categoria",
        extras: "Opzione",
        notes: "Note / richieste speciali",
        member: "Socio",
        nonMember: "Non socio",
        onlyTicket: "Solo biglietto",
        ticketBus: "Biglietto + bus",
        vip: "VIP / Hospitality",
      },
      cards: [
        {
          icon: Users,
          title: "Area soci",
          text: "Sezione dedicata ai soci con vantaggi, modulistica e priorità per i biglietti.",
        },
        {
          icon: Bus,
          title: "Trasferte",
          text: "Bus, viaggi e organizzazione per seguire la Juventus in casa e in trasferta.",
        },
        {
          icon: ShieldCheck,
          title: "Richieste ordinate",
          text: "Modulo strutturato per raccogliere dati completi e gestire meglio le prenotazioni.",
        },
      ],
      packages: [
        {
          title: "Soci",
          price: "Priorità club",
          items: ["Richiesta prioritaria", "Comunicazioni dedicate", "Supporto diretto del club"],
        },
        {
          title: "Non soci",
          price: "Su disponibilità",
          items: ["Richiesta standard", "Assegnazione in ordine", "Possibile lista d'attesa"],
        },
        {
          title: "Bus & VIP",
          price: "Su richiesta",
          items: ["Pacchetti personalizzati", "Bus organizzato", "Esperienze speciali"],
        },
      ],
      matches: [
        {
          competition: "Serie A",
          home: "Juventus",
          away: "Inter",
          date: "05 Apr 2026",
          time: "20:45",
          status: "Richiesta aperta",
        },
        {
          competition: "Coppa Italia",
          home: "Milan",
          away: "Juventus",
          date: "09 Apr 2026",
          time: "21:00",
          status: "Lista d'attesa",
        },
        {
          competition: "Serie A",
          home: "Juventus",
          away: "Roma",
          date: "13 Apr 2026",
          time: "18:00",
          status: "Richiesta aperta",
        },
      ],
      trophies: [
        { label: "Scudetti", value: "38" },
        { label: "Coppe Italia", value: "15" },
        { label: "Supercoppe Italiane", value: "9" },
        { label: "Champions League / Coppa dei Campioni", value: "2" },
        { label: "Coppe UEFA", value: "3" },
        { label: "Supercoppe UEFA", value: "2" },
        { label: "Coppa delle Coppe", value: "1" },
        { label: "Coppa Intercontinentale", value: "2" },
      ],
      travelTitle: "Trasferte del club",
      travelText:
        "Organizziamo viaggi, bus e supporto per vivere la Juventus insieme. Una sezione perfetta per pubblicare date, punti di ritrovo e informazioni utili per i tifosi.",
      membersTitle: "Area soci",
      membersText:
        "Qui si possono aggiungere iscrizioni, vantaggi membri, regolamento del club e priorità per i biglietti.",
      contactBoxTitle: "Informazioni ufficiali",
      footer:
        "Juventus Official Fan Club Lörrach G. Agnelli • Sito demo professionale del fan club",
    },
    de: {
      nav: {
        home: "Home",
        matches: "Spiele",
        tickets: "Tickets",
        trophies: "Trophäen",
        contact: "Kontakt",
      },
      heroBadge: "Juventus Official Fan Club Lörrach G. Agnelli • Fino alla fine",
      heroTitle: "Der zentrale Treffpunkt unseres Juventus Fanclubs.",
      heroText:
        "Ticketanfragen, Juventus-Spiele, Auswärtsfahrten, Mitgliedervorteile und wichtige Infos in einer eleganten, schnellen und zweisprachigen Website. Für Fans gedacht, für den Club gebaut.",
      heroPrimary: "Tickets anfragen",
      heroSecondary: "Spiele ansehen",
      heroCardTitle: "Nächste Spiele",
      heroCardBadge: "IT / DE Modus",
      ticketTitle: "Ticketanfrage",
      ticketText:
        "Fülle das Formular aus, um eine Anfrage an den Club zu senden. In dieser Version öffnet das Formular direkt eine vorbereitete E-Mail an den Club.",
      ticketsCta: "Anfrage senden",
      quickContact: "Schnellkontakt",
      whatsappGermany: "WhatsApp Deutschland",
      whatsappSwitzerland: "WhatsApp Schweiz",
      emailDirect: "E-Mail schreiben",
      memberAreaTitle: "Für Mitglieder und Fans",
      memberAreaText:
        "Ticketanfragen, Auswärtsinfos, Mitgliederpriorität und direkter Kontakt mit dem Club auf einer einzigen Plattform.",
      sectionMatches: "Juventus-Spiele",
      sectionMatchesText:
        "Die untenstehenden Spiele sind Demo-Daten. In der finalen Version können sie automatisch mit externer Datenquelle, Datum, Uhrzeit und Verfügbarkeitsstatus verbunden werden.",
      trophiesTitle: "Die Trophäen der Juventus",
      trophiesText:
        "Ein historischer Bereich für die Erfolge des Clubs – ideal, um der Fanclub-Website Prestige zu geben und die bianconere Identität zu stärken.",
      contactTitle: "Club kontaktieren",
      contactText:
        "Wir können direkte E-Mail, WhatsApp, Kontaktformular, Mitgliederbereich und sogar eine Warteliste für besonders gefragte Spiele ergänzen.",
      labels: {
        firstName: "Vorname",
        lastName: "Nachname",
        email: "E-Mail",
        phone: "Telefon",
        match: "Spiel",
        quantity: "Anzahl Tickets",
        membership: "Kategorie",
        extras: "Option",
        notes: "Bemerkungen / spezielle Wünsche",
        member: "Mitglied",
        nonMember: "Nicht-Mitglied",
        onlyTicket: "Nur Ticket",
        ticketBus: "Ticket + Bus",
        vip: "VIP / Hospitality",
      },
      cards: [
        {
          icon: Users,
          title: "Mitgliederbereich",
          text: "Eigener Bereich für Mitglieder mit Vorteilen, Formularen und Ticket-Priorität.",
        },
        {
          icon: Bus,
          title: "Auswärtsfahrten",
          text: "Bus, Reisen und Organisation, um Juventus zuhause und auswärts zu unterstützen.",
        },
        {
          icon: ShieldCheck,
          title: "Saubere Anfragen",
          text: "Strukturiertes Formular, um vollständige Daten zu sammeln und Bestellungen besser zu verwalten.",
        },
      ],
      packages: [
        {
          title: "Mitglieder",
          price: "Club-Priorität",
          items: ["Priorisierte Anfrage", "Direkte Informationen", "Unterstützung durch den Club"],
        },
        {
          title: "Nicht-Mitglieder",
          price: "Nach Verfügbarkeit",
          items: ["Standardanfrage", "Vergabe nach Reihenfolge", "Mögliche Warteliste"],
        },
        {
          title: "Bus & VIP",
          price: "Auf Anfrage",
          items: ["Individuelle Pakete", "Organisierte Busfahrt", "Besondere Erlebnisse"],
        },
      ],
      matches: [
        {
          competition: "Serie A",
          home: "Juventus",
          away: "Inter",
          date: "05 Apr 2026",
          time: "20:45",
          status: "Anfrage offen",
        },
        {
          competition: "Coppa Italia",
          home: "Milan",
          away: "Juventus",
          date: "09 Apr 2026",
          time: "21:00",
          status: "Warteliste",
        },
        {
          competition: "Serie A",
          home: "Juventus",
          away: "Roma",
          date: "13 Apr 2026",
          time: "18:00",
          status: "Anfrage offen",
        },
      ],
      trophies: [
        { label: "Meistertitel", value: "38" },
        { label: "Coppa Italia", value: "15" },
        { label: "Italienische Supercups", value: "9" },
        { label: "Champions League / Landesmeisterpokal", value: "2" },
        { label: "UEFA Cups", value: "3" },
        { label: "UEFA Super Cups", value: "2" },
        { label: "Europapokal der Pokalsieger", value: "1" },
        { label: "Weltpokal", value: "2" },
      ],
      travelTitle: "Club-Reisen",
      travelText:
        "Wir organisieren Fahrten, Busse und Unterstützung, um Juventus gemeinsam zu erleben. Ein perfekter Bereich für Termine, Treffpunkte und wichtige Infos für Fans.",
      membersTitle: "Mitgliederbereich",
      membersText:
        "Hier können Mitgliedschaften, Vorteile, Club-Reglement und Ticket-Prioritäten ergänzt werden.",
      contactBoxTitle: "Offizielle Informationen",
      footer:
        "Juventus Official Fan Club Lörrach G. Agnelli • Professionelle Demo-Website des Fanclubs",
    },
  };

  const t = content[language];
  const officialEmail = "jcdgagnelli@gmx.de";
  const whatsappDe = "https://wa.me/491724385672";
  const whatsappCh = "https://wa.me/41782483401";
  const emailSubject = encodeURIComponent(
    "Juventus Official Fan Club Lörrach G. Agnelli"
  );

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
              <h1 className="text-2xl font-black tracking-tight">Lörrach G. Agnelli</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
              <a href="#home" className="hover:text-white">{t.nav.home}</a>
              <a href="#matches" className="hover:text-white">{t.nav.matches}</a>
              <a href="#tickets" className="hover:text-white">{t.nav.tickets}</a>
              <a href="#trophies" className="hover:text-white">{t.nav.trophies}</a>
              <a href="#contact" className="hover:text-white">{t.nav.contact}</a>
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
        <section id="home" className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300">
              <Star className="h-3.5 w-3.5" />
              {t.heroBadge}
            </div>

            <div className="space-y-4">
              <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">{t.heroTitle}</h2>
              <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">{t.heroText}</p>
              <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"><Ticket className="h-4 w-4" /> Ticket request</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"><Bus className="h-4 w-4" /> Trasferte / Reisen</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"><Crown className="h-4 w-4" /> Soci & Priorità</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#tickets" className="rounded-2xl bg-white px-5 py-3 font-semibold text-black shadow-lg transition hover:scale-[1.02]">
                {t.heroPrimary}
              </a>
              <a href="#matches" className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
                {t.heroSecondary}
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-xl">
              <p className="text-sm font-semibold">{t.memberAreaTitle}</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">{t.memberAreaText}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`mailto:${officialEmail}?subject=${emailSubject}`}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/60"
                >
                  <Mail className="h-4 w-4" />
                  {t.emailDirect}
                </a>
                <a
                  href={whatsappDe}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/60"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.whatsappGermany}
                </a>
                <a
                  href={whatsappCh}
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
                  <div key={index} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 shadow-xl">
                    <Icon className="mb-3 h-5 w-5 text-white" />
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">Black & White</p>
                <h3 className="text-xl font-bold">{t.heroCardTitle}</h3>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-zinc-200">
                <Globe className="h-3.5 w-3.5" />
                {t.heroCardBadge}
              </span>
            </div>

            <div className="space-y-3">
              {t.matches.map((match, index) => (
                <div key={index} className="rounded-[1.5rem] border border-white/10 bg-black/40 p-4 transition hover:bg-black/60">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-wide text-zinc-400">{match.competition}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">{match.status}</span>
                  </div>
                  <p className="text-lg font-bold">{match.home} vs {match.away}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
                    <CalendarDays className="h-4 w-4" /> {match.date} • {match.time}
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

              <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
                <input value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500" placeholder={t.labels.firstName} />
                <input value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500" placeholder={t.labels.lastName} />
                <input value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500" placeholder={t.labels.email} />
                <input value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500" placeholder={t.labels.phone} />
                <select value={formData.match} onChange={(e) => handleChange("match", e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-zinc-300 outline-none">
                  <option value="">{t.labels.match}</option>
                  <option>Juventus vs Inter</option>
                  <option>Milan vs Juventus</option>
                  <option>Juventus vs Roma</option>
                </select>
                <select value={formData.quantity} onChange={(e) => handleChange("quantity", e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-zinc-300 outline-none">
                  <option value="">{t.labels.quantity}</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
                <select value={formData.membership} onChange={(e) => handleChange("membership", e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-zinc-300 outline-none">
                  <option value="">{t.labels.membership}</option>
                  <option>{t.labels.member}</option>
                  <option>{t.labels.nonMember}</option>
                </select>
                <select value={formData.extras} onChange={(e) => handleChange("extras", e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-zinc-300 outline-none">
                  <option value="">{t.labels.extras}</option>
                  <option>{t.labels.onlyTicket}</option>
                  <option>{t.labels.ticketBus}</option>
                  <option>{t.labels.vip}</option>
                </select>
                <textarea value={formData.notes} onChange={(e) => handleChange("notes", e.target.value)} className="min-h-[130px] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-zinc-500 md:col-span-2" placeholder={t.labels.notes} />
                <button type="button" onClick={handleSubmit} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-black md:col-span-2 shadow-lg transition hover:scale-[1.01]">
                  {t.ticketsCta}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            <div className="space-y-4">
              {t.packages.map((item, index) => (
                <div key={index} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <p className="mt-1 text-sm text-zinc-400">Juventus Official Fan Club Lörrach G. Agnelli</p>
                    </div>
                    <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">{item.price}</span>
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
              <div className="mt-5 space-y-3 text-sm text-zinc-300">
                <p className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Lörrach / Germania / Svizzera</p>
                <p className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp DE: +49 172 438 5672</p>
                <p className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp CH: +41 78 248 3401</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl">
              <div className="mb-4 inline-flex rounded-2xl bg-white p-3 text-black">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-black">{t.membersTitle}</h3>
              <p className="mt-3 text-zinc-300">{t.membersText}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-zinc-300">Priorità richieste biglietti / Ticket-Priorität</div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-zinc-300">Comunicazioni dedicate / Direkte Infos</div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-zinc-300">Supporto trasferte / Reise-Support</div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-zinc-300">Contatto diretto col club / Direkter Kontakt</div>
              </div>
            </div>
          </div>
        </section>

        <section id="matches" className="mx-auto max-w-7xl px-6 py-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl">
            <h3 className="text-3xl font-black">{t.sectionMatches}</h3>
            <p className="mt-3 max-w-3xl text-zinc-300">{t.sectionMatchesText}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {t.matches.map((match, index) => (
                <div key={index} className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">{match.competition}</p>
                  <p className="mt-3 text-xl font-bold leading-tight">{match.home}</p>
                  <p className="text-sm text-zinc-500">vs</p>
                  <p className="text-xl font-bold leading-tight">{match.away}</p>
                  <p className="mt-4 text-sm text-zinc-400">{match.date} • {match.time}</p>
                  <p className="mt-2 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">{match.status}</p>
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
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Juventus</p>
                  <h3 className="text-3xl font-black">{t.trophiesTitle}</h3>
                </div>
              </div>
              <p className="max-w-xl text-zinc-300">{t.trophiesText}</p>

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">1897</p>
                <p className="mt-3 text-2xl font-black">Juventus • Black & White Legacy</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Sezione pensata per valorizzare la storia del club con un look moderno ispirato ai colori bianconeri e a un monogramma a forma di J nello stile Juventus.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.trophies.map((item, index) => (
                <div key={index} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-xl">
                  <p className="text-4xl font-black">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{item.label}</p>
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
                <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">{t.contactBoxTitle}</p>
                <div className="space-y-3 text-sm text-zinc-300">
                  <a href={`mailto:${officialEmail}?subject=${emailSubject}`} className="inline-flex items-center gap-2 transition hover:text-white">
                    <Mail className="h-4 w-4" /> {officialEmail}
                  </a>
                  <a href={whatsappDe} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
                    <MessageCircle className="h-4 w-4" /> {t.whatsappGermany}
                  </a>
                  <a href={whatsappCh} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
                    <MessageCircle className="h-4 w-4" /> {t.whatsappSwitzerland}
                  </a>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={`mailto:${officialEmail}?subject=${emailSubject}`} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02]">
                    {t.emailDirect}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a href={whatsappDe} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                    {t.whatsappGermany}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-4 text-sm text-zinc-500">
                  Modulo contatti, WhatsApp diretto, area soci e workflow biglietti possono essere collegati nella versione finale pubblicata.
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
