import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, BarChart, AlertTriangle, Clock4, Rocket, Zap, Sparkles, ArrowRight } from "lucide-react";
// import { useIsMobile } from "@/hooks/use-mobile"; // This import was not used in the original code.
import { Link } from "react-router-dom";

// Constants for the WhyWrlds component texts
const WHY_WRLDS_TEXT_CONSTANTS = {
  SECTION_TITLE: "Pourquoi Zetoun Labs ?",
  SECTION_SUBTITLE: "Face à la complexité croissante de la technologie, nous apportons des solutions claires, fiables et adaptées pour assurer votre succès",
  STAT_1_SUFFIX: " Milliard",
  STAT_1_DESCRIPTION: "D’ici 2030, la demande en solutions logicielles sur mesure explosera. Avec cette ascension, toutes les entreprises auront besoin d’une infrastructure IT solide et évolutive.",
  STAT_2_SUFFIX: "%",
  STAT_2_DESCRIPTION: "Une grande partie des projets IT échouent dès la phase de validation, souvent à cause d’une coordination insuffisante et d’une expertise dispersée.",
  STAT_3_SUFFIX: "%",
  STAT_3_DESCRIPTION: "Les délais de mise en œuvre des solutions IT s’allongent, entraînant des coûts supplémentaires et freinant la compétitivité locale.",
  WHAT_WE_DO_TITLE: "Ce que fait Zetoun Labs pour vous",
  WHAT_WE_DO_SUBTITLE: "Nous accompagnons votre entreprise en fournissant des solutions IT innovantes, fiables et adaptées à vos besoins spécifiques.",
  FEATURE_1_TITLE: "Optimisation des processus",
  FEATURE_1_DESCRIPTION: "Automatisation et simplification des tâches pour gagner en efficacité.",
  FEATURE_2_TITLE: "Amélioration de la communication",
  FEATURE_2_DESCRIPTION: "Meilleure collaboration interne et externe grâce à des outils connectés.",
  FEATURE_3_TITLE: "Sécurité renforcée",
  FEATURE_3_DESCRIPTION: "Protection accrue des données et des infrastructures contre les menaces.",
  FEATURE_4_TITLE: "Agilité et innovation",
  FEATURE_4_DESCRIPTION: "Capacité à s’adapter rapidement aux changements du marché et à innover continuellement.",
  LEARN_MORE_BUTTON: "En savoir plus sur notre processus de déploiement structuré",
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
    <section id="why-wrlds" className="relative py-16 md:py-24 bg-white overflow-hidden">
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
          <motion.p variants={itemVariants} className="text-gray-600 text-lg max-w-3xl mx-auto">
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
          <motion.div variants={itemVariants} className="bg-gray-100 p-6 rounded-xl border border-gray-200 text-center hover:bg-gray-200 transition-all">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
              <BarChart className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-gray-900 text-2xl lg:text-3xl font-bold mb-3">
              <AnimatedCounter end={1.8} decimals={1} suffix={WHY_WRLDS_TEXT_CONSTANTS.STAT_1_SUFFIX} /> USD
            </h3>
            <p className="text-gray-700">
              {WHY_WRLDS_TEXT_CONSTANTS.STAT_1_DESCRIPTION}
            </p>
          </motion.div>

          {/* Stat 2: IT project failure rate */}
          <motion.div variants={itemVariants} className="bg-gray-100 p-6 rounded-xl border border-gray-200 text-center hover:bg-gray-200 transition-all">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-gray-900 text-2xl lg:text-3xl font-bold mb-3">
              <AnimatedCounter end={60} suffix={WHY_WRLDS_TEXT_CONSTANTS.STAT_2_SUFFIX} />
            </h3>
            <p className="text-gray-700">
              {WHY_WRLDS_TEXT_CONSTANTS.STAT_2_DESCRIPTION}
            </p>
          </motion.div>

          {/* Stat 3: IT solution implementation delays */}
          <motion.div variants={itemVariants} className="bg-gray-100 p-6 rounded-xl border border-gray-200 text-center hover:bg-gray-200 transition-all">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
              <Clock4 className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-gray-900 text-2xl lg:text-3xl font-bold mb-3">
              <AnimatedCounter end={80} suffix={WHY_WRLDS_TEXT_CONSTANTS.STAT_3_SUFFIX} />
            </h3>
            <p className="text-gray-700">
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
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-start">
                <div className="bg-gray-200 rounded-full p-3 mr-4">
                  <BarChart className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_1_TITLE}</h4>
                  <p className="text-gray-700">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_1_DESCRIPTION}</p>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Communication Improvement */}
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-start">
                <div className="bg-gray-200 rounded-full p-3 mr-4">
                  <Sparkles className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_2_TITLE}</h4>
                  <p className="text-gray-700">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_2_DESCRIPTION}</p>
                </div>
              </div>
            </motion.div>

            {/* Feature 3: Enhanced Security */}
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-start">
                <div className="bg-gray-200 rounded-full p-3 mr-4">
                  <Zap className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_3_TITLE}</h4>
                  <p className="text-gray-700">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_3_DESCRIPTION}</p>
                </div>
              </div>
            </motion.div>

            {/* Feature 4: Agility and Innovation */}
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-start">
                <div className="bg-gray-200 rounded-full p-3 mr-4">
                  <Rocket className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_4_TITLE}</h4>
                  <p className="text-gray-700">{WHY_WRLDS_TEXT_CONSTANTS.FEATURE_4_DESCRIPTION}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Learn More Button */}
          <motion.div variants={itemVariants} className="text-center mt-10">
            <Link
              to={WHY_WRLDS_TEXT_CONSTANTS.LEARN_MORE_LINK}
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all group"
            >
              {WHY_WRLDS_TEXT_CONSTANTS.LEARN_MORE_BUTTON}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyWrlds;
