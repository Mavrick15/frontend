import React, { useEffect, useState, Suspense } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const VideoSurveillance = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  const TEXT_CONSTANTS = {
    SEO_TITLE: "Vidéosurveillance & Sécurité | Installation Caméras - Zetoun Labs",
    SEO_DESCRIPTION: "Protégez vos locaux avec les solutions de vidéosurveillance de Zetoun Labs à Kinshasa : caméras HD, détection de mouvement, stockage sécurisé et intégration avec systèmes d'alarme.",
    SEO_KEYWORDS: [
      'vidéosurveillance',
      'sécurité',
      'installation caméras',
      'caméra HD',
      'système d alarme',
      'contrôle accès',
      'détection mouvement',
      'stockage vidéo cloud',
      'Zetoun Labs Kinshasa',
      'protection locaux'
    ],
    BACK_TO_HOME_TEXT: "Retour à l'accueil",
    PAGE_TITLE: "Vidéosurveillance & Sécurité",
    INTRO_PARAGRAPH: "Zetoun Labs propose des solutions de vidéosurveillance et sécurité sur mesure à Kinshasa, garantissant la protection de vos biens et de vos locaux grâce à des installations adaptées et performantes.",
    MAIN_IMAGE_ALT: "",
    MAIN_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour le centre de surveillance de sécurité vidéo",
    APPROACH_TITLE: "Notre approche de la sécurité par vidéosurveillance",
    APPROACH_PARA1: "La sécurité de vos locaux commence par une analyse précise de vos besoins. Nous réalisons une étude complète de votre site pour identifier les points stratégiques et les vulnérabilités potentielles, à Kinshasa et ses environs.",
    APPROACH_PARA2: "Notre expertise nous permet de vous recommander les équipements les plus adaptés et de concevoir une installation sur mesure, discrète mais efficace, pour une protection optimale de vos biens.",
    SITE_ANALYSIS_IMAGE_ALT: "",
    SITE_ANALYSIS_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour l'analyse de site",
    SOLUTIONS_TITLE: "Nos solutions complètes de sécurité et vidéosurveillance",
    SOLUTION_CAMERAS_TITLE: "Caméras HD intérieures et extérieures",
    SOLUTION_CAMERAS_DESC: "Haute résolution, grand angle de vue et résistantes aux intempéries pour une surveillance optimale.",
    SOLUTION_NIGHT_VISION_TITLE: "Vision nocturne et détection de mouvement avancée",
    SOLUTION_NIGHT_VISION_DESC: "Enregistrement intelligent déclenché par événements, optimisant l'espace de stockage.",
    SOLUTION_STORAGE_TITLE: "Stockage sécurisé (Local ou Cloud)",
    SOLUTION_STORAGE_DESC: "Conservation des données conforme à la réglementation avec sauvegarde automatique et récupération rapide.",
    SOLUTION_REMOTE_ACCESS_TITLE: "Accès à distance via smartphone et alertes",
    SOLUTION_REMOTE_ACCESS_DESC: "Application mobile sécurisée pour une surveillance en temps réel et des notifications immédiates.",
    SOLUTION_INTEGRATION_TITLE: "Intégration avec systèmes d'alarme et infogérance",
    SOLUTION_INTEGRATION_DESC_PART1: "Coordination automatisée entre votre vidéosurveillance et votre système d'alarme. Pensez aussi à notre service d'",
    SOLUTION_INTEGRATION_DESC_LINK_TEXT: "infogérance IT",
    SOLUTION_INTEGRATION_DESC_PART2: ".",
    SOLUTION_ACCESS_CONTROL_TITLE: "Contrôle d'accès et identification avancée",
    SOLUTION_ACCESS_CONTROL_DESC: "Solutions incluant reconnaissance faciale, badges et capteurs biométriques pour une sécurité renforcée.",
    CARD1_IMAGE_ALT: "",
    CARD1_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour la caméra HD",
    CARD1_TITLE: "Équipements de pointe",
    CARD1_DESCRIPTION: "Caméras HD avec fonctions avancées de détection et vision nocturne.",
    CARD2_IMAGE_ALT: "",
    CARD2_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour le centre de contrôle de sécurité",
    CARD2_TITLE: "Surveillance centralisée",
    CARD2_DESCRIPTION: "Monitoring en temps réel et accès à l'historique des événements sécurisés.",
    CARD3_IMAGE_ALT: "",
    CARD3_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour le système de contrôle d'accès",
    CARD3_TITLE: "Contrôle d'accès intégré",
    CARD3_DESCRIPTION: "Solutions sécurisées et évolutives pour la gestion des accès à vos locaux.",
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress < 95) {
          return prevProgress + 5;
        }
        return prevProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-gray-800 border-b-gray-800 border-l-gray-400 border-r-gray-400 animate-spin"></div>
          <div
            className="absolute inset-2 rounded-full bg-gray-50 flex items-center justify-center"
            style={{
              clipPath: `inset(${100 - loadingProgress}% 0 0 0)`,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              transition: 'clip-path 0.2s ease-out'
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-900 text-2xl font-bold">
            {loadingProgress}%
          </div>
        </div>
      </div>
    }>
      <div className="min-h-screen bg-white">
        <PageLayout>
          <SEO
            title={TEXT_CONSTANTS.SEO_TITLE}
            description={TEXT_CONSTANTS.SEO_DESCRIPTION}
            keywords={TEXT_CONSTANTS.SEO_KEYWORDS}
            imageUrl="../lovable-uploads/services/1a.png"
          />

          <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
              <div className="max-w-6xl mx-auto">
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {TEXT_CONSTANTS.BACK_TO_HOME_TEXT}
                </Link>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center mb-6 space-x-4"
                >
                  <div className="bg-red-100 p-4 rounded-full">
                    <Camera className="h-8 w-8 text-red-600" />
                  </div>
                  <h1 className="text-4xl font-bold">{TEXT_CONSTANTS.PAGE_TITLE}</h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-gray-600 mb-8"
                >
                  {TEXT_CONSTANTS.INTRO_PARAGRAPH}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="w-full h-64 md:h-80 mb-12 overflow-hidden rounded-xl"
                >
                  <img
                    src="../lovable-uploads/services/1a.png"
                    alt={TEXT_CONSTANTS.MAIN_IMAGE_ALT}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Surveillance+Vidéo";
                      e.currentTarget.alt = TEXT_CONSTANTS.MAIN_IMAGE_PLACEHOLDER_ALT;
                    }}
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-red-50 p-8 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h2 className="text-2xl font-semibold mb-4 text-red-700">{TEXT_CONSTANTS.APPROACH_TITLE}</h2>
                    <p className="text-gray-700 mb-4">
                      {TEXT_CONSTANTS.APPROACH_PARA1}
                    </p>
                    <p className="text-gray-700 mb-4">
                      {TEXT_CONSTANTS.APPROACH_PARA2}
                    </p>
                    <div className="mt-6 rounded-lg overflow-hidden">
                      <img
                        src="../lovable-uploads/services/1b.png"
                        alt={TEXT_CONSTANTS.SITE_ANALYSIS_IMAGE_ALT}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Analyse+Site";
                          e.currentTarget.alt = TEXT_CONSTANTS.SITE_ANALYSIS_IMAGE_PLACEHOLDER_ALT;
                        }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-semibold mb-4 text-red-700">{TEXT_CONSTANTS.SOLUTIONS_TITLE}</h2>
                    <ul className="space-y-4 text-lg">
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-red-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.SOLUTION_CAMERAS_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.SOLUTION_CAMERAS_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-red-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.SOLUTION_NIGHT_VISION_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.SOLUTION_NIGHT_VISION_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-red-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.SOLUTION_STORAGE_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.SOLUTION_STORAGE_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-red-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.SOLUTION_REMOTE_ACCESS_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.SOLUTION_REMOTE_ACCESS_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-red-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.SOLUTION_INTEGRATION_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">
                            {TEXT_CONSTANTS.SOLUTION_INTEGRATION_DESC_PART1}
                            <Link to="/services/it-management" className="text-red-600 hover:underline font-semibold">
                              {TEXT_CONSTANTS.SOLUTION_INTEGRATION_DESC_LINK_TEXT}
                            </Link>
                            {TEXT_CONSTANTS.SOLUTION_INTEGRATION_DESC_PART2}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-red-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.SOLUTION_ACCESS_CONTROL_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.SOLUTION_ACCESS_CONTROL_DESC}</p>
                        </div>
                      </li>
                    </ul>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-red-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src="/lovable-uploads/services/1c.png"
                      alt={TEXT_CONSTANTS.CARD1_IMAGE_ALT}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Caméra+HD";
                        e.currentTarget.alt = TEXT_CONSTANTS.CARD1_IMAGE_PLACEHOLDER_ALT;
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-red-700">{TEXT_CONSTANTS.CARD1_TITLE}</h3>
                      <p className="text-gray-600 text-sm">{TEXT_CONSTANTS.CARD1_DESCRIPTION}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="bg-red-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src="/lovable-uploads/services/1d.png"
                      alt={TEXT_CONSTANTS.CARD2_IMAGE_ALT}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Centre+Contrôle";
                        e.currentTarget.alt = TEXT_CONSTANTS.CARD2_IMAGE_PLACEHOLDER_ALT;
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-red-700">{TEXT_CONSTANTS.CARD2_TITLE}</h3>
                      <p className="text-gray-600 text-sm">{TEXT_CONSTANTS.CARD2_DESCRIPTION}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="bg-red-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src="/lovable-uploads/services/1e.png"
                      alt={TEXT_CONSTANTS.CARD3_IMAGE_ALT}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Contrôle+Accès";
                        e.currentTarget.alt = TEXT_CONSTANTS.CARD3_IMAGE_PLACEHOLDER_ALT;
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-red-700">{TEXT_CONSTANTS.CARD3_TITLE}</h3>
                      <p className="text-gray-600 text-sm">{TEXT_CONSTANTS.CARD3_DESCRIPTION}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </PageLayout>
      </div>
    </Suspense>
  );
};

export default VideoSurveillance;
