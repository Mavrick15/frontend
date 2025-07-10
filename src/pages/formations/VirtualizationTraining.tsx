import React, { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Server, Monitor, Layers, Box, Computer, Network } from 'lucide-react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

const TEXT_CONSTANTS = {
  LOADING_PROGRESS_INTERVAL_MS: 200,
  INITIAL_LOADING_PROGRESS_STEP: 5,
  MAX_LOADING_PROGRESS: 95,
  MOBILE_BREAKPOINT: 768,
  HOME_PATH: "/",
  IMAGE_5A_PATH: "../lovable-uploads/training/5a.png",
  IMAGE_5B_PATH: "../lovable-uploads/training/5b.png",
  PLACEHOLDER_IMAGE_URL_1: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Formation+Virtualisation",
  PLACEHOLDER_IMAGE_URL_2: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Machines+Virtuelles",

  VIRTUALIZATION_MESSAGES: {
    RETURN_HOME: "Retour à l'accueil",
    HEADER_TITLE_MOBILE: "Formation Virtualisation",
    HEADER_TITLE_DESKTOP: "Formation à la Virtualisation",
    HEADER_DESCRIPTION: "Cette formation complète initie aux concepts, outils et pratiques essentiels de la virtualisation moderne.",
    OBJECTIVES_TITLE_MOBILE: "Objectifs pédagogiques",
    OBJECTIVES_TITLE_DESKTOP: "Objectifs pédagogiques de notre formation en virtualisation",
    OBJECTIVE_1: "Comprendre les principes fondamentaux de la virtualisation et ses avantages",
    OBJECTIVE_2: "Maîtriser les hyperviseurs de type 1 et 2, notamment VirtualBox, VMware et KVM",
    OBJECTIVE_3: "Créer, configurer et gérer efficacement des machines virtuelles (VMs)",
    OBJECTIVE_4: "Appréhender la virtualisation réseau et de stockage pour des infrastructures optimisées",
    CONTENT_DETAILS_TITLE_MOBILE: "Contenu détaillé",
    CONTENT_DETAILS_TITLE_DESKTOP: "Contenu détaillé de la formation à la virtualisation",
    CONTENT_DETAILS_DESCRIPTION: "Notre formation à la virtualisation couvre l'ensemble des concepts, outils et techniques nécessaires pour comprendre, mettre en place et administrer des environnements virtualisés performants.",
    TAB_CONTENT: "Contenu",
    TAB_DURATION: "Durée",
    TAB_AUDIENCE: "Public cible",
    CONTENT_LIST_ITEM_1: "Concepts fondamentaux de la virtualisation : hyperviseurs de Type 1 et Type 2",
    CONTENT_LIST_ITEM_2: "Pratique sur VirtualBox, VMware Workstation et introduction à Proxmox",
    CONTENT_LIST_ITEM_3: "Gestion des machines virtuelles : snapshots, import/export ISO, sauvegarde et restauration",
    CONTENT_LIST_ITEM_4: "Comprendre et configurer les réseaux virtuels et les bridges",
    CONTENT_LIST_ITEM_5: "Introduction aux conteneurs avec Docker : concepts et premiers pas",
    DURATION_INTRO: "La formation se déroule sur :",
    DURATION_LIST_ITEM_1: "Durée totale : 4 semaines",
    DURATION_LIST_ITEM_2: "Fréquence : 3 sessions de 3 heures par semaine",
    DURATION_LIST_ITEM_3: "Volume horaire total : 36 heures de formation encadrée",
    DURATION_LIST_ITEM_4: "Inclut des travaux pratiques et projets pour une mise en œuvre concrète",
    AUDIENCE_INTRO: "Cette formation s'adresse principalement aux :",
    AUDIENCE_LIST_ITEM_1: "Débutants en virtualisation et en infrastructure IT",
    AUDIENCE_LIST_ITEM_2: "Techniciens informatiques souhaitant évoluer",
    AUDIENCE_LIST_ITEM_3: "Administrateurs système juniors et en formation",
    AUDIENCE_LIST_ITEM_4: "Professionnels IT désirant élargir leurs compétences en virtualisation et cloud",
    PREREQUISITES_TITLE: "Prérequis techniques et environnement de travail",
    PREREQUISITES_DESCRIPTION: "Pour suivre cette formation de manière optimale, vous aurez besoin d'un ordinateur avec au moins 8 Go de RAM et un processeur multi-cœur récent, compatible avec les technologies de virtualisation. Tous les logiciels nécessaires sont gratuits ou disponibles en version d'évaluation, et seront fournis ainsi que configurés pour vous pendant la formation.",
    EXPERT_TRAINERS_TITLE_MOBILE: "Formateurs experts",
    EXPERT_TRAINERS_TITLE_DESKTOP: "Formateurs experts en virtualisation",
    EXPERT_TRAINERS_DESCRIPTION: "Des professionnels certifiés disposant d’une expérience pratique et approfondie dans le déploiement et la gestion d’environnements virtualisés complexes.",
    PRACTICAL_APPROACH_TITLE_MOBILE: "Approche pratique",
    PRACTICAL_APPROACH_TITLE_DESKTOP: "Approche pratique et cas réels",
    PRACTICAL_APPROACH_DESCRIPTION: "Nos formations en virtualisation combinent théorie et pratique intensive sur des environnements virtualisés modernes, couvrant le déploiement, la gestion, la surveillance et l’optimisation de VM et conteneurs.",
    SOUGHT_AFTER_SKILLS_TITLE_MOBILE: "Compétences recherchées",
    SOUGHT_AFTER_SKILLS_TITLE_DESKTOP: "Compétences recherchées sur le marché",
    SOUGHT_AFTER_SKILLS_DESCRIPTION: "Développez des compétences clés en virtualisation, fortement demandées dans les environnements IT actuels et futures, pour renforcer votre employabilité.",
  },
  SEO_METADATA: {
    TITLE: "Formation Virtualisation | Hyperviseurs, VM & Conteneurs - Zetoun Labs",
    DESCRIPTION: "Maîtrisez la virtualisation avec Zetoun Labs à Kinshasa : apprenez les concepts, les hyperviseurs (VirtualBox, VMware, KVM), la création et la gestion de machines virtuelles (VMs), les réseaux virtuels et les conteneurs (Docker) pour une infrastructure agile.",
    KEYWORDS: [
      'formation virtualisation',
      'hyperviseurs',
      'VirtualBox',
      'VMware',
      'KVM',
      'machines virtuelles',
      'gestion VM',
      'réseaux virtuels',
      'conteneurs Docker',
      'virtualisation IT Kinshasa',
      'Zetoun Labs Kinshasa'
    ],
    IMAGE_URL: "../lovable-uploads/training/5a.png",
  },
  LOADING_SPINNER_ALT: "Animation de chargement",
};

const VirtualizationTraining = () => {
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
                {TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.RETURN_HOME}
              </Link>

              <motion.div
                className="relative h-64 md:h-80 w-full mb-12 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={TEXT_CONSTANTS.IMAGE_5A_PATH}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL_1;
                    e.currentTarget.alt = "[Image de remplacement pour la formation virtualisation]";
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
                      {isMobile ? TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.HEADER_TITLE_MOBILE : TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.HEADER_TITLE_DESKTOP}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-base sm:text-lg text-white/90"
                    >
                      {TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.HEADER_DESCRIPTION}
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
                    <Layers className="w-5 h-5 text-gray-700" />
                    <h2 className="text-2xl font-bold">
                      {isMobile ? TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.OBJECTIVES_TITLE_MOBILE : TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.OBJECTIVES_TITLE_DESKTOP}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {[
                      { text: TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.OBJECTIVE_1, icon: <Computer className="w-6 h-6 text-gray-600" /> },
                      { text: TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.OBJECTIVE_2, icon: <Layers className="w-6 h-6 text-gray-600" /> },
                      { text: TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.OBJECTIVE_3, icon: <Monitor className="w-6 h-6 text-gray-600" /> },
                      { text: TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.OBJECTIVE_4, icon: <Network className="w-6 h-6 text-gray-600" /> }
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
                      src={TEXT_CONSTANTS.IMAGE_5B_PATH}
                      alt=""
                      className="w-full h-64 md:h-80 object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL_2;
                        e.currentTarget.alt = "[Image de remplacement pour l'infrastructure de virtualisation]";
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
                    <Box className="w-5 h-5 text-gray-700" />
                    <h2 className="text-2xl font-bold">
                      {isMobile ? TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.CONTENT_DETAILS_TITLE_MOBILE : TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.CONTENT_DETAILS_TITLE_DESKTOP}
                    </h2>
                  </div>

                  <p className="text-gray-600 mb-8 text-base max-w-3xl">
                    {TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.CONTENT_DETAILS_DESCRIPTION}
                  </p>

                  <Tabs defaultValue="content" className="w-full mb-12">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                      <TabsTrigger value="content">{TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.TAB_CONTENT}</TabsTrigger>
                      <TabsTrigger value="duration">{TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.TAB_DURATION}</TabsTrigger>
                      <TabsTrigger value="audience">{TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.TAB_AUDIENCE}</TabsTrigger>
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
                              { text: TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.CONTENT_LIST_ITEM_1, icon: <Layers className="w-5 h-5 mr-2" /> },
                              { text: TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.CONTENT_LIST_ITEM_2, icon: <Computer className="w-5 h-5 mr-2" /> },
                              { text: TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.CONTENT_LIST_ITEM_3, icon: <Server className="w-5 h-5 mr-2" /> },
                              { text: TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.CONTENT_LIST_ITEM_4, icon: <Network className="w-5 h-5 mr-2" /> },
                              { text: TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.CONTENT_LIST_ITEM_5, icon: <Box className="w-5 h-5 mr-2" /> }
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

                    <TabsContent value="duration">
                      <Card>
                        <CardContent className="pt-6">
                          <p>{TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.DURATION_INTRO}</p>
                          <motion.ul
                            className="space-y-2 mt-4"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              visible: { transition: { staggerChildren: 0.1 } }
                            }}
                          >
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Server className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.DURATION_LIST_ITEM_1}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Layers className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.DURATION_LIST_ITEM_2}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Box className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.DURATION_LIST_ITEM_3}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Computer className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.DURATION_LIST_ITEM_4}</motion.li>
                          </motion.ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="audience">
                      <Card>
                        <CardContent className="pt-6">
                          <p>{TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.AUDIENCE_INTRO}</p>
                          <motion.ul
                            className="space-y-2 mt-4"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              visible: { transition: { staggerChildren: 0.1 } }
                            }}
                          >
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Computer className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.AUDIENCE_LIST_ITEM_1}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Server className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.AUDIENCE_LIST_ITEM_2}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Network className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.AUDIENCE_LIST_ITEM_3}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Box className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.AUDIENCE_LIST_ITEM_4}</motion.li>
                          </motion.ul>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Monitor className="w-5 h-5 text-gray-700" />
                      <h3 className="text-xl font-bold">{TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.PREREQUISITES_TITLE}</h3>
                    </div>
                    <p className="text-gray-600">
                      {TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.PREREQUISITES_DESCRIPTION}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
                <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">
                    {isMobile ? TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.EXPERT_TRAINERS_TITLE_MOBILE : TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.EXPERT_TRAINERS_TITLE_DESKTOP}
                  </h3>
                  <p className="text-gray-600">{TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.EXPERT_TRAINERS_DESCRIPTION}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">
                    {isMobile ? TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.PRACTICAL_APPROACH_TITLE_MOBILE : TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.PRACTICAL_APPROACH_TITLE_DESKTOP}
                  </h3>
                  <p className="text-gray-600">{TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.PRACTICAL_APPROACH_DESCRIPTION}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">
                    {isMobile ? TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.SOUGHT_AFTER_SKILLS_TITLE_MOBILE : TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.SOUGHT_AFTER_SKILLS_TITLE_DESKTOP}
                  </h3>
                  <p className="text-gray-600">{TEXT_CONSTANTS.VIRTUALIZATION_MESSAGES.SOUGHT_AFTER_SKILLS_DESCRIPTION}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </Suspense>
  );
};

export default VirtualizationTraining;
