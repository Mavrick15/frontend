import React, { useEffect, useState } from 'react';
import { ArrowLeft, Server, Monitor, Shield, Settings, Database, Layers, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  IMAGE_3A_PATH: "../lovable-uploads/training/3a.png",
  IMAGE_3B1_PATH: "../lovable-uploads/training/3b1.png",
  PLACEHOLDER_IMAGE_URL_1: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Windows+Server",
  PLACEHOLDER_IMAGE_URL_2: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Active+Directory",

  WINDOWS_ADMIN_MESSAGES: {
    RETURN_HOME: "Retour à l'accueil",
    HEADER_TITLE_MOBILE: "Admin. Windows",
    HEADER_TITLE_DESKTOP: "Formation Windows Server - Expert Active Directory & Cloud",
    HEADER_DESCRIPTION: "Devenez architecte Windows Server certifié - Formation intensive avec labs pratiques sur Windows Server 2022, Active Directory, Azure AD et Hyper-V. Préparation MCSA incluse.",
    OBJECTIVES_TITLE_MOBILE: "Objectifs pédagogiques",
    OBJECTIVES_TITLE_DESKTOP: "Compétences stratégiques que vous allez maîtriser",
    OBJECTIVE_1: "Déployer et administrer Windows Server 2022 en environnement de production multi-sites",
    OBJECTIVE_2: "Architecturer Active Directory, DNS, DHCP et GPO pour des réseaux de 500+ utilisateurs",
    OBJECTIVE_3: "Implémenter des stratégies de sécurité Zero Trust et politiques de conformité",
    OBJECTIVE_4: "Maîtriser Hyper-V, les sauvegardes automatisées et la reprise après sinistre",
    CONTENT_DETAILS_TITLE_MOBILE: "Contenu détaillé",
    CONTENT_DETAILS_TITLE_DESKTOP: "Programme expert Windows Server - De l'installation au Cloud hybride",
    CONTENT_DETAILS_DESCRIPTION: "30 heures de formation intensive couvrant l'ensemble de l'écosystème Windows Server moderne. Labs pratiques sur infrastructure virtualisée avec scénarios d'entreprise réels.",
    TAB_CONTENT: "Contenu",
    TAB_DURATION: "Durée",
    TAB_AUDIENCE: "Public cible",
    CONTENT_LIST_ITEM_1: "Installation et hardening de Windows Server 2019/2022 avec best practices Microsoft",
    CONTENT_LIST_ITEM_2: "Architecture Active Directory multi-domaines, DNS intégré, DHCP failover et PKI",
    CONTENT_LIST_ITEM_3: "GPO avancées : sécurité, déploiement logiciel, scripts PowerShell et audit",
    CONTENT_LIST_ITEM_4: "Partages DFS, quotas, NTFS avancé et réplication de données inter-sites",
    CONTENT_LIST_ITEM_5: "Hyper-V : création de VMs, migration live, réplication et haute disponibilité",
    DURATION_INTRO: "Programme structuré pour une montée en compétences rapide :",
    DURATION_LIST_ITEM_1: "Durée totale : 5 semaines intensives",
    DURATION_LIST_ITEM_2: "Fréquence : 2 sessions de 3 heures par semaine",
    DURATION_LIST_ITEM_3: "Volume horaire : 30 heures de formation encadrée + labs illimités",
    DURATION_LIST_ITEM_4: "Bonus : Accès à notre environnement de labs virtualisé pendant 3 mois",
    AUDIENCE_INTRO: "Formation conçue pour tous les profils Windows :",
    AUDIENCE_LIST_ITEM_1: "Étudiants IT ambitieux visant une carrière en administration système",
    AUDIENCE_LIST_ITEM_2: "Techniciens helpdesk souhaitant évoluer vers l'administration serveur",
    AUDIENCE_LIST_ITEM_3: "Professionnels IT préparant leur certification Microsoft",
    AUDIENCE_LIST_ITEM_4: "Administrateurs Linux souhaitant devenir experts multi-plateforme",
    RESOURCES_TITLE: "Infrastructure de labs de classe mondiale",
    RESOURCES_DESCRIPTION: "Travaillez sur des environnements Windows Server 2022 virtualisés avec Active Directory multi-domaines, DNS, DHCP et Hyper-V. Chaque étudiant dispose de son propre lab dédié reproduisant une infrastructure d'entreprise complète.",
    EXPERT_TRAINERS_TITLE_MOBILE: "Formateurs certifiés Microsoft",
    EXPERT_TRAINERS_TITLE_DESKTOP: "Formateurs certifiés Microsoft",
    EXPERT_TRAINERS_DESCRIPTION: "Des architectes Microsoft certifiés MCSE avec 10+ ans d'expérience en production, partageant des méthodologies et cas réels d'entreprises de toutes tailles.",
    PRACTICAL_APPROACH_TITLE_MOBILE: "Labs pratiques 80%",
    PRACTICAL_APPROACH_TITLE_DESKTOP: "Labs pratiques 80%",
    PRACTICAL_APPROACH_DESCRIPTION: "Nos formations en administration Windows combinent théorie et travaux pratiques intensifs sur des environnements Windows Server réels, incluant la gestion des utilisateurs, des services réseau et des stratégies de groupe.",
    RECOGNIZED_CERTIFICATIONS_TITLE_MOBILE: "Certifications reconnues",
    RECOGNIZED_CERTIFICATIONS_TITLE_DESKTOP: "Certifications reconnues",
    RECOGNIZED_CERTIFICATIONS_DESCRIPTION: "Préparez-vous aux certifications de l'industrie les plus demandées sur le marché de l'emploi en administration système Windows, renforçant ainsi votre profil professionnel.",
  },
  SEO_METADATA: {
    TITLE: "Formation Administration Système Windows Server | AD, GPO, Réseau - Zetoun Labs",
    DESCRIPTION: "Devenez administrateur Windows Server avec Zetoun Labs à Kinshasa : maîtrisez l'installation, la configuration et la gestion des rôles clés (Active Directory, DNS, DHCP, GPO) et la sécurité de l'infrastructure.",
    KEYWORDS: [
      'formation Windows Server',
      'administration Windows',
      'Active Directory',
      'AD',
      'GPO',
      'DNS',
      'DHCP',
      'sécurité Windows Server',
      'gestion réseau Windows',
      'virtualisation Hyper-V',
      'Zetoun Labs Kinshasa',
      'formation IT Kinshasa'
    ],
    IMAGE_URL: "../lovable-uploads/training/3a.png",
  },
  LOADING_SPINNER_ALT: "Animation de chargement",
};

const WindowsAdministration = () => {
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

  const objectiveItems = [
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.OBJECTIVE_1, icon: <Monitor className="w-6 h-6 text-gray-900" /> },
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.OBJECTIVE_2, icon: <Settings className="w-6 h-6 text-gray-900" /> },
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.OBJECTIVE_3, icon: <Shield className="w-6 h-6 text-gray-900" /> },
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.OBJECTIVE_4, icon: <Database className="w-6 h-6 text-gray-900" /> }
  ];

  const contentItems = [
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.CONTENT_LIST_ITEM_1, icon: <Monitor className="w-5 h-5 mr-2" /> },
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.CONTENT_LIST_ITEM_2, icon: <Network className="w-5 h-5 mr-2" /> },
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.CONTENT_LIST_ITEM_3, icon: <Shield className="w-5 h-5 mr-2" /> },
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.CONTENT_LIST_ITEM_4, icon: <Database className="w-5 h-5 mr-2" /> },
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.CONTENT_LIST_ITEM_5, icon: <Layers className="w-5 h-5 mr-2" /> }
  ];

  const durationItems = [
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.DURATION_LIST_ITEM_1, icon: <Monitor className="w-5 h-5 mr-2" /> },
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.DURATION_LIST_ITEM_2, icon: <Settings className="w-5 h-5 mr-2" /> },
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.DURATION_LIST_ITEM_3, icon: <Database className="w-5 h-5 mr-2" /> },
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.DURATION_LIST_ITEM_4, icon: <Shield className="w-5 h-5 mr-2" /> }
  ];

  const audienceItems = [
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.AUDIENCE_LIST_ITEM_1, icon: <Database className="w-5 h-5 mr-2" /> },
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.AUDIENCE_LIST_ITEM_2, icon: <Monitor className="w-5 h-5 mr-2" /> },
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.AUDIENCE_LIST_ITEM_3, icon: <Network className="w-5 h-5 mr-2" /> },
    { text: TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.AUDIENCE_LIST_ITEM_4, icon: <Settings className="w-5 h-5 mr-2" /> }
  ];

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
              {TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.RETURN_HOME}
            </Link>

            <motion.div
              className="relative h-64 md:h-80 lg:h-96 w-full mb-12 rounded-2xl overflow-hidden shadow-2xl group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={TEXT_CONSTANTS.IMAGE_3A_PATH}
                alt="Illustration de l'administration Windows Server, montrant une interface de gestion de serveur."
                className="w-full h-full object-cover mx-auto transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL_1;
                  e.currentTarget.alt = "Image de remplacement pour l'administration Windows Server";
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
                    {isMobile ? TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.HEADER_TITLE_MOBILE : TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.HEADER_TITLE_DESKTOP}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed"
                  >
                    {TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.HEADER_DESCRIPTION}
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
                    <Monitor className="w-5 h-5 text-gray-900" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {isMobile ? TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.OBJECTIVES_TITLE_MOBILE : TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.OBJECTIVES_TITLE_DESKTOP}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {objectiveItems.map((objective, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start group"
                    >
                      <div className="mr-4 mt-1 bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors">
                        {objective.icon}
                      </div>
                      <p className="text-gray-700 leading-relaxed font-medium">{objective.text}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="rounded-2xl overflow-hidden mb-10"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <img
                    src={TEXT_CONSTANTS.IMAGE_3B1_PATH}
                    alt="Image représentant Active Directory, symbolisant la gestion des identités et accès."
                    className="w-full h-64 md:h-80 object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL_2;
                      e.currentTarget.alt = "Image de remplacement pour la configuration Windows Server";
                    }}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Layers className="w-5 h-5 text-gray-900" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {isMobile ? TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.CONTENT_DETAILS_TITLE_MOBILE : TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.CONTENT_DETAILS_TITLE_DESKTOP}
                  </h2>
                </div>

                <p className="text-gray-700 mb-8 text-lg leading-relaxed max-w-3xl bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50">
                  {TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.CONTENT_DETAILS_DESCRIPTION}
                </p>

                <Tabs defaultValue="content" className="w-full mb-12">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="content">{TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.TAB_CONTENT}</TabsTrigger>
                    <TabsTrigger value="duration">{TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.TAB_DURATION}</TabsTrigger>
                    <TabsTrigger value="audience">{TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.TAB_AUDIENCE}</TabsTrigger>
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
                          {contentItems.map((item, i) => (
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
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="pt-6">
                        <p>{TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.DURATION_INTRO}</p>
                        <motion.ul
                          className="space-y-2 mt-4"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                          }}
                        >
                          {durationItems.map((item, i) => (
                            <motion.li key={i} className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}>
                              {item.icon} {item.text}
                            </motion.li>
                          ))}
                        </motion.ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="audience">
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="pt-6">
                        <p>{TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.AUDIENCE_INTRO}</p>
                        <motion.ul
                          className="space-y-2 mt-4"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                          }}
                        >
                          {audienceItems.map((item, i) => (
                            <motion.li key={i} className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}>
                              {item.icon} {item.text}
                            </motion.li>
                          ))}
                        </motion.ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 mb-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-gray-700" />
                    <h3 className="text-xl font-bold">{TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.RESOURCES_TITLE}</h3>
                  </div>
                  <p className="text-gray-900">
                    {TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.RESOURCES_DESCRIPTION}
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
                <h3 className="font-semibold text-lg mb-2">
                  {isMobile ? TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.EXPERT_TRAINERS_TITLE_MOBILE : TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.EXPERT_TRAINERS_TITLE_DESKTOP}
                </h3>
                <p className="text-gray-900">{TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.EXPERT_TRAINERS_DESCRIPTION}</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
                <h3 className="font-semibold text-lg mb-2">
                  {isMobile ? TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.PRACTICAL_APPROACH_TITLE_MOBILE : TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.PRACTICAL_APPROACH_TITLE_DESKTOP}
                </h3>
                <p className="text-gray-900">{TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.PRACTICAL_APPROACH_DESCRIPTION}</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
                <h3 className="font-semibold text-lg mb-2">
                  {isMobile ? TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.RECOGNIZED_CERTIFICATIONS_TITLE_MOBILE : TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.RECOGNIZED_CERTIFICATIONS_TITLE_DESKTOP}
                </h3>
                <p className="text-gray-900">{TEXT_CONSTANTS.WINDOWS_ADMIN_MESSAGES.RECOGNIZED_CERTIFICATIONS_DESCRIPTION}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default WindowsAdministration;
