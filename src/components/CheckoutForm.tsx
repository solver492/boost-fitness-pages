import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { MOROCCAN_CITIES, WHATSAPP_NUMBER, type Product } from "@/data/products";

export function CheckoutForm({ product }: { product: Product }) {
  const [form, setForm] = useState({ name: "", phone: "", city: "Casablanca", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.name.trim().length < 2) return setError("Veuillez entrer votre nom complet.");
    if (!/^0?[5-7]\d{8}$/.test(form.phone.replace(/\s/g, ""))) return setError("Numéro de téléphone marocain invalide.");
    if (form.address.trim().length < 5) return setError("Veuillez entrer votre adresse complète.");
    setSubmitting(true);

    const msg =
      `🛒 *Nouvelle commande - ${product.shortName}*%0A%0A` +
      `👤 Nom: ${form.name}%0A` +
      `📞 Téléphone: ${form.phone}%0A` +
      `🏙️ Ville: ${form.city}%0A` +
      `📍 Adresse: ${form.address}%0A%0A` +
      `📦 Produit: ${product.name}%0A` +
      `💰 Total: ${product.price} DH (Livraison Gratuite)%0A` +
      `💳 Paiement à la livraison`;

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
      setSubmitting(false);
    }, 400);
  };

  return (
    <form
      id="checkout"
      onSubmit={onSubmit}
      className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-2xl shadow-orange-500/5"
    >
      <h3 className="text-xl sm:text-2xl font-black text-white mb-1">Finalisez votre commande</h3>
      <p className="text-sm text-zinc-400 mb-6">Paiement à la livraison · Livraison gratuite</p>

      <div className="grid grid-cols-1 gap-4">
        <Field label="Nom Complet">
          <input
            value={form.name}
            onChange={update("name")}
            placeholder="Ex: Youssef El Amrani"
            className={inputCls}
            required
          />
        </Field>
        <Field label="Téléphone">
          <input
            value={form.phone}
            onChange={update("phone")}
            placeholder="06 00 00 00 00"
            inputMode="tel"
            className={inputCls}
            required
          />
        </Field>
        <Field label="Ville">
          <select value={form.city} onChange={update("city")} className={inputCls}>
            {MOROCCAN_CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Adresse Complète">
          <textarea
            value={form.address}
            onChange={update("address")}
            rows={3}
            placeholder="Quartier, rue, numéro, repère..."
            className={inputCls}
            required
          />
        </Field>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm">
        <Row label="Sous-total" value={`${product.price} DH`} />
        <Row label="Livraison" value="GRATUIT" highlight />
        <div className="h-px bg-zinc-800 my-3" />
        <Row label="Total à payer" value={`${product.price} DH`} bold />
      </div>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-600 text-white font-black text-base sm:text-lg py-4 shadow-lg shadow-emerald-500/30 transition active:scale-[0.99] disabled:opacity-60"
      >
        {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
        CONFIRMER MA COMMANDE
      </button>

      <p className="mt-4 flex items-start gap-2 text-xs text-zinc-400">
        <Lock className="h-4 w-4 mt-0.5 text-orange-400 shrink-0" />
        Vos données sont sécurisées. Un conseiller va vous appeler pour confirmer la livraison.
      </p>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value, bold, highlight }: { label: string; value: string; bold?: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className={`text-zinc-400 ${bold ? "text-white font-bold" : ""}`}>{label}</span>
      <span className={`${bold ? "text-orange-400 font-black text-lg" : highlight ? "text-emerald-400 font-bold" : "text-white font-semibold"}`}>
        {value}
      </span>
    </div>
  );
}
