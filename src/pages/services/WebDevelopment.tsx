import React, { useEffect } from 'react';
import { ArrowLeft, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const CONSTANTS = {
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
  IMAGE_PATHS: {
    MAIN_HERO: "../lovable-uploads/services/2a.png",
    DESIGN_METHODOLOGY: "../lovable-uploads/services/2b.png",
    UI_UX_DESIGN: "../lovable-uploads/services/2c.png",
    ECOMMERCE_SOLUTION: "../lovable-uploads/services/2d.png",
    SEO_PERFORMANCE: "../lovable-uploads/services/2e.png",
  },
  PLACEHOLDER_IMAGE_URLS: {
    MAIN_HERO: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Développement+Web",
    DESIGN_METHODOLOGY: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Design+Responsive",
    UI_UX_DESIGN: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=UI%2FUX+Design",
    ECOMMERCE_SOLUTION: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=E-commerce",
    SEO_PERFORMANCE: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=SEO+%26+Performance",
  },
  MESSAGES: {
    BACK_TO_HOME: "Retour à l'accueil",
    PAGE_TITLE: "Conception Web",
    INTRO_PARAGRAPH: "Zetoun Labs conçoit des solutions web sur mesure pour votre activité à Kinshasa, créant des plateformes performantes et adaptées à vos objectifs de croissance numérique.",
    MAIN_IMAGE_ALT: "Développement web moderne et design responsive pour entreprises",
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
    OFFER_SUPPORT_DESC_LINK_PATH: "/services/technical-support",
    OFFER_SUPPORT_DESC_PART2: ".",
    METHODOLOGY_TITLE: "Notre méthodologie de conception web",
    METHODOLOGY_PARA1: "La création d'un site web efficace passe par une compréhension approfondie de votre activité, de vos objectifs et de votre public cible. Chez Zetoun Labs, nous travaillons en étroite collaboration avec vous à Kinshasa pour concevoir une solution web qui reflète votre identité et répond précisément à vos attentes.",
    METHODOLOGY_PARA2: "Notre approche privilégie la simplicité d'utilisation, un design moderne et les performances techniques pour garantir une expérience utilisateur optimale et un référencement solide.",
    DESIGN_IMAGE_ALT: "Design web responsive et adaptatif sur différents appareils",
    CARD1_TITLE: "Design UI/UX intuitif",
    CARD1_DESCRIPTION: "Interfaces utilisateurs intuitives et esthétiques pour une expérience optimale.",
    CARD1_IMAGE_ALT: "Design UI/UX moderne pour sites web intuitifs",
    CARD2_TITLE: "E-commerce performant",
    CARD2_DESCRIPTION: "Solutions de vente en ligne complètes et sécurisées pour maximiser vos ventes.",
    CARD2_IMAGE_ALT: "Solution e-commerce complète pour la vente en ligne",
    CARD3_TITLE: "SEO & Performance web",
    CARD3_DESCRIPTION: "Optimisation pour les moteurs de recherche et amélioration des temps de chargement.",
    CARD3_IMAGE_ALT: "Analyse SEO et optimisation de la performance web",
  }
};

const WebDevelopment = () => {
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
                  <Globe className="h-8 w-8 text-gray-900" />
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
                  className="space-y-6"
                >
                  {/* Added id for potential sitelink */}
                  <h2 id="notre-offre-web" className="text-3xl font-bold mb-6 text-gray-900">{CONSTANTS.MESSAGES.OFFER_TITLE}</h2>
                  <ul className="space-y-5">
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.OFFER_SHOWCASE_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.OFFER_SHOWCASE_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.OFFER_ECOMMERCE_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.OFFER_ECOMMERCE_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.OFFER_RESPONSIVE_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.OFFER_RESPONSIVE_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.OFFER_SEO_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.OFFER_SEO_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.OFFER_CMS_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">{CONSTANTS.MESSAGES.OFFER_CMS_DESC}</p>
                      </div>
                    </li>
                    <li className="flex items-start group hover:-translate-y-1 transition-all duration-300 bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-lg">
                      <span className="text-gray-900 font-bold mr-4 text-xl flex-shrink-0 mt-1">•</span>
                      <div>
                        <span className="font-bold text-gray-900 text-lg block mb-2">{CONSTANTS.MESSAGES.OFFER_SUPPORT_TITLE}</span>
                        <p className="text-gray-700 leading-relaxed">
                          {CONSTANTS.MESSAGES.OFFER_SUPPORT_DESC_PART1}
                          <Link to={CONSTANTS.MESSAGES.OFFER_SUPPORT_DESC_LINK_PATH} className="text-gray-900 hover:text-gray-700 underline font-semibold transition-colors">
                            {CONSTANTS.MESSAGES.OFFER_SUPPORT_DESC_LINK_TEXT}
                          </Link>
                          {CONSTANTS.MESSAGES.OFFER_SUPPORT_DESC_PART2}
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
                    {/* Added id for potential sitelink */}
                    <h2 id="notre-methodologie" className="text-3xl font-bold mb-6 text-gray-900">{CONSTANTS.MESSAGES.METHODOLOGY_TITLE}</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                      {CONSTANTS.MESSAGES.METHODOLOGY_PARA1}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {CONSTANTS.MESSAGES.METHODOLOGY_PARA2}
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
                        src={CONSTANTS.IMAGE_PATHS.DESIGN_METHODOLOGY}
                        alt={CONSTANTS.MESSAGES.DESIGN_IMAGE_ALT}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.DESIGN_METHODOLOGY;
                          e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.DESIGN_METHODOLOGY;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* These cards also represent distinct topics, implicitly supported by their h3 titles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={CONSTANTS.IMAGE_PATHS.UI_UX_DESIGN}
                      alt={CONSTANTS.MESSAGES.CARD1_IMAGE_ALT}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.UI_UX_DESIGN;
                        e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.UI_UX_DESIGN;
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
                      src={CONSTANTS.IMAGE_PATHS.ECOMMERCE_SOLUTION}
                      alt={CONSTANTS.MESSAGES.CARD2_IMAGE_ALT}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.ECOMMERCE_SOLUTION;
                        e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.ECOMMERCE_SOLUTION;
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
                      src={CONSTANTS.IMAGE_PATHS.SEO_PERFORMANCE}
                      alt={CONSTANTS.MESSAGES.CARD3_IMAGE_ALT}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = CONSTANTS.PLACEHOLDER_IMAGE_URLS.SEO_PERFORMANCE;
                        e.currentTarget.alt = CONSTANTS.PLACEHOLDER_IMAGE_URLS.SEO_PERFORMANCE;
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

export default WebDevelopment;
