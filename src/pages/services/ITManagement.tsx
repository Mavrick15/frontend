import React, { useEffect, useState, Suspense } from 'react';
import { ArrowLeft, Monitor } from 'lucide-react'; // Seules les icônes utilisées sont importées
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

// Constantes pour le composant ITManagement
const LOADING_PROGRESS_INTERVAL_MS = 200;
const INITIAL_LOADING_PROGRESS_STEP = 5;
const MAX_LOADING_PROGRESS = 95;
const HOME_PATH = "/";

const IMAGE_PATHS = {
  MAIN_HERO: "../lovable-uploads/services/1.png",
  TEAM_IN_ACTION: "../lovable-uploads/services/2.png",
  DASHBOARD: "../lovable-uploads/services/3.png",
  DATACENTER_SERVERS: "../lovable-uploads/services/4.png",
  DATA_PROTECTION: "../lovable-uploads/services/5.jpg",
};

const PLACEHOLDER_IMAGE_URLS = {
  MAIN_HERO: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Infogérance+IT",
  TEAM_IN_ACTION: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Équipe+Zetoun+Labs",
  DASHBOARD: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Supervision+Réel",
  DATACENTER_SERVERS: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Serveurs+Datacenter",
  DATA_PROTECTION: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Protection+Données",
};

const IT_MANAGEMENT_MESSAGES = {
  RETURN_HOME: "Retour à l'accueil",
  HEADER_TITLE: "Infogérance IT",
  HEADER_DESCRIPTION: "Zetoun Labs vous offre des services d'infogérance IT à Kinshasa pour une supervision continue et une maintenance complète de votre infrastructure informatique, garantissant performance et sécurité.",
  APPROACH_TITLE: "Notre approche de l'infogérance",
  APPROACH_PARA_1: "L'infogérance représente une solution complète pour déléguer la gestion et l'optimisation de votre système d'information à une équipe d'experts certifiés de Zetoun Labs. Notre service surveille, maintient et optimise votre parc informatique en continu pour vous permettre de vous concentrer pleinement sur votre cœur de métier.",
  APPROACH_PARA_2: "Nous détectons et résolvons proactivement les problèmes avant qu'ils n'affectent votre activité, garantissant ainsi la continuité de vos opérations et la sécurité de vos données.",
  SERVICES_TITLE: "Services clés de notre infogérance IT",
  SERVICE_MONITORING_TITLE: "Monitoring 24/7 et alertes proactives",
  SERVICE_MONITORING_DESCRIPTION: "Surveillance continue de vos serveurs, réseaux et applications critiques pour une détection rapide des anomalies.",
  SERVICE_INCIDENT_TITLE: "Gestion des incidents et support réactif",
  SERVICE_INCIDENT_DESCRIPTION: "Détection et résolution rapide des problèmes techniques pour minimiser les interruptions. Voir aussi notre service de",
  SERVICE_INCIDENT_LINK_TEXT: "Support Technique",
  SERVICE_INCIDENT_LINK_PATH: "/services/technical-support",
  SERVICE_BACKUP_TITLE: "Sauvegarde et restauration sécurisées",
  SERVICE_BACKUP_DESCRIPTION: "Protection et récupération de vos données essentielles avec des stratégies robustes de sauvegarde et restauration.",
  SERVICE_UPDATES_TITLE: "Mises à jour et correctifs de sécurité",
  SERVICE_UPDATES_DESCRIPTION: "Maintien à jour de vos systèmes pour garantir la sécurité, la performance et la conformité. Inclut la",
  SERVICE_UPDATES_LINK_TEXT: "Maintenance informatique",
  SERVICE_UPDATES_LINK_PATH: "/formations/computer-maintenance",
  SERVICE_REPORTING_TITLE: "Reporting détaillé et optimisation continue",
  SERVICE_REPORTING_DESCRIPTION: "Rapports réguliers sur la performance et documentation technique de votre infrastructure pour une visibilité complète.",
  SERVICE_RISK_MANAGEMENT_TITLE: "Gestion proactive des risques et optimisation",
  SERVICE_RISK_MANAGEMENT_DESCRIPTION: "Anticipation des problèmes potentiels et optimisation continue de votre infrastructure IT pour une efficacité maximale.",
  SUPERVISION_CARD_TITLE: "Supervision en temps réel",
  SUPERVISION_CARD_DESCRIPTION: "Tableaux de bord et alertes personnalisées 24/7 pour une réactivité optimale.",
  INFRASTRUCTURE_CARD_TITLE: "Infrastructure sécurisée",
  INFRASTRUCTURE_CARD_DESCRIPTION: "Gestion complète de vos serveurs, incluant la sécurité des données et des systèmes.",
  CONTINUITY_CARD_TITLE: "Continuité d'activité",
  CONTINUITY_CARD_DESCRIPTION: "Solutions robustes de sauvegarde, de reprise d'activité et de reprise après sinistre.",
};

const SEO_METADATA = {
  TITLE: "Infogérance IT | Supervision & Maintenance Informatique - Zetoun Labs",
  DESCRIPTION: "Déléguez la gestion de votre SI à Zetoun Labs à Kinshasa : monitoring 24/7, gestion proactive des incidents, sauvegarde sécurisée, restauration et maintenance informatique complète.",
  KEYWORDS: [
    'infogérance', 'gestion IT', 'maintenance informatique', 'supervision 24/7', 'sauvegarde données',
    'restauration système', 'support informatique', 'gestion incidents IT', 'Zetoun Labs Kinshasa', 'services IT Kinshasa'
  ],
  IMAGE_URL: IMAGE_PATHS.MAIN_HERO,
};

const ITManagement = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress < MAX_LOADING_PROGRESS) {
          return prevProgress + INITIAL_LOADING_PROGRESS_STEP;
        }
        return prevProgress;
      });
    }, LOADING_PROGRESS_INTERVAL_MS);

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
            title={SEO_METADATA.TITLE}
            description={SEO_METADATA.DESCRIPTION}
            keywords={SEO_METADATA.KEYWORDS}
            imageUrl={SEO_METADATA.IMAGE_URL}
          />

          <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
              <div className="max-w-6xl mx-auto">
                <Link to={HOME_PATH} className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {IT_MANAGEMENT_MESSAGES.RETURN_HOME}
                </Link>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center mb-6 space-x-4"
                >
                  <div className="bg-purple-100 p-4 rounded-full">
                    <Monitor className="h-8 w-8 text-purple-600" />
                  </div>
                  <h1 className="text-4xl font-bold">{IT_MANAGEMENT_MESSAGES.HEADER_TITLE}</h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-gray-600 mb-8"
                >
                  {IT_MANAGEMENT_MESSAGES.HEADER_DESCRIPTION}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="w-full h-64 md:h-80 mb-12 overflow-hidden rounded-xl"
                >
                  <img
                    src={IMAGE_PATHS.MAIN_HERO}
                    alt=""
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = PLACEHOLDER_IMAGE_URLS.MAIN_HERO;
                      e.currentTarget.alt = "[Image de remplacement pour l'infogérance IT]";
                    }}
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-purple-50 p-8 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h2 className="text-2xl font-semibold mb-4 text-purple-700">{IT_MANAGEMENT_MESSAGES.APPROACH_TITLE}</h2>
                    <p className="text-gray-700 mb-4">
                      {IT_MANAGEMENT_MESSAGES.APPROACH_PARA_1}
                    </p>
                    <p className="text-gray-700 mb-4">
                      {IT_MANAGEMENT_MESSAGES.APPROACH_PARA_2}
                    </p>
                    <div className="mt-6 rounded-lg overflow-hidden">
                      <img
                        src={IMAGE_PATHS.TEAM_IN_ACTION}
                        alt=""
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = PLACEHOLDER_IMAGE_URLS.TEAM_IN_ACTION;
                          e.currentTarget.alt = "[Image de remplacement pour l'équipe Zetoun Labs]";
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
                    <h2 className="text-2xl font-semibold mb-4 text-purple-700">{IT_MANAGEMENT_MESSAGES.SERVICES_TITLE}</h2>
                    <ul className="space-y-4 text-lg">
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-purple-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{IT_MANAGEMENT_MESSAGES.SERVICE_MONITORING_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{IT_MANAGEMENT_MESSAGES.SERVICE_MONITORING_DESCRIPTION}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-purple-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{IT_MANAGEMENT_MESSAGES.SERVICE_INCIDENT_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">
                            {IT_MANAGEMENT_MESSAGES.SERVICE_INCIDENT_DESCRIPTION}
                            <Link to={IT_MANAGEMENT_MESSAGES.SERVICE_INCIDENT_LINK_PATH} className="text-purple-600 hover:underline font-semibold"> {IT_MANAGEMENT_MESSAGES.SERVICE_INCIDENT_LINK_TEXT}</Link>.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-purple-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{IT_MANAGEMENT_MESSAGES.SERVICE_BACKUP_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{IT_MANAGEMENT_MESSAGES.SERVICE_BACKUP_DESCRIPTION}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-purple-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{IT_MANAGEMENT_MESSAGES.SERVICE_UPDATES_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">
                            {IT_MANAGEMENT_MESSAGES.SERVICE_UPDATES_DESCRIPTION}
                            <Link to={IT_MANAGEMENT_MESSAGES.SERVICE_UPDATES_LINK_PATH} className="text-purple-600 hover:underline font-semibold"> {IT_MANAGEMENT_MESSAGES.SERVICE_UPDATES_LINK_TEXT}</Link>.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-purple-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{IT_MANAGEMENT_MESSAGES.SERVICE_REPORTING_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{IT_MANAGEMENT_MESSAGES.SERVICE_REPORTING_DESCRIPTION}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-purple-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{IT_MANAGEMENT_MESSAGES.SERVICE_RISK_MANAGEMENT_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{IT_MANAGEMENT_MESSAGES.SERVICE_RISK_MANAGEMENT_DESCRIPTION}</p>
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
                    className="bg-purple-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={IMAGE_PATHS.DASHBOARD}
                      alt=""
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = PLACEHOLDER_IMAGE_URLS.DASHBOARD;
                        e.currentTarget.alt = "[Image de remplacement pour la supervision en temps réel]";
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-purple-700">{IT_MANAGEMENT_MESSAGES.SUPERVISION_CARD_TITLE}</h3>
                      <p className="text-gray-600 text-sm">{IT_MANAGEMENT_MESSAGES.SUPERVISION_CARD_DESCRIPTION}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="bg-purple-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={IMAGE_PATHS.DATACENTER_SERVERS}
                      alt=""
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = PLACEHOLDER_IMAGE_URLS.DATACENTER_SERVERS;
                        e.currentTarget.alt = "[Image de remplacement pour les serveurs en datacenter]";
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-purple-700">{IT_MANAGEMENT_MESSAGES.INFRASTRUCTURE_CARD_TITLE}</h3>
                      <p className="text-gray-600 text-sm">{IT_MANAGEMENT_MESSAGES.INFRASTRUCTURE_CARD_DESCRIPTION}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="bg-purple-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={IMAGE_PATHS.DATA_PROTECTION}
                      alt=""
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = PLACEHOLDER_IMAGE_URLS.DATA_PROTECTION;
                        e.currentTarget.alt = "[Image de remplacement pour la protection des données]";
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-purple-700">{IT_MANAGEMENT_MESSAGES.CONTINUITY_CARD_TITLE}</h3>
                      <p className="text-gray-600 text-sm">{IT_MANAGEMENT_MESSAGES.CONTINUITY_CARD_DESCRIPTION}</p>
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

export default ITManagement;
