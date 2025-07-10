import React, { useEffect, useState, Suspense } from 'react';
import { ArrowLeft, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const SolarInstallation = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Constants for text content
  const TEXT_CONSTANTS = {
    SEO_TITLE: "Installation Solaire | Conception & Systèmes - Zetoun Labs",
    SEO_DESCRIPTION: "Profitez de l'énergie propre à Kinshasa avec Zetoun Labs : conception, installation et maintenance de systèmes photovoltaïques résidentiels et commerciaux.",
    SEO_KEYWORDS: [
      'installation solaire',
      'énergie solaire',
      'panneaux solaires',
      'systèmes photovoltaïques',
      'onduleurs solaires',
      'batteries solaires',
      'autoconsommation',
      'entretien solaire',
      'audit énergétique',
      'électricité propre',
      'Kinshasa',
      'Zetoun Labs'
    ],
    BACK_TO_HOME_TEXT: "Retour à l'accueil",
    PAGE_TITLE: "Installation Solaire",
    INTRO_PARAGRAPH: "Zetoun Labs est votre partenaire de confiance à Kinshasa pour la conception et l'installation de systèmes photovoltaïques, vous permettant de bénéficier d'une énergie propre, fiable et économique.",
    MAIN_IMAGE_ALT: "Panneaux solaires installés sur un toit, produisant de l'énergie propre",
    MAIN_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour les panneaux solaires",
    SOLUTIONS_TITLE: "Nos solutions solaires complètes",
    SOLUTION_AUDIT_TITLE: "Audit énergétique et dimensionnement initial",
    SOLUTION_AUDIT_DESC: "Analyse de votre consommation et des contraintes spécifiques de votre site à Kinshasa.",
    SOLUTION_DESIGN_TITLE: "Conception de systèmes photovoltaïques sur mesure",
    SOLUTION_DESIGN_DESC: "Intégration optimale des panneaux, onduleurs et systèmes de stockage pour une efficacité maximale.",
    SOLUTION_INSTALLATION_TITLE: "Installation professionnelle et sécurisée",
    SOLUTION_INSTALLATION_DESC: "Réalisée par des techniciens certifiés, respectant les normes de sécurité et de qualité internationales.",
    SOLUTION_STORAGE_TITLE: "Solutions de stockage d'énergie (batteries)",
    SOLUTION_STORAGE_DESC: "Pour une autonomie accrue et une disponibilité d'énergie constante, même en l'absence de soleil.",
    SOLUTION_MAINTENANCE_TITLE: "Suivi et maintenance préventive",
    SOLUTION_MAINTENANCE_DESC_PART1: "Assurant la performance, la longévité et la ",
    SOLUTION_MAINTENANCE_DESC_LINK_TEXT: "maintenance",
    SOLUTION_MAINTENANCE_DESC_PART2: " de votre installation solaire.",
    SOLUTION_SMART_HOME_TITLE: "Intégration avec les solutions de maison intelligente",
    SOLUTION_SMART_HOME_DESC: "Pour une gestion optimisée de votre consommation et de votre production d'énergie.",
    COMMITMENT_TITLE: "Notre engagement pour une énergie propre",
    COMMITMENT_PARA1: "Chaque projet solaire est unique. Notre équipe d'experts à Kinshasa s'engage à vous fournir une solution énergétique personnalisée, qui maximise votre production d'énergie, réduit vos coûts et contribue à un avenir plus durable.",
    COMMITMENT_PARA2: "Nous sélectionnons des équipements de haute qualité et appliquons des techniques d'installation rigoureuses pour garantir la fiabilité et la performance à long terme de votre système solaire.",
    TECH_IMAGE_ALT: "Ingénieur examinant les données de production d'un système solaire",
    TECH_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour l'ingénieur solaire",
    CARD1_IMAGE_ALT: "Maison alimentée par l'énergie solaire, symbolisant l'autonomie",
    CARD1_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour la maison autonome",
    CARD1_TITLE: "Autonomie & Économies",
    CARD1_DESCRIPTION: "Réduisez significativement vos factures d'électricité et gagnez en indépendance énergétique à Kinshasa.",
    CARD2_IMAGE_ALT: "Panneaux solaires résistants aux intempéries, illustrant la durabilité",
    CARD2_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour les panneaux fiables",
    CARD2_TITLE: "Fiabilité et Durabilité",
    CARD2_DESCRIPTION: "Des systèmes conçus pour durer, offrant une source d'énergie stable et performante sur le long terme.",
    CARD3_IMAGE_ALT: "Arbre et panneaux solaires, symbolisant l'engagement environnemental",
    CARD3_IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour l'énergie verte",
    CARD3_TITLE: "Impact Environnemental Positif",
    CARD3_DESCRIPTION: "Contribuez à la réduction des émissions de carbone et à la protection de l'environnement.",
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
      <div className="min-h-screen bg-white font-inter">
        <PageLayout>
          <SEO
            title={TEXT_CONSTANTS.SEO_TITLE}
            description={TEXT_CONSTANTS.SEO_DESCRIPTION}
            keywords={TEXT_CONSTANTS.SEO_KEYWORDS}
            imageUrl="/lovable-uploads/services/panneaux.png"
          />

          <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
              <div className="max-w-6xl mx-auto">
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors rounded-full p-2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {TEXT_CONSTANTS.BACK_TO_HOME_TEXT}
                </Link>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center mb-6 space-x-4"
                >
                  <div className="bg-yellow-100 p-4 rounded-full shadow-lg">
                    <Sun className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900">{TEXT_CONSTANTS.PAGE_TITLE}</h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-gray-700 mb-8 leading-relaxed"
                >
                  {TEXT_CONSTANTS.INTRO_PARAGRAPH}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="w-full h-64 md:h-80 mb-12 overflow-hidden rounded-xl shadow-lg"
                >
                  <img
                    src="/lovable-uploads/services/panneaux.png"
                    alt={TEXT_CONSTANTS.MAIN_IMAGE_ALT}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Panneaux+Solaires";
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
                    <h2 className="text-2xl font-semibold mb-4 text-yellow-700">{TEXT_CONSTANTS.SOLUTIONS_TITLE}</h2>
                    <ul className="space-y-4 text-lg">
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-yellow-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium text-gray-800">{TEXT_CONSTANTS.SOLUTION_AUDIT_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.SOLUTION_AUDIT_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-yellow-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium text-gray-800">{TEXT_CONSTANTS.SOLUTION_DESIGN_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.SOLUTION_DESIGN_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-yellow-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium text-gray-800">{TEXT_CONSTANTS.SOLUTION_INSTALLATION_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.SOLUTION_INSTALLATION_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-yellow-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium text-gray-800">{TEXT_CONSTANTS.SOLUTION_STORAGE_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.SOLUTION_STORAGE_DESC}</p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-yellow-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium text-gray-800">{TEXT_CONSTANTS.SOLUTION_MAINTENANCE_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">
                            {TEXT_CONSTANTS.SOLUTION_MAINTENANCE_DESC_PART1}
                            <Link to="/services/technical-support" className="text-amber-600 hover:underline font-semibold">
                              {TEXT_CONSTANTS.SOLUTION_MAINTENANCE_DESC_LINK_TEXT}
                            </Link>
                            {TEXT_CONSTANTS.SOLUTION_MAINTENANCE_DESC_PART2}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-yellow-500 font-bold mr-3 text-xl">•</span>
                        <div>
                          <span className="font-medium text-gray-800">{TEXT_CONSTANTS.SOLUTION_SMART_HOME_TITLE}</span>
                          <p className="text-gray-600 text-base mt-1">{TEXT_CONSTANTS.SOLUTION_SMART_HOME_DESC}</p>
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
                    <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-100 shadow-sm hover:shadow-md transition-shadow">
                      <h2 className="text-2xl font-semibold mb-4 text-yellow-700">{TEXT_CONSTANTS.COMMITMENT_TITLE}</h2>
                      <p className="text-gray-700 mb-4">
                        {TEXT_CONSTANTS.COMMITMENT_PARA1}
                      </p>
                      <p className="text-gray-700">
                        {TEXT_CONSTANTS.COMMITMENT_PARA2}
                      </p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <img
                        src="/lovable-uploads/services/inge.png"
                        alt={TEXT_CONSTANTS.TECH_IMAGE_ALT}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Ingénieur+Solaire";
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
                    className="bg-yellow-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src="/lovable-uploads/services/home.png"
                      alt={TEXT_CONSTANTS.CARD1_IMAGE_ALT}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Maison+Autonome";
                        e.currentTarget.alt = TEXT_CONSTANTS.CARD1_IMAGE_PLACEHOLDER_ALT;
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-yellow-700">{TEXT_CONSTANTS.CARD1_TITLE}</h3>
                      <p className="text-gray-600 text-sm">{TEXT_CONSTANTS.CARD1_DESCRIPTION}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="bg-yellow-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src="/lovable-uploads/services/inte.png"
                      alt={TEXT_CONSTANTS.CARD2_IMAGE_ALT}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Panneaux+Fiables";
                        e.currentTarget.alt = TEXT_CONSTANTS.CARD2_IMAGE_PLACEHOLDER_ALT;
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-yellow-700">{TEXT_CONSTANTS.CARD2_TITLE}</h3>
                      <p className="text-gray-600 text-sm">{TEXT_CONSTANTS.CARD2_DESCRIPTION}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="bg-yellow-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src="/lovable-uploads/services/energie.png"
                      alt={TEXT_CONSTANTS.CARD3_IMAGE_ALT}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Énergie+Verte";
                        e.currentTarget.alt = TEXT_CONSTANTS.CARD3_IMAGE_PLACEHOLDER_ALT;
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-yellow-700">{TEXT_CONSTANTS.CARD3_TITLE}</h3>
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

export default SolarInstallation;
