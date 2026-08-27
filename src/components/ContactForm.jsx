import { useState } from "react";
import { supabase } from "../lib/supabase";

const initial = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  gdpr: false,
};

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = async (event) => {
  event.preventDefault();
  setStatus("");

  if (
    !form.name.trim() ||
    !form.email.trim() ||
    !form.message.trim() ||
    !form.gdpr
  ) {
    setStatus(
      "Kérlek, töltsd ki a kötelező mezőket, majd fogadd el az Adatkezelési Tájékoztatót.",
    );
    return;
  }
  const validEmail =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

if (!validEmail) {
  setStatus("Kérlek, adj meg egy érvényes e-mail-címet.");
  return;
}

  setIsSubmitting(true);

  try {
    const { data, error } = await supabase.functions.invoke(
  "contact-notification",
  {
    body: {
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      gdpr: form.gdpr,
    },
  },
);

if (error || !data?.success) {
  throw error || new Error("A küldés sikertelen.");
}

    setForm(initial);
    setStatus(
      "Köszönöm az üzeneted! Hamarosan felveszem Veled a kapcsolatot.",
    );
  } catch (error) {
    console.error("Supabase form submission error:", error);
    setStatus(
      "Az üzenetet most nem sikerült elküldeni. Kérlek, próbáld meg később.",
    );
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <label>
          Név*
          <input
            name="name"
            value={form.name}
            onChange={update}
            autoComplete="name"
            required
          />
        </label>
        <label>
          Cégnév
          <input
            name="company"
            value={form.company}
            onChange={update}
            autoComplete="organization"
          />
        </label>
        <label>
          E-mail cím*
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            autoComplete="email"
            required
          />
        </label>
        <label>
          Telefonszám
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={update}
            autoComplete="tel"
          />
        </label>
      </div>
      <label>
        Miben segíthetek?*
        <textarea
          name="message"
          value={form.message}
          onChange={update}
          rows="5"
          placeholder="Írd le röviden, milyen feladatokat szeretnél kiszervezni."
          required
        />
      </label>
      <p className="required-note">* Kötelezően kitöltendő mezők</p>
      <label className="check-label">
        <input
          type="checkbox"
          name="gdpr"
          checked={form.gdpr}
          onChange={update}
          required
        />
        <span>
          Elolvastam és elfogadom az{" "}
          <a href="/adatkezeles" target="_blank" rel="noreferrer">
            Adatkezelési Tájékoztatót
          </a>
          .
        </span>
      </label>
      <button
  className="button"
  type="submit"
  disabled={isSubmitting}
>
  {isSubmitting ? "Küldés..." : "Üzenet elküldése"}
</button>
      {status && (
        <p className="form-status" role="status">
          {status}
        </p>
      )}
    </form>
  );
}
