import { Globe } from "lucide-react";
import { useI18n, type Locale } from "@/i18n";

const OPTIONS: { code: Locale; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
  { code: "en", label: "EN" },
];

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useI18n();
  return (
    <div className={`inline-flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 ${compact ? "p-0.5" : "p-1"}`}>
      {!compact && <Globe className="h-3.5 w-3.5 text-zinc-400 ml-2" />}
      {OPTIONS.map((o) => (
        <button
          key={o.code}
          onClick={() => setLocale(o.code)}
          className={`px-2 py-1 rounded-full text-[11px] font-bold transition ${
            locale === o.code ? "bg-orange-500 text-zinc-950" : "text-zinc-400 hover:text-white"
          }`}
          aria-label={`Switch language to ${o.label}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
