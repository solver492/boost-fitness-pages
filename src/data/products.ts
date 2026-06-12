export type PackItem = {
  name: string;
  category: string;
  dosage: string;
  description: string;
  benefits: string[];
  color: string; // tailwind color name e.g. "orange", "amber"
  icon: "Flame" | "Zap" | "Dumbbell" | "Sparkles" | "Pill" | "Beaker" | "Droplet" | "Atom";
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  price: number;
  image: string;
  tagline: string;
  description: string;
  mainBenefit: string;
  bullets: string[];
  ingredients: { title: string; desc: string; icon: string }[];
  problems: string[];
  solutions: string[];
  items: PackItem[];
};

const CDN = "https://go-fitness.pro/cdn/shop/files";

export const products: Product[] = [
  {
    slug: "mass-gainer-zinc-mass-boost-hormonal-stack",
    name: "Mass Gainer + Zinc : Mass Boost Hormonal Stack",
    shortName: "Mass Boost Hormonal Stack",
    price: 880,
    image: `${CDN}/pack2.png?v=1776959310&width=1100`,
    tagline: "Prise de masse rapide + optimisation hormonale naturelle",
    mainBenefit: "+5kg de masse musculaire en 8 semaines",
    description:
      "Un pack conçu pour ceux qui veulent prendre du poids rapidement tout en optimisant leur testostérone naturellement grâce au Zinc.",
    bullets: [
      "+5kg de masse en 8 semaines",
      "Force maximale dès la 2ᵉ semaine",
      "Boost testostérone naturel (Zinc)",
      "Ingrédients certifiés 100% authentiques",
    ],
    ingredients: [
      { title: "Mass Gainer Premium", desc: "1250 kcal par dose, 50g de protéines, glucides complexes.", icon: "Flame" },
      { title: "Zinc Chélaté", desc: "Booste naturellement la testostérone et la récupération.", icon: "Zap" },
      { title: "Acides Aminés BCAA", desc: "Évite la fonte musculaire et accélère la croissance.", icon: "Dumbbell" },
      { title: "Vitamines & Minéraux", desc: "Complexe complet pour soutenir l'effort intense.", icon: "Sparkles" },
    ],
    problems: [
      "Tu manges beaucoup mais tu ne prends pas un gramme",
      "Tu plafonnes en force depuis des semaines",
      "Ta récupération est lente et tu te sens fatigué",
      "Tu doutes de la qualité des produits sur le marché marocain",
    ],
    solutions: [
      "Apport calorique massif et propre pour forcer la prise de masse",
      "Optimisation hormonale naturelle via le Zinc chélaté",
      "Récupération accélérée grâce aux BCAA et vitamines",
      "Produits 100% authentiques importés et certifiés",
    ],
    items: [
      {
        name: "Mass Gainer Premium 3kg",
        category: "Prise de masse",
        dosage: "1 dose (150g) après l'entraînement",
        description:
          "Formule haute calorie combinant whey concentrée, maltodextrine et avoine pour un surplus calorique propre et facilement digestible.",
        benefits: ["1250 kcal par dose", "50g de protéines", "Glucides complexes lents", "Enrichi en créatine"],
        color: "orange",
        icon: "Flame",
      },
      {
        name: "Zinc Chélaté 25mg",
        category: "Booster hormonal",
        dosage: "1 capsule le soir au coucher",
        description:
          "Zinc bisglycinate hautement biodisponible. Soutient la production naturelle de testostérone, la récupération et l'immunité.",
        benefits: ["Boost testostérone", "Renforce le système immunitaire", "Améliore le sommeil", "120 capsules / 4 mois"],
        color: "amber",
        icon: "Atom",
      },
    ],
  },
  {
    slug: "whey-multivitamines-elite-whey-daily-stack",
    name: "Whey + Multivitamines : Elite Whey Daily Stack",
    shortName: "Elite Whey Daily Stack",
    price: 950,
    image: `${CDN}/pack16.png?v=1776958179&width=1100`,
    tagline: "Construire du muscle tout en restant en bonne santé",
    mainBenefit: "Muscle sec + santé de fer au quotidien",
    description:
      "Un pack simple et efficace pour construire du muscle tout en restant en bonne santé grâce à une whey premium et un complexe multivitaminé.",
    bullets: [
      "24g de protéines par dose",
      "Complexe multivitaminé complet",
      "Récupération musculaire optimale",
      "Système immunitaire renforcé",
    ],
    ingredients: [
      { title: "Whey Concentrée", desc: "Protéines à absorption rapide pour la récupération.", icon: "Dumbbell" },
      { title: "Multivitamines", desc: "Vitamines A, C, D, E, B-complex et minéraux essentiels.", icon: "Sparkles" },
      { title: "Profil Aminés Complet", desc: "Tous les acides aminés essentiels pour la croissance.", icon: "Zap" },
      { title: "Goût Premium", desc: "Plusieurs saveurs gourmandes, sans arrière-goût.", icon: "Flame" },
    ],
    problems: [
      "Tu t'entraînes dur mais tes muscles ne suivent pas",
      "Tu tombes malade et tu rates des séances",
      "Ta récupération entre séances est trop longue",
      "Tu cherches une routine simple et efficace",
    ],
    solutions: [
      "Apport protéiné rapide et de haute qualité",
      "Système immunitaire boosté pour ne plus rater une séance",
      "Récupération musculaire optimisée",
      "Une seule routine, des résultats visibles",
    ],
    items: [
      {
        name: "Whey Protein Premium 2kg",
        category: "Protéines",
        dosage: "1 dose (30g) après l'entraînement ou entre les repas",
        description:
          "Whey concentrée filtrée à froid pour préserver le profil aminé. 24g de protéines par dose avec BCAA naturellement présents.",
        benefits: ["24g de protéines pures", "5.5g de BCAA", "Récupération rapide", "Plusieurs saveurs au choix"],
        color: "orange",
        icon: "Dumbbell",
      },
      {
        name: "Daily Multivitamins",
        category: "Santé quotidienne",
        dosage: "1 capsule par jour au petit-déjeuner",
        description:
          "Complexe complet de 23 vitamines et minéraux essentiels. Soutient l'énergie, l'immunité et la performance sportive.",
        benefits: ["23 vitamines et minéraux", "Énergie quotidienne", "Immunité renforcée", "60 capsules / 2 mois"],
        color: "lime",
        icon: "Pill",
      },
    ],
  },
  {
    slug: "beef-protein-eaa-grand-format-nom-beef-mass-elite-stack",
    name: "Beef Protein + EAA (Grand Format) : Beef Mass Elite Stack",
    shortName: "Beef Mass Elite Stack",
    price: 1700,
    image: `${CDN}/pack15.png?v=1776957813&width=1100`,
    tagline: "Pack premium grand format pour sportifs sérieux",
    mainBenefit: "Masse pure + récupération anabolique maximale",
    description:
      "Un pack premium pour les sportifs sérieux. Grand format de protéine de bœuf et EAA pour une masse musculaire de qualité.",
    bullets: [
      "Grand format longue durée",
      "Protéine de bœuf hydrolysée",
      "EAA pour anabolisme constant",
      "Zéro lactose, zéro gluten",
    ],
    ingredients: [
      { title: "Beef Protein Isolée", desc: "100% protéine de bœuf, absorption rapide.", icon: "Flame" },
      { title: "EAA 8000mg", desc: "Acides aminés essentiels pour stimuler la synthèse musculaire.", icon: "Zap" },
      { title: "Zéro Lactose", desc: "Idéal pour les intolérants, digestion parfaite.", icon: "Dumbbell" },
      { title: "Grand Format", desc: "Plus de 2 mois de cure pour une transformation visible.", icon: "Sparkles" },
    ],
    problems: [
      "Tu es intolérant au lactose et tu galères avec la whey",
      "Tu veux du muscle de qualité, pas du flou",
      "Tes cures se finissent trop vite",
      "Tu veux du sérieux, du premium",
    ],
    solutions: [
      "Protéine de bœuf 100% digeste et anabolique",
      "EAA pour une croissance musculaire continue",
      "Grand format pour une cure complète sans interruption",
      "Qualité premium réservée aux athlètes exigeants",
    ],
    items: [
      {
        name: "Beef Protein Isolate 4kg",
        category: "Protéines premium",
        dosage: "1 dose (33g) après l'entraînement",
        description:
          "Isolat de protéine de bœuf hydrolysée, zéro lactose, zéro gluten. Profil aminé proche de la viande rouge, digestion ultra rapide.",
        benefits: ["28g de protéines pures", "0g de lactose", "Riche en créatine naturelle", "Grand format 4kg"],
        color: "orange",
        icon: "Flame",
      },
      {
        name: "EAA 8000 - 500g",
        category: "Acides aminés essentiels",
        dosage: "1 dose (10g) pendant l'entraînement",
        description:
          "8000mg d'EAA par dose dont 4000mg de BCAA. Stimule la synthèse protéique et protège la masse musculaire pendant l'effort.",
        benefits: ["8g d'EAA par dose", "Anti-catabolique", "Hydratation cellulaire", "Saveur fruitée rafraîchissante"],
        color: "amber",
        icon: "Beaker",
      },
    ],
  },
  {
    slug: "beef-protein-pre-workout-nom-beef-power-performance-stack",
    name: "Beef Protein + Pre-Workout : Beef Power Performance Stack",
    shortName: "Beef Power Performance Stack",
    price: 1119,
    image: `${CDN}/pack14.png?v=1776957679&width=1100`,
    tagline: "Explose tes performances à la salle",
    mainBenefit: "Énergie explosive + récupération musculaire pro",
    description:
      "Le combo parfait pour exploser tes performances à la salle. Le pre-workout booste ton énergie, la protéine de bœuf reconstruit tes fibres.",
    bullets: [
      "Énergie explosive instantanée",
      "Focus mental maximal",
      "Pump intense pendant l'effort",
      "Récupération anabolique post-séance",
    ],
    ingredients: [
      { title: "Pre-Workout Premium", desc: "Caféine, beta-alanine et citrulline pour la pump.", icon: "Zap" },
      { title: "Beef Protein", desc: "Protéine de bœuf hydrolysée à digestion rapide.", icon: "Flame" },
      { title: "Boost Mental", desc: "Concentration et focus pour des séances intenses.", icon: "Sparkles" },
      { title: "Anti-Catabolisme", desc: "Protège tes muscles pendant l'effort.", icon: "Dumbbell" },
    ],
    problems: [
      "Tu n'as plus d'énergie pour t'entraîner dur",
      "Tu manques de focus pendant tes séances",
      "Tes séances stagnent en intensité",
      "Tu récupères mal entre les entraînements",
    ],
    solutions: [
      "Énergie et focus garantis dès la première dose",
      "Pump et performance amplifiées à l'entraînement",
      "Récupération musculaire optimisée avec la beef protein",
      "Plus de séances ratées par manque d'énergie",
    ],
    items: [
      {
        name: "Beef Protein 2kg",
        category: "Protéines",
        dosage: "1 dose (30g) après la séance",
        description:
          "Protéine de bœuf hydrolysée riche en créatine et fer. Idéale pour la reconstruction musculaire après les séances explosives.",
        benefits: ["26g de protéines", "Sans lactose", "Riche en fer", "Récupération rapide"],
        color: "orange",
        icon: "Dumbbell",
      },
      {
        name: "Pre-Workout 300g",
        category: "Énergie & focus",
        dosage: "1 dose (10g) 20 minutes avant la séance",
        description:
          "Formule explosive : 250mg de caféine, 3g de beta-alanine, 6g de citrulline malate. Énergie, focus et pump garantis.",
        benefits: ["250mg de caféine", "Pump vasculaire", "Focus mental laser", "30 doses par pot"],
        color: "red",
        icon: "Zap",
      },
    ],
  },
  {
    slug: "beef-protein-eaa-nom-beef-anabolic-recovery-stack",
    name: "Beef Protein + EAA : Beef Anabolic Recovery Stack",
    shortName: "Beef Anabolic Recovery Stack",
    price: 1199,
    image: `${CDN}/pack13.png?v=1776957465&width=1100`,
    tagline: "Muscle de qualité + récupération accélérée",
    mainBenefit: "Construis du muscle sec rapidement",
    description:
      "Un pack puissant pour développer du muscle de qualité et accélérer la récupération entre les séances.",
    bullets: [
      "Muscle sec et défini",
      "Récupération ultra-rapide",
      "Profil aminés complet",
      "Digestion légère",
    ],
    ingredients: [
      { title: "Beef Protein Premium", desc: "Source de protéine premium et 100% digeste.", icon: "Flame" },
      { title: "EAA Optimal", desc: "Tous les acides aminés essentiels pour la synthèse musculaire.", icon: "Zap" },
      { title: "Récupération Active", desc: "Réduit les courbatures et les temps de récupération.", icon: "Dumbbell" },
      { title: "Sans Lactose", desc: "Parfait pour les estomacs sensibles.", icon: "Sparkles" },
    ],
    problems: [
      "Tu prends du gras au lieu du muscle",
      "Tes courbatures durent trop longtemps",
      "Tu n'arrives pas à enchaîner les séances intenses",
      "Tu cherches un muscle de qualité",
    ],
    solutions: [
      "Construction musculaire sèche et propre",
      "Récupération entre séances accélérée",
      "Profil aminé complet pour la croissance",
      "Digestion parfaite, zéro inconfort",
    ],
    items: [
      {
        name: "Beef Protein 2kg",
        category: "Protéines premium",
        dosage: "1 dose (30g) post-entraînement",
        description:
          "Protéine de bœuf hydrolysée pour une absorption rapide et zéro inconfort digestif. Profil aminé complet pour le muscle sec.",
        benefits: ["26g de protéines", "Sans lactose ni gluten", "Riche en BCAA naturels", "Digestion légère"],
        color: "orange",
        icon: "Flame",
      },
      {
        name: "EAA Recovery 400g",
        category: "Récupération",
        dosage: "1 dose (10g) pendant ou après la séance",
        description:
          "Formule EAA complète avec électrolytes pour relancer la synthèse musculaire et réduire les courbatures.",
        benefits: ["8g d'EAA", "Électrolytes inclus", "Anti-courbatures", "Hydratation optimale"],
        color: "amber",
        icon: "Droplet",
      },
    ],
  },
  {
    slug: "whey-creatine-muscle-strength-pro-stack",
    name: "Whey + Créatine : Muscle & Strength Pro Stack",
    shortName: "Muscle & Strength Pro Stack",
    price: 1099,
    image: `${CDN}/pack18.png?v=1776959444&width=1100`,
    tagline: "Le combo classique ultra efficace",
    mainBenefit: "Force brute + volume musculaire",
    description:
      "Le combo classique mais ultra efficace. La whey nourrit les muscles après l'effort, la créatine décuple ta force.",
    bullets: [
      "+15% de force en 4 semaines",
      "Volume musculaire visible",
      "Récupération optimale",
      "Combo éprouvé scientifiquement",
    ],
    ingredients: [
      { title: "Whey Premium", desc: "24g de protéines par dose, profil aminé complet.", icon: "Dumbbell" },
      { title: "Créatine Monohydrate", desc: "5g par jour pour booster l'ATP et la force.", icon: "Zap" },
      { title: "Récupération Pro", desc: "Reconstruction musculaire accélérée.", icon: "Flame" },
      { title: "Volume Musculaire", desc: "Effet visible sur la taille des muscles.", icon: "Sparkles" },
    ],
    problems: [
      "Tu stagnes en force depuis des mois",
      "Tes muscles manquent de volume",
      "Tu n'arrives pas à progresser sur tes charges",
      "Tu cherches une combinaison qui marche vraiment",
    ],
    solutions: [
      "Boost de force immédiat avec la créatine",
      "Volume musculaire visible en quelques semaines",
      "Récupération optimisée avec la whey premium",
      "Le duo le plus efficace en musculation",
    ],
    items: [
      {
        name: "Whey Protein 2kg",
        category: "Protéines",
        dosage: "1 dose (30g) après l'entraînement",
        description:
          "Whey concentrée premium avec 24g de protéines par dose et un profil aminé complet pour la reconstruction musculaire.",
        benefits: ["24g de protéines", "5.5g de BCAA", "Faible en sucres", "Mixe parfaitement"],
        color: "orange",
        icon: "Dumbbell",
      },
      {
        name: "Créatine Monohydrate 300g",
        category: "Force & puissance",
        dosage: "5g par jour, à tout moment",
        description:
          "Créatine monohydrate micronisée 100% pure. Augmente la force, la puissance explosive et le volume cellulaire.",
        benefits: ["+15% de force", "Volume musculaire", "60 doses par pot", "Pureté pharmaceutique"],
        color: "amber",
        icon: "Atom",
      },
    ],
  },
  {
    slug: "so-100-pre-workout-elite-performance-stack",
    name: "SO 100 + Pre-Workout : Elite Performance Stack",
    shortName: "Elite Performance Stack",
    price: 1799,
    image: `${CDN}/pack19.png?v=1776959192&width=1100`,
    tagline: "Le combo ultime pour exploser tes performances",
    mainBenefit: "Énergie + focus + croissance musculaire elite",
    description:
      "Le combo ultime pour exploser tes performances. Le pre-workout te donne énergie, focus et intensité, la SO 100 nourrit tes muscles.",
    bullets: [
      "Énergie explosive longue durée",
      "Focus mental laser",
      "Whey isolat ultra-pure",
      "Performance niveau elite",
    ],
    ingredients: [
      { title: "SO 100 Isolat", desc: "Whey isolat 100% pure, 27g de protéines par dose.", icon: "Dumbbell" },
      { title: "Pre-Workout Elite", desc: "Formule premium pour énergie et focus.", icon: "Zap" },
      { title: "Pump Maximal", desc: "Vascularisation et endurance amplifiées.", icon: "Flame" },
      { title: "Récupération Pro", desc: "Reconstruction musculaire de niveau elite.", icon: "Sparkles" },
    ],
    problems: [
      "Tu veux passer un cap dans tes performances",
      "Tu cherches le meilleur de la qualité protéique",
      "Tu manques d'énergie pour des séances intenses",
      "Tu veux des résultats elite",
    ],
    solutions: [
      "Whey isolat ultra-pure pour muscle sec",
      "Pre-workout elite pour des séances explosives",
      "Combo de niveau professionnel",
      "Résultats visibles dignes des athlètes elite",
    ],
    items: [
      {
        name: "SO 100 Whey Isolate 2kg",
        category: "Protéines isolat premium",
        dosage: "1 dose (30g) après l'entraînement",
        description:
          "Whey isolat ultra-filtrée 90%+. 27g de protéines par dose, quasi zéro lactose, zéro gras. La référence du muscle sec.",
        benefits: ["27g de protéines pures", "<1g de lactose", "0g de gras", "Absorption ultra rapide"],
        color: "orange",
        icon: "Dumbbell",
      },
      {
        name: "Pre-Workout Elite 400g",
        category: "Énergie elite",
        dosage: "1 dose (12g) 20-30 min avant la séance",
        description:
          "Formule elite : 300mg de caféine, 4g de beta-alanine, 8g de citrulline, taurine et L-tyrosine pour un focus laser.",
        benefits: ["300mg de caféine", "Pump extrême", "Focus laser", "Énergie longue durée"],
        color: "red",
        icon: "Zap",
      },
    ],
  },
  {
    slug: "iso-whey-creatine-ultra-lean-strength-stack",
    name: "Iso Whey + Créatine : Ultra Lean Strength Stack",
    shortName: "Ultra Lean Strength Stack",
    price: 1399,
    image: `${CDN}/pack17.png?v=1776959015&width=1100`,
    tagline: "Muscle sec et puissance ultime",
    mainBenefit: "Sèche + force + volume musculaire",
    description:
      "Un pack premium pour construire du muscle sec tout en gagnant en force. L'isolat est ultra-pure, la créatine décuple la puissance.",
    bullets: [
      "Muscle 100% sec",
      "Force décuplée",
      "Zéro lactose, zéro gras",
      "Idéal pour la sèche",
    ],
    ingredients: [
      { title: "Iso Whey Pure", desc: "90% de protéines, zéro lactose, zéro gras.", icon: "Dumbbell" },
      { title: "Créatine Premium", desc: "Boost de force et récupération ATP.", icon: "Zap" },
      { title: "Sèche Musculaire", desc: "Construit du muscle sans prendre de gras.", icon: "Flame" },
      { title: "Digestion Parfaite", desc: "Aucun inconfort digestif, même les estomacs sensibles.", icon: "Sparkles" },
    ],
    problems: [
      "Tu prends du gras avec une whey classique",
      "Tu cherches du muscle sec et défini",
      "Tu veux gagner en force sans gonfler",
      "Tu galères avec la digestion des protéines",
    ],
    solutions: [
      "Isolat ultra-pur pour muscle sec garanti",
      "Créatine pour la force sans la prise de gras",
      "Zéro lactose, digestion parfaite",
      "Le combo idéal pour la sèche et la performance",
    ],
    items: [
      {
        name: "Iso Whey Pure 2kg",
        category: "Isolat ultra-pur",
        dosage: "1 dose (30g) après l'entraînement",
        description:
          "Isolat de whey 90%+ par filtration croisée. 27g de protéines, zéro lactose, zéro gras. Pour le muscle sec uniquement.",
        benefits: ["27g de protéines", "0g de lactose", "0g de gras", "Idéal en sèche"],
        color: "orange",
        icon: "Dumbbell",
      },
      {
        name: "Créatine Pure 300g",
        category: "Force & puissance",
        dosage: "5g par jour",
        description:
          "Créatine monohydrate micronisée certifiée Creapure®. Augmente la force, la puissance et la rétention musculaire.",
        benefits: ["Creapure® certifiée", "+15% de force", "Sans rétention d'eau", "60 doses"],
        color: "amber",
        icon: "Atom",
      },
    ],
  },
];

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);

export const MOROCCAN_CITIES = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir", "Meknès", "Oujda",
  "Kenitra", "Tétouan", "Salé", "Nador", "Mohammedia", "El Jadida", "Béni Mellal",
  "Safi", "Khouribga", "Settat", "Larache", "Khémisset", "Berrechid", "Taza",
  "Errachidia", "Ouarzazate", "Essaouira", "Dakhla", "Laâyoune", "Autre",
];

export const WHATSAPP_NUMBER = "212600000000";
export const BRAND_NAME = "Go Fitness";
export const BRAND_TAGLINE = "Suppléments authentiques pour athlètes marocains";
