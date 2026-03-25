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

import emailjs from "@emailjs/browser"; // ✅ AGGIUNTO

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

  // ✅ FUNZIONE EMAILJS (AGGIUNTA)
  const sendEmail = (e) => {
    e.preventDefault();
    console.log("sendEmail partito");
    emailjs
      .send(
        "service_fb1gqc1",   // <-- sostituisci
        "template_73zulhg",  // <-- sostituisci
        formData,
        "2RslMdWoD6NI3cTiS"    // <-- sostituisci
      )
      .then(() => {
        .catch((error) => {
        console.error("Errore EmailJS:", error);
        alert("Errore durante l'invio della richiesta.");

        setFormData({
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
      })
      .catch((error) => {
        console.error("Errore EmailJS:", error);
        alert("Errore durante l'invio della richiesta.");
      });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Richiesta biglietti</h1>

      {/* FORM */}
      <form onSubmit={sendEmail} className="space-y-4">

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Nome"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="p-3 rounded bg-gray-800"
          />

          <input
            placeholder="Cognome"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="p-3 rounded bg-gray-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="p-3 rounded bg-gray-800"
          />

          <input
            placeholder="Telefono"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="p-3 rounded bg-gray-800"
          />
        </div>

        <input
          placeholder="Partita"
          value={formData.match}
          onChange={(e) =>
            setFormData({ ...formData, match: e.target.value })
          }
          className="p-3 rounded bg-gray-800 w-full"
        />

        <input
          placeholder="Quantità"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
          className="p-3 rounded bg-gray-800 w-full"
        />

        <input
          placeholder="Tipo (Socio / Non socio)"
          value={formData.membership}
          onChange={(e) =>
            setFormData({ ...formData, membership: e.target.value })
          }
          className="p-3 rounded bg-gray-800 w-full"
        />

        <input
          placeholder="Settore"
          value={formData.sector}
          onChange={(e) =>
            setFormData({ ...formData, sector: e.target.value })
          }
          className="p-3 rounded bg-gray-800 w-full"
        />

        <input
          placeholder="Extra (Bus, VIP...)"
          value={formData.extras}
          onChange={(e) =>
            setFormData({ ...formData, extras: e.target.value })
          }
          className="p-3 rounded bg-gray-800 w-full"
        />

        <textarea
          placeholder="Note"
          value={formData.notes}
          onChange={(e) =>
            setFormData({ ...formData, notes: e.target.value })
          }
          className="p-3 rounded bg-gray-800 w-full"
        />

        <button
          type="submit"
          className="w-full bg-white text-black py-3 rounded font-bold"
        >
          Invia richiesta
        </button>
      </form>
    </div>
  );
}
