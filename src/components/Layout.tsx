import { Link } from "@tanstack/react-router";
import { Dumbbell, Menu, X, Phone, Instagram } from "lucide-react";
import { useState } from "react";
import { BRAND_NAME } from "@/data/products";
import { useI18n } from "@/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function AnnouncementBar() {
  const { t } = useI18n();
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white text-center font-semibold py-2 px-4 text-[11px] sm:text-sm leading-tight">
      {t("announce.bar")}
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-[32px] sm:top-[36px] z-40 bg-zinc-950/90 backdrop-blur border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 min-w-0 shrink-0" onClick={() => setOpen(false)}>
          <span className="grid place-items-center h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-orange-500 shrink-0">
            <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-950" />
          </span>
          <span className="font-black text-white tracking-tight text-base sm:text-lg">{BRAND_NAME}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-zinc-300">
          <Link to="/" className="hover:text-orange-400 transition">{t("nav.home")}</Link>
          <Link to="/boutique" className="hover:text-orange-400 transition">{t("nav.shop")}</Link>
          <a href="#contact" className="hover:text-orange-400 transition">{t("nav.contact")}</a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher compact />
          <a
            href="tel:+212600000000"
            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white text-sm transition"
          >
            <Phone className="h-4 w-4 text-orange-400" />
            <span className="hidden lg:inline">06 00 00 00 00</span>
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-zinc-800 transition"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-zinc-900 bg-zinc-950 px-4 py-4 flex flex-col gap-1">
          {[
            { to: "/", label: t("nav.home") },
            { to: "/boutique", label: t("nav.shop") },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to as "/"}
              onClick={() => setOpen(false)}
              className="flex items-center px-3 py-3 rounded-lg text-zinc-200 hover:bg-zinc-900 hover:text-white font-medium transition text-sm"
            >
              {label}
            </Link>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="flex items-center px-3 py-3 rounded-lg text-zinc-200 hover:bg-zinc-900 font-medium transition text-sm"
          >
            {t("nav.contact")}
          </a>
          <div className="border-t border-zinc-900 mt-2 pt-3 flex items-center gap-3">
            <a
              href="tel:+212600000000"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 text-orange-400 font-semibold py-3 text-sm"
            >
              <Phone className="h-4 w-4" /> 06 00 00 00 00
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer id="contact" className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="grid place-items-center h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-orange-500">
              <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-950" />
            </span>
            <span className="font-black text-white text-base sm:text-lg">{BRAND_NAME}</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed">{t("footer.tagline")}</p>
          <div className="mt-4"><LanguageSwitcher /></div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 text-sm">{t("footer.nav")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-orange-400 transition">{t("nav.home")}</Link></li>
            <li><Link to="/boutique" className="hover:text-orange-400 transition">{t("nav.shop")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 text-sm">{t("footer.contact")}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="tel:+212600000000" className="hover:text-orange-400 transition flex items-center gap-1.5">
                📞 06 00 00 00 00
              </a>
            </li>
            <li>
              <a href="https://wa.me/212600000000" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition flex items-center gap-1.5">
                💬 WhatsApp
              </a>
            </li>
            <li className="pt-1">
              <a href="#" className="hover:text-orange-400 transition inline-flex items-center gap-1.5">
                <Instagram className="h-4 w-4" /> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-900 py-4 text-center text-xs text-zinc-500 px-4">
        © {new Date().getFullYear()} {BRAND_NAME}. {t("footer.rights")}
      </div>
    </footer>
  );
}
