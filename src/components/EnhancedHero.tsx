import { ENDPOINTS } from "@/config/api.config";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import type { Statistic, StatisticsResponse } from "@/types/api";
import { parseApiResponse } from "@/utils/apiMessages";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  LifeBuoy,
  MessageSquare,
  Server,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  CheckCircle,
  Star,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TEXTS = {
  IMAGE_ALT_PRIMARY: "Bureau moderne de Zetoun Labs avec équipements informatiques et professionnels en discussion à Kinshasa",
  IMAGE_ALT_FALLBACK: "Image de remplacement pour l'arrière-plan de Zetoun Labs",

  HERO_TITLE: "Votre Partenaire IT de Confiance à Kinshasa",
  HERO_TITLE_MOBILE: "Expert IT à Kinshasa",

  HERO_SUBTITLE: "Solutions informatiques complètes, formations certifiantes et support technique d'excellence pour propulser votre entreprise vers le succès numérique.",
  HERO_SUBTITLE_MOBILE: "Services IT sur mesure et formations professionnelles à Kinshasa.",

  BUTTON_PROJECTS: "Découvrir nos réalisations",
  BUTTON_CONTACT: "Démarrer un projet",

  SERVICE_IT_TITLE: "Services IT Premium",
  SERVICE_IT_DESCRIPTION: "Infrastructure robuste et solutions sur mesure pour votre croissance digitale.",

  FORMATION_IT_TITLE: "Formations Expertes",
  FORMATION_IT_DESCRIPTION: "Programmes certifiants dispensés par des professionnels du secteur.",

  SUPPORT_IT_TITLE: "Support 24/7",
  SUPPORT_IT_DESCRIPTION: "Assistance technique réactive pour garantir votre continuité opérationnelle.",

  TRUST_BADGES: [
    { icon: CheckCircle, text: "Solutions Garanties", highlight: true },
    { icon: Users, text: "500+ Clients Satisfaits" },
    { icon: Star, text: "4.9/5 Note Moyenne" },
    { icon: Shield, text: "Certifié ISO 27001" }
  ]
};

const EnhancedHero = () => {
  const isMobile = useIsMobile();
  const [quickStats, setQuickStats] = useState<Statistic[]>([]);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const url = new URL(ENDPOINTS.STATISTICS.LIST);
        url.searchParams.set("limit", "3");
        const response = await fetch(url.toString());
        const { ok, data } = await parseApiResponse(response);
        if (cancelled) return;
        if (ok && data && typeof data === 'object' && 'statistics' in data) {
          const res = data as unknown as StatisticsResponse;
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      },
    },
  };

  const floatingVariants = {
    hidden: { y: 0 },
    visible: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

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
      ref={ref}
      className="relative mt-16 md:mt-0 w-full max-w-[100vw]"
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Hero Banner */}
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
                "linear-gradient(135deg, #000000 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)",
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
            variants={floatingVariants}
          />
          <motion.div
            className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
            variants={floatingVariants}
            style={{ transitionDelay: "1s" }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl"
            variants={floatingVariants}
            style={{ transitionDelay: "2s" }}
          />
        </div>

        {/* Hero Content */}
        <div className="banner-overlay bg-transparent pt-21 md:pt-24 w-full relative z-10">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
            <motion.div
              className="w-full max-w-5xl text-center"
              variants={itemVariants}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center space-x-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 mb-6"
                variants={itemVariants}
              >
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">Leader des solutions IT en RDC</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                className="banner-title text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                variants={itemVariants}
              >
                {isMobile ? TEXTS.HERO_TITLE_MOBILE : TEXTS.HERO_TITLE}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="banner-subtitle text-gray-300 mt-4 md:mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                {isMobile ? TEXTS.HERO_SUBTITLE_MOBILE : TEXTS.HERO_SUBTITLE}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8 md:mt-10 justify-center"
                variants={itemVariants}
              >
                <Link
                  to="/#projects"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 flex items-center justify-center text-lg font-semibold"
                >
                  {TEXTS.BUTTON_PROJECTS}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/add/contact-nous"
                  className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center text-lg font-semibold"
                >
                  {TEXTS.BUTTON_CONTACT}
                  <MessageSquare className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                className="flex flex-wrap justify-center items-center gap-6 mt-10"
                variants={itemVariants}
              >
                {TEXTS.TRUST_BADGES.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-300">
                    <badge.icon className={`w-5 h-5 ${badge.highlight ? 'text-blue-400' : 'text-gray-400'}`} />
                    <span className={`text-sm ${badge.highlight ? 'text-blue-300 font-medium' : ''}`}>
                      {badge.text}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {quickStats.length > 0 && (
        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 mx-auto -mt-16 pb-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat._id}
                variants={itemVariants}
                className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200/50 text-center hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {stat.value.toLocaleString()}
                  {stat.unit && (
                    <span className="text-lg text-gray-600 ml-1">{stat.unit}</span>
                  )}
                </div>
                <div className="text-sm md:text-base text-gray-700 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Service Cards */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mx-auto pb-12">
        <motion.div
          className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
        >
          <motion.div variants={itemVariants}>
            <Link
              to="/services/it-management"
              className="group bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200/50 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl block"
              aria-label={`Découvrir nos ${TEXTS.SERVICE_IT_TITLE}`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Server className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                {TEXTS.SERVICE_IT_TITLE}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {TEXTS.SERVICE_IT_DESCRIPTION}
              </p>
              <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                En savoir plus
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              to="/formations/linux-administration"
              className="group bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200/50 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl block"
              aria-label={`Découvrir nos ${TEXTS.FORMATION_IT_TITLE}`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                {TEXTS.FORMATION_IT_TITLE}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {TEXTS.FORMATION_IT_DESCRIPTION}
              </p>
              <div className="mt-4 flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                En savoir plus
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              to="/services/technical-support"
              className="group bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200/50 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl block"
              aria-label={`Découvrir notre ${TEXTS.SUPPORT_IT_TITLE}`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <LifeBuoy className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-green-600 transition-colors">
                {TEXTS.SUPPORT_IT_TITLE}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {TEXTS.SUPPORT_IT_DESCRIPTION}
              </p>
              <div className="mt-4 flex items-center text-green-600 font-medium group-hover:text-green-700">
                En savoir plus
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-gray-50 to-white pointer-events-none"></div>
    </motion.div>
  );
};

export default EnhancedHero;
