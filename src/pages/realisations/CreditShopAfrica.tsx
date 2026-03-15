import React, { useEffect, useState } from 'react';
import { Camera, MapPin, ShieldCheck, HardDrive, Smartphone } from 'lucide-react';
import { motion } from "framer-motion";
import SEO from '@/components/SEO';
import ProjectPageLayout from '@/components/ProjectPageLayout';

const CreditShopAfrica = () => {

  const TEXT_CONSTANTS = {
    FULL_TITLE: "Sécurité pour Credit Shop Africa - Zetoun Labs",
    MOBILE_TITLE: "Credit Shop Africa",
    BRAND_NAME: "CreditShopAfrica",
    IMAGE_URL: "/lovable-uploads/img/credit-shop-africa.png",
    GALLERY_IMAGES: [
      { src: "/lovable-uploads/img/project/g1.png", alt: "Installation initiale de la caméra", description: "Fin d'installation" },
      { src: "/lovable-uploads/img/project/g2.png", alt: "Vue du système de gestion", description: "Fin d'installation" },
      { src: "/lovable-uploads/img/project/g3.png", alt: "Vue du système de gestion", description: "Avec le DG de CSA" },
      { src: "/lovable-uploads/img/project/g4.png", alt: "Périmètre surveillé", description: "Devant l'écran de Monitoring" },
    ],
    SUBTITLE: "Déploiement d'un système de vidéosurveillance intelligent pour une protection totale des actifs.",
    IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour CreditShopAfrica en noir et blanc",
    SEO_DESCRIPTION: "Étude de cas : Zetoun Labs déploie un système de vidéosurveillance CP+ haute performance pour CreditShopAfrica à Kinshasa - Couverture 100%, zéro angle mort et surveillance temps réel.",
    SEO_KEYWORDS: [
      'sécurité CreditShopAfrica',
      'vidéosurveillance Kinshasa',
      'CP+',
      'système de sécurité neuf',
      'protection des installations réduites',
      'CreditShopAfrica',
      'solutions de sécurité IT RDC',
      'Zetoun Labs Kinshasa'
    ],
    CASE_STUDY_TITLE: "Étude de Cas : Sécurisation totale de Credit Shop Africa",
    CONTEXT_TITLE: "Contexte du projet",
    CONTEXT_PARAGRAPH: "Credit Shop Africa, acteur majeur du secteur financier à Kinshasa, nous a mandatés pour concevoir et déployer un système de vidéosurveillance de nouvelle génération. L'objectif : garantir une protection à 100% de leurs locaux stratégiques avec une solution sur mesure alliant performance, fiabilité et intelligence.",
    CHALLENGE_TITLE: "Le défi technique",
    CHALLENGE_PARAGRAPH: "Concevoir un écosystème de sécurité couvrant chaque mètre carré sans angle mort, avec une qualité d'image 4K en continu, un stockage sécurisé longue durée et un accès temps réel depuis n'importe quel appareil. Le tout dans un espace optimisé nécessitant un placement stratégique millimétré de chaque caméra.",
    SOLUTION_TITLE: "Notre solution d'excellence",
    SOLUTION_INTRO_PARAGRAPH: "Notre équipe d'experts en sécurité a déployé une infrastructure de vidéosurveillance complète et intelligente :",
    SOLUTION_CAMERAS_TITLE: "Caméras CP+ haute performance stratégiquement positionnées",
    SOLUTION_CAMERAS_DESC: "Déploiement de caméras CP+ sélectionnées pour leur résolution exceptionnelle et leur fiabilité prouvée - Couverture 360° avec zéro angle mort.",
    SOLUTION_COVERAGE_TITLE: "Couverture intelligente à 100% des zones critiques",
    SOLUTION_COVERAGE_DESC: "Cartographie 3D de l'espace avec placement optimisé par calcul - Chaque comptoir, bureau et point d'accès sous surveillance permanente.",
    SOLUTION_MANAGEMENT_TITLE: "Centre de contrôle unifié avec monitoring temps réel",
    SOLUTION_MANAGEMENT_DESC: "Dashboard centralisé avec alertes intelligentes, recherche par événement et accès multi-écrans pour une visibilité totale sur l'ensemble du dispositif.",
    SOLUTION_RECORDING_TITLE: "Stockage haute capacité avec redondance",
    SOLUTION_RECORDING_DESC: "DVR professionnels avec stockage optimisé et archivage longue durée - Conservation garantie des flux vidéo selon les exigences de CreditShopAfrica.",
    GALLERY_TITLE: "Galerie de photos du projet",
    GALLERY_IMAGE_PLACEHOLDER_ALT: "Image indisponible", // Attribut alt plus générique pour le placeholder
    TECHNOLOGIES_TITLE: "Technologies clés utilisées",
    TECH_CPPLUS_CAMERAS_TITLE: "Caméras Analogiques CP+",
    TECH_CPPLUS_CAMERAS_DESC: "Solutions de vidéosurveillance de pointe de la marque CP+, reconnues pour leur qualité d'image et leur fiabilité.",
    TECH_DVR_TITLE: "Enregistreurs Vidéo Numériques (DVR)",
    TECH_DVR_DESC: "Systèmes dédiés à l'enregistrement et à la gestion des flux vidéo analogiques.",
    TECH_REMOTE_ACCESS_TITLE: "Accès et Surveillance à Distance",
    TECH_REMOTE_ACCESS_DESC: "Permet la visualisation et la gestion du système de sécurité via des applications mobiles et web.",
    ADVANTAGES_TITLE: "Avantages clés pour Credit Shop Africa",
    ADVANTAGE1_TITLE: "Sécurité fondamentale et dissuasive",
    ADVANTAGE1_DESC: "La mise en place d'un système de vidéosurveillance neuf agit comme un puissant moyen de dissuasion, contribuant à la prévention des intrusions et des vols, et protégeant ainsi les biens et les données.",
    ADVANTAGE2_TITLE: "Surveillance à distance et flexibilité",
    ADVANTAGE2_DESC: "Grâce à la connectivité Internet du système, le responsable peut surveiller les activités et les agents en temps réel, même lorsqu'il est à l'étranger, offrant une flexibilité et un contrôle accrus à tout moment et depuis n'importe où.",
    ADVANTAGE3_TITLE: "Surveillance continue des zones critiques",
    ADVANTAGE3_DESC: "Malgré la surface réduite, une couverture ciblée assure une surveillance ininterrompue des points sensibles, offrant une visibilité claire sur les opérations quotidiennes et les accès.",
    ADVANTAGE4_TITLE: "Réactivité et preuve en cas d'incident",
    ADVANTAGE4_DESC: "La surveillance en temps réel et les enregistrements de qualité fournissent des preuves essentielles, facilitant les investigations et permettant une réaction rapide face à tout incident.",
    ADVANTAGE5_TITLE: "Gestion de la sécurité simplifiée",
    ADVANTAGE5_DESC: "Le nouveau système est facile à gérer, permettant aux équipes de sécurité de CreditShopAfrica de surveiller efficacement sans complexité excessive.",
    RESULTS_TITLE: "Résultats obtenus et impact",
    RESULTS_PARAGRAPH: "Grâce à l'installation de son nouveau système de vidéosurveillance par Zetoun Labs, Credit Shop Africa bénéficie désormais d'une infrastructure de sécurité moderne et fiable. Cette nouvelle installation a considérablement amélioré la capacité de Credit Shop Africa à surveiller ses locaux, à prévenir les risques et à réagir rapidement en cas de besoin, offrant ainsi un environnement de travail plus sûr pour son personnel et une meilleure protection de ses actifs.",
  };

  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Interval for image gallery rotation (300 seconds = 5 minutes)
    // Consider reducing this value if you want a faster image rotation, e.g., 5000 for 5 seconds.
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % TEXT_CONSTANTS.GALLERY_IMAGES.length);
    }, 300000);

    return () => {
      clearInterval(imageInterval);
      window.removeEventListener('resize', checkMobile);
    };
  }, [TEXT_CONSTANTS.GALLERY_IMAGES.length]);

  const listItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const solutionItems = [
    {
      icon: <Camera className="h-6 w-6 text-gray-800 mr-3 flex-shrink-0 mt-1" />,
      title: TEXT_CONSTANTS.SOLUTION_CAMERAS_TITLE,
      description: TEXT_CONSTANTS.SOLUTION_CAMERAS_DESC
    },
    {
      icon: <MapPin className="h-6 w-6 text-gray-800 mr-3 flex-shrink-0 mt-1" />,
      title: TEXT_CONSTANTS.SOLUTION_COVERAGE_TITLE,
      description: TEXT_CONSTANTS.SOLUTION_COVERAGE_DESC
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-gray-800 mr-3 flex-shrink-0 mt-1" />,
      title: TEXT_CONSTANTS.SOLUTION_MANAGEMENT_TITLE,
      description: TEXT_CONSTANTS.SOLUTION_MANAGEMENT_DESC
    },
    {
      icon: <HardDrive className="h-6 w-6 text-gray-800 mr-3 flex-shrink-0 mt-1" />,
      title: TEXT_CONSTANTS.SOLUTION_RECORDING_TITLE,
      description: TEXT_CONSTANTS.SOLUTION_RECORDING_DESC
    }
  ];

  const technologyItems = [
    {
      icon: <Camera className="h-6 w-6 text-gray-800 mr-3 flex-shrink-0 mt-1" />,
      title: TEXT_CONSTANTS.TECH_CPPLUS_CAMERAS_TITLE,
      description: TEXT_CONSTANTS.TECH_CPPLUS_CAMERAS_DESC
    },
    {
      icon: <HardDrive className="h-6 w-6 text-gray-800 mr-3 flex-shrink-0 mt-1" />,
      title: TEXT_CONSTANTS.TECH_DVR_TITLE,
      description: TEXT_CONSTANTS.TECH_DVR_DESC
    },
    {
      icon: <Smartphone className="h-6 w-6 text-gray-800 mr-3 flex-shrink-0 mt-1" />,
      title: TEXT_CONSTANTS.TECH_REMOTE_ACCESS_TITLE,
      description: TEXT_CONSTANTS.TECH_REMOTE_ACCESS_DESC
    }
  ];

  const advantageItems = [
    {
      title: TEXT_CONSTANTS.ADVANTAGE1_TITLE,
      description: TEXT_CONSTANTS.ADVANTAGE1_DESC
    },
    {
      title: TEXT_CONSTANTS.ADVANTAGE2_TITLE,
      description: TEXT_CONSTANTS.ADVANTAGE2_DESC
    },
    {
      title: TEXT_CONSTANTS.ADVANTAGE3_TITLE,
      description: TEXT_CONSTANTS.ADVANTAGE3_DESC
    },
    {
      title: TEXT_CONSTANTS.ADVANTAGE4_TITLE,
      description: TEXT_CONSTANTS.ADVANTAGE4_DESC
    },
    {
      title: TEXT_CONSTANTS.ADVANTAGE5_TITLE,
      description: TEXT_CONSTANTS.ADVANTAGE5_DESC
    }
  ];

  const currentImage = TEXT_CONSTANTS.GALLERY_IMAGES?.[currentImageIndex];
  const nextImageIndex = (currentImageIndex + 1) % TEXT_CONSTANTS.GALLERY_IMAGES.length;
  const nextImage = TEXT_CONSTANTS.GALLERY_IMAGES?.[nextImageIndex];

  return (
    <ProjectPageLayout
      title={isMobile ? TEXT_CONSTANTS.MOBILE_TITLE : TEXT_CONSTANTS.FULL_TITLE.split(' - ')[0]}
      subtitle={TEXT_CONSTANTS.SUBTITLE}
      imageUrl={TEXT_CONSTANTS.IMAGE_URL}
      brandName={TEXT_CONSTANTS.BRAND_NAME}
      darkMode={true}
      imageOnError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "https://placehold.co/1200x600/000000/FFFFFF?text=CreditShopAfrica";
        e.currentTarget.alt = TEXT_CONSTANTS.IMAGE_PLACEHOLDER_ALT;
      }}
    >
      <SEO
        title={TEXT_CONSTANTS.FULL_TITLE}
        description={TEXT_CONSTANTS.SEO_DESCRIPTION}
        keywords={TEXT_CONSTANTS.SEO_KEYWORDS}
        imageUrl={TEXT_CONSTANTS.IMAGE_URL}
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
        {solutionItems.map((item, i) => (
          <motion.div
            key={i}
            variants={listItemVariants}
            transition={{ duration: 0.4 }}
            className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-gray-200/50 flex items-start hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors mr-4">
              {item.icon}
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h4>
              <p className="text-gray-700 text-justify leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-2xl md:text-3xl font-bold mb-6 mt-12 text-gray-900"
      >
        {TEXT_CONSTANTS.GALLERY_TITLE}
      </motion.h3>
      <motion.div
        className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <motion.div 
          variants={listItemVariants} 
          transition={{ duration: 0.4 }} 
          className="w-full flex flex-col items-center group"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
            <img
              src={currentImage?.src}
              alt={currentImage?.alt}
              className="w-full max-w-xs h-auto rounded-2xl object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://placehold.co/600x400/000000/FFFFFF?text=Image+indisponible";
                e.currentTarget.alt = "[Image indisponible]";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
          <p className="text-center text-gray-700 text-sm mt-4 font-medium">{currentImage?.description}</p>
        </motion.div>

        <motion.div 
          variants={listItemVariants} 
          transition={{ duration: 0.4 }} 
          className="w-full flex flex-col items-center group"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
            <img
              src={nextImage?.src}
              alt={nextImage?.alt}
              className="w-full max-w-xs h-auto rounded-2xl object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://placehold.co/600x400/000000/FFFFFF?text=Image+indisponible";
                e.currentTarget.alt = "[Image indisponible]";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
          <p className="text-center text-gray-700 text-sm mt-4 font-medium">{nextImage?.description}</p>
        </motion.div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-2xl md:text-3xl font-bold mb-6 mt-12 text-gray-900"
      >
        {TEXT_CONSTANTS.TECHNOLOGIES_TITLE}
      </motion.h3>
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {technologyItems.map((item, i) => (
          <motion.div
            key={i}
            variants={listItemVariants}
            transition={{ duration: 0.4 }}
            className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-gray-200/50 flex items-start hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors mr-4">
              {item.icon}
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h4>
              <p className="text-gray-700 text-justify leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
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
        {advantageItems.map((item, i) => (
          <motion.div 
            key={i} 
            variants={listItemVariants} 
            transition={{ duration: 0.3 }} 
            className="flex items-start p-5 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center mr-4 mt-0.5 text-sm font-bold group-hover:scale-110 transition-transform">✓</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-gray-700 text-justify leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="text-2xl md:text-3xl font-bold mb-6 mt-12 text-gray-900"
      >
        {TEXT_CONSTANTS.RESULTS_TITLE}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-gray-700 text-justify leading-relaxed text-base bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-lg">
        {TEXT_CONSTANTS.RESULTS_PARAGRAPH}
      </motion.p>
    </ProjectPageLayout>
  );
};

export default CreditShopAfrica;
