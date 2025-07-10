import React, { useEffect, useState, Suspense } from 'react';
import { ArrowLeft, HeadsetIcon } from 'lucide-react'; // Only import used icons
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const TechnicalSupport = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Constants for text content
  const TEXT_CONSTANTS = {
    SEO_TITLE: "Support Technique Informatique | Assistance IT Réactive - Zetoun Labs",
    SEO_DESCRIPTION: "Bénéficiez d'un support technique informatique rapide et fiable avec Zetoun Labs à Kinshasa : assistance multi-canal, dépannage à distance, interventions sur site et formation utilisateur.",
    SEO_KEYWORDS: [
      'support technique',
      'assistance informatique',
      'dépannage informatique',
      'helpdesk IT',
      'support utilisateur',
      'prise en main à distance',
      'intervention sur site informatique',
      'hotline entreprises',
      'formation informatique',
      'Zetoun Labs Kinshasa'
    ],
    BACK_TO_HOME_TEXT: "Retour à l'accueil",
    PAGE_TITLE: "Support Technique Informatique",
    INTRO_PARAGRAPH: "Zetoun Labs offre une assistance technique réactive et efficace à Kinshasa, garantissant la résolution rapide de tous vos problèmes informatiques pour maintenir la continuité de votre activité.",
    MAIN_IMAGE_ALT: "Centre d'assistance technique avec opérateurs support informatique",
    MAIN_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour le centre d'assistance technique",
    SERVICES_TITLE: "Nos services d'assistance informatique",
    SERVICE_MULTICHANNEL_TITLE: "Support utilisateur multi-canal",
    SERVICE_MULTICHANNEL_DESC: "Assistance complète par téléphone, email, chat ou visioconférence pour toutes vos requêtes.",
    SERVICE_PRIORITY_PHONE_TITLE: "Assistance téléphonique prioritaire",
    SERVICE_PRIORITY_PHONE_DESC: "Ligne directe avec un temps d'attente minimal pour les urgences informatiques.",
    SERVICE_REMOTE_CONTROL_TITLE: "Prise en main à distance sécurisée",
    SERVICE_REMOTE_CONTROL_DESC: "Intervention rapide et sécurisée sur vos systèmes sans nécessiter de déplacement.",
    SERVICE_ONSITE_TITLE: "Intervention sur site si nécessaire",
    SERVICE_ONSITE_DESC: "Techniciens qualifiés disponibles pour les problèmes matériels ou réseau complexes.",
    SERVICE_HOTLINE_TITLE: "Hotline dédiée pour entreprises",
    SERVICE_HOTLINE_DESC: "Service personnalisé avec un interlocuteur privilégié pour une gestion fluide de vos demandes.",
    SERVICE_TRAINING_TITLE: "Formation et sensibilisation des utilisateurs",
    SERVICE_TRAINING_DESC_PART1: "Sessions de formation sur mesure pour votre équipe afin de renforcer l'autonomie et la sécurité informatique. Cela complète nos services d'",
    SERVICE_TRAINING_DESC_LINK_TEXT: "infogérance IT",
    SERVICE_TRAINING_DESC_PART2: ".",
    PHILOSOPHY_TITLE: "Notre philosophie d'intervention",
    PHILOSOPHY_PARA1: "Un problème informatique peut rapidement paralyser votre activité. Notre équipe de techniciens qualifiés à Kinshasa intervient dans les plus brefs délais pour diagnostiquer et résoudre vos incidents, qu'il s'agisse de problèmes matériels, logiciels ou réseau.",
    PHILOSOPHY_PARA2: "Nous privilégions les solutions pérennes plutôt que les correctifs temporaires, et nous expliquons clairement les origines du problème pour éviter qu'il ne se reproduise. Notre objectif est votre tranquillité d'esprit numérique.",
    TECH_IMAGE_ALT: "Technicien de support informatique travaillant sur un ordinateur",
    TECH_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour un technicien de support informatique",
    CARD1_IMAGE_ALT: "Support informatique à distance pour résolution rapide",
    CARD1_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour le support à distance",
    CARD1_TITLE: "Support à distance",
    CARD1_DESCRIPTION: "Intervention rapide et efficace sans déplacement, où que vous soyez à Kinshasa.",
    CARD2_IMAGE_ALT: "Formation des utilisateurs sur les outils informatiques",
    CARD2_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour la formation informatique",
    CARD2_TITLE: "Formation et sensibilisation",
    CARD2_DESCRIPTION: "Accompagnement de vos équipes pour une meilleure utilisation et sécurité de l'IT.",
    CARD3_IMAGE_ALT: "Intervention technique sur site pour dépannage complexe",
    CARD3_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour l'intervention sur site",
    CARD3_TITLE: "Intervention sur site",
    CARD3_DESCRIPTION: "Nos techniciens qualifiés se déplacent pour les diagnostics et réparations complexes.",
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
            imageUrl="../lovable-uploads/services/3a.png"
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
                  <div className="bg-amber-100 p-4 rounded-full">
                    <HeadsetIcon className="h-8 w-8 text-amber-600" />
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
                    src="../lovable-uploads/services/3a.png"
                    alt={TEXT_CONSTANTS.MAIN_IMAGE_ALT}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Support+Tech";
                      e.currentTarget.alt = TEXT_CONSTANTS.MAIN_IMAGE_PLACEHOLDER_ALT;
                    }}
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-semibold mb-4 text-amber-700">{TEXT_CONSTANTS.SERVICES_TITLE}</h2>
                    <ul className="space-y-4 text-lg">
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-amber-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.SERVICE_MULTICHANNEL_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.SERVICE_MULTICHANNEL_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-amber-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.SERVICE_PRIORITY_PHONE_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.SERVICE_PRIORITY_PHONE_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-amber-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.SERVICE_REMOTE_CONTROL_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.SERVICE_REMOTE_CONTROL_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-amber-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.SERVICE_ONSITE_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.SERVICE_ONSITE_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-amber-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.SERVICE_HOTLINE_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.SERVICE_HOTLINE_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-amber-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.SERVICE_TRAINING_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">
                            {TEXT_CONSTANTS.SERVICE_TRAINING_DESC_PART1}
                            <Link to="/services/it-management" className="text-amber-600 hover:underline font-semibold">
                              {TEXT_CONSTANTS.SERVICE_TRAINING_DESC_LINK_TEXT}
                            </Link>
                            {TEXT_CONSTANTS.SERVICE_TRAINING_DESC_PART2}
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
                    <div className="bg-amber-50 p-8 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                      <h2 className="text-2xl font-semibold mb-4 text-amber-700">{TEXT_CONSTANTS.PHILOSOPHY_TITLE}</h2>
                      <p className="text-gray-700 mb-4">
                        {TEXT_CONSTANTS.PHILOSOPHY_PARA1}
                      </p>
                      <p className="text-gray-700">
                        {TEXT_CONSTANTS.PHILOSOPHY_PARA2}
                      </p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <img
                        src="../lovable-uploads/services/3b.png"
                        alt={TEXT_CONSTANTS.TECH_IMAGE_ALT}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Support+Tech";
                          e.currentTarget.alt = TEXT_CONSTANTS.TECH_IMAGE_PLACEHOLDER_ALT;
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-amber-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src="../lovable-uploads/services/3c.png"
                      alt={TEXT_CONSTANTS.CARD1_IMAGE_ALT}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Support+Distance";
                        e.currentTarget.alt = TEXT_CONSTANTS.CARD1_IMAGE_PLACEHOLDER_ALT;
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-amber-700">{TEXT_CONSTANTS.CARD1_TITLE}</h3>
                      <p className="text-gray-600 text-sm">{TEXT_CONSTANTS.CARD1_DESCRIPTION}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="bg-amber-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src="../lovable-uploads/services/3d.png"
                      alt={TEXT_CONSTANTS.CARD2_IMAGE_ALT}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Formation+IT";
                        e.currentTarget.alt = TEXT_CONSTANTS.CARD2_IMAGE_PLACEHOLDER_ALT;
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-amber-700">{TEXT_CONSTANTS.CARD2_TITLE}</h3>
                      <p className="text-gray-600 text-sm">{TEXT_CONSTANTS.CARD2_DESCRIPTION}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="bg-amber-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src="../lovable-uploads/services/3e.png"
                      alt={TEXT_CONSTANTS.CARD3_IMAGE_ALT}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Intervention+Site";
                        e.currentTarget.alt = TEXT_CONSTANTS.CARD3_IMAGE_PLACEHOLDER_ALT;
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-amber-700">{TEXT_CONSTANTS.CARD3_TITLE}</h3>
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

export default TechnicalSupport;
