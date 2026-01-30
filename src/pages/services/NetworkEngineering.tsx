import React, { useEffect } from 'react';
import { Router } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import ServicePageLayout from '@/components/ServicePageLayout';

const CONSTANTS = {
  SEO_TITLE: "Ingénierie Réseau | Conception & Installation - Zetoun Labs",
  SEO_DESCRIPTION: "Optimisez votre infrastructure avec l'ingénierie réseau de Zetoun Labs à Kinshasa : conception LAN/WAN, câblage structuré, configuration d'équipements Cisco et sécurité réseau.",
  SEO_KEYWORDS: [
    'ingénierie réseau',
    'conception réseau',
    'installation réseau',
    'LAN WAN',
    'câblage structuré',
    'fibre optique',
    'sécurité réseau',
    'configuration routeurs',
    'configuration switches',
    'Wi-Fi haute densité',
    'audit réseau',
    'Kinshasa',
    'Zetoun Labs'
  ],
  IMAGE_PATHS: {
    MAIN_HERO: "../lovable-uploads/services/11.jpg",
    TECH_IN_ACTION: "../lovable-uploads/services/reseau.webp",
    DATACENTER: "../lovable-uploads/services/2.avif",
    CABLING: "../lovable-uploads/services/1.avif",
    FIREWALL: "../lovable-uploads/services/3.avif",
  },
  PLACEHOLDER_IMAGE_URLS: {
    MAIN_HERO: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Réseau+Moderne",
    TECH_IN_ACTION: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Technicien+Réseau",
    DATACENTER: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Centre+Données",
    CABLING: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Câblage+Réseau",
    FIREWALL: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Sécurité+Réseau",
  },
  MESSAGES: {
    RETURN_HOME: "Retour à l'accueil",
    HEADER_TITLE: "Ingénierie Réseau",
    HEADER_DESCRIPTION: "Zetoun Labs est votre expert en ingénierie réseau à Kinshasa, spécialisé dans la conception et la mise en place d'infrastructures réseau performantes, sécurisées et évolutives.",
    MAIN_IMAGE_ALT: "Infrastructure réseau moderne et performante installée par Zetoun Labs",
    SOLUTIONS_TITLE: "Nos solutions réseau complètes",
    SOLUTION_LAN_WAN_TITLE: "Conception d'architectures LAN/WAN évolutives",
    SOLUTION_LAN_WAN_DESC: "Optimisées pour répondre aux besoins actuels et futurs de votre entreprise à Kinshasa.",
    SOLUTION_CABLING_TITLE: "Installation de câblage structuré professionnel",
    SOLUTION_CABLING_DESC: "Fibre optique, cuivre catégorie 6A/7, certifications et tests de performance fiables.",
    SOLUTION_ROUTERS_SWITCHES_TITLE: "Configuration de routeurs et switches managés",
    SOLUTION_ROUTERS_SWITCHES_DESC: "Équipements de grade professionnel pour une performance et une fiabilité inégalées.",
    SOLUTION_WIFI_TITLE: "Mise en place de solutions Wi-Fi haute densité",
    SOLUTION_WIFI_DESC: "Couverture optimale et gestion centralisée pour grandes surfaces et environnements exigeants.",
    SOLUTION_SECURITY_TITLE: "Sécurisation de l'infrastructure réseau",
    SOLUTION_SECURITY_DESC_PART1: "Déploiement de firewalls nouvelle génération, segmentation réseau et détection d'intrusion avancée. Découvrez aussi nos services de ",
    SOLUTION_SECURITY_DESC_LINK_TEXT: "vidéosurveillance et sécurité",
    SOLUTION_SECURITY_DESC_LINK_PATH: "/services/video-surveillance",
    SOLUTION_SECURITY_DESC_PART2: ".",
    SOLUTION_DOC_TRAINING_TITLE: "Documentation technique détaillée et formation",
    SOLUTION_DOC_TRAINING_DESC_PART1: "Schémas, rapports complets et documentation pour une maintenance facilitée. Pensez également à notre ",
    SOLUTION_DOC_TRAINING_DESC_LINK_TEXT: "formation en administration réseau",
    SOLUTION_DOC_TRAINING_DESC_LINK_PATH: "/formations/network-administration",
    SOLUTION_DOC_TRAINING_DESC_PART2: " pour vos équipes.",
    APPROACH_TITLE: "Notre approche personnalisée",
    APPROACH_PARA1: "Chaque entreprise a des besoins spécifiques en matière de réseau. Notre équipe d'experts analyse vos exigences pour concevoir une infrastructure sur mesure qui répond à vos besoins actuels tout en anticipant votre croissance future.",
    APPROACH_PARA2: "Nous privilégions la qualité des composants, la rigueur de l'installation et la documentation complète pour garantir la fiabilité et la pérennité de votre réseau.",
    TECH_IMAGE_ALT: "Technicien configurant du matériel réseau Cisco",
    CARD1_TITLE: "Infrastructure évolutive",
    CARD1_DESCRIPTION: "Solutions adaptées aux PME et grandes entreprises de Kinshasa.",
    CARD1_IMAGE_ALT: "Centre de données moderne avec serveurs réseau",
    CARD2_TITLE: "Performance optimale",
    CARD2_DESCRIPTION: "Matériel de pointe et configurations optimisées pour des performances réseau maximales.",
    CARD2_IMAGE_ALT: "Câblage réseau structuré dans un rack informatique",
    CARD3_TITLE: "Sécurité intégrée",
    CARD3_DESCRIPTION: "Protection proactive contre les menaces avancées et les cyberattaques.",
    CARD3_IMAGE_ALT: "Firewall protégeant un réseau d'entreprise contre les menaces",
  }
};

const NetworkEngineering = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      <SEO
        title={CONSTANTS.SEO_TITLE}
        description={CONSTANTS.SEO_DESCRIPTION}
        keywords={CONSTANTS.SEO_KEYWORDS}
        imageUrl={CONSTANTS.IMAGE_PATHS.MAIN_HERO}
      />

      <ServicePageLayout
        icon={Router}
        iconColor="text-gray-900"
        iconBg="bg-gray-100"
        title={CONSTANTS.MESSAGES.HEADER_TITLE}
        description={CONSTANTS.MESSAGES.HEADER_DESCRIPTION}
        heroImage={CONSTANTS.IMAGE_PATHS.MAIN_HERO}
        heroImageAlt={CONSTANTS.MESSAGES.MAIN_IMAGE_ALT}
      >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    {CONSTANTS.MESSAGES.SOLUTIONS_TITLE}
                  </h2>
                  <ul className="space-y-5">
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.SOLUTION_LAN_WAN_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.SOLUTION_LAN_WAN_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.SOLUTION_CABLING_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.SOLUTION_CABLING_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.SOLUTION_ROUTERS_SWITCHES_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.SOLUTION_ROUTERS_SWITCHES_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.SOLUTION_WIFI_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.SOLUTION_WIFI_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.SOLUTION_SECURITY_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">
                          {CONSTANTS.MESSAGES.SOLUTION_SECURITY_DESC_PART1}
                          <Link to={CONSTANTS.MESSAGES.SOLUTION_SECURITY_DESC_LINK_PATH} className="text-gray-900 hover:text-gray-700 underline font-semibold transition-colors">
                            {CONSTANTS.MESSAGES.SOLUTION_SECURITY_DESC_LINK_TEXT}
                          </Link>
                          {CONSTANTS.MESSAGES.SOLUTION_SECURITY_DESC_PART2}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.SOLUTION_DOC_TRAINING_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">
                          {CONSTANTS.MESSAGES.SOLUTION_DOC_TRAINING_DESC_PART1}
                          <Link to={CONSTANTS.MESSAGES.SOLUTION_DOC_TRAINING_DESC_LINK_PATH} className="text-gray-900 hover:text-gray-700 underline font-semibold transition-colors">
                            {CONSTANTS.MESSAGES.SOLUTION_DOC_TRAINING_DESC_LINK_TEXT}
                          </Link>
                          {CONSTANTS.MESSAGES.SOLUTION_DOC_TRAINING_DESC_PART2}
                        </p>
                      </div>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col space-y-8"
                >
                  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">
                      {CONSTANTS.MESSAGES.APPROACH_TITLE}
                    </h2>
                    <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                      {CONSTANTS.MESSAGES.APPROACH_PARA1}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {CONSTANTS.MESSAGES.APPROACH_PARA2}
                    </p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={CONSTANTS.IMAGE_PATHS.TECH_IN_ACTION}
                        alt={CONSTANTS.MESSAGES.TECH_IMAGE_ALT}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.TECH_IN_ACTION;
                          e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.TECH_IN_ACTION;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={CONSTANTS.IMAGE_PATHS.DATACENTER}
                      alt={CONSTANTS.MESSAGES.CARD1_IMAGE_ALT}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.DATACENTER;
                        e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.DATACENTER;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{CONSTANTS.MESSAGES.CARD1_TITLE}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{CONSTANTS.MESSAGES.CARD1_DESCRIPTION}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={CONSTANTS.IMAGE_PATHS.CABLING}
                      alt={CONSTANTS.MESSAGES.CARD2_IMAGE_ALT}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.CABLING;
                        e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.CABLING;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{CONSTANTS.MESSAGES.CARD2_TITLE}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{CONSTANTS.MESSAGES.CARD2_DESCRIPTION}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={CONSTANTS.IMAGE_PATHS.FIREWALL}
                      alt={CONSTANTS.MESSAGES.CARD3_IMAGE_ALT}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.FIREWALL;
                        e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.FIREWALL;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{CONSTANTS.MESSAGES.CARD3_TITLE}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{CONSTANTS.MESSAGES.CARD3_DESCRIPTION}</p>
                  </div>
                </motion.div>
              </div>
      </ServicePageLayout>
    </PageLayout>
  );
};

export default NetworkEngineering;
