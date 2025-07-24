import React, { useEffect } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const CONSTANTS = {
  SEO_TITLE: "Vidéosurveillance & Sécurité | Installation Caméras - Zetoun Labs",
  SEO_DESCRIPTION: "Protégez vos locaux avec les solutions de vidéosurveillance de Zetoun Labs à Kinshasa : caméras HD, détection de mouvement, stockage sécurisé et intégration avec systèmes d'alarme.",
  SEO_KEYWORDS: [
    'vidéosurveillance Kinshasa',
    'sécurité Kinshasa',
    'installation caméras Kinshasa',
    'caméra HD Kinshasa',
    'système alarme RDC',
    'contrôle accès biométrique',
    'détection mouvement avancée',
    'stockage vidéo cloud sécurisé',
    'Zetoun Labs Kinshasa',
    'protection locaux entreprise',
    'surveillance à distance',
    'monitoring vidéo',
    'systèmes de sécurité intégrés'
  ],
  IMAGE_PATHS: {
    MAIN_HERO: "../lovable-uploads/services/1a.png",
    SITE_ANALYSIS: "../lovable-uploads/services/1b.png",
    HIGH_DEFINITION_CAMERA: "/lovable-uploads/services/1c.png",
    CENTRALIZED_MONITORING: "/lovable-uploads/services/1d.png",
    ACCESS_CONTROL_SYSTEM: "/lovable-uploads/services/1e.png",
  },
  PLACEHOLDER_IMAGE_URLS: {
    MAIN_HERO: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Surveillance+Vidéo",
    SITE_ANALYSIS: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Analyse+Site",
    HIGH_DEFINITION_CAMERA: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Caméra+HD",
    CENTRALIZED_MONITORING: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Centre+Contrôle",
    ACCESS_CONTROL_SYSTEM: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Contrôle+Accès",
  },
  MESSAGES: {
    BACK_TO_HOME: "Retour à l'accueil",
    PAGE_TITLE: "Vidéosurveillance & Sécurité",
    INTRO_PARAGRAPH: "Zetoun Labs propose des solutions de vidéosurveillance et sécurité sur mesure à Kinshasa, garantissant la protection de vos biens et de vos locaux grâce à des installations adaptées et performantes.",
    MAIN_IMAGE_ALT: "Centre de surveillance de sécurité vidéo avec écrans de contrôle",
    APPROACH_TITLE: "Notre approche de la sécurité par vidéosurveillance",
    APPROACH_PARA1: "La sécurité de vos locaux commence par une analyse précise de vos besoins. Nous réalisons une étude complète de votre site pour identifier les points stratégiques et les vulnérabilités potentielles, à Kinshasa et ses environs.",
    APPROACH_PARA2: "Notre expertise nous permet de vous recommander les équipements les plus adaptés et de concevoir une installation sur mesure, discrète mais efficace, pour une protection optimale de vos biens.",
    SITE_ANALYSIS_IMAGE_ALT: "Technicien effectuant une analyse de site pour l'installation de caméras",
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
    SOLUTION_INTEGRATION_DESC_LINK_PATH: "/services/it-management",
    SOLUTION_INTEGRATION_DESC_PART2: ".",
    SOLUTION_ACCESS_CONTROL_TITLE: "Contrôle d'accès et identification avancée",
    SOLUTION_ACCESS_CONTROL_DESC: "Solutions incluant reconnaissance faciale, badges et capteurs biométriques pour une sécurité renforcée.",
    CARD1_TITLE: "Équipements de pointe",
    CARD1_DESCRIPTION: "Caméras HD avec fonctions avancées de détection et vision nocturne.",
    CARD1_IMAGE_ALT: "Caméra de sécurité HD moderne installée sur un mur",
    CARD2_TITLE: "Surveillance centralisée",
    CARD2_DESCRIPTION: "Monitoring en temps réel et accès à l'historique des événements sécurisés.",
    CARD2_IMAGE_ALT: "Écrans affichant des flux vidéo de surveillance dans un centre de contrôle",
    CARD3_TITLE: "Contrôle d'accès intégré",
    CARD3_DESCRIPTION: "Solutions sécurisées et évolutives pour la gestion des accès à vos locaux.",
    CARD3_IMAGE_ALT: "Dispositif de contrôle d'accès biométrique avec une personne utilisant un badge",
  }
};

const VideoSurveillance = () => {
  useEffect(() => {
    // Scrolls to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageLayout>
        <SEO
          title={CONSTANTS.SEO_TITLE}
          description={CONSTANTS.SEO_DESCRIPTION}
          keywords={CONSTANTS.SEO_KEYWORDS}
          imageUrl={CONSTANTS.IMAGE_PATHS.MAIN_HERO}
        />

        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {CONSTANTS.MESSAGES.BACK_TO_HOME}
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
                <h1 className="text-4xl font-bold">{CONSTANTS.MESSAGES.PAGE_TITLE}</h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 mb-8"
              >
                {CONSTANTS.MESSAGES.INTRO_PARAGRAPH}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="w-full h-64 md:h-80 mb-12 overflow-hidden rounded-xl"
              >
                <img
                  src={CONSTANTS.IMAGE_PATHS.MAIN_HERO}
                  alt={CONSTANTS.MESSAGES.MAIN_IMAGE_ALT}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.MAIN_HERO;
                    e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.MAIN_HERO;
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
                  <h2 id="notre-approche" className="text-2xl font-semibold mb-4 text-red-700">{CONSTANTS.MESSAGES.APPROACH_TITLE}</h2>
                  <p className="text-gray-700 mb-4">
                    {CONSTANTS.MESSAGES.APPROACH_PARA1}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {CONSTANTS.MESSAGES.APPROACH_PARA2}
                  </p>
                  <div className="mt-6 rounded-lg overflow-hidden">
                    <img
                      src={CONSTANTS.IMAGE_PATHS.SITE_ANALYSIS}
                      alt={CONSTANTS.MESSAGES.SITE_ANALYSIS_IMAGE_ALT}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.SITE_ANALYSIS;
                        e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.SITE_ANALYSIS;
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
                  <h2 id="nos-solutions" className="text-2xl font-semibold mb-4 text-red-700">{CONSTANTS.MESSAGES.SOLUTIONS_TITLE}</h2>
                  <ul className="space-y-4 text-lg">
                    <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                      <span className="text-red-500 font-bold mr-3 text-xl">•</span>
                      <div>
                        <span className="font-medium">{CONSTANTS.MESSAGES.SOLUTION_CAMERAS_TITLE}</span>
                        <p className="text-gray-600 text-base mt-1">{CONSTANTS.MESSAGES.SOLUTION_CAMERAS_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                      <span className="text-red-500 font-bold mr-3 text-xl">•</span>
                      <div>
                        <span className="font-medium">{CONSTANTS.MESSAGES.SOLUTION_NIGHT_VISION_TITLE}</span>
                        <p className="text-gray-600 text-base mt-1">{CONSTANTS.MESSAGES.SOLUTION_NIGHT_VISION_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                      <span className="text-red-500 font-bold mr-3 text-xl">•</span>
                      <div>
                        <span className="font-medium">{CONSTANTS.MESSAGES.SOLUTION_STORAGE_TITLE}</span>
                        <p className="text-gray-600 text-base mt-1">{CONSTANTS.MESSAGES.SOLUTION_STORAGE_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                      <span className="text-red-500 font-bold mr-3 text-xl">•</span>
                      <div>
                        <span className="font-medium">{CONSTANTS.MESSAGES.SOLUTION_REMOTE_ACCESS_TITLE}</span>
                        <p className="text-gray-600 text-base mt-1">{CONSTANTS.MESSAGES.SOLUTION_REMOTE_ACCESS_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                      <span className="text-red-500 font-bold mr-3 text-xl">•</span>
                      <div>
                        <span className="font-medium">{CONSTANTS.MESSAGES.SOLUTION_INTEGRATION_TITLE}</span>
                        <p className="text-gray-600 text-base mt-1">
                          {CONSTANTS.MESSAGES.SOLUTION_INTEGRATION_DESC_PART1}
                          <Link to={CONSTANTS.MESSAGES.SOLUTION_INTEGRATION_DESC_LINK_PATH} className="text-red-600 hover:underline font-semibold">
                            {CONSTANTS.MESSAGES.SOLUTION_INTEGRATION_DESC_LINK_TEXT}
                          </Link>
                          {CONSTANTS.MESSAGES.SOLUTION_INTEGRATION_DESC_PART2}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                      <span className="text-red-500 font-bold mr-3 text-xl">•</span>
                      <div>
                        <span className="font-medium">{CONSTANTS.MESSAGES.SOLUTION_ACCESS_CONTROL_TITLE}</span>
                        <p className="text-gray-600 text-base mt-1">{CONSTANTS.MESSAGES.SOLUTION_ACCESS_CONTROL_DESC}</p>
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
                    src={CONSTANTS.IMAGE_PATHS.HIGH_DEFINITION_CAMERA}
                    alt={CONSTANTS.MESSAGES.CARD1_IMAGE_ALT}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.HIGH_DEFINITION_CAMERA;
                      e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.HIGH_DEFINITION_CAMERA;
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-red-700">{CONSTANTS.MESSAGES.CARD1_TITLE}</h3>
                    <p className="text-gray-600 text-sm">{CONSTANTS.MESSAGES.CARD1_DESCRIPTION}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="bg-red-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={CONSTANTS.IMAGE_PATHS.CENTRALIZED_MONITORING}
                    alt={CONSTANTS.MESSAGES.CARD2_IMAGE_ALT}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.CENTRALIZED_MONITORING;
                      e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.CENTRALIZED_MONITORING;
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-red-700">{CONSTANTS.MESSAGES.CARD2_TITLE}</h3>
                    <p className="text-gray-600 text-sm">{CONSTANTS.MESSAGES.CARD2_DESCRIPTION}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="bg-red-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={CONSTANTS.IMAGE_PATHS.ACCESS_CONTROL_SYSTEM}
                    alt={CONSTANTS.MESSAGES.CARD3_IMAGE_ALT}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.ACCESS_CONTROL_SYSTEM;
                      e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.ACCESS_CONTROL_SYSTEM;
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-red-700">{CONSTANTS.MESSAGES.CARD3_TITLE}</h3>
                    <p className="text-gray-600 text-sm">{CONSTANTS.MESSAGES.CARD3_DESCRIPTION}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </div>
  );
};

export default VideoSurveillance;
