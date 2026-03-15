import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Server, Shield, Terminal, Code, Database } from 'lucide-react';
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
  IMAGE_2A_PATH: "../lovable-uploads/training/2a.png",
  IMAGE_2B_PATH: "../lovable-uploads/training/2b.png",
  PLACEHOLDER_IMAGE_URL_1: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Formation+Linux",
  PLACEHOLDER_IMAGE_URL_2: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Terminal+Linux",

  LINUX_ADMIN_MESSAGES: {
    RETURN_HOME: "Retour à l'accueil",
    HEADER_TITLE_MOBILE: "Admin. sous Linux",
    HEADER_TITLE_DESKTOP: "Formation Administration Système Linux - Devenez Expert",
    HEADER_DESCRIPTION: "Maîtrisez Linux comme un pro - Formation intensive certifiante avec 80% de pratique sur systèmes réels. Préparation aux certifications LPIC-1 et RHCSA incluse.",
    OBJECTIVES_TITLE_MOBILE: "Objectifs pédagogiques",
    OBJECTIVES_TITLE_DESKTOP: "Compétences clés que vous allez acquérir",
    OBJECTIVE_1: "Maîtriser l'architecture interne Linux et les commandes avancées utilisées en production",
    OBJECTIVE_2: "Gérer les utilisateurs, permissions ACL, scripts Bash avancés et services systemd",
    OBJECTIVE_3: "Déployer et sécuriser des services critiques : Apache, Nginx, SSH, DNS, DHCP et FTP",
    OBJECTIVE_4: "Implémenter une stratégie de sécurité complète avec monitoring Nagios/Zabbix en temps réel",
    CONTENT_DETAILS_TITLE_MOBILE: "Contenu détaillé",
    CONTENT_DETAILS_TITLE_DESKTOP: "Programme complet de formation Linux - Du débutant à l'expert",
    CONTENT_DETAILS_DESCRIPTION: "Un parcours intensif de 36 heures couvrant l'ensemble des compétences requises pour administrer des infrastructures Linux en production. Chaque module inclut des labs pratiques sur des environnements réels.",
    TAB_CONTENT: "Contenu",
    TAB_DURATION: "Durée",
    TAB_AUDIENCE: "Public cible",
    CONTENT_LIST_ITEM_1: "Maîtrise avancée du terminal, pipelines, redirections et expressions régulières",
    CONTENT_LIST_ITEM_2: "Gestion des utilisateurs, groupes, ACL et politiques de sécurité SELinux",
    CONTENT_LIST_ITEM_3: "Déploiement et hardening des services réseau (Apache, Nginx, DNS BIND, NFS)",
    CONTENT_LIST_ITEM_4: "Scripting Bash avancé, crontab et automatisation avec Ansible",
    CONTENT_LIST_ITEM_5: "Monitoring proactif avec Nagios, Zabbix et analyse des logs avec ELK Stack",
    DURATION_INTRO: "Programme intensif structuré :",
    DURATION_LIST_ITEM_1: "Durée totale : 6 semaines intensives",
    DURATION_LIST_ITEM_2: "Fréquence : 2 sessions de 3 heures par semaine",
    DURATION_LIST_ITEM_3: "Volume horaire : 36 heures de formation encadrée + labs pratiques",
    DURATION_LIST_ITEM_4: "Bonus : Accès à notre plateforme de labs virtuels 24/7 pendant 3 mois",
    AUDIENCE_INTRO: "Formation adaptée à tous les profils IT :",
    AUDIENCE_LIST_ITEM_1: "Débutants motivés souhaitant lancer une carrière en administration système",
    AUDIENCE_LIST_ITEM_2: "Techniciens réseau/système voulant maîtriser l'écosystème Linux en production",
    AUDIENCE_LIST_ITEM_3: "Professionnels en reconversion vers les métiers DevOps et Cloud",
    AUDIENCE_LIST_ITEM_4: "Administrateurs Windows souhaitant devenir experts multi-plateforme",
    CERTIFICATION_TITLE: "Certification reconnue internationalement",
    CERTIFICATION_DESCRIPTION: "Obtenez votre certificat Zetoun Labs validant vos compétences opérationnelles en administration Linux. Cette formation vous prépare directement aux certifications LPIC-1 (Linux Professional Institute) et RHCSA (Red Hat Certified System Administrator), les plus demandées sur le marché mondial.",
    EXPERT_TRAINERS_TITLE: "Formateurs certifiés RHCE & LPIC-2",
    EXPERT_TRAINERS_DESCRIPTION: "Des ingénieurs Linux seniors avec 10+ ans d'expérience en production, certifiés Red Hat et LPI, qui partagent des cas réels d'entreprise.",
    PRACTICAL_APPROACH_TITLE: "80% de pratique sur systèmes réels",
    PRACTICAL_APPROACH_DESCRIPTION: "Labs pratiques sur des serveurs Linux réels avec scénarios de production - Troubleshooting, sécurisation et optimisation en conditions réelles.",
    RECOGNIZED_CERTIFICATIONS_TITLE: "Préparation LPIC-1 & RHCSA incluse",
    RECOGNIZED_CERTIFICATIONS_DESCRIPTION: "Programme aligné sur les objectifs d'examen LPIC-1 et RHCSA - Taux de réussite de 92% chez nos étudiants.",
  },
  SEO_METADATA: {
    TITLE: "Formation Administration Système Linux | Serveurs & Réseaux - Zetoun Labs",
    DESCRIPTION: "Devenez un administrateur système Linux expert avec Zetoun Labs à Kinshasa : maîtrisez la gestion de serveurs, la sécurité, les réseaux et l'automatisation avec notre formation complète et pratique.",
    KEYWORDS: [
      'formation Linux',
      'administration système Linux',
      'gestion serveurs Linux',
      'sécurité Linux',
      'réseaux Linux',
      'automatisation Linux',
      'scripts Bash',
      'certification Linux Kinshasa',
      'Zetoun Labs Kinshasa',
      'formation IT Kinshasa'
    ],
    IMAGE_URL: "../lovable-uploads/training/2a.png",
  },
};

const LinuxAdministration = () => {
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
            <Link to={TEXT_CONSTANTS.HOME_PATH} className="inline-flex items-center text-gray-900 hover:text-gray-700 mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.RETURN_HOME}
            </Link>

            <motion.div
              className="relative h-64 md:h-80 lg:h-96 w-full mb-12 rounded-2xl overflow-hidden shadow-2xl group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={TEXT_CONSTANTS.IMAGE_2A_PATH}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL_1;
                  e.currentTarget.alt = "[Image de remplacement pour la formation Linux]";
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
                    {isMobile ? TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.HEADER_TITLE_MOBILE : TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.HEADER_TITLE_DESKTOP}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed"
                  >
                    {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.HEADER_DESCRIPTION}
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
                  <div className="bg-gray-100 p-2 rounded-2xl">
                    <Terminal className="w-5 h-5 text-gray-900" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {isMobile ? TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.OBJECTIVES_TITLE_MOBILE : TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.OBJECTIVES_TITLE_DESKTOP}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {[
                    { text: TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.OBJECTIVE_1, icon: <Server className="w-6 h-6 text-gray-900" /> },
                    { text: TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.OBJECTIVE_2, icon: <Shield className="w-6 h-6 text-gray-900" /> },
                    { text: TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.OBJECTIVE_3, icon: <Code className="w-6 h-6 text-gray-900" /> },
                    { text: TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.OBJECTIVE_4, icon: <Terminal className="w-6 h-6 text-gray-900" /> }
                  ].map((objective, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start group"
                    >
                      <div className="mr-4 mt-1 bg-gray-100 p-2 rounded-2xl group-hover:bg-gray-200 transition-colors">
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
                    src={TEXT_CONSTANTS.IMAGE_2B_PATH}
                    alt=""
                    className="w-full h-64 md:h-80 object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL_2;
                      e.currentTarget.alt = "[Image de remplacement pour le terminal Linux]";
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
                  <Server className="w-5 h-5 text-gray-700" />
                  <h2 className="text-3xl font-bold">
                    {isMobile ? TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.CONTENT_DETAILS_TITLE_MOBILE : TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.CONTENT_DETAILS_TITLE_DESKTOP}
                  </h2>
                </div>

                <p className="text-gray-900 mb-8 text-base max-w-3xl">
                  {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.CONTENT_DETAILS_DESCRIPTION}
                </p>

                <Tabs defaultValue="content" className="w-full mb-12">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="content">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.TAB_CONTENT}</TabsTrigger>
                    <TabsTrigger value="duration">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.TAB_DURATION}</TabsTrigger>
                    <TabsTrigger value="audience">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.TAB_AUDIENCE}</TabsTrigger>
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
                            { text: TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.CONTENT_LIST_ITEM_1, icon: <Terminal className="w-5 h-5 mr-2" /> },
                            { text: TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.CONTENT_LIST_ITEM_2, icon: <Database className="w-5 h-5 mr-2" /> },
                            { text: TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.CONTENT_LIST_ITEM_3, icon: <Server className="w-5 h-5 mr-2" /> },
                            { text: TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.CONTENT_LIST_ITEM_4, icon: <Code className="w-5 h-5 mr-2" /> },
                            { text: TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.CONTENT_LIST_ITEM_5, icon: <Shield className="w-5 h-5 mr-2" /> }
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
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="pt-6">
                        <p className="mb-4">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.DURATION_INTRO}</p>
                        <motion.ul
                          className="space-y-2 mt-4"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                          }}
                        >
                          <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Server className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.DURATION_LIST_ITEM_1}</motion.li>
                          <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Terminal className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.DURATION_LIST_ITEM_2}</motion.li>
                          <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Database className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.DURATION_LIST_ITEM_3}</motion.li>
                          <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Code className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.DURATION_LIST_ITEM_4}</motion.li>
                        </motion.ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="audience">
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="pt-6">
                        <p>{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.AUDIENCE_INTRO}</p>
                        <motion.ul
                          className="space-y-2 mt-4"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                          }}
                        >
                          <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Database className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.AUDIENCE_LIST_ITEM_1}</motion.li>
                          <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Server className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.AUDIENCE_LIST_ITEM_2}</motion.li>
                          <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Code className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.AUDIENCE_LIST_ITEM_3}</motion.li>
                          <motion.li className="flex items-center" variants={listItemVariants} transition={{ duration: 0.3 }}><Terminal className="w-5 h-5 mr-2" /> {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.AUDIENCE_LIST_ITEM_4}</motion.li>
                        </motion.ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 mb-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-gray-700" />
                    <h3 className="text-xl font-bold">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.CERTIFICATION_TITLE}</h3>
                  </div>
                  <p className="text-gray-900">
                    {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.CERTIFICATION_DESCRIPTION}
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
                <h3 className="font-semibold text-lg mb-2">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.EXPERT_TRAINERS_TITLE}</h3>
                <p className="text-gray-900">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.EXPERT_TRAINERS_DESCRIPTION}</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
                <h3 className="font-semibold text-lg mb-2">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.PRACTICAL_APPROACH_TITLE}</h3>
                <p className="text-gray-900">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.PRACTICAL_APPROACH_DESCRIPTION}</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
                <h3 className="font-semibold text-lg mb-2">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.RECOGNIZED_CERTIFICATIONS_TITLE}</h3>
                <p className="text-gray-900">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.RECOGNIZED_CERTIFICATIONS_DESCRIPTION}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default LinuxAdministration;
