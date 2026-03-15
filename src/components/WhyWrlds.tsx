import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, BarChart, AlertTriangle, Clock4, Rocket, Zap, Sparkles, ArrowRight } from "lucide-react";
// import { useIsMobile } from "@/hooks/use-mobile"; // This import was not used in the original code.
import { Link } from "react-router-dom";

// Constants for the WhyWrlds component texts
const WHY_WRLDS_TEXT_CONSTANTS = {
  SECTION_TITLE: "Pourquoi choisir Zetoun Labs ?",
  SECTION_SUBTITLE: "Dans un monde où 70% des projets IT échouent, nous affichons un taux de réussite de 98%. Découvrez ce qui fait notre différence",
  STAT_1_SUFFIX: " Milliard",
  STAT_1_DESCRIPTION: "D'ici 2030, le marché des solutions IT sur mesure atteindra des sommets. Les entreprises qui n'auront pas modernisé leur infrastructure seront dépassées par la concurrence.",
  STAT_2_SUFFIX: "%",
  STAT_2_DESCRIPTION: "Des projets IT échouent par manque d'expertise et de coordination. Chez Zetoun Labs, notre méthodologie éprouvée élimine ce risque dès le départ.",
  STAT_3_SUFFIX: "%",
  STAT_3_DESCRIPTION: "Des entreprises subissent des retards coûteux dans leur transformation digitale. Notre approche agile réduit les délais de livraison de 40%.",
  WHAT_WE_DO_TITLE: "Notre arsenal technologique à votre service",
  WHAT_WE_DO_SUBTITLE: "Des solutions IT de classe mondiale, conçues et déployées par des experts certifiés pour transformer durablement votre entreprise.",
  FEATURE_1_TITLE: "Automatisation intelligente",
  FEATURE_1_DESCRIPTION: "Réduisez vos coûts opérationnels de 50% grâce à l'automatisation IA de vos processus métiers.",
  FEATURE_2_TITLE: "Communication unifiée",
  FEATURE_2_DESCRIPTION: "Écosystème connecté avec collaboration temps réel - Productivité de vos équipes multipliée par 3.",
  FEATURE_3_TITLE: "Cybersécurité de niveau bancaire",
  FEATURE_3_DESCRIPTION: "Protection multicouche avec détection IA des menaces - Zéro breach enregistrée chez nos clients.",
  FEATURE_4_TITLE: "Innovation et agilité maximale",
  FEATURE_4_DESCRIPTION: "Time-to-market réduit de 60% - Déployez vos innovations avant vos concurrents avec notre stack technologique de pointe.",
  LEARN_MORE_BUTTON: "Découvrir notre processus de déploiement structuré en détail",
  LEARN_MORE_LINK: "/development-process",
};

const AnimatedCounter = ({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const inView = useInView(countRef, {
    once: true,
    margin: "-100px"
  });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const startAnimation = (timestamp: number) => {
      startTime = timestamp;
      animate(timestamp);
    };

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = progress * end;
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(startAnimation);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, inView]);

  return (
    <span ref={countRef} className="font-bold tabular-nums">
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

const WhyWrlds = () => {
  // const isMobile = useIsMobile(); // This hook was imported but not used.

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="why-wrlds" className="relative py-16 md:py-24 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title and Subtitle */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            {WHY_WRLDS_TEXT_CONSTANTS.SECTION_TITLE}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {WHY_WRLDS_TEXT_CONSTANTS.SECTION_SUBTITLE}
          </motion.p>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Stat 1: Demand for custom software solutions */}
          <motion.div variants={itemVariants} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 text-center hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2 group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <BarChart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-gray-900 text-2xl lg:text-3xl font-bold mb-3">
              <AnimatedCounter end={1.8} decimals={1} suffix={WHY_WRLDS_TEXT_CONSTANTS.STAT_1_SUFFIX} /> USD
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {WHY_WRLDS_TEXT_CONSTANTS.STAT_1_DESCRIPTION}
            </p>
          </motion.div>

          {/* Stat 2: IT project failure rate */}
          <motion.div variants={itemVariants} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 text-center hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2 group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-gray-900 text-2xl lg:text-3xl font-bold mb-3">
              <AnimatedCounter end={60} suffix={WHY_WRLDS_TEXT_CONSTANTS.STAT_2_SUFFIX} />
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {WHY_WRLDS_TEXT_CONSTANTS.STAT_2_DESCRIPTION}
            </p>
          </motion.div>

          {/* Stat 3: IT solution implementation delays */}
          <motion.div variants={itemVariants} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 text-center hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2 group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Clock4 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-gray-900 text-2xl lg:text-3xl font-bold mb-3">
              <AnimatedCounter end={80} suffix={WHY_WRLDS_TEXT_CONSTANTS.STAT_3_SUFFIX} />
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {WHY_WRLDS_TEXT_CONSTANTS.STAT_3_DESCRIPTION}
            </p>
          </motion.div>
        </motion.div>

        {/* What Zetoun Labs Does Section */}
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {WHY_WRLDS_TEXT_CONSTANTS.WHAT_WE_DO_TITLE}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {WHY_WRLDS_TEXT_CONSTANTS.WHAT_WE_DO_SUBTITLE}
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature 1: Process Optimization */}
            <motion.div variants={itemVariants} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-full p-3 mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <BarChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_1_TITLE}</h4>
                  <p className="text-gray-700 leading-relaxed">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_1_DESCRIPTION}</p>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Communication Improvement */}
            <motion.div variants={itemVariants} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-full p-3 mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_2_TITLE}</h4>
                  <p className="text-gray-700 leading-relaxed">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_2_DESCRIPTION}</p>
                </div>
              </div>
            </motion.div>

            {/* Feature 3: Enhanced Security */}
            <motion.div variants={itemVariants} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-full p-3 mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_3_TITLE}</h4>
                  <p className="text-gray-700 leading-relaxed">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_3_DESCRIPTION}</p>
                </div>
              </div>
            </motion.div>

            {/* Feature 4: Agility and Innovation */}
            <motion.div variants={itemVariants} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-full p-3 mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_4_TITLE}</h4>
                  <p className="text-gray-700 leading-relaxed">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_4_DESCRIPTION}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Learn More Button */}
          <motion.div variants={itemVariants} className="text-center mt-10">
            <Link
              to={WHY_WRLDS_TEXT_CONSTANTS.LEARN_MORE_LINK}
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all group shadow-lg hover:shadow-xl hover:-translate-y-1 font-semibold"
            >
              {WHY_WRLDS_TEXT_CONSTANTS.LEARN_MORE_BUTTON}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyWrlds;
