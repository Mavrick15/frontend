import React, { useEffect, useState } from 'react';
import { Network, Repeat, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from "framer-motion";
import ProjectPageLayout from '@/components/ProjectPageLayout';
import SEO from '@/components/SEO';

const PoliceJudiciaire = () => {
  const [isMobile, setIsMobile] = useState(false);

  const TEXT_CONSTANTS = {
    FULL_TITLE: "Réhabilitation critique de l'infrastructure IT de la Police Judiciaire",
    MOBILE_TITLE: "Police Judiciaire",
    SUBTITLE: "Transformation complète du réseau - De l'obsolescence à une infrastructure haute performance, sécurisée et redondante.",
    IMAGE_URL: "/lovable-uploads/img/police.png",
    BRAND_NAME: "Zetoun Labs",
    IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour l'infrastructure IT de la Police judiciaire en noir et blanc",
    SEO_TITLE: "Infrastructure IT Police Judiciaire - Transformation Réseau | Zetoun Labs",
    SEO_DESCRIPTION: "Étude de cas : Zetoun Labs modernise l'infrastructure réseau de la Police Judiciaire à Kinshasa - Performance x10, sécurité militaire et disponibilité 99.9%.",
    SEO_KEYWORDS: [
      'infrastructure IT',
      'réhabilitation réseau',
      'police judiciaire Kinshasa',
      'sécurité réseau',
      'haute disponibilité IT',
      'optimisation performance réseau',
      'étude de cas IT',
      'Zetoun Labs Kinshasa'
    ],
    CASE_STUDY_TITLE: "Étude de Cas : Réhabilitation de l’infrastructure IT de la Police judiciaire - Zetoun Labs",
    CONTEXT_TITLE: "Contexte",
    CONTEXT_PARAGRAPH: "L’infrastructure réseau de la Police judiciaire était devenue obsolète et dysfonctionnelle depuis un certain temps, compromettant gravement la qualité et l’efficacité des services administratifs. Le réseau souffrait de performances médiocres, de limitations en termes de capacité et de fiabilité, ainsi que d’une sécurité défaillante, exposant ainsi les systèmes à des menaces importantes.",
    CHALLENGE_TITLE: "Défi",
    CHALLENGE_PARAGRAPH: "Moderniser l'infrastructure réseau du Commissariat pour offrir performance, sécurité renforcée, haute disponibilité des services et évolutivité face aux besoins futurs.",
    SOLUTION_TITLE: "Solution",
    SOLUTION_INTRO_PARAGRAPH: "Notre équipe a conçu et déployé une infrastructure réseau moderne, sécurisée et redondante intégrant des équipements de dernière génération. Les actions clés incluent :",
    SOLUTION_REFONTE_TITLE: "Refonte complète",
    SOLUTION_REFONTE_DESC: "Mise en place d’une topologie hiérarchisée et structurée pour optimiser les performances et simplifier la gestion.",
    SOLUTION_SECURISATION_TITLE: "Sécurisation avancée",
    SOLUTION_SECURISATION_DESC: "Déploiement de pare-feux, VLANs, contrôle d’accès et segmentation du réseau pour protéger les données sensibles.",
    SOLUTION_HAUTE_DISPONIBILITE_TITLE: "Haute disponibilité",
    SOLUTION_HAUTE_DISPONIBILITE_DESC: "Intégration de solutions redondantes (liens, équipements) pour assurer une continuité de service sans interruption.",
    SOLUTION_EVOLUTIVITE_TITLE: "Évolutivité",
    SOLUTION_EVOLUTIVITE_DESC: "Conception d’une infrastructure évolutive, capable d’absorber la montée en charge et de s’adapter aux besoins futurs.",
    ADVANTAGES_TITLE: "Avantages",
    ADVANTAGE1_TITLE: "Connectivité optimisée",
    ADVANTAGE1_DESC: "Des performances réseau élevées dans tous les services, assurant un fonctionnement fluide des opérations.",
    ADVANTAGE2_TITLE: "Sécurité des données renforcée",
    ADVANTAGE2_DESC: "Protection des données confidentielles grâce à une infrastructure conforme aux normes de cybersécurité.",
    ADVANTAGE3_TITLE: "Haute disponibilité des services",
    ADVANTAGE3_DESC: "Architecture redondante permettant une continuité des services, même en cas de panne.",
    ADVANTAGE4_TITLE: "Évolutivité assurée",
    ADVANTAGE4_DESC: "Un réseau pensé pour s’adapter facilement aux besoins futurs et aux évolutions technologiques.",
    ADVANTAGE5_TITLE: "Réduction des coûts de maintenance",
    ADVANTAGE5_DESC: "Une infrastructure modernisée, plus stable et plus simple à administrer, réduisant les interventions techniques répétées.",
    RESULTS_TITLE: "Résultat",
    RESULTS_PARAGRAPH: "La réhabilitation du réseau informatique du commissariat avait permis d’atteindre un niveau de performance et de fiabilité nettement supérieur. Grâce à une infrastructure modernisée, sécurisée et évolutive, le commissariat avait disposé d’un environnement numérique stable, capable de soutenir efficacement ses missions critiques, avec une réduction notable des interruptions de service et une meilleure gestion des flux d’informations sensibles.",
    MAIN_IMAGE_ALT: "[Image de l'infrastructure IT de la Police judiciaire]",
    SEO_IMAGE_URL: "/lovable-uploads/img/police.jpg",
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const listItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <ProjectPageLayout
      title={isMobile ? TEXT_CONSTANTS.MOBILE_TITLE : TEXT_CONSTANTS.FULL_TITLE}
      subtitle={TEXT_CONSTANTS.SUBTITLE}
      imageUrl={TEXT_CONSTANTS.IMAGE_URL}
      brandName={TEXT_CONSTANTS.BRAND_NAME}
      darkMode={true}
      imageOnError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "https://placehold.co/1200x600/000000/FFFFFF?text=Police+Judiciaire";
        e.currentTarget.alt = TEXT_CONSTANTS.IMAGE_PLACEHOLDER_ALT;
      }}
    >
      <SEO
        title={TEXT_CONSTANTS.SEO_TITLE}
        description={TEXT_CONSTANTS.SEO_DESCRIPTION}
        keywords={TEXT_CONSTANTS.SEO_KEYWORDS}
        imageUrl={TEXT_CONSTANTS.SEO_IMAGE_URL}
      />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-gray-900"
      >
        {TEXT_CONSTANTS.CASE_STUDY_TITLE}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-lg mb-8 hover:shadow-xl transition-all duration-300"
      >
        <h3 className="text-2xl font-bold mb-4 text-gray-900">{TEXT_CONSTANTS.CONTEXT_TITLE}</h3>
        <p className="text-gray-700 text-justify leading-relaxed text-base">
          {TEXT_CONSTANTS.CONTEXT_PARAGRAPH}
        </p>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-2xl md:text-3xl font-bold mb-4 mt-12 text-gray-900"
      >
        {TEXT_CONSTANTS.CHALLENGE_TITLE}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-700 text-justify leading-relaxed text-base bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50"
      >
        {TEXT_CONSTANTS.CHALLENGE_PARAGRAPH}
      </motion.p>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-2xl md:text-3xl font-bold mb-4 mt-12 text-gray-900"
      >
        {TEXT_CONSTANTS.SOLUTION_TITLE}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-gray-700 text-justify leading-relaxed text-base mb-6"
      >
        {TEXT_CONSTANTS.SOLUTION_INTRO_PARAGRAPH}
      </motion.p>

      <motion.div
        className="grid md:grid-cols-2 gap-6 my-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <motion.div 
          variants={listItemVariants} 
          transition={{ duration: 0.4 }} 
          className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-gray-200/50 flex items-start hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors mr-4">
            <Network className="h-6 w-6 text-gray-900 flex-shrink-0" />
          </div>
          <div>
            <h4 className="text-lg font-bold mb-2 text-gray-900">{TEXT_CONSTANTS.SOLUTION_REFONTE_TITLE}</h4>
            <p className="text-gray-700 text-justify leading-relaxed">{TEXT_CONSTANTS.SOLUTION_REFONTE_DESC}</p>
          </div>
        </motion.div>

        <motion.div 
          variants={listItemVariants} 
          transition={{ duration: 0.4 }} 
          className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-gray-200/50 flex items-start hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors mr-4">
            <ShieldCheck className="h-6 w-6 text-gray-900 flex-shrink-0" />
          </div>
          <div>
            <h4 className="text-lg font-bold mb-2 text-gray-900">{TEXT_CONSTANTS.SOLUTION_SECURISATION_TITLE}</h4>
            <p className="text-gray-700 text-justify leading-relaxed">{TEXT_CONSTANTS.SOLUTION_SECURISATION_DESC}</p>
          </div>
        </motion.div>

        <motion.div 
          variants={listItemVariants} 
          transition={{ duration: 0.4 }} 
          className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-gray-200/50 flex items-start hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors mr-4">
            <Repeat className="h-6 w-6 text-gray-900 flex-shrink-0" />
          </div>
          <div>
            <h4 className="text-lg font-bold mb-2 text-gray-900">{TEXT_CONSTANTS.SOLUTION_HAUTE_DISPONIBILITE_TITLE}</h4>
            <p className="text-gray-700 text-justify leading-relaxed">{TEXT_CONSTANTS.SOLUTION_HAUTE_DISPONIBILITE_DESC}</p>
          </div>
        </motion.div>

        <motion.div 
          variants={listItemVariants} 
          transition={{ duration: 0.4 }} 
          className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-gray-200/50 flex items-start hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors mr-4">
            <TrendingUp className="h-6 w-6 text-gray-900 flex-shrink-0" />
          </div>
          <div>
            <h4 className="text-lg font-bold mb-2 text-gray-900">{TEXT_CONSTANTS.SOLUTION_EVOLUTIVITE_TITLE}</h4>
            <p className="text-gray-700 text-justify leading-relaxed">{TEXT_CONSTANTS.SOLUTION_EVOLUTIVITE_DESC}</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-2xl md:text-3xl font-bold mb-6 mt-12 text-gray-900"
      >
        {TEXT_CONSTANTS.ADVANTAGES_TITLE}
      </motion.h3>
      <motion.div
        className="space-y-6 mb-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <motion.div 
          variants={listItemVariants} 
          transition={{ duration: 0.3 }} 
          className="flex items-start p-5 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center mr-4 mt-0.5 text-sm font-bold group-hover:scale-110 transition-transform">✓</div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">{TEXT_CONSTANTS.ADVANTAGE1_TITLE}</h4>
            <p className="text-gray-700 text-justify leading-relaxed">{TEXT_CONSTANTS.ADVANTAGE1_DESC}</p>
          </div>
        </motion.div>

        <motion.div 
          variants={listItemVariants} 
          transition={{ duration: 0.3 }} 
          className="flex items-start p-5 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center mr-4 mt-0.5 text-sm font-bold group-hover:scale-110 transition-transform">✓</div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">{TEXT_CONSTANTS.ADVANTAGE2_TITLE}</h4>
            <p className="text-gray-700 text-justify leading-relaxed">{TEXT_CONSTANTS.ADVANTAGE2_DESC}</p>
          </div>
        </motion.div>

        <motion.div 
          variants={listItemVariants} 
          transition={{ duration: 0.3 }} 
          className="flex items-start p-5 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center mr-4 mt-0.5 text-sm font-bold group-hover:scale-110 transition-transform">✓</div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">{TEXT_CONSTANTS.ADVANTAGE3_TITLE}</h4>
            <p className="text-gray-700 text-justify leading-relaxed">{TEXT_CONSTANTS.ADVANTAGE3_DESC}</p>
          </div>
        </motion.div>

        <motion.div 
          variants={listItemVariants} 
          transition={{ duration: 0.3 }} 
          className="flex items-start p-5 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center mr-4 mt-0.5 text-sm font-bold group-hover:scale-110 transition-transform">✓</div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">{TEXT_CONSTANTS.ADVANTAGE4_TITLE}</h4>
            <p className="text-gray-700 text-justify leading-relaxed">{TEXT_CONSTANTS.ADVANTAGE4_DESC}</p>
          </div>
        </motion.div>

        <motion.div 
          variants={listItemVariants} 
          transition={{ duration: 0.3 }} 
          className="flex items-start p-5 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center mr-4 mt-0.5 text-sm font-bold group-hover:scale-110 transition-transform">✓</div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">{TEXT_CONSTANTS.ADVANTAGE5_TITLE}</h4>
            <p className="text-gray-700 text-justify leading-relaxed">{TEXT_CONSTANTS.ADVANTAGE5_DESC}</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-2xl md:text-3xl font-bold mb-6 mt-12 text-gray-900"
      >
        {TEXT_CONSTANTS.RESULTS_TITLE}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="text-gray-700 text-justify leading-relaxed text-base bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-lg"
      >
        {TEXT_CONSTANTS.RESULTS_PARAGRAPH}
      </motion.p>
    </ProjectPageLayout>
  );
};

export default PoliceJudiciaire;
