import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Network, Router, Computer, Wifi, Globe, Lock } from 'lucide-react';
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
  IMAGE_4A_PATH: "../lovable-uploads/training/4a.png",
  IMAGE_4B_PATH: "../lovable-uploads/training/4b.png",
  PLACEHOLDER_IMAGE_URL_1: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=R%C3%A9seau+Cisco",
  PLACEHOLDER_IMAGE_URL_2: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=%C3%89quipement+R%C3%A9seau",

  NETWORK_ADMIN_MESSAGES: {
    RETURN_HOME: "Retour à l'accueil",
    HEADER_TITLE_MOBILE: "Formation Admin. Réseau",
    HEADER_TITLE_DESKTOP: "Formation Cisco CCNA - Expert Réseaux d'Entreprise",
    HEADER_DESCRIPTION: "Devenez ingénieur réseau certifié Cisco - 48h de formation intensive avec 70% de labs pratiques sur équipements réels. Taux de réussite CCNA de 89% chez nos étudiants.",
    OBJECTIVES_TITLE_MOBILE: "Objectifs pédagogiques",
    OBJECTIVES_TITLE_DESKTOP: "Compétences réseau stratégiques que vous allez maîtriser",
    OBJECTIVE_1: "Maîtriser les architectures réseau LAN/WAN et le modèle OSI en profondeur",
    OBJECTIVE_2: "Configurer des routeurs et switches Cisco en environnement multi-sites haute disponibilité",
    OBJECTIVE_3: "Implémenter les protocoles OSPF, EIGRP, BGP et des architectures VLAN complexes",
    OBJECTIVE_4: "Déployer des stratégies de sécurité réseau avec ACL, NAT, VPN et firewall",
    CONTENT_DETAILS_TITLE_MOBILE: "Contenu détaillé",
    CONTENT_DETAILS_TITLE_DESKTOP: "Programme expert Cisco CCNA - Architecture, Routage & Sécurité",
    CONTENT_DETAILS_DESCRIPTION: "48 heures de formation intensive alignées sur le référentiel Cisco CCNA 200-301. Chaque module combine théorie et labs pratiques sur GNS3, Packet Tracer et équipements Cisco réels.",
    TAB_CONTENT: "Contenu",
    TAB_METHODOLOGY: "Méthodologie",
    TAB_AUDIENCE: "Public cible",
    TAB_DURATION: "Durée",
    CONTENT_LIST_ITEM_1: "Architecture réseau, modèle OSI/TCP-IP et adressage IPv4/IPv6 avancé",
    CONTENT_LIST_ITEM_2: "Routage dynamique avancé : OSPF multi-area, EIGRP et redistribution",
    CONTENT_LIST_ITEM_3: "VLAN, trunking 802.1Q, STP, EtherChannel et inter-VLAN routing",
    CONTENT_LIST_ITEM_4: "Sécurité : ACL étendues, NAT/PAT, VPN site-to-site et port security",
    CONTENT_LIST_ITEM_5: "Labs intensifs sur GNS3 et Packet Tracer avec scénarios d'entreprise réels",
    METHODOLOGY_INTRO: "Une pédagogie d'excellence axée sur la pratique intensive :",
    METHODOLOGY_LIST_ITEM_1: "70% de labs pratiques sur simulateurs professionnels (GNS3, Packet Tracer, EVE-NG)",
    METHODOLOGY_LIST_ITEM_2: "Études de cas d'architectures réseau d'entreprises réelles de Kinshasa",
    METHODOLOGY_LIST_ITEM_3: "Exercices de troubleshooting avec méthodologie ITIL et Cisco",
    METHODOLOGY_LIST_ITEM_4: "Examens blancs CCNA avec correction détaillée et coaching personnalisé",
    AUDIENCE_INTRO: "Formation conçue pour les futurs experts réseau :",
    AUDIENCE_LIST_ITEM_1: "Passionnés de réseaux souhaitant lancer une carrière d'ingénieur réseau",
    AUDIENCE_LIST_ITEM_2: "Techniciens réseau visant la certification Cisco CCNA",
    AUDIENCE_LIST_ITEM_3: "Professionnels IT en reconversion vers l'ingénierie réseau",
    AUDIENCE_LIST_ITEM_4: "Administrateurs système souhaitant maîtriser l'infrastructure réseau",
    DURATION_INTRO: "Programme intensif structuré pour une maîtrise complète :",
    DURATION_LIST_ITEM_1: "Durée totale : 8 semaines intensives",
    DURATION_LIST_ITEM_2: "Fréquence : 2 sessions de 3 heures par semaine",
    DURATION_LIST_ITEM_3: "Volume horaire : 48 heures de formation encadrée + labs illimités",
    DURATION_LIST_ITEM_4: "Bonus : Accès GNS3 et Packet Tracer pendant 6 mois + examens blancs CCNA",
    RESOURCES_TITLE: "Infrastructure de labs réseau professionnelle",
    RESOURCES_DESCRIPTION: "Travaillez sur des simulateurs réseau de grade professionnel (GNS3, Packet Tracer, EVE-NG) avec des topologies reproduisant des infrastructures d'entreprise réelles. Minimum 8 Go de RAM recommandé. Tous les logiciels et licences sont fournis gratuitement.",
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
              className="relative h-64 md:h-80 lg:h-96 w-full mb-12 rounded-2xl overflow-hidden shadow-2xl group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={TEXT_CONSTANTS.IMAGE_4A_PATH}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL_1;
                  e.currentTarget.alt = "[Image de remplacement pour la formation Cisco]";
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
                    {isMobile ? TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.HEADER_TITLE_MOBILE : TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.HEADER_TITLE_DESKTOP}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed"
                  >
                    {TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.HEADER_DESCRIPTION}
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
                    <Network className="w-5 h-5 text-gray-900" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {isMobile ? TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.OBJECTIVES_TITLE_MOBILE : TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.OBJECTIVES_TITLE_DESKTOP}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {[
                    { text: TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.OBJECTIVE_1, icon: <Globe className="w-6 h-6 text-gray-900" /> },
                    { text: TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.OBJECTIVE_2, icon: <Router className="w-6 h-6 text-gray-900" /> },
                    { text: TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.OBJECTIVE_3, icon: <Network className="w-6 h-6 text-gray-900" /> },
                    { text: TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.OBJECTIVE_4, icon: <Lock className="w-6 h-6 text-gray-900" /> }
                  ].map((objective, i) => (
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
                  className="rounded-2xl overflow-hidden mb-10 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={TEXT_CONSTANTS.IMAGE_4B_PATH}
                      alt=""
                      className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL_2;
                        e.currentTarget.alt = "[Image de remplacement pour l'équipement réseau]";
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
                    <Router className="w-5 h-5 text-gray-900" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {isMobile ? TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.CONTENT_DETAILS_TITLE_MOBILE : TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.CONTENT_DETAILS_TITLE_DESKTOP}
                  </h2>
                </div>

                <p className="text-gray-700 mb-8 text-lg leading-relaxed max-w-3xl bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50">
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
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
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
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
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
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
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

                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 mb-10">
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
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
                <h3 className="font-semibold text-lg mb-2">
                  {isMobile ? TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.EXPERT_TRAINERS_TITLE_MOBILE : TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.EXPERT_TRAINERS_TITLE_DESKTOP}
                </h3>
                <p className="text-gray-600">{TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.EXPERT_TRAINERS_DESCRIPTION}</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
                <h3 className="font-semibold text-lg mb-2">
                  {isMobile ? TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.PRACTICAL_APPROACH_TITLE_MOBILE : TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.PRACTICAL_APPROACH_TITLE_DESKTOP}
                </h3>
                <p className="text-gray-600">{TEXT_CONSTANTS.NETWORK_ADMIN_MESSAGES.PRACTICAL_APPROACH_DESCRIPTION}</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
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
  );
};

export default NetworkAdministration;
