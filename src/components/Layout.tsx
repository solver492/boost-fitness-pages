import { Link } from "@tanstack/react-router";
import { Dumbbell, Menu, X, Phone, Instagram } from "lucide-react";
import { useState } from "react";
import { BRAND_NAME } from "@/data/products";

export function AnnouncementBar() {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white text-center text-xs sm:text-sm font-semibold py-2 px-4">
      🔥 Promotion Limitée + Livraison Gratuite Partout au Maroc 🇲🇦
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-[32px] sm:top-[36px] z-40 bg-zinc-950/90 backdrop-blur border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <span className="grid place-items-center h-9 w-9 rounded-lg bg-orange-500 shrink-0">
            <Dumbbell className="h-5 w-5 text-zinc-950" />
          </span>
          <span className="font-black text-white tracking-tight text-lg truncate">{BRAND_NAME}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          <Link to="/" className="hover:text-orange-400">Accueil</Link>
          <Link to="/boutique" className="hover:text-orange-400">Boutique</Link>
          <a href="#contact" className="hover:text-orange-400">Contact</a>
        </nav>
        <div className="hidden md:flex items-center gap-2 text-sm">
          <a href="tel:+212600000000" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white">
            <Phone className="h-4 w-4 text-orange-400" /> 06 00 00 00 00
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2" aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-zinc-900 bg-zinc-950 px-4 py-3 flex flex-col gap-3 text-sm">
          <Link to="/" onClick={() => setOpen(false)} className="text-zinc-200">Accueil</Link>
          <Link to="/boutique" onClick={() => setOpen(false)} className="text-zinc-200">Boutique</Link>
          <a href="tel:+212600000000" className="text-orange-400 font-semibold">📞 06 00 00 00 00</a>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="grid place-items-center h-9 w-9 rounded-lg bg-orange-500">
              <Dumbbell className="h-5 w-5 text-zinc-950" />
            </span>
            <span className="font-black text-white text-lg">{BRAND_NAME}</span>
          </div>
          <p className="max-w-md">
            Les meilleurs suppléments fitness, 100% authentiques, livrés gratuitement partout au Maroc. Paiement à la livraison.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Navigation</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-orange-400">Accueil</Link></li>
            <li><Link to="/boutique" className="hover:text-orange-400">Boutique</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Contact</h4>
          <ul className="space-y-2">
            <li><a href="tel:+212600000000" className="hover:text-orange-400">📞 06 00 00 00 00</a></li>
            <li><a href="https://wa.me/212600000000" target="_blank" rel="noreferrer" className="hover:text-orange-400">💬 WhatsApp</a></li>
            <li className="flex items-center gap-3 pt-2">
              <a href="#" className="hover:text-orange-400"><Instagram className="h-5 w-5" /></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-900 py-4 text-center text-xs">
        © {new Date().getFullYear()} {BRAND_NAME}. Tous droits réservés.
      </div>
    </footer>
  );
}
