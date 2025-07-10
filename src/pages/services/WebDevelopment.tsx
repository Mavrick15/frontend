import React, { useEffect, useState, Suspense } from 'react';
import { ArrowLeft, Globe } from 'lucide-react'; // Only import used icons
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const WebDevelopment = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  const TEXT_CONSTANTS = {
    SEO_TITLE: "Conception Web | Création Sites Internet & E-commerce - Zetoun Labs",
    SEO_DESCRIPTION: "Zetoun Labs conçoit des sites web professionnels à Kinshasa : sites vitrines, e-commerce, design responsive, optimisation SEO et maintenance continue pour votre activité.",
    SEO_KEYWORDS: [
      'conception web',
      'création site internet',
      'développement web',
      'site vitrine',
      'e-commerce',
      'design responsive',
      'optimisation SEO',
      'intégration CMS',
      'maintenance web',
      'Zetoun Labs Kinshasa',
      'solutions web entreprises'
    ],
    BACK_TO_HOME_TEXT: "Retour à l'accueil",
    PAGE_TITLE: "Conception Web",
    INTRO_PARAGRAPH: "Zetoun Labs conçoit des solutions web sur mesure pour votre activité à Kinshasa, créant des plateformes performantes et adaptées à vos objectifs de croissance numérique.",
    MAIN_IMAGE_ALT: "Développement web moderne et design responsive pour entreprises",
    MAIN_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour le développement web",
    OFFER_TITLE: "Notre offre de création et développement web",
    OFFER_SHOWCASE_TITLE: "Sites vitrines professionnels sur mesure",
    OFFER_SHOWCASE_DESC: "Design élégant reflétant l'image de votre entreprise et ses valeurs, optimisé pour l'impact.",
    OFFER_ECOMMERCE_TITLE: "Solutions e-commerce complètes et sécurisées",
    OFFER_ECOMMERCE_DESC: "Boutiques en ligne performantes avec gestion des stocks, systèmes de paiement sécurisés et expérience client fluide.",
    OFFER_RESPONSIVE_TITLE: "Design responsive (mobile-first)",
    OFFER_RESPONSIVE_DESC: "Expérience utilisateur optimale et affichage parfait sur tous les appareils : ordinateurs, tablettes et smartphones.",
    OFFER_SEO_TITLE: "Optimisation SEO avancée et performances web",
    OFFER_SEO_DESC: "Référencement naturel efficace pour une meilleure visibilité sur Google et des temps de chargement ultra-rapides.",
    OFFER_CMS_TITLE: "Intégration CMS (WordPress, Joomla, etc.)",
    OFFER_CMS_DESC: "Administration facile de votre contenu via des interfaces intuitives pour une autonomie totale.",
    OFFER_SUPPORT_TITLE: "Support technique et maintenance continue",
    OFFER_SUPPORT_DESC_PART1: "Assistance technique réactive et évolution permanente de votre site. Découvrez aussi notre service de ",
    OFFER_SUPPORT_DESC_LINK_TEXT: "support technique informatique",
    OFFER_SUPPORT_DESC_PART2: ".",
    METHODOLOGY_TITLE: "Notre méthodologie de conception web",
    METHODOLOGY_PARA1: "La création d'un site web efficace passe par une compréhension approfondie de votre activité, de vos objectifs et de votre public cible. Chez Zetoun Labs, nous travaillons en étroite collaboration avec vous à Kinshasa pour concevoir une solution web qui reflète votre identité et répond précisément à vos attentes.",
    METHODOLOGY_PARA2: "Notre approche privilégie la simplicité d'utilisation, un design moderne et les performances techniques pour garantir une expérience utilisateur optimale et un référencement solide.",
    DESIGN_IMAGE_ALT: "Design web responsive et adaptatif sur différents appareils",
    DESIGN_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour le design web responsive",
    CARD1_IMAGE_ALT: "Design UI/UX moderne pour sites web intuitifs",
    CARD1_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour le design UI/UX",
    CARD1_TITLE: "Design UI/UX intuitif",
    CARD1_DESCRIPTION: "Interfaces utilisateurs intuitives et esthétiques pour une expérience optimale.",
    CARD2_IMAGE_ALT: "Solution e-commerce complète pour la vente en ligne",
    CARD2_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour la solution e-commerce",
    CARD2_TITLE: "E-commerce performant",
    CARD2_DESCRIPTION: "Solutions de vente en ligne complètes et sécurisées pour maximiser vos ventes.",
    CARD3_IMAGE_ALT: "Analyse SEO et optimisation de la performance web",
    CARD3_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour l'analyse SEO et optimisation de la performance web",
    CARD3_TITLE: "SEO & Performance web",
    CARD3_DESCRIPTION: "Optimisation pour les moteurs de recherche et amélioration des temps de chargement.",
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
            imageUrl="../lovable-uploads/services/2a.png"
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
                  <div className="bg-green-100 p-4 rounded-full">
                    <Globe className="h-8 w-8 text-green-600" />
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
                    src="../lovable-uploads/services/2a.png"
                    alt={TEXT_CONSTANTS.MAIN_IMAGE_ALT}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Développement+Web";
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
                    <h2 className="text-2xl font-semibold mb-4 text-green-700">{TEXT_CONSTANTS.OFFER_TITLE}</h2>
                    <ul className="space-y-4 text-lg">
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-green-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.OFFER_SHOWCASE_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.OFFER_SHOWCASE_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-green-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.OFFER_ECOMMERCE_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.OFFER_ECOMMERCE_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-green-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.OFFER_RESPONSIVE_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.OFFER_RESPONSIVE_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-green-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.OFFER_SEO_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.OFFER_SEO_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-green-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.OFFER_CMS_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.OFFER_CMS_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-green-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium">{TEXT_CONSTANTS.OFFER_SUPPORT_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">
                            {TEXT_CONSTANTS.OFFER_SUPPORT_DESC_PART1}
                            <Link to="/services/technical-support" className="text-green-600 hover:underline font-semibold">
                              {TEXT_CONSTANTS.OFFER_SUPPORT_DESC_LINK_TEXT}
                            </Link>
                            {TEXT_CONSTANTS.OFFER_SUPPORT_DESC_PART2}
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
                    <div className="bg-green-50 p-8 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                      <h2 className="text-2xl font-semibold mb-4 text-green-700">{TEXT_CONSTANTS.METHODOLOGY_TITLE}</h2>
                      <p className="text-gray-700 mb-4">
                        {TEXT_CONSTANTS.METHODOLOGY_PARA1}
                      </p>
                      <p className="text-gray-700">
                        {TEXT_CONSTANTS.METHODOLOGY_PARA2}
                      </p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <img
                        src="../lovable-uploads/services/2b.png"
                        alt={TEXT_CONSTANTS.DESIGN_IMAGE_ALT}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Design+Responsive";
                          e.currentTarget.alt = TEXT_CONSTANTS.DESIGN_IMAGE_PLACEHOLDER_ALT;
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
                    className="bg-green-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src="../lovable-uploads/services/2c.png"
                      alt={TEXT_CONSTANTS.CARD1_IMAGE_ALT}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=UI%2FUX+Design";
                        e.currentTarget.alt = TEXT_CONSTANTS.CARD1_IMAGE_PLACEHOLDER_ALT;
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-green-700">{TEXT_CONSTANTS.CARD1_TITLE}</h3>
                      <p className="text-gray-600 text-sm">{TEXT_CONSTANTS.CARD1_DESCRIPTION}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="bg-green-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src="../lovable-uploads/services/2d.png"
                      alt={TEXT_CONSTANTS.CARD2_IMAGE_ALT}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=E-commerce";
                        e.currentTarget.alt = TEXT_CONSTANTS.CARD2_IMAGE_PLACEHOLDER_ALT;
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-green-700">{TEXT_CONSTANTS.CARD2_TITLE}</h3>
                      <p className="text-gray-600 text-sm">{TEXT_CONSTANTS.CARD2_DESCRIPTION}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="bg-green-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src="../lovable-uploads/services/2e.png"
                      alt={TEXT_CONSTANTS.CARD3_IMAGE_ALT}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=SEO+%26+Performance";
                        e.currentTarget.alt = TEXT_CONSTANTS.CARD3_IMAGE_PLACEHOLDER_ALT;
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-green-700">{TEXT_CONSTANTS.CARD3_TITLE}</h3>
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

export default WebDevelopment;
