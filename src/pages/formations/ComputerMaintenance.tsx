import React, { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HardDrive, Wrench, Settings, Cpu, Monitor, Shield } from 'lucide-react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

// Constantes pour le composant ComputerMaintenance
const TEXT_CONSTANTS = {
  LOADING_PROGRESS_INTERVAL_MS: 200,
  INITIAL_LOADING_PROGRESS_STEP: 5,
  MAX_LOADING_PROGRESS: 95,
  MOBILE_BREAKPOINT: 768,
  HOME_PATH: "/",
  IMAGE_1A_PATH: "../lovable-uploads/training/1a.png",
  IMAGE_1B_PATH: "../lovable-uploads/training/1b.png",
  PLACEHOLDER_IMAGE_URL_1: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Image+de+Formation",
  PLACEHOLDER_IMAGE_URL_2: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Mat%C3%A9riel+informatique", // Encoded text for URL

  COMPUTER_MAINTENANCE_MESSAGES: {
    RETURN_HOME: "Retour à l'accueil",
    HEADER_TITLE_MOBILE: "Maintenance",
    HEADER_TITLE_DESKTOP: "Formation en Maintenance des Ordinateurs",
    HEADER_DESCRIPTION: "Acquérez les compétences essentielles pour diagnostiquer, réparer et optimiser les systèmes informatiques.",
    OBJECTIVES_TITLE_MOBILE: "Objectifs pédagogiques",
    OBJECTIVES_TITLE_DESKTOP: "Objectifs pédagogiques de notre formation",
    OBJECTIVE_1: "Identifier et comprendre l'architecture des composants d'un PC",
    OBJECTIVE_2: "Diagnostiquer et dépanner les problèmes matériels et logiciels courants",
    OBJECTIVE_3: "Maîtriser l'installation et la configuration des systèmes d'exploitation (Windows, Linux)",
    OBJECTIVE_4: "Optimiser les performances et sécuriser un système informatique",
    CONTENT_DETAILS_TITLE_MOBILE: "Contenu détaillé",
    CONTENT_DETAILS_TITLE_DESKTOP: "Contenu détaillé de la formation",
    CONTENT_DETAILS_DESCRIPTION: "Notre formation en maintenance informatique vous permettra d'acquérir les compétences pratiques pour diagnostiquer et réparer efficacement les problèmes courants sur les ordinateurs, qu'ils soient d'ordre matériel ou logiciel.",
    TAB_CONTENT: "Contenu",
    TAB_METHODOLOGY: "Méthodologie",
    TAB_AUDIENCE: "Public cible",
    TAB_DURATION: "Durée",
    CONTENT_LIST_ITEM_1: "Architecture et fonctionnement des ordinateurs (PC)",
    CONTENT_LIST_ITEM_2: "Assemblage et remplacement des composants matériels",
    CONTENT_LIST_ITEM_3: "Diagnostic et résolution des problèmes logiciels et systèmes d'exploitation",
    CONTENT_LIST_ITEM_4: "Principes de sécurité informatique de base et bonnes pratiques",
    CONTENT_LIST_ITEM_5: "Notions fondamentales sur les réseaux locaux et la connectivité",
    METHODOLOGY_INTRO: "Notre approche pédagogique est résolument pratique et interactive, combinant :",
    METHODOLOGY_LIST_ITEM_1: "Ateliers pratiques intensifs sur machines réelles",
    METHODOLOGY_LIST_ITEM_2: "Démonstrations en direct des techniques de dépannage",
    METHODOLOGY_LIST_ITEM_3: "Mise à disposition de fiches de dépannage et de procédures claires",
    METHODOLOGY_LIST_ITEM_4: "Exercices de diagnostic et de résolution de problèmes concrets",
    AUDIENCE_INTRO: "Cette formation s'adresse à un large public souhaitant maîtriser la maintenance informatique :",
    AUDIENCE_LIST_ITEM_1: "Débutants en informatique avec un intérêt pour le matériel",
    AUDIENCE_LIST_ITEM_2: "Techniciens de maintenance junior ou en début de carrière",
    AUDIENCE_LIST_ITEM_3: "Particuliers souhaitant acquérir l'autonomie pour réparer leur propre matériel",
    AUDIENCE_LIST_ITEM_4: "Personnes en reconversion professionnelle vers les métiers techniques de l'informatique",
    DURATION_INTRO: "La formation est structurée comme suit :",
    DURATION_LIST_ITEM_1: "Durée totale : 4 semaines",
    DURATION_LIST_ITEM_2: "Fréquence : 3 sessions de 3 heures par semaine",
    DURATION_LIST_ITEM_3: "Volume horaire : 36 heures de formation encadrée",
    DURATION_LIST_ITEM_4: "Recommandation : Exercices pratiques supplémentaires pour consolider les acquis",
    RESOURCES_TITLE: "Matériel et ressources fournis",
    RESOURCES_DESCRIPTION: "Pendant la formation, vous aurez accès à un environnement d'apprentissage complet comprenant des ordinateurs de différentes générations, des composants de rechange variés, et tous les outils nécessaires pour les travaux pratiques. Des systèmes d'exploitation et des logiciels de diagnostic performants seront également mis à votre disposition pour une immersion totale.",
    EXPERT_TRAINERS_TITLE: "Formateurs experts",
    EXPERT_TRAINERS_DESCRIPTION: "Des professionnels certifiés avec une vaste expertise pratique dans la maintenance préventive et corrective des infrastructures informatiques et réseau.",
    PRACTICAL_APPROACH_TITLE: "Approche pratique",
    PRACTICAL_APPROACH_DESCRIPTION: "Nos formations en maintenance allient théorie et pratique intensive pour assurer l'acquisition des compétences de diagnostic, de réparation et de prévention des pannes informatiques.",
    RECOGNIZED_CERTIFICATIONS_TITLE: "Certifications reconnues",
    RECOGNIZED_CERTIFICATIONS_DESCRIPTION: "Préparez-vous aux certifications de l'industrie les plus demandées sur le marché de l'emploi en maintenance informatique.",
  },
  SEO_METADATA: {
    TITLE: "Formation Maintenance Informatique | Dépannage PC & Réparation - Zetoun Labs",
    DESCRIPTION: "Devenez expert en maintenance informatique avec Zetoun Labs à Kinshasa : apprenez à diagnostiquer, réparer et optimiser les ordinateurs (matériel et logiciel), avec une formation pratique et certifiante.",
    KEYWORDS: [
      'formation maintenance informatique',
      'dépannage PC',
      'réparation ordinateur',
      'matériel informatique',
      'logiciel informatique',
      'certification informatique Kinshasa',
      'cours maintenance PC',
      'Zetoun Labs Kinshasa',
      'formation technique informatique'
    ],
    IMAGE_URL: "../lovable-uploads/training/1a.png",
  },
  LOADING_SPINNER_ALT: "Animation de chargement",
};

const ComputerMaintenance = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < TEXT_CONSTANTS.MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress < TEXT_CONSTANTS.MAX_LOADING_PROGRESS) {
          return prevProgress + TEXT_CONSTANTS.INITIAL_LOADING_PROGRESS_STEP;
        }
        return prevProgress;
      });
    }, TEXT_CONSTANTS.LOADING_PROGRESS_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

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
      <PageLayout>
        <SEO
          title={TEXT_CONSTANTS.SEO_METADATA.TITLE}
          description={TEXT_CONSTANTS.SEO_METADATA.DESCRIPTION}
          keywords={TEXT_CONSTANTS.SEO_METADATA.KEYWORDS}
          imageUrl={TEXT_CONSTANTS.SEO_METADATA.IMAGE_URL}
        />
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <Link to={TEXT_CONSTANTS.HOME_PATH} className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.RETURN_HOME}
              </Link>

              <motion.div
                className="relative h-64 md:h-80 w-full mb-12 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={TEXT_CONSTANTS.IMAGE_1A_PATH}
                  alt="Formation en maintenance et réparation d'ordinateurs"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL_1;
                    e.currentTarget.alt = "Image de remplacement pour la formation en maintenance informatique";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 md:p-8">
                    <motion.h1
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-3xl sm:text-4xl font-bold mb-2 text-white"
                    >
                      {isMobile ? TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.HEADER_TITLE_MOBILE : TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.HEADER_TITLE_DESKTOP}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-base sm:text-lg text-white/90"
                    >
                      {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.HEADER_DESCRIPTION}
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              <div className="prose prose-lg max-w-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-16"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Wrench className="w-5 h-5 text-gray-700" />
                    <h2 className="text-2xl font-bold">
                      {isMobile ? TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.OBJECTIVES_TITLE_MOBILE : TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.OBJECTIVES_TITLE_DESKTOP}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {[
                      { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.OBJECTIVE_1, icon: <Cpu className="w-6 h-6 text-gray-600" /> },
                      { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.OBJECTIVE_2, icon: <Wrench className="w-6 h-6 text-gray-600" /> },
                      { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.OBJECTIVE_3, icon: <Monitor className="w-6 h-6 text-gray-600" /> },
                      { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.OBJECTIVE_4, icon: <Shield className="w-6 h-6 text-gray-600" /> }
                    ].map((objective, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                        className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300 flex items-start"
                      >
                        <div className="mr-4 mt-1 text-gray-500">
                          {objective.icon}
                        </div>
                        <p className="text-gray-700">{objective.text}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="rounded-lg overflow-hidden mb-10"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <img
                      src={TEXT_CONSTANTS.IMAGE_1B_PATH}
                      alt="Composants et matériel informatique pour l'apprentissage de la maintenance"
                      className="w-full h-64 md:h-80 object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL_2;
                        e.currentTarget.alt = "Image de remplacement pour le matériel informatique";
                      }}
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <HardDrive className="w-5 h-5 text-gray-700" />
                    <h2 className="text-2xl font-bold">
                      {isMobile ? TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.CONTENT_DETAILS_TITLE_MOBILE : TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.CONTENT_DETAILS_TITLE_DESKTOP}
                    </h2>
                  </div>

                  <p className="text-gray-600 mb-8 text-base max-w-3xl">
                    {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.CONTENT_DETAILS_DESCRIPTION}
                  </p>

                  <Tabs defaultValue="content" className="w-full mb-12">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                      <TabsTrigger value="content">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.TAB_CONTENT}</TabsTrigger>
                      <TabsTrigger value="methodology">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.TAB_METHODOLOGY}</TabsTrigger>
                      <TabsTrigger value="audience">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.TAB_AUDIENCE}</TabsTrigger>
                      <TabsTrigger value="duration">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.TAB_DURATION}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="space-y-4">
                      <Card>
                        <CardContent className="pt-6">
                          <motion.ul
                            className="space-y-4"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              visible: { transition: { staggerChildren: 0.1 } }
                            }}
                          >
                            {[
                              { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.CONTENT_LIST_ITEM_1, icon: <Cpu className="w-5 h-5 mr-2" /> },
                              { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.CONTENT_LIST_ITEM_2, icon: <HardDrive className="w-5 h-5 mr-2" /> },
                              { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.CONTENT_LIST_ITEM_3, icon: <Monitor className="w-5 h-5 mr-2" /> },
                              { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.CONTENT_LIST_ITEM_4, icon: <Shield className="w-5 h-5 mr-2" /> },
                              { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.CONTENT_LIST_ITEM_5, icon: <Settings className="w-5 h-5 mr-2" /> }
                            ].map((item, i) => (
                              <motion.li
                                key={i}
                                className="flex items-center"
                                variants={listItemVariants}
                                transition={{ duration: 0.3 }}
                              >
                                {item.icon}
                                <span>{item.text}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="methodology">
                      <Card>
                        <CardContent className="pt-6">
                          <p className="mb-4">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.METHODOLOGY_INTRO}</p>
                          <motion.ul
                            className="space-y-2"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              visible: { transition: { staggerChildren: 0.1 } }
                            }}
                          >
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><HardDrive className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.METHODOLOGY_LIST_ITEM_1}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Monitor className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.METHODOLOGY_LIST_ITEM_2}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Cpu className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.METHODOLOGY_LIST_ITEM_3}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Wrench className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.METHODOLOGY_LIST_ITEM_4}</motion.li>
                          </motion.ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="audience">
                      <Card>
                        <CardContent className="pt-6">
                          <p>{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.AUDIENCE_INTRO}</p>
                          <motion.ul
                            className="space-y-2 mt-4"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              visible: { transition: { staggerChildren: 0.1 } }
                            }}
                          >
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Monitor className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.AUDIENCE_LIST_ITEM_1}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Wrench className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.AUDIENCE_LIST_ITEM_2}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><HardDrive className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.AUDIENCE_LIST_ITEM_3}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Cpu className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.AUDIENCE_LIST_ITEM_4}</motion.li>
                          </motion.ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="duration">
                      <Card>
                        <CardContent className="pt-6">
                          <p>{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.DURATION_INTRO}</p>
                          <motion.ul
                            className="space-y-2 mt-4"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              visible: { transition: { staggerChildren: 0.1 } }
                            }}
                          >
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><HardDrive className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.DURATION_LIST_ITEM_1}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Wrench className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.DURATION_LIST_ITEM_2}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Monitor className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.DURATION_LIST_ITEM_3}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Cpu className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.DURATION_LIST_ITEM_4}</motion.li>
                          </motion.ul>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="w-5 h-5 text-gray-700" />
                      <h3 className="text-xl font-bold">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.RESOURCES_TITLE}</h3>
                    </div>
                    <p className="text-gray-600">
                      {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.RESOURCES_DESCRIPTION}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
                <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.EXPERT_TRAINERS_TITLE}</h3>
                  <p className="text-gray-600">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.EXPERT_TRAINERS_DESCRIPTION}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.PRACTICAL_APPROACH_TITLE}</h3>
                  <p className="text-gray-600">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.PRACTICAL_APPROACH_DESCRIPTION}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.RECOGNIZED_CERTIFICATIONS_TITLE}</h3>
                  <p className="text-gray-600">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.RECOGNIZED_CERTIFICATIONS_DESCRIPTION}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </Suspense>
  );
};

export default ComputerMaintenance;
