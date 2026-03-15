import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HardDrive, Wrench, Settings, Cpu, Monitor, Shield } from 'lucide-react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEO from '@/components/SEO';

const TEXT_CONSTANTS = {
  LOADING_PROGRESS_INTERVAL_MS: 200,
  INITIAL_LOADING_PROGRESS_STEP: 5,
  MAX_LOADING_PROGRESS: 95,
  MOBILE_BREAKPOINT: 768,
  HOME_PATH: "/",
  IMAGE_1A_PATH: "../lovable-uploads/training/1a.png",
  IMAGE_1B_PATH: "../lovable-uploads/training/1b.png",
  PLACEHOLDER_IMAGE_URL_1: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Image+de+Formation",
  PLACEHOLDER_IMAGE_URL_2: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Mat%C3%A9riel+informatique",

  COMPUTER_MAINTENANCE_MESSAGES: {
    RETURN_HOME: "Retour à l'accueil",
    HEADER_TITLE_MOBILE: "Maintenance",
    HEADER_TITLE_DESKTOP: "Formation Maintenance & Dépannage PC - Expert Hardware",
    HEADER_DESCRIPTION: "Devenez technicien hardware certifié - 36h de formation intensive avec 85% de pratique sur matériel réel. Diagnostiquez et réparez tout type de panne en moins de 30 minutes.",
    OBJECTIVES_TITLE_MOBILE: "Objectifs pédagogiques",
    OBJECTIVES_TITLE_DESKTOP: "Compétences hardware que vous allez maîtriser",
    OBJECTIVE_1: "Maîtriser l'architecture complète d'un PC : carte mère, CPU, RAM, GPU, stockage et alimentation",
    OBJECTIVE_2: "Diagnostiquer et réparer 95% des pannes matérielles et logicielles en moins de 30 minutes",
    OBJECTIVE_3: "Déployer Windows 10/11 et Linux en dual-boot avec optimisation des performances",
    OBJECTIVE_4: "Sécuriser un système contre les malwares et optimiser ses performances de 200%",
    CONTENT_DETAILS_TITLE_MOBILE: "Contenu détaillé",
    CONTENT_DETAILS_TITLE_DESKTOP: "Programme expert Hardware - Du diagnostic à la réparation avancée",
    CONTENT_DETAILS_DESCRIPTION: "36 heures de formation intensive sur du matériel réel. Chaque module vous apprend à diagnostiquer, réparer et optimiser les systèmes informatiques comme un professionnel certifié CompTIA A+.",
    TAB_CONTENT: "Contenu",
    TAB_METHODOLOGY: "Méthodologie",
    TAB_AUDIENCE: "Public cible",
    TAB_DURATION: "Durée",
    CONTENT_LIST_ITEM_1: "Architecture PC complète : carte mère, chipset, BIOS/UEFI, bus et interfaces",
    CONTENT_LIST_ITEM_2: "Assemblage, upgrade et remplacement de composants avec précautions ESD",
    CONTENT_LIST_ITEM_3: "Diagnostic avancé : outils professionnels, codes erreur POST et analyse des logs système",
    CONTENT_LIST_ITEM_4: "Sécurité avancée : antimalware, firewall, chiffrement BitLocker et récupération de données",
    CONTENT_LIST_ITEM_5: "Réseaux locaux : configuration TCP/IP, Wi-Fi, partage de fichiers et dépannage connectivité",
    METHODOLOGY_INTRO: "Une pédagogie d'excellence axée sur la pratique réelle :",
    METHODOLOGY_LIST_ITEM_1: "85% d'ateliers pratiques sur matériel réel de différentes générations",
    METHODOLOGY_LIST_ITEM_2: "Démonstrations live de techniques de dépannage par nos experts certifiés",
    METHODOLOGY_LIST_ITEM_3: "Fiches techniques professionnelles et procédures standardisées ITIL",
    METHODOLOGY_LIST_ITEM_4: "Simulations de pannes réelles avec chronomètre - Objectif résolution <30min",
    AUDIENCE_INTRO: "Formation accessible à tous les profils motivés :",
    AUDIENCE_LIST_ITEM_1: "Passionnés de technologie souhaitant lancer une carrière en maintenance IT",
    AUDIENCE_LIST_ITEM_2: "Techniciens juniors voulant accélérer vers l'expertise hardware",
    AUDIENCE_LIST_ITEM_3: "Particuliers désirant maîtriser l'entretien et la réparation de leur matériel",
    AUDIENCE_LIST_ITEM_4: "Professionnels en reconversion vers les métiers techniques IT",
    DURATION_INTRO: "Programme intensif structuré pour une maîtrise rapide :",
    DURATION_LIST_ITEM_1: "Durée totale : 4 semaines intensives",
    DURATION_LIST_ITEM_2: "Fréquence : 3 sessions de 3 heures par semaine",
    DURATION_LIST_ITEM_3: "Volume horaire : 36 heures de formation encadrée + labs pratiques",
    DURATION_LIST_ITEM_4: "Bonus : Kit d'outils de diagnostic professionnel offert à chaque étudiant",
    RESOURCES_TITLE: "Laboratoire hardware professionnel",
    RESOURCES_DESCRIPTION: "Travaillez sur un parc de machines réelles de toutes générations avec composants de rechange illimités. Chaque étudiant dispose de son poste de travail équipé d'outils professionnels antistatiques, de logiciels de diagnostic avancés et de systèmes d'exploitation variés.",
    EXPERT_TRAINERS_TITLE: "Formateurs certifiés CompTIA A+",
    EXPERT_TRAINERS_DESCRIPTION: "Des techniciens seniors certifiés CompTIA A+ avec 10+ ans d'expérience terrain, partageant des techniques de dépannage éprouvées en entreprise.",
    PRACTICAL_APPROACH_TITLE: "85% de pratique sur matériel réel",
    PRACTICAL_APPROACH_DESCRIPTION: "Labs intensifs sur PC réels avec simulations de pannes - Assemblage, diagnostic, réparation et optimisation en conditions professionnelles.",
    RECOGNIZED_CERTIFICATIONS_TITLE: "Préparation CompTIA A+ incluse",
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
};

const ComputerMaintenance = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < TEXT_CONSTANTS.MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
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
              className="relative h-64 md:h-80 lg:h-96 w-full mb-12 rounded-2xl overflow-hidden shadow-2xl group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={TEXT_CONSTANTS.IMAGE_1A_PATH}
                alt="Formation en maintenance et réparation d'ordinateurs"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL_1;
                  e.currentTarget.alt = "Image de remplacement pour la formation en maintenance informatique";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <div className="p-6 md:p-8 w-full">
                  <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-white font-space"
                  >
                    {isMobile ? TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.HEADER_TITLE_MOBILE : TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.HEADER_TITLE_DESKTOP}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed"
                  >
                    {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.HEADER_DESCRIPTION}
                  </motion.p>
                </div>
              </div>
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
              ></div>
            </motion.div>

            <div className="prose prose-lg max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Wrench className="w-5 h-5 text-gray-900" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {isMobile ? TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.OBJECTIVES_TITLE_MOBILE : TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.OBJECTIVES_TITLE_DESKTOP}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {[
                    { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.OBJECTIVE_1, icon: <Cpu className="w-6 h-6 text-gray-900" /> },
                    { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.OBJECTIVE_2, icon: <Wrench className="w-6 h-6 text-gray-900" /> },
                    { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.OBJECTIVE_3, icon: <Monitor className="w-6 h-6 text-gray-900" /> },
                    { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.OBJECTIVE_4, icon: <Shield className="w-6 h-6 text-gray-900" /> }
                  ].map((objective, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start group"
                    >
                      <div className="mr-4 mt-1 bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors">
                        {objective.icon}
                      </div>
                      <p className="text-gray-700 leading-relaxed font-medium">{objective.text}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="rounded-2xl overflow-hidden mb-10 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={TEXT_CONSTANTS.IMAGE_1B_PATH}
                      alt="Composants et matériel informatique pour l'apprentissage de la maintenance"
                      className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL_2;
                        e.currentTarget.alt = "Image de remplacement pour le matériel informatique";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <HardDrive className="w-5 h-5 text-gray-900" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {isMobile ? TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.CONTENT_DETAILS_TITLE_MOBILE : TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.CONTENT_DETAILS_TITLE_DESKTOP}
                  </h2>
                </div>

                <p className="text-gray-700 mb-8 text-lg leading-relaxed max-w-3xl bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50">
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
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
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
                            { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.CONTENT_LIST_ITEM_1, icon: <Cpu className="w-5 h-5 text-gray-900" /> },
                            { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.CONTENT_LIST_ITEM_2, icon: <HardDrive className="w-5 h-5 text-gray-900" /> },
                            { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.CONTENT_LIST_ITEM_3, icon: <Monitor className="w-5 h-5 text-gray-900" /> },
                            { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.CONTENT_LIST_ITEM_4, icon: <Shield className="w-5 h-5 text-gray-900" /> },
                            { text: TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.CONTENT_LIST_ITEM_5, icon: <Settings className="w-5 h-5 text-gray-900" /> }
                          ].map((item, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 group"
                              variants={listItemVariants}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="mr-3 mt-0.5 bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors">
                                {item.icon}
                              </div>
                              <span className="text-gray-700 leading-relaxed">{item.text}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="methodology">
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="pt-6">
                        <p className="mb-6 text-gray-700 leading-relaxed text-lg">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.METHODOLOGY_INTRO}</p>
                        <motion.ul
                          className="space-y-3"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                          }}
                        >
                          <motion.li className="flex items-start bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 group" variants={listItemVariants} transition={{ duration: 0.3 }}><div className="mr-3 mt-0.5 bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors"><HardDrive className="w-5 h-5 text-gray-900" /></div> <span className="text-gray-700 leading-relaxed">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.METHODOLOGY_LIST_ITEM_1}</span></motion.li>
                          <motion.li className="flex items-start bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 group" variants={listItemVariants} transition={{ duration: 0.3 }}><div className="mr-3 mt-0.5 bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors"><Monitor className="w-5 h-5 text-gray-900" /></div> <span className="text-gray-700 leading-relaxed">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.METHODOLOGY_LIST_ITEM_2}</span></motion.li>
                          <motion.li className="flex items-start bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 group" variants={listItemVariants} transition={{ duration: 0.3 }}><div className="mr-3 mt-0.5 bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors"><Cpu className="w-5 h-5 text-gray-900" /></div> <span className="text-gray-700 leading-relaxed">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.METHODOLOGY_LIST_ITEM_3}</span></motion.li>
                          <motion.li className="flex items-start bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 group" variants={listItemVariants} transition={{ duration: 0.3 }}><div className="mr-3 mt-0.5 bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors"><Wrench className="w-5 h-5 text-gray-900" /></div> <span className="text-gray-700 leading-relaxed">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.METHODOLOGY_LIST_ITEM_4}</span></motion.li>
                        </motion.ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="audience">
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="pt-6">
                        <p className="mb-6 text-gray-700 leading-relaxed text-lg">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.AUDIENCE_INTRO}</p>
                        <motion.ul
                          className="space-y-3"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                          }}
                        >
                          <motion.li className="flex items-start bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 group" variants={listItemVariants} transition={{ duration: 0.3 }}><div className="mr-3 mt-0.5 bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors"><Monitor className="w-5 h-5 text-gray-900" /></div> <span className="text-gray-700 leading-relaxed">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.AUDIENCE_LIST_ITEM_1}</span></motion.li>
                          <motion.li className="flex items-start bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 group" variants={listItemVariants} transition={{ duration: 0.3 }}><div className="mr-3 mt-0.5 bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors"><Wrench className="w-5 h-5 text-gray-900" /></div> <span className="text-gray-700 leading-relaxed">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.AUDIENCE_LIST_ITEM_2}</span></motion.li>
                          <motion.li className="flex items-start bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 group" variants={listItemVariants} transition={{ duration: 0.3 }}><div className="mr-3 mt-0.5 bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors"><HardDrive className="w-5 h-5 text-gray-900" /></div> <span className="text-gray-700 leading-relaxed">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.AUDIENCE_LIST_ITEM_3}</span></motion.li>
                          <motion.li className="flex items-start bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 group" variants={listItemVariants} transition={{ duration: 0.3 }}><div className="mr-3 mt-0.5 bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors"><Cpu className="w-5 h-5 text-gray-900" /></div> <span className="text-gray-700 leading-relaxed">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.AUDIENCE_LIST_ITEM_4}</span></motion.li>
                        </motion.ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="duration">
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="pt-6">
                        <p className="mb-6 text-gray-700 leading-relaxed text-lg">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.DURATION_INTRO}</p>
                        <motion.ul
                          className="space-y-3"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                          }}
                        >
                          <motion.li className="flex items-start bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 group" variants={listItemVariants} transition={{ duration: 0.3 }}><div className="mr-3 mt-0.5 bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors"><HardDrive className="w-5 h-5 text-gray-900" /></div> <span className="text-gray-700 leading-relaxed">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.DURATION_LIST_ITEM_1}</span></motion.li>
                          <motion.li className="flex items-start bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 group" variants={listItemVariants} transition={{ duration: 0.3 }}><div className="mr-3 mt-0.5 bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors"><Wrench className="w-5 h-5 text-gray-900" /></div> <span className="text-gray-700 leading-relaxed">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.DURATION_LIST_ITEM_2}</span></motion.li>
                          <motion.li className="flex items-start bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 group" variants={listItemVariants} transition={{ duration: 0.3 }}><div className="mr-3 mt-0.5 bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors"><Monitor className="w-5 h-5 text-gray-900" /></div> <span className="text-gray-700 leading-relaxed">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.DURATION_LIST_ITEM_3}</span></motion.li>
                          <motion.li className="flex items-start bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 group" variants={listItemVariants} transition={{ duration: 0.3 }}><div className="mr-3 mt-0.5 bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors"><Cpu className="w-5 h-5 text-gray-900" /></div> <span className="text-gray-700 leading-relaxed">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.DURATION_LIST_ITEM_4}</span></motion.li>
                        </motion.ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 mb-10 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <Settings className="w-5 h-5 text-gray-900" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.RESOURCES_TITLE}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.RESOURCES_DESCRIPTION}
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
              <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <h3 className="font-bold text-xl mb-3 text-gray-900">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.EXPERT_TRAINERS_TITLE}</h3>
                <p className="text-gray-700 leading-relaxed">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.EXPERT_TRAINERS_DESCRIPTION}</p>
              </div>
              <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <h3 className="font-bold text-xl mb-3 text-gray-900">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.PRACTICAL_APPROACH_TITLE}</h3>
                <p className="text-gray-700 leading-relaxed">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.PRACTICAL_APPROACH_DESCRIPTION}</p>
              </div>
              <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <h3 className="font-bold text-xl mb-3 text-gray-900">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.RECOGNIZED_CERTIFICATIONS_TITLE}</h3>
                <p className="text-gray-700 leading-relaxed">{TEXT_CONSTANTS.COMPUTER_MAINTENANCE_MESSAGES.RECOGNIZED_CERTIFICATIONS_DESCRIPTION}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ComputerMaintenance;
