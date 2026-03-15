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
    PAGE_TITLE: "Vidéosurveillance & Sécurité Intelligente",
    INTRO_PARAGRAPH: "Protégez vos actifs avec notre technologie de sécurité de pointe - Caméras 4K avec IA intégrée, détection comportementale et surveillance 360°. Plus de 300 sites sécurisés avec zéro intrusion non détectée.",
    MAIN_IMAGE_ALT: "Centre de surveillance de sécurité vidéo avec écrans de contrôle",
    APPROACH_TITLE: "Notre expertise en sécurité intelligente",
    APPROACH_PARA1: "La sécurité de vos locaux mérite une approche militaire. Notre équipe d'experts certifiés réalise un audit de sécurité complet avec cartographie 3D des zones de vulnérabilité, garantissant une couverture à 100% sans angle mort.",
    APPROACH_PARA2: "Nos systèmes intègrent l'intelligence artificielle pour une détection proactive des menaces - reconnaissance faciale, détection de comportements suspects et alertes en temps réel avant même qu'un incident ne se produise.",
    SITE_ANALYSIS_IMAGE_ALT: "Technicien effectuant une analyse de site pour l'installation de caméras",
    SOLUTIONS_TITLE: "Nos solutions de sécurité révolutionnaires",
    SOLUTION_CAMERAS_TITLE: "Caméras 4K avec vision nocturne couleur",
    SOLUTION_CAMERAS_DESC: "Résolution 8MP, zoom optique 30x et vision nocturne couleur jusqu'à 50m - Identification garantie même dans l'obscurité totale.",
    SOLUTION_NIGHT_VISION_TITLE: "Détection IA et analyse comportementale",
    SOLUTION_NIGHT_VISION_DESC: "Intelligence artificielle embarquée détectant les intrusions, le vandalisme et les comportements anormaux avec 99.5% de précision.",
    SOLUTION_STORAGE_TITLE: "Stockage cloud sécurisé avec chiffrement AES-256",
    SOLUTION_STORAGE_DESC: "Conservation 90 jours minimum avec redondance triple - Accès instantané aux archives avec recherche intelligente par événement.",
    SOLUTION_REMOTE_ACCESS_TITLE: "Surveillance mobile temps réel avec alertes IA",
    SOLUTION_REMOTE_ACCESS_DESC: "Application sécurisée avec authentification biométrique - Alertes intelligentes filtrées par IA, réduisant les fausses alertes de 95%.",
    SOLUTION_INTEGRATION_TITLE: "Intégration domotique et système d'alarme unifié",
    SOLUTION_INTEGRATION_DESC_PART1: "Écosystème de sécurité connecté avec verrouillage automatique, éclairage dissuasif et sirène intelligente. Complète notre service d'",
    SOLUTION_INTEGRATION_DESC_LINK_TEXT: "infogérance IT",
    SOLUTION_INTEGRATION_DESC_LINK_PATH: "/services/it-management",
    SOLUTION_INTEGRATION_DESC_PART2: ".",
    SOLUTION_ACCESS_CONTROL_TITLE: "Contrôle d'accès biométrique multicouche",
    SOLUTION_ACCESS_CONTROL_DESC: "Reconnaissance faciale 3D, empreintes digitales et badges RFID - Triple authentification pour une sécurité inviolable.",
    CARD1_TITLE: "Technologie 4K avec IA",
    CARD1_DESCRIPTION: "Caméras dernière génération avec détection intelligente - 99.5% de précision, zéro fausse alerte.",
    CARD1_IMAGE_ALT: "Caméra de sécurité HD moderne installée sur un mur",
    CARD2_TITLE: "Surveillance centralisée 24/7",
    CARD2_DESCRIPTION: "Centre de contrôle avec monitoring permanent et intervention coordonnée en moins de 5 minutes.",
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
                <div className="bg-gray-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Camera className="h-8 w-8 text-gray-900" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-space">{CONSTANTS.MESSAGES.PAGE_TITLE}</h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl lg:text-2xl text-gray-700 mb-10 leading-relaxed bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50"
              >
                {CONSTANTS.MESSAGES.INTRO_PARAGRAPH}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="w-full h-64 md:h-80 lg:h-96 mb-12 overflow-hidden rounded-2xl shadow-2xl relative group"
              >
                <img
                  src={CONSTANTS.IMAGE_PATHS.MAIN_HERO}
                  alt={CONSTANTS.MESSAGES.MAIN_IMAGE_ALT}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.MAIN_HERO;
                    e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.MAIN_HERO;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}
                ></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h2 id="notre-approche" className="text-3xl font-bold mb-6 text-gray-900">{CONSTANTS.MESSAGES.APPROACH_TITLE}</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    {CONSTANTS.MESSAGES.APPROACH_PARA1}
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    {CONSTANTS.MESSAGES.APPROACH_PARA2}
                  </p>
                  <div className="mt-6 rounded-2xl overflow-hidden shadow-lg group">
                    <div className="relative overflow-hidden">
                      <img
                        src={CONSTANTS.IMAGE_PATHS.SITE_ANALYSIS}
                        alt={CONSTANTS.MESSAGES.SITE_ANALYSIS_IMAGE_ALT}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.SITE_ANALYSIS;
                          e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.SITE_ANALYSIS;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="space-y-6"
                >
                  <h2 id="nos-solutions" className="text-3xl font-bold mb-6 text-gray-900">{CONSTANTS.MESSAGES.SOLUTIONS_TITLE}</h2>
                  <ul className="space-y-5">
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.SOLUTION_CAMERAS_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.SOLUTION_CAMERAS_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.SOLUTION_NIGHT_VISION_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.SOLUTION_NIGHT_VISION_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.SOLUTION_STORAGE_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.SOLUTION_STORAGE_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.SOLUTION_REMOTE_ACCESS_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.SOLUTION_REMOTE_ACCESS_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.SOLUTION_INTEGRATION_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">
                          {CONSTANTS.MESSAGES.SOLUTION_INTEGRATION_DESC_PART1}
                          <Link to={CONSTANTS.MESSAGES.SOLUTION_INTEGRATION_DESC_LINK_PATH} className="text-gray-900 hover:text-gray-700 underline font-semibold transition-colors">
                            {CONSTANTS.MESSAGES.SOLUTION_INTEGRATION_DESC_LINK_TEXT}
                          </Link>
                          {CONSTANTS.MESSAGES.SOLUTION_INTEGRATION_DESC_PART2}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.SOLUTION_ACCESS_CONTROL_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.SOLUTION_ACCESS_CONTROL_DESC}</p>
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
                  className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={CONSTANTS.IMAGE_PATHS.HIGH_DEFINITION_CAMERA}
                      alt={CONSTANTS.MESSAGES.CARD1_IMAGE_ALT}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.HIGH_DEFINITION_CAMERA;
                        e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.HIGH_DEFINITION_CAMERA;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{CONSTANTS.MESSAGES.CARD1_TITLE}</h3>
                    <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.CARD1_DESCRIPTION}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={CONSTANTS.IMAGE_PATHS.CENTRALIZED_MONITORING}
                      alt={CONSTANTS.MESSAGES.CARD2_IMAGE_ALT}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.CENTRALIZED_MONITORING;
                        e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.CENTRALIZED_MONITORING;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{CONSTANTS.MESSAGES.CARD2_TITLE}</h3>
                    <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.CARD2_DESCRIPTION}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={CONSTANTS.IMAGE_PATHS.ACCESS_CONTROL_SYSTEM}
                      alt={CONSTANTS.MESSAGES.CARD3_IMAGE_ALT}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.ACCESS_CONTROL_SYSTEM;
                        e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.ACCESS_CONTROL_SYSTEM;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{CONSTANTS.MESSAGES.CARD3_TITLE}</h3>
                    <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.CARD3_DESCRIPTION}</p>
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
