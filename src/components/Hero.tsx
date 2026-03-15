import { ENDPOINTS } from "@/config/api.config";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Statistic, StatisticsResponse } from "@/types/api";
import { parseApiResponse } from "@/utils/apiMessages";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  LifeBuoy,
  MessageSquare,
  Server,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TEXTS = {
  IMAGE_ALT_PRIMARY:
    "Bureau moderne de Zetoun Labs avec équipements informatiques et professionnels en discussion à Kinshasa",
  IMAGE_ALT_FALLBACK:
    "Image de remplacement pour l'arrière-plan de Zetoun Labs",

  HERO_TITLE: "Transformons votre infrastructure IT en avantage compétitif",
  HERO_TITLE_MOBILE: "Excellence IT à Kinshasa",

  HERO_SUBTITLE:
    "Révolutionnez votre entreprise avec des solutions IT de pointe - Développement web de nouvelle génération, cybersécurité militaire, ingénierie réseau haute performance et énergie solaire innovante. Votre partenaire stratégique pour la transformation digitale en RDC.",
  HERO_SUBTITLE_MOBILE:
    "Solutions IT révolutionnaires - Développement, Cybersécurité, Réseaux & Énergie Solaire à Kinshasa.",

  BUTTON_PROJECTS: "Découvrir nos réalisations exceptionnelles",
  BUTTON_CONTACT: "Démarrer votre transformation digitale",

  SERVICE_IT_TITLE: "Solutions IT de pointe",
  SERVICE_IT_DESCRIPTION:
    "Architecture cloud, développement sur mesure et cybersécurité avancée pour propulser votre entreprise vers l'excellence.",
  FORMATION_IT_TITLE: "Formations certifiantes d'excellence",
  FORMATION_IT_DESCRIPTION:
    "Devenez expert IT avec nos formations reconnues internationalement - De débutant à architecte solutions en 12 mois.",
  SUPPORT_IT_TITLE: "Support technique 24/7",
  SUPPORT_IT_DESCRIPTION:
    "Intervention garantie en moins de 2h - Résolution 95% des problèmes dès le premier contact pour une continuité parfaite.",
};

const Hero = () => {
  const isMobile = useIsMobile();
  const [quickStats, setQuickStats] = useState<Statistic[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const url = new URL(ENDPOINTS.STATISTICS.LIST);
        url.searchParams.set("limit", "3");
        const response = await fetch(url.toString());
        const { ok, data } = await parseApiResponse(response);
        if (cancelled) return;
        if (ok) {
          const res = data as StatisticsResponse;
          if (res.statistics?.length) {
            setQuickStats(res.statistics.slice(0, 3));
          }
        }
      } catch (err) {
        if (!cancelled) console.error("Erreur chargement stats:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const quickStatItems = quickStats.map((stat) => (
    <motion.div
      key={stat._id}
      variants={itemVariants}
      className="text-center bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
    >
      <div className="text-2xl md:text-3xl font-bold text-white mb-1">
        {stat.value.toLocaleString()}
        {stat.unit && (
          <span className="text-lg text-gray-200 ml-1">{stat.unit}</span>
        )}
      </div>
      <div className="text-xs md:text-sm text-gray-200 font-medium">
        {stat.label}
      </div>
    </motion.div>
  ));

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const imageUrl = "/lovable-uploads/img/hero.png";
  const placeholderImageUrl = "/lovable-uploads/img/placeholder-hero.png";

  return (
    <motion.div
      className="relative mt-16 md:mt-0 w-full max-w-[100vw]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="banner-container bg-black relative overflow-hidden h-[700px] md:h-[750px] w-full">
        <div className="absolute inset-0 w-full">
          <img
            src={imageUrl}
            alt={TEXTS.IMAGE_ALT_PRIMARY}
            className={`w-full h-full object-cover opacity-60 grayscale group-hover:scale-110 transition-transform duration-700 ${isMobile ? "object-right" : "object-center"}`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = placeholderImageUrl;
              e.currentTarget.alt = TEXTS.IMAGE_ALT_FALLBACK;
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, #000000 0%, #111827 30%, #374151 60%, #6b7280 80%, #e5e7eb 95%, #f9fafb 100%)",
            }}
          ></div>
        </div>
        <div className="banner-overlay bg-transparent pt-21 md:pt-24 w-full">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
            <motion.div
              className="w-full max-w-4xl text-center"
              variants={itemVariants}
            >
              <motion.h1
                className="banner-title text-white text-3xl md:text-5xl lg:text-6xl font-bold"
                variants={itemVariants}
              >
                {/* MODIFIÉ : Affiche le titre court sur mobile, le titre long sinon */}
                {isMobile ? TEXTS.HERO_TITLE_MOBILE : TEXTS.HERO_TITLE}
              </motion.h1>
              <motion.p
                className="banner-subtitle text-gray-300 mt-4 md:mt-6 text-sm md:text-base max-w-2xl mx-auto"
                variants={itemVariants}
              >
                {/* MODIFIÉ : Affiche le sous-titre court sur mobile, le long sinon */}
                {isMobile ? TEXTS.HERO_SUBTITLE_MOBILE : TEXTS.HERO_SUBTITLE}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8 justify-center"
                variants={itemVariants}
              >
                <Link
                  to="/#projects"
                  className="px-6 md:px-8 py-3 md:py-4 bg-white/90 backdrop-blur-sm text-gray-900 rounded-xl hover:bg-white transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center group text-sm md:text-base font-semibold border border-gray-200/50"
                >
                  {TEXTS.BUTTON_PROJECTS}
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/add/contact-nous"
                  className="px-6 md:px-8 py-3 md:py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center group text-sm md:text-base font-semibold"
                >
                  {TEXTS.BUTTON_CONTACT}
                  <MessageSquare className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {quickStats.length > 0 && (
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mx-auto mt-8 pb-8">
          <motion.div
            className="grid grid-cols-3 gap-4 max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {quickStatItems}
          </motion.div>
        </div>
      )}

      {/* Transition gradient pour fusionner avec la section suivante */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-gray-200/40 to-white pointer-events-none"></div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mx-auto -mt-24 pb-12">
        <motion.div
          className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <motion.div key="service-it" variants={itemVariants}>
            <Link
              to="/services/it-management"
              className="bg-white/90 backdrop-blur-sm p-5 md:p-6 rounded-2xl shadow-lg border border-gray-200/50 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl block group"
              aria-label={`Découvrir nos ${TEXTS.SERVICE_IT_TITLE}`}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center rounded-xl text-white mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Server className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-gray-900 group-hover:text-gray-700 transition-colors">
                {TEXTS.SERVICE_IT_TITLE}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                {TEXTS.SERVICE_IT_DESCRIPTION}
              </p>
            </Link>
          </motion.div>

          <motion.div key="formation-it" variants={itemVariants}>
            <Link
              to="/formations/linux-administration"
              className="bg-white/90 backdrop-blur-sm p-5 md:p-6 rounded-2xl shadow-lg border border-gray-200/50 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl block group"
              aria-label={`Découvrir nos ${TEXTS.FORMATION_IT_TITLE}`}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center rounded-xl text-white mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <BookOpen className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-gray-900 group-hover:text-gray-700 transition-colors">
                {TEXTS.FORMATION_IT_TITLE}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                {TEXTS.FORMATION_IT_DESCRIPTION}
              </p>
            </Link>
          </motion.div>

          <motion.div key="support-it" variants={itemVariants}>
            <Link
              to="/services/technical-support"
              className="bg-white/90 backdrop-blur-sm p-5 md:p-6 rounded-2xl shadow-lg border border-gray-200/50 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl block group"
              aria-label={`Découvrir notre ${TEXTS.SUPPORT_IT_TITLE}`}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center rounded-xl text-white mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <LifeBuoy className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-gray-900 group-hover:text-gray-700 transition-colors">
                {TEXTS.SUPPORT_IT_TITLE}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                {TEXTS.SUPPORT_IT_DESCRIPTION}
              </p>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
