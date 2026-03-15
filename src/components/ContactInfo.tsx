import { useLocation } from "react-router-dom";

const COMMON_TEXTS = {
  SECURITY_DESCRIPTION: (projectName: string) =>
    `Comme pour ${projectName}, nous déployons des solutions de sécurité de grade professionnel qui protègent vos actifs critiques 24/7. Nos experts certifiés conçoivent des systèmes sur mesure avec une couverture à 100% et zéro angle mort - Demandez votre audit de sécurité gratuit dès aujourd'hui.`,
  FORMATION_CALL_TO_ACTION:
    "Places limitées à 12 participants par session pour garantir un accompagnement personnalisé. Contactez-nous maintenant pour réserver votre place et bénéficier de notre offre de lancement. Certification incluse.",
};

const TEXT_CONSTANTS = {
  DEFAULT_TITLE: "Prêt à transformer votre entreprise ? Parlons-en.",
  DEFAULT_TEXT:
    "Consultation gratuite de 30 minutes avec un expert certifié. Obtenez un diagnostic personnalisé et une proposition chiffrée sous 48h. Plus de 500 projets livrés avec 99.8% de satisfaction.",
  CONTACT_US_LABEL: "Démarrez votre transformation",
  MAIN_HEADING: "Votre succès technologique commence ici",
  MAIN_DESCRIPTION:
    "Rejoignez les 200+ entreprises qui ont déjà choisi Zetoun Labs pour leur transformation digitale. Consultation gratuite, audit personnalisé et proposition sous 48h.",
  CONTACT_BUTTON_TEXT: "Obtenir ma consultation gratuite",
  CONTACT_PAGE_PATH: "/add/contact-nous",
  PATH_CONTENT_MAP: {
    "/projects/realisations/eyano-security": {
      title: "Votre Sécurité, Notre Engagement",
      text: COMMON_TEXTS.SECURITY_DESCRIPTION("le Centre de Diagnostic EYANO"),
    },
    "/projects/realisations/police-judiciaire": {
      title: "Votre infrastructure mérite la même excellence",
      text: "Performance réseau x10, sécurité militaire et disponibilité 99.9% - C'est ce que nous avons livré à la Police Judiciaire. Nos architectes certifiés Cisco et Microsoft sont prêts à transformer votre infrastructure avec la même rigueur et le même niveau d'excellence.",
    },
    "/projects/realisations/credit-shop-africa": {
      title: "Votre sécurité, notre engagement",
      text: COMMON_TEXTS.SECURITY_DESCRIPTION("Credit Shop Africa"),
    },
    "/services/network-engineering": {
      title: "Votre réseau mérite la performance 10Gb",
      text: "Architectures LAN/WAN ultra-rapides avec latence <1ms et disponibilité 99.9%. Nos ingénieurs certifiés CCNP conçoivent des réseaux sur mesure qui accompagnent votre croissance - De la PME au datacenter d'entreprise. Audit réseau gratuit inclus.",
    },
    "/services/video-surveillance": {
      title: "Zéro intrusion, zéro compromis sur votre sécurité",
      text: "Caméras 4K avec IA intégrée, détection comportementale 99.5% de précision et surveillance 360° sans angle mort. Plus de 300 sites sécurisés à Kinshasa. Obtenez votre audit de sécurité gratuit avec cartographie 3D des vulnérabilités.",
    },
    "/services/web-development": {
      title: "Votre site web doit convertir, pas juste exister",
      text: "Sites ultra-rapides (<1.5s), design primé et SEO Top 3 Google. Nos développeurs full-stack créent des plateformes qui génèrent en moyenne 40% de revenus supplémentaires. Score Lighthouse 95+ garanti. Demandez votre maquette gratuite.",
    },
    "/services/it-management": {
      title: "Concentrez-vous sur votre métier, on gère votre IT",
      text: "Monitoring IA 24/7, intervention <2h et 99.8% de disponibilité garantie. SLA sur mesure avec engagement contractuel de résolution. Plus de 500 entreprises nous font déjà confiance. Obtenez votre premier mois d'essai gratuit.",
    },
    "/services/solar-installation": {
      title: "Zéro coupure, 100% autonomie - Passez au solaire",
      text: "Réduisez votre facture de 60% à 80% dès la première année avec un ROI en 3 ans. Équipements Tier 1 garantis 25 ans. Plus de 500 installations réussies à Kinshasa. Demandez votre audit énergétique gratuit.",
    },
    "/services/technical-support": {
      title: "Zéro downtime, zéro stress - Support d'excellence",
      text: "95% des incidents résolus dès le premier contact, intervention garantie <2h et réduction de 70% des tickets après 6 mois. Nos ingénieurs certifiés Microsoft, Cisco et CompTIA sont disponibles 24/7. Testez notre réactivité gratuitement.",
    },
    "/formations/linux-administration": {
      title: "Lancez votre carrière d'expert Linux - Certification LPIC-1 incluse",
      text: COMMON_TEXTS.FORMATION_CALL_TO_ACTION,
    },
    "/formations/windows-administration": {
      title:
        "Devenez architecte Windows Server certifié - Préparation MCSA incluse",
      text: COMMON_TEXTS.FORMATION_CALL_TO_ACTION,
    },
    "/formations/network-administration": {
      title: "Décrochez votre certification Cisco CCNA - Taux de réussite 89%",
      text: COMMON_TEXTS.FORMATION_CALL_TO_ACTION,
    },
    "/formations/computer-maintenance": {
      title: "Devenez technicien hardware certifié CompTIA A+",
      text: COMMON_TEXTS.FORMATION_CALL_TO_ACTION,
    },
    "/formations/virtualization-training": {
      title:
        "Maîtrisez VMware, Docker et Kubernetes - Compétences #1 du marché",
      text: COMMON_TEXTS.FORMATION_CALL_TO_ACTION,
    },
  },
};

interface ContactInfoPageProps {
  dynamicTitle?: string;
  dynamicText?: string;
}

const ContactInfoPage = ({
  dynamicTitle,
  dynamicText,
}: ContactInfoPageProps) => {
  const location = useLocation();

  const content = TEXT_CONSTANTS.PATH_CONTENT_MAP[location.pathname] || {
    title: TEXT_CONSTANTS.DEFAULT_TITLE,
    text: TEXT_CONSTANTS.DEFAULT_TEXT,
  };

  const currentDynamicTitle = dynamicTitle || content.title;
  const currentDynamicText = dynamicText || content.text;

  if (location.pathname === TEXT_CONSTANTS.CONTACT_PAGE_PATH) {
    return null;
  }

  return (
    <section className="bg-gradient-to-b from-transparent to-black py-16 md:py-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4 px-4 py-1 bg-gray-50 text-gray-700 rounded-full text-sm font-semibold">
            {TEXT_CONSTANTS.CONTACT_US_LABEL}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {TEXT_CONSTANTS.MAIN_HEADING}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {TEXT_CONSTANTS.MAIN_DESCRIPTION}
          </p>
        </div>

        <div className="bg-gradient-to-b from-transparent to-black rounded-3xl shadow-xl p-8 md:p-12 flex flex-col items-center space-y-8 border border-gray-700">
          <div className="text-center max-w-3xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              {currentDynamicTitle}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {currentDynamicText}
            </p>
          </div>

          <a
            href={TEXT_CONSTANTS.CONTACT_PAGE_PATH}
            className="inline-flex items-center justify-center bg-white text-gray-900 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-75"
          >
            {TEXT_CONSTANTS.CONTACT_BUTTON_TEXT}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoPage;
