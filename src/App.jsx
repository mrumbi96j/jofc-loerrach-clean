import React, { useMemo, useState } from "react";

export default function App() {
  const [lang, setLang] = useState("it");

  const content = useMemo(
    () => ({
      it: {
        navHome: "Home",
        navAbout: "Chi siamo",
        navMembership: "Tesseramento",
        navTrips: "Trasferte",
        navContact: "Contatti",

        heroBadge: "Juventus Official Fan Club Lörrach",
        heroTitle: "Passione bianconera, fratellanza senza confini",
        heroText:
          "Benvenuti nel sito ufficiale del nostro Club. Un punto di incontro per tutti i tifosi juventini che vogliono vivere la Juventus insieme, tra emozioni, trasferte e amicizia.",
        heroBtn1: "Diventa socio",
        heroBtn2: "Scopri le trasferte",

        aboutTitle: "Chi siamo",
        aboutText:
          "Il Juventus Official Fan Club Lörrach nasce per riunire i tifosi juventini e vivere insieme ogni partita con passione, rispetto e spirito di famiglia. Organizziamo trasferte, momenti di incontro e supportiamo i soci nella richiesta di biglietti e Juventus Card.",

        stats1: "Passione",
        stats1Text: "Per la Juventus, sempre",
        stats2: "Famiglia",
        stats2Text: "Uniti oltre i confini",
        stats3: "Esperienze",
        stats3Text: "Partite, eventi e trasferte",

        membershipTitle: "Tesseramento soci",
        membershipText:
          "Entra a far parte del nostro Club e vivi la Juventus più da vicino. I soci hanno priorità su comunicazioni, eventi e richieste relative al Club.",
        adult: "Adulto",
        u14: "Under 14",
        u6: "Under 6",
        juveCard: "Juventus Card",
        membershipNote:
          "Per informazioni su iscrizione, rinnovo e Juventus Card contattaci direttamente.",

        tripsTitle: "Trasferte e partite",
        tripsText:
          "Organizziamo trasferte per vivere insieme l'emozione dello Stadium e di altri eventi. Qui puoi pubblicare partite, disponibilità e informazioni utili per i soci.",
        tripCard1Title: "Biglietti + Viaggio",
        tripCard1Text:
          "Pacchetti con trasporto organizzato e supporto informativo per i partecipanti.",
        tripCard2Title: "Posti limitati",
        tripCard2Text:
          "Le disponibilità possono terminare rapidamente. Consigliamo prenotazione anticipata.",
        tripCard3Title: "Info per i soci",
        tripCard3Text:
          "Comunicazioni dedicate, dettagli organizzativi e aggiornamenti sugli eventi.",

        ctaTitle: "Vuoi vivere la Juventus con noi?",
        ctaText:
          "Scrivici per informazioni su iscrizioni, eventi, partite e trasferte.",
        ctaButton: "Contattaci ora",

        contactTitle: "Contatti",
        contactText:
          "Per informazioni puoi scriverci tramite email o contattarci sui nostri canali ufficiali.",
        contactEmailLabel: "Email",
        contactPhoneLabel: "Telefono",
        contactLocationLabel: "Sede",
        contactLocation: "Lörrach / Area di Basilea",

        footer:
          "© 2026 Juventus Official Fan Club Lörrach - Tutti i diritti riservati",
        langButton: "DE",
      },

      de: {
        navHome: "Start",
        navAbout: "Über uns",
        navMembership: "Mitgliedschaft",
        navTrips: "Auswärtsfahrten",
        navContact: "Kontakt",

        heroBadge: "Juventus Official Fan Club Lörrach",
        heroTitle: "Bianconera-Leidenschaft, Brüderlichkeit ohne Grenzen",
        heroText:
          "Willkommen auf der offiziellen Website unseres Clubs. Ein Treffpunkt für alle Juventus-Fans, die Juventus gemeinsam erleben möchten – mit Emotionen, Auswärtsfahrten und Freundschaft.",
        heroBtn1: "Mitglied werden",
        heroBtn2: "Auswärtsfahrten entdecken",

        aboutTitle: "Über uns",
        aboutText:
          "Der Juventus Official Fan Club Lörrach wurde gegründet, um Juventus-Fans zu vereinen und jedes Spiel gemeinsam mit Leidenschaft, Respekt und familiärem Geist zu erleben. Wir organisieren Auswärtsfahrten, Treffen und unterstützen unsere Mitglieder bei Ticketanfragen und der Juventus Card.",

        stats1: "Leidenschaft",
        stats1Text: "Immer für Juventus",
        stats2: "Familie",
        stats2Text: "Vereint über Grenzen hinweg",
        stats3: "Erlebnisse",
        stats3Text: "Spiele, Events und Fahrten",

        membershipTitle: "Mitgliedschaft",
        membershipText:
          "Werde Teil unseres Clubs und erlebe Juventus noch näher. Mitglieder erhalten Vorrang bei Mitteilungen, Events und clubbezogenen Anfragen.",
        adult: "Erwachsene",
        u14: "Unter 14",
        u6: "Unter 6",
        juveCard: "Juventus Card",
        membershipNote:
          "Für Informationen zu Anmeldung, Verlängerung und Juventus Card kontaktiere uns direkt.",

        tripsTitle: "Auswärtsfahrten und Spiele",
        tripsText:
          "Wir organisieren Fahrten, um gemeinsam die Emotionen im Stadium und bei anderen Events zu erleben. Hier kannst du Spiele, Verfügbarkeiten und wichtige Infos für Mitglieder veröffentlichen.",
        tripCard1Title: "Tickets + Fahrt",
        tripCard1Text:
          "Pakete mit organisiertem Transport und Informationen für die Teilnehmer.",
        tripCard2Title: "Begrenzte Plätze",
        tripCard2Text:
          "Die Verfügbarkeit kann schnell enden. Eine frühe Reservierung wird empfohlen.",
        tripCard3Title: "Infos für Mitglieder",
        tripCard3Text:
          "Spezielle Mitteilungen, organisatorische Details und Updates zu Events.",

        ctaTitle: "Möchtest du Juventus mit uns erleben?",
        ctaText:
          "Schreib uns für Informationen zu Mitgliedschaften, Events, Spielen und Auswärtsfahrten.",
        ctaButton: "Jetzt kontaktieren",

        contactTitle: "Kontakt",
        contactText:
          "Für Informationen kannst du uns per E-Mail schreiben oder über unsere offiziellen Kanäle kontaktieren.",
        contactEmailLabel: "E-Mail",
        contactPhoneLabel: "Telefon",
        contactLocationLabel: "Standort",
        contactLocation: "Lörrach / Raum Basel",

        footer:
          "© 2026 Juventus Official Fan Club Lörrach - Alle Rechte vorbehalten",
        langButton: "IT",
      },
    }),
    []
  );

  const t = content[lang];

  const membershipPrices = [
    { label: t.adult, price: "50€" },
    { label: t.u14, price: "40€" },
    { label: t.u6, price: "10€" },
    { label: t.juveCard, price: "20€" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="JOFC Lörrach Logo"
              className="h-12 w-12 rounded-full border border-white/20 object-cover"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
                JOFC Lörrach
              </p>
              <p className="text-xs text-white/70">
                Juventus Official Fan Club
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm text-white/80 transition hover:text-yellow-400"
            >
              {t.navHome}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm text-white/80 transition hover:text-yellow-400"
            >
              {t.navAbout}
            </button>
            <button
              onClick={() => scrollToSection("membership")}
              className="text-sm text-white/80 transition hover:text-yellow-400"
            >
              {t.navMembership}
            </button>
            <button
              onClick={() => scrollToSection("trips")}
              className="text-sm text-white/80 transition hover:text-yellow-400"
            >
              {t.navTrips}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm text-white/80 transition hover:text-yellow-400"
            >
              {t.navContact}
            </button>
          </nav>

          <button
            onClick={() => setLang(lang === "it" ? "de" : "it")}
            className="rounded-full border border-yellow-400 px-4 py-2 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
          >
            {t.langButton}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative overflow-hidden border-b border-white/10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.14),transparent_40%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <div>
            <span className="inline-block rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-yellow-400">
              {t.heroBadge}
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
              {t.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              {t.heroText}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("membership")}
                className="rounded-2xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:scale-105"
              >
                {t.heroBtn1}
              </button>
              <button
                onClick={() => scrollToSection("trips")}
                className="rounded-2xl border border-white/20 px-6 py-3 font-bold text-white transition hover:border-yellow-400 hover:text-yellow-400"
              >
                {t.heroBtn2}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
              <img
                src="/hero.jpg"
                alt="Juventus Stadium"
                className="h-[420px] w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="flex h-[420px] items-center justify-center bg-gradient-to-br from-neutral-900 to-black px-8 text-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
                    Fino alla fine
                  </p>
                  <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                    Juventus Club Lörrach
                  </h2>
                  <p className="mt-4 text-white/70">
                    Inserisci un&apos;immagine in <strong>public/hero.jpg</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
              JOFC Lörrach
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              {t.aboutTitle}
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/75">
              {t.aboutText}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-bold text-yellow-400">{t.stats1}</h3>
              <p className="mt-2 text-sm text-white/70">{t.stats1Text}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-bold text-yellow-400">{t.stats2}</h3>
              <p className="mt-2 text-sm text-white/70">{t.stats2Text}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-bold text-yellow-400">{t.stats3}</h3>
              <p className="mt-2 text-sm text-white/70">{t.stats3Text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section
        id="membership"
        className="border-y border-white/10 bg-white/[0.03]"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
              Membership
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              {t.membershipTitle}
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/75">
              {t.membershipText}
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {membershipPrices.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-black p-6 shadow-lg"
              >
                <p className="text-sm uppercase tracking-widest text-white/60">
                  {item.label}
                </p>
                <p className="mt-4 text-4xl font-extrabold text-yellow-400">
                  {item.price}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-white/60">{t.membershipNote}</p>
        </div>
      </section>

      {/* TRIPS */}
      <section id="trips" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
            Transferte / Fahrten
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            {t.tripsTitle}
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/75">
            {t.tripsText}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-bold text-yellow-400">
              {t.tripCard1Title}
            </h3>
            <p className="mt-3 leading-7 text-white/75">{t.tripCard1Text}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-bold text-yellow-400">
              {t.tripCard2Title}
            </h3>
            <p className="mt-3 leading-7 text-white/75">{t.tripCard2Text}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-bold text-yellow-400">
              {t.tripCard3Title}
            </h3>
            <p className="mt-3 leading-7 text-white/75">{t.tripCard3Text}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-y border-white/10 bg-yellow-400 text-black">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center md:px-6">
          <h2 className="text-3xl font-extrabold md:text-4xl">{t.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-black/80 md:text-lg">
            {t.ctaText}
          </p>
          <a
            href="mailto:info@jofc-loerrach.com"
            className="mt-8 inline-block rounded-2xl bg-black px-8 py-4 font-bold text-white transition hover:scale-105"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              {t.contactTitle}
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/75">
              {t.contactText}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="space-y-5">
              <div>
                <p className="text-sm uppercase tracking-widest text-white/50">
                  {t.contactEmailLabel}
                </p>
                <p className="mt-1 text-lg font-semibold">
                  info@jofc-loerrach.com
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-white/50">
                  {t.contactPhoneLabel}
                </p>
                <p className="mt-1 text-lg font-semibold">+41 00 000 00 00</p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-white/50">
                  {t.contactLocationLabel}
                </p>
                <p className="mt-1 text-lg font-semibold">
                  {t.contactLocation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black px-4 py-8 text-center text-sm text-white/50 md:px-6">
        {t.footer}
      </footer>
    </div>
  );
}
