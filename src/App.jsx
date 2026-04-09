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
const response = await fetch("/api/juventus-data");
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
return new Date(dateString).toLocaleString(
language === "it" ? "it-IT" : "de-DE",
{
day: "2-digit",
month: "2-digit",
year: "numeric",
hour: "2-digit",
minute: "2-digit",
}
);
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
"Richieste biglietti, partite della Juventus, trasferte, vantaggi soci e informazioni utili in un sito
elegante, veloce e bilingue.",
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
"Ticketanfragen, Juventus Spiele, Reisen, Mitgliedervorteile und nützliche Informationen auf
einer eleganten, schnellen und zweisprachigen Website.",
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
<div className="h-16 w-16 overflow-hidden rounded-[1.25rem] border border-white/10 bg-
white shadow-2xl">
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
<div className="absolute inset-0 bg-[radial-
gradient(circle_at_top,rgba(255,255,255,0.12),transparent_30%)]" />
<header className="sticky top-0 z-30 border-b border-white/10 bg-black/70 backdrop-blur-
xl">
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
className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-
20"
>
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="space-y-6"
>
<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-
white/5 px-4 py-2 text-xs text-zinc-300 backdrop-blur">
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
<span className="inline-flex items-center gap-2 rounded-full border border-white/10
bg-white/5 px-4 py-2 backdrop-blur">
<Ticket className="h-4 w-4" /> Ticket request
</span>
<span className="inline-flex items-center gap-2 rounded-full border border-white/10
bg-white/5 px-4 py-2 backdrop-blur">
<Bus className="h-4 w-4" /> Trasferte / Reisen
</span>
<span className="inline-flex items-center gap-2 rounded-full border border-white/10
bg-white/5 px-4 py-2 backdrop-blur">
<Crown className="h-4 w-4" /> Soci & Priorità
</span>
</div>
</div>
<div className="flex flex-wrap gap-3">
<a
href="#tickets"
className="rounded-2xl bg-white px-5 py-3 font-semibold text-black shadow-lg
transition hover:scale-[1.02]"
>
