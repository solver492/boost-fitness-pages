import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "fr" | "ar" | "en";

type Dict = Record<string, string>;

const fr: Dict = {
  "nav.home": "Accueil",
  "nav.shop": "Boutique",
  "nav.contact": "Contact",
  "announce.bar": "🔥 Promotion limitée + Livraison gratuite partout au Maroc 🇲🇦",
  "hero.badge": "Marque #1 du fitness au Maroc",
  "hero.title.a": "Construis le physique que",
  "hero.title.b": "tu mérites",
  "hero.subtitle": "Suppléments 100% authentiques importés et certifiés. Livraison gratuite partout au Maroc. Paiement à la livraison.",
  "hero.cta.shop": "Voir la boutique",
  "hero.cta.featured": "Pack du moment",
  "hero.social": "+1200 clients satisfaits",
  "trust.authentic": "100% Authentique",
  "trust.authentic.desc": "Importé et certifié",
  "trust.delivery": "Livraison Gratuite",
  "trust.delivery.desc": "Partout au Maroc 🇲🇦",
  "trust.support": "Support 7j/7",
  "trust.support.desc": "Conseillers à l'écoute",
  "section.packs.eyebrow": "Nos packs",
  "section.packs.title": "Choisis ton stack",
  "section.viewAll": "Voir tout",
  "shop.title": "Tous nos packs fitness",
  "shop.subtitle": "Sélectionnés pour les athlètes marocains. Livraison gratuite, paiement à la livraison.",
  "card.see": "Voir",
  "landing.limited": "Édition limitée · Stock réduit",
  "landing.cta": "COMMANDER MAINTENANT",
  "landing.cod": "Paiement à la livraison",
  "landing.problem.title": "Pourquoi vous n'arrivez pas à",
  "landing.problem.title2": "progresser",
  "landing.problem.subtitle": "Reconnaissez-vous l'un de ces blocages ?",
  "landing.solution.title": "La solution Go Fitness :",
  "landing.solution.subtitle": "Une formule pensée par des coachs, validée par la science.",
  "landing.benefits.eyebrow": "Ce qui rend ce stack supérieur",
  "landing.benefits.title": "Une formule complète, rien d'autre.",
  "landing.breakdown.eyebrow": "Composition du pack",
  "landing.breakdown.title": "Décomposons ce pack",
  "landing.breakdown.subtitle": "Scrolle pour découvrir chaque produit en détail.",
  "landing.testimonials.eyebrow": "Ils ont transformé leur physique",
  "landing.testimonials.title": "Avis de nos clients marocains",
  "landing.checkout.eyebrow": "Plus qu'une étape",
  "landing.checkout.title": "Commandez en 30 secondes",
  "landing.checkout.desc": "Remplissez le formulaire, un de nos conseillers vous appellera dans l'heure pour confirmer votre commande. Vous payez uniquement à la livraison.",
  "checkout.title": "Finalisez votre commande",
  "checkout.subtitle": "Paiement à la livraison · Livraison gratuite",
  "checkout.name": "Nom complet",
  "checkout.phone": "Téléphone",
  "checkout.city": "Ville",
  "checkout.address": "Adresse complète",
  "checkout.subtotal": "Sous-total",
  "checkout.delivery": "Livraison",
  "checkout.free": "GRATUIT",
  "checkout.total": "Total à payer",
  "checkout.confirm": "CONFIRMER MA COMMANDE",
  "checkout.secure": "Vos données sont sécurisées. Un conseiller va vous appeler pour confirmer la livraison.",
  "checkout.err.name": "Veuillez entrer votre nom complet.",
  "checkout.err.phone": "Numéro de téléphone marocain invalide.",
  "checkout.err.address": "Veuillez entrer votre adresse complète.",
  "footer.tagline": "Les meilleurs suppléments fitness, 100% authentiques, livrés gratuitement partout au Maroc. Paiement à la livraison.",
  "footer.nav": "Navigation",
  "footer.contact": "Contact",
  "footer.rights": "Tous droits réservés.",
  "chat.title": "Coach IA Go Fitness",
  "chat.subtitle": "Conseils personnalisés · 24h/24",
  "chat.placeholder": "Pose ta question au coach...",
  "chat.send": "Envoyer",
  "chat.welcome": "Salam ! Je suis ton coach IA Go Fitness 💪 Dis-moi ton objectif et je te recommande le pack parfait.",
  "chat.thinking": "Le coach réfléchit...",
  "chat.error": "Erreur de connexion. Réessaie dans un instant.",
  "item.dosage": "Posologie",
  "item.benefits": "Bénéfices",
};

const en: Dict = {
  "nav.home": "Home",
  "nav.shop": "Shop",
  "nav.contact": "Contact",
  "announce.bar": "🔥 Limited offer + Free delivery anywhere in Morocco 🇲🇦",
  "hero.badge": "#1 fitness brand in Morocco",
  "hero.title.a": "Build the body you",
  "hero.title.b": "deserve",
  "hero.subtitle": "100% authentic supplements, imported and certified. Free delivery anywhere in Morocco. Cash on delivery.",
  "hero.cta.shop": "Visit shop",
  "hero.cta.featured": "Featured pack",
  "hero.social": "+1200 happy customers",
  "trust.authentic": "100% Authentic",
  "trust.authentic.desc": "Imported & certified",
  "trust.delivery": "Free delivery",
  "trust.delivery.desc": "Anywhere in Morocco 🇲🇦",
  "trust.support": "Support 7d/7",
  "trust.support.desc": "Coaches ready to help",
  "section.packs.eyebrow": "Our packs",
  "section.packs.title": "Pick your stack",
  "section.viewAll": "View all",
  "shop.title": "All our fitness packs",
  "shop.subtitle": "Curated for Moroccan athletes. Free delivery, cash on delivery.",
  "card.see": "View",
  "landing.limited": "Limited edition · Low stock",
  "landing.cta": "ORDER NOW",
  "landing.cod": "Cash on delivery",
  "landing.problem.title": "Why aren't you",
  "landing.problem.title2": "progressing",
  "landing.problem.subtitle": "Do any of these sound familiar?",
  "landing.solution.title": "The Go Fitness solution:",
  "landing.solution.subtitle": "A formula designed by coaches, backed by science.",
  "landing.benefits.eyebrow": "What makes this stack superior",
  "landing.benefits.title": "A complete formula, nothing else.",
  "landing.breakdown.eyebrow": "Pack composition",
  "landing.breakdown.title": "Let's break it down",
  "landing.breakdown.subtitle": "Scroll to discover each product in detail.",
  "landing.testimonials.eyebrow": "They transformed their physique",
  "landing.testimonials.title": "Reviews from Moroccan customers",
  "landing.checkout.eyebrow": "One step away",
  "landing.checkout.title": "Order in 30 seconds",
  "landing.checkout.desc": "Fill in the form, one of our advisors will call you within the hour to confirm. You only pay on delivery.",
  "checkout.title": "Complete your order",
  "checkout.subtitle": "Cash on delivery · Free shipping",
  "checkout.name": "Full name",
  "checkout.phone": "Phone",
  "checkout.city": "City",
  "checkout.address": "Full address",
  "checkout.subtotal": "Subtotal",
  "checkout.delivery": "Delivery",
  "checkout.free": "FREE",
  "checkout.total": "Total to pay",
  "checkout.confirm": "CONFIRM MY ORDER",
  "checkout.secure": "Your data is safe. An advisor will call to confirm delivery.",
  "checkout.err.name": "Please enter your full name.",
  "checkout.err.phone": "Invalid Moroccan phone number.",
  "checkout.err.address": "Please enter your full address.",
  "footer.tagline": "The best fitness supplements, 100% authentic, delivered free across Morocco. Cash on delivery.",
  "footer.nav": "Navigation",
  "footer.contact": "Contact",
  "footer.rights": "All rights reserved.",
  "chat.title": "Go Fitness AI Coach",
  "chat.subtitle": "Personal advice · 24/7",
  "chat.placeholder": "Ask the coach anything...",
  "chat.send": "Send",
  "chat.welcome": "Hey! I'm your Go Fitness AI coach 💪 Tell me your goal and I'll recommend the perfect pack.",
  "chat.thinking": "Coach is thinking...",
  "chat.error": "Connection error. Please try again.",
  "item.dosage": "Dosage",
  "item.benefits": "Benefits",
};

const ar: Dict = {
  "nav.home": "الرئيسية",
  "nav.shop": "المتجر",
  "nav.contact": "اتصل بنا",
  "announce.bar": "🔥 عرض محدود + توصيل مجاني فكل المغرب 🇲🇦",
  "hero.badge": "العلامة رقم 1 ديال الفيتنس فالمغرب",
  "hero.title.a": "بني الجسم اللي",
  "hero.title.b": "تستاهلو",
  "hero.subtitle": "مكملات 100% أصلية، مستوردة ومضمونة. التوصيل مجاني فكل المغرب. الخلاص عند التسليم.",
  "hero.cta.shop": "شوف المتجر",
  "hero.cta.featured": "باك ديال هاد اللحظة",
  "hero.social": "+1200 زبون راضي",
  "trust.authentic": "100% أصلي",
  "trust.authentic.desc": "مستورد ومضمون",
  "trust.delivery": "توصيل مجاني",
  "trust.delivery.desc": "فكل المغرب 🇲🇦",
  "trust.support": "دعم 7ج/7",
  "trust.support.desc": "كوتشات فالخدمة ديالك",
  "section.packs.eyebrow": "الباكات ديالنا",
  "section.packs.title": "ختار الباك ديالك",
  "section.viewAll": "شوف الكل",
  "shop.title": "كل الباكات ديالنا",
  "shop.subtitle": "مختارة للرياضيين المغاربة. توصيل مجاني، الخلاص عند التسليم.",
  "card.see": "شوف",
  "landing.limited": "نسخة محدودة · ستوك قليل",
  "landing.cta": "اطلب دابا",
  "landing.cod": "الخلاص عند التسليم",
  "landing.problem.title": "علاش ما كتقدرش",
  "landing.problem.title2": "تطور",
  "landing.problem.subtitle": "واش كتعرف وحد من هاد المشاكل؟",
  "landing.solution.title": "الحل ديال Go Fitness:",
  "landing.solution.subtitle": "تركيبة مدروسة من طرف كوتشات، مثبتة علميا.",
  "landing.benefits.eyebrow": "علاش هاد الباك مميز",
  "landing.benefits.title": "تركيبة كاملة، حتى حاجة أخرى.",
  "landing.breakdown.eyebrow": "تركيبة الباك",
  "landing.breakdown.title": "خلينا نفككو الباك",
  "landing.breakdown.subtitle": "سكرولي باش تكتشف كل منتج بالتفصيل.",
  "landing.testimonials.eyebrow": "بدلو الجسم ديالهم",
  "landing.testimonials.title": "آراء الزبناء المغاربة",
  "landing.checkout.eyebrow": "خطوة واحدة بقات",
  "landing.checkout.title": "اطلب ف 30 ثانية",
  "landing.checkout.desc": "عمر الاستمارة، غادي يعيط ليك واحد من المستشارين ديالنا فالساعة باش يأكد الطلبية. كتخلص فقط عند التوصيل.",
  "checkout.title": "كمل الطلبية ديالك",
  "checkout.subtitle": "الخلاص عند التسليم · توصيل مجاني",
  "checkout.name": "الاسم الكامل",
  "checkout.phone": "التيليفون",
  "checkout.city": "المدينة",
  "checkout.address": "العنوان الكامل",
  "checkout.subtotal": "المجموع",
  "checkout.delivery": "التوصيل",
  "checkout.free": "مجاني",
  "checkout.total": "المجموع للخلاص",
  "checkout.confirm": "أكد الطلبية ديالي",
  "checkout.secure": "المعطيات ديالك مؤمنة. غادي يعيط ليك مستشار باش يأكد التوصيل.",
  "checkout.err.name": "عافاك دخل الاسم الكامل ديالك.",
  "checkout.err.phone": "رقم التيليفون المغربي ماشي صحيح.",
  "checkout.err.address": "عافاك دخل العنوان الكامل.",
  "footer.tagline": "أحسن مكملات الفيتنس، 100% أصلية، مع توصيل مجاني فكل المغرب. الخلاص عند التسليم.",
  "footer.nav": "التنقل",
  "footer.contact": "اتصل بنا",
  "footer.rights": "كل الحقوق محفوظة.",
  "chat.title": "الكوتش الذكي ديال Go Fitness",
  "chat.subtitle": "نصائح خاصة بيك · 24/24",
  "chat.placeholder": "سول الكوتش على أي حاجة...",
  "chat.send": "صيفط",
  "chat.welcome": "سلام! أنا الكوتش الذكي ديال Go Fitness 💪 قول ليا الهدف ديالك ونوصيك بالباك المناسب.",
  "chat.thinking": "الكوتش كيفكر...",
  "chat.error": "خطأ فالاتصال. عاود حاول.",
  "item.dosage": "الجرعة",
  "item.benefits": "الفوايد",
};

const dicts: Record<Locale, Dict> = { fr, ar, en };

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const I18nContext = createContext<Ctx | null>(null);

function detectLocale(): Locale {
  if (typeof window === "undefined") return "fr";
  const saved = window.localStorage?.getItem("gf-locale") as Locale | null;
  if (saved && (saved === "fr" || saved === "ar" || saved === "en")) return saved;
  const lang = navigator.language?.toLowerCase() ?? "fr";
  if (lang.startsWith("ar")) return "ar";
  if (lang.startsWith("en")) return "en";
  return "fr";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const l = detectLocale();
    setLocaleState(l);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try { window.localStorage.setItem("gf-locale", l); } catch {}
  }, []);

  const t = useCallback((key: string) => dicts[locale][key] ?? dicts.fr[key] ?? key, [locale]);

  const value = useMemo<Ctx>(
    () => ({ locale, setLocale, t, dir: locale === "ar" ? "rtl" : "ltr" }),
    [locale, setLocale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Safe fallback during SSR or before provider mounts
    return {
      locale: "fr" as Locale,
      setLocale: () => {},
      t: (k: string) => dicts.fr[k] ?? k,
      dir: "ltr" as const,
    };
  }
  return ctx;
}
