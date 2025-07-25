import { ArrowRight, Server, BookOpen, LifeBuoy, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const TEXTS = {
  IMAGE_ALT_PRIMARY: "Bureau moderne de Zetoun Labs avec équipements informatiques et professionnels en discussion à Kinshasa",
  IMAGE_ALT_FALLBACK: "Image de remplacement pour l'arrière-plan de Zetoun Labs",
  
  HERO_TITLE: "Votre infrastructure, Notre expertise en IT à Kinshasa.",
  HERO_TITLE_MOBILE: "Expertise IT à Kinshasa.",

  HERO_SUBTITLE: "Zetoun Labs offre des services informatiques sur mesure, des formations certifiantes et un support technique fiable pour particuliers et entreprises à Kinshasa, RDC. Nous sommes experts en ingénierie réseau, développement web, cybersécurité, infogérance et installation solaire.",
  HERO_SUBTITLE_MOBILE: "Services IT sur mesure, formations certifiantes et support technique fiable pour particuliers et entreprises à Kinshasa.", // Version courte pour mobile
  
  BUTTON_PROJECTS: "Découvrez nos projets IT",
  BUTTON_CONTACT: "Contactez-nous pour vos besoins IT",

  SERVICE_IT_TITLE: "Services IT Complet",
  SERVICE_IT_DESCRIPTION: "Conception, déploiement et maintenance de vos infrastructures informatiques pour une performance optimale.",
  FORMATION_IT_TITLE: "Formations IT Certifiantes",
  FORMATION_IT_DESCRIPTION: "Formations personnalisées en technologies de l'information (IT) pour tous les niveaux, du débutant à l'expert.",
  SUPPORT_IT_TITLE: "Support Technique IT Fiable",
  SUPPORT_IT_DESCRIPTION: "Assistance technique rapide et fiable pour résoudre vos problèmes informatiques et assurer la continuité de vos opérations.",
};

const Hero = () => {
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const imageUrl = "/lovable-uploads/img/hero.png";
  const placeholderImageUrl = "/lovable-uploads/img/placeholder-hero.png";

  return (
    <motion.div className="relative mt-16 md:mt-0 w-full max-w-[100vw]" initial="hidden" animate="visible" variants={containerVariants}>

      <div className="banner-container bg-black relative overflow-hidden h-[700px] md:h-[750px] w-full">
        <div className="absolute inset-0 bg-black w-full">
          <img
            src={imageUrl}
            alt={TEXTS.IMAGE_ALT_PRIMARY}
            className={`w-full h-full object-cover opacity-70 grayscale ${isMobile ? 'object-right' : 'object-center'}`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = placeholderImageUrl;
              e.currentTarget.alt = TEXTS.IMAGE_ALT_FALLBACK;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-white"></div>
        </div>

        <div className="banner-overlay bg-transparent pt-21 md:pt-24 w-full">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
            <motion.div className="w-full max-w-4xl text-center" variants={itemVariants}>
              <motion.h1 className="banner-title text-white text-3xl md:text-5xl lg:text-6xl font-bold" variants={itemVariants}>
                {/* MODIFIÉ : Affiche le titre court sur mobile, le titre long sinon */}
                {isMobile ? TEXTS.HERO_TITLE_MOBILE : TEXTS.HERO_TITLE}
              </motion.h1>
              <motion.p className="banner-subtitle text-gray-300 mt-4 md:mt-6 text-sm md:text-base max-w-2xl mx-auto" variants={itemVariants}>
                {/* MODIFIÉ : Affiche le sous-titre court sur mobile, le long sinon */}
                {isMobile ? TEXTS.HERO_SUBTITLE_MOBILE : TEXTS.HERO_SUBTITLE}
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8 justify-center" variants={itemVariants}>
                <Link
                  to="/projects"
                  className="px-6 md:px-8 py-2 md:py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all shadow-lg hover:shadow-xl hover:shadow-gray-300/20 flex items-center justify-center group text-sm md:text-base"
                >
                  {TEXTS.BUTTON_PROJECTS}
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 md:px-8 py-2 md:py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:shadow-gray-300/20 flex items-center justify-center group text-sm md:text-base"
                >
                  {TEXTS.BUTTON_CONTACT}
                  <MessageSquare className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4" variants={containerVariants} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
          <motion.div key="service-it" variants={itemVariants}>
            <Link
              to="/services/it-management"
              className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md block"
              aria-label={`Découvrir nos ${TEXTS.SERVICE_IT_TITLE}`}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 flex items-center justify-center rounded-lg text-gray-500 mb-2 md:mb-3">
                <Server className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">{TEXTS.SERVICE_IT_TITLE}</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                {TEXTS.SERVICE_IT_DESCRIPTION}
              </p>
            </Link>
          </motion.div>

          <motion.div key="formation-it" variants={itemVariants}>
            <Link
              to="/formations"
              className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md block"
              aria-label={`Découvrir nos ${TEXTS.FORMATION_IT_TITLE}`}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 flex items-center justify-center rounded-lg text-gray-500 mb-2 md:mb-3">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">{TEXTS.FORMATION_IT_TITLE}</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                {TEXTS.FORMATION_IT_DESCRIPTION}
              </p>
            </Link>
          </motion.div>

          <motion.div key="support-it" variants={itemVariants}>
            <Link
              to="/services/technical-support"
              className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md block"
              aria-label={`Découvrir notre ${TEXTS.SUPPORT_IT_TITLE}`}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 flex items-center justify-center rounded-lg text-gray-500 mb-2 md:mb-3">
                <LifeBuoy className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">{TEXTS.SUPPORT_IT_TITLE}</h3>
              <p className="text-gray-600 text-xs md:text-sm">
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
