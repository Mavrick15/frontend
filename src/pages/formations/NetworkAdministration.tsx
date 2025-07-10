import React, { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Network, Router, Computer, Wifi, Globe, Lock, Server, Layers } from 'lucide-react';
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
  IMAGE_4A_PATH: "../lovable-uploads/training/4a.png",
  IMAGE_4B_PATH: "../lovable-uploads/training/4b.png",
  PLACEHOLDER_IMAGE_URL_1: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=R%C3%A9seau+Cisco", // Encoded text for URL
  PLACEHOLDER_IMAGE_URL_2: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=%C3%89quipement+R%C3%A9seau", // Encoded text for URL

  NETWORK_ADMIN_MESSAGES: {
    RETURN_HOME: "Retour à l'accueil",
    HEADER_TITLE_MOBILE: "Formation Admin. Réseau",
    HEADER_TITLE_DESKTOP: "Formation Administration Réseau CISCO",
    HEADER_DESCRIPTION: "Formation complète orientée routage, switching et configuration CISCO, idéale pour les débutants et la préparation à la certification CCNA.",
    OBJECTIVES_TITLE_MOBILE: "Objectifs pédagogiques",
    OBJECTIVES_TITLE_DESKTOP: "Objectifs pédagogiques de notre formation CISCO",
    OBJECTIVE_1: "Comprendre les fondamentaux des réseaux informatiques et le modèle OSI",
    OBJECTIVE_2: "Configurer les routeurs et switches CISCO pour des environnements complexes",
    OBJECTIVE_3: "Maîtriser les protocoles de routage (OSPF, EIGRP) et les VLAN",
    OBJECTIVE_4: "Implémenter la sécurité de base et dépanner les problèmes réseau courants",
    CONTENT_DETAILS_TITLE_MOBILE: "Contenu détaillé",
    CONTENT_DETAILS_TITLE_DESKTOP: "Contenu détaillé de la formation en administration réseau CISCO",
    CONTENT_DETAILS_DESCRIPTION: "Notre programme d'administration réseau CISCO vous donne toutes les compétences nécessaires pour configurer, gérer et dépanner des réseaux d'entreprise complexes, et vous prépare efficacement aux certifications CCNA.",
    TAB_CONTENT: "Contenu",
    TAB_METHODOLOGY: "Méthodologie",
    TAB_AUDIENCE: "Public cible",
    TAB_DURATION: "Durée",
    CONTENT_LIST_ITEM_1: "Fondamentaux des réseaux et du modèle OSI/TCP-IP",
    CONTENT_LIST_ITEM_2: "Configuration et dépannage du routage dynamique (OSPF, EIGRP)",
    CONTENT_LIST_ITEM_3: "Mise en œuvre des VLAN, ACL et NAT",
    CONTENT_LIST_ITEM_4: "Protocoles DHCP, WAN et VPN",
    CONTENT_LIST_ITEM_5: "Travaux pratiques et simulations sur GNS3 et Packet Tracer",
    METHODOLOGY_INTRO: "Notre approche pédagogique est axée sur la pratique, combinant :",
    METHODOLOGY_LIST_ITEM_1: "Travaux pratiques intensifs sur simulateurs réseau (GNS3, Packet Tracer)",
    METHODOLOGY_LIST_ITEM_2: "Étude de cas concrets et schémas/diagrammes détaillés",
    METHODOLOGY_LIST_ITEM_3: "Exercices de configuration et de dépannage réels",
    METHODOLOGY_LIST_ITEM_4: "Mises en situation pour le dépannage de réseaux complexes",
    AUDIENCE_INTRO: "Cette formation s'adresse principalement aux :",
    AUDIENCE_LIST_ITEM_1: "Étudiants en réseaux informatiques et débutants",
    AUDIENCE_LIST_ITEM_2: "Techniciens réseaux débutants ou souhaitant une spécialisation CISCO",
    AUDIENCE_LIST_ITEM_3: "Candidats aux certifications CCNA de CISCO",
    AUDIENCE_LIST_ITEM_4: "Professionnels IT souhaitant se spécialiser dans l'administration réseau",
    DURATION_INTRO: "La formation se déroule sur :",
    DURATION_LIST_ITEM_1: "Durée totale : 8 semaines",
    DURATION_LIST_ITEM_2: "Fréquence : 2 sessions de 3 heures par semaine",
    DURATION_LIST_ITEM_3: "Volume horaire total : 48 heures de formation encadrée",
    DURATION_LIST_ITEM_4: "Travaux pratiques supplémentaires sur simulateur pour une meilleure maîtrise",
    RESOURCES_TITLE: "Équipement et ressources de formation",
    RESOURCES_DESCRIPTION: "Pour suivre cette formation, vous aurez besoin d'un ordinateur capable de faire fonctionner les simulateurs réseau professionnels comme GNS3 ou Packet Tracer. Nous recommandons un minimum de 8 Go de RAM et un processeur multi-cœur pour une expérience fluide. Tous les logiciels nécessaires sont gratuits et seront fournis ainsi que configurés pour vous pendant la formation.",
    EXPERT_TRAINERS_TITLE_MOBILE: "Formateurs experts",
    EXPERT_TRAINERS_TITLE_DESKTOP: "Formateurs experts CISCO",
    EXPERT_TRAINERS_DESCRIPTION: "Des professionnels certifiés avec une solide expérience pratique dans la conception, le déploiement et la gestion d’infrastructures réseau complexes.",
    PRACTICAL_APPROACH_TITLE_MOBILE: "Approche pratique",
    PRACTICAL_APPROACH_TITLE_DESKTOP: "Approche pratique et certifiante",
    PRACTICAL_APPROACH_DESCRIPTION: "Nos formations en administration réseau allient théorie et pratique intensive sur équipements professionnels simulés, axées sur la configuration, la sécurité et le dépannage des réseaux LAN et WAN, en préparation au CCNA.",
    CERTIFICATIONS_TITLE_MOBILE: "Préparation certifications",
    CERTIFICATIONS_TITLE_DESKTOP: "Préparation aux certifications",
    CERTIFICATIONS_DESCRIPTION: "Cette formation est conçue pour vous préparer efficacement aux certifications CISCO de l'industrie les plus demandées sur le marché de l'emploi en réseau.",
  },
  SEO_METADATA: {
    TITLE: "Formation Administration Réseau CISCO | CCNA, Routage & Switching - Zetoun Labs",
    DESCRIPTION: "Devenez un administrateur réseau CISCO certifié avec Zetoun Labs à Kinshasa : maîtrisez la configuration de routeurs, switches, la sécurité réseau et préparez la certification CCNA avec des TP intensifs.",
    KEYWORDS: [
      'formation administration réseau',
      'CISCO',
      'CCNA',
      'routage',
      'switching',
      'configuration réseau',
      'sécurité réseau',
      'GNS3',
      'Packet Tracer',
      'certifications réseau Kinshasa',
      'Zetoun Labs Kinshasa'
    ],
    IMAGE_URL: "../lovable-uploads/training/4a.png",
  },
  LOADING_SPINNER_ALT: "Animation de chargement",
};

const NetworkAdministration = () => {
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
                {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.RETURN_HOME}
              </Link>

              <motion.div
                className="relative h-64 md:h-80 w-full mb-12 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={TEXT_CONSTANTS.IMAGE_4A_PATH}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL_1;
                    e.currentTarget.alt = "[Image de remplacement pour la formation Cisco]";
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
                      {isMobile ? TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.HEADER_TITLE_MOBILE : TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.HEADER_TITLE_DESKTOP}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-base sm:text-lg text-white/90"
                    >
                      {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.HEADER_DESCRIPTION}
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
                    <Network className="w-5 h-5 text-gray-700" />
                    <h2 className="text-2xl font-bold">
                      {isMobile ? TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.OBJECTIVES_TITLE_MOBILE : TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.OBJECTIVES_TITLE_DESKTOP}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {[
                      { text: TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.OBJECTIVE_1, icon: <Globe className="w-6 h-6 text-gray-600" /> },
                      { text: TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.OBJECTIVE_2, icon: <Router className="w-6 h-6 text-gray-600" /> },
                      { text: TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.OBJECTIVE_3, icon: <Network className="w-6 h-6 text-gray-600" /> },
                      { text: TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.OBJECTIVE_4, icon: <Lock className="w-6 h-6 text-gray-600" /> }
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
                      src={TEXT_CONSTANTS.IMAGE_4B_PATH}
                      alt=""
                      className="w-full h-64 md:h-80 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL_2;
                        e.currentTarget.alt = "[Image de remplacement pour l'équipement réseau]";
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
                    <Router className="w-5 h-5 text-gray-700" />
                    <h2 className="text-2xl font-bold">
                      {isMobile ? TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.CONTENT_DETAILS_TITLE_MOBILE : TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.CONTENT_DETAILS_TITLE_DESKTOP}
                    </h2>
                  </div>

                  <p className="text-gray-600 mb-8 text-base max-w-3xl">
                    {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.CONTENT_DETAILS_DESCRIPTION}
                  </p>

                  <Tabs defaultValue="content" className="w-full mb-12">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                      <TabsTrigger value="content">{TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.TAB_CONTENT}</TabsTrigger>
                      <TabsTrigger value="methodology">{TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.TAB_METHODOLOGY}</TabsTrigger>
                      <TabsTrigger value="audience">{TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.TAB_AUDIENCE}</TabsTrigger>
                      <TabsTrigger value="duration">{TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.TAB_DURATION}</TabsTrigger>
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
                              { text: TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.CONTENT_LIST_ITEM_1, icon: <Globe className="w-5 h-5 mr-2" /> },
                              { text: TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.CONTENT_LIST_ITEM_2, icon: <Router className="w-5 h-5 mr-2" /> },
                              { text: TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.CONTENT_LIST_ITEM_3, icon: <Network className="w-5 h-5 mr-2" /> },
                              { text: TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.CONTENT_LIST_ITEM_4, icon: <Wifi className="w-5 h-5 mr-2" /> },
                              { text: TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.CONTENT_LIST_ITEM_5, icon: <Computer className="w-5 h-5 mr-2" /> }
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
                          <p className="mb-4">{TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.METHODOLOGY_INTRO}</p>
                          <motion.ul
                            className="space-y-2"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              visible: { transition: { staggerChildren: 0.1 } }
                            }}
                          >
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Computer className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.METHODOLOGY_LIST_ITEM_1}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Network className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.METHODOLOGY_LIST_ITEM_2}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Router className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.METHODOLOGY_LIST_ITEM_3}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Globe className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.METHODOLOGY_LIST_ITEM_4}</motion.li>
                          </motion.ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="audience">
                      <Card>
                        <CardContent className="pt-6">
                          <p>{TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.AUDIENCE_INTRO}</p>
                          <motion.ul
                            className="space-y-2 mt-4"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              visible: { transition: { staggerChildren: 0.1 } }
                            }}
                          >
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Computer className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.AUDIENCE_LIST_ITEM_1}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Network className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.AUDIENCE_LIST_ITEM_2}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Router className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.AUDIENCE_LIST_ITEM_3}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Lock className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.AUDIENCE_LIST_ITEM_4}</motion.li>
                          </motion.ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="duration">
                      <Card>
                        <CardContent className="pt-6">
                          <p>{TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.DURATION_INTRO}</p>
                          <motion.ul
                            className="space-y-2 mt-4"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              visible: { transition: { staggerChildren: 0.1 } }
                            }}
                          >
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Network className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.DURATION_LIST_ITEM_1}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Router className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.DURATION_LIST_ITEM_2}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Computer className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.DURATION_LIST_ITEM_3}</motion.li>
                            <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Globe className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.DURATION_LIST_ITEM_4}</motion.li>
                          </motion.ul>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Computer className="w-5 h-5 text-gray-700" />
                      <h3 className="text-xl font-bold">{TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.RESOURCES_TITLE}</h3>
                    </div>
                    <p className="text-gray-600">
                      {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.RESOURCES_DESCRIPTION}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
                <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">
                    {isMobile ? TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.EXPERT_TRAINERS_TITLE_MOBILE : TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.EXPERT_TRAINERS_TITLE_DESKTOP}
                  </h3>
                  <p className="text-gray-600">{TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.EXPERT_TRAINERS_DESCRIPTION}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">
                    {isMobile ? TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.PRACTICAL_APPROACH_TITLE_MOBILE : TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.PRACTICAL_APPROACH_TITLE_DESKTOP}
                  </h3>
                  <p className="text-gray-600">{TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.PRACTICAL_APPROACH_DESCRIPTION}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">
                    {isMobile ? TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.CERTIFICATIONS_TITLE_MOBILE : TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.CERTIFICATIONS_TITLE_DESKTOP}
                  </h3>
                  <p className="text-gray-600">{TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.CERTIFICATIONS_DESCRIPTION}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </Suspense>
  );
};

export default NetworkAdministration;
