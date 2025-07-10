import React, { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Server, Shield, Terminal, Code, Database, Layers } from 'lucide-react';
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
  IMAGE_2A_PATH: "../lovable-uploads/training/2a.png",
  IMAGE_2B_PATH: "../lovable-uploads/training/2b.png",
  PLACEHOLDER_IMAGE_URL_1: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Formation+Linux",
  PLACEHOLDER_IMAGE_URL_2: "https://placehold.co/600x400/e0e0e0/6a6a6a?text=Terminal+Linux",

  LINUX_ADMIN_MESSAGES: {
    RETURN_HOME: "Retour à l'accueil",
    HEADER_TITLE_MOBILE: "Admin. sous linux",
    HEADER_TITLE_DESKTOP: "Formation administration système sous linux",
    HEADER_DESCRIPTION: "Formation complète et pratique pour administrer un système Linux en entreprise, essentielle pour tout professionnel IT.",
    OBJECTIVES_TITLE_MOBILE: "Objectifs pédagogiques",
    OBJECTIVES_TITLE_DESKTOP: "Objectifs pédagogiques de notre formation Linux",
    OBJECTIVE_1: "Comprendre le fonctionnement interne et l'architecture du système Linux",
    OBJECTIVE_2: "Gérer les comptes utilisateurs, les permissions, les scripts et les services Linux",
    OBJECTIVE_3: "Configurer et optimiser des services réseau essentiels comme Apache, SSH, DNS et FTP",
    OBJECTIVE_4: "Mettre en œuvre la sécurité et superviser les performances des systèmes Linux",
    CONTENT_DETAILS_TITLE_MOBILE: "Contenu détaillé",
    CONTENT_DETAILS_TITLE_DESKTOP: "Contenu détaillé de la formation en administration Linux",
    CONTENT_DETAILS_DESCRIPTION: "Notre programme complet d'administration système Linux couvre tous les aspects essentiels pour devenir un administrateur système Linux compétent et recherché sur le marché de l'emploi à Kinshasa.",
    TAB_CONTENT: "Contenu",
    TAB_DURATION: "Durée",
    TAB_AUDIENCE: "Public cible",
    CONTENT_LIST_ITEM_1: "Maîtrise des commandes de base et de l'arborescence Linux",
    CONTENT_LIST_ITEM_2: "Gestion avancée des utilisateurs, groupes et permissions",
    CONTENT_LIST_ITEM_3: "Configuration et administration des services réseau (Apache, DNS, NFS)",
    CONTENT_LIST_ITEM_4: "Création de scripts Bash et automatisation des tâches système",
    CONTENT_LIST_ITEM_5: "Utilisation des outils de monitoring et supervision (Nagios, top, etc.)",
    DURATION_INTRO: "La formation se déroule sur :",
    DURATION_LIST_ITEM_1: "Durée totale : 6 semaines",
    DURATION_LIST_ITEM_2: "Fréquence : 2 sessions de 3 heures par semaine",
    DURATION_LIST_ITEM_3: "Volume horaire : 36 heures de formation encadrée",
    DURATION_LIST_ITEM_4: "Recommandation : Exercices pratiques supplémentaires pour consolider les acquis",
    AUDIENCE_INTRO: "Cette formation s'adresse principalement aux :",
    AUDIENCE_LIST_ITEM_1: "Débutants en informatique souhaitant se spécialiser en administration Linux",
    AUDIENCE_LIST_ITEM_2: "Techniciens système ou réseau cherchant à étendre leurs compétences",
    AUDIENCE_LIST_ITEM_3: "Professionnels en reconversion vers les métiers de l'administration système",
    AUDIENCE_LIST_ITEM_4: "Administrateurs IT expérimentés souhaitant diversifier leurs compétences vers Linux",
    CERTIFICATION_TITLE: "Certification et reconnaissance professionnelle",
    CERTIFICATION_DESCRIPTION: "À l'issue de cette formation, vous recevrez un certificat de compétences validant vos acquis en administration système Linux. Cette formation constitue également une excellente base pour préparer des certifications Linux professionnelles reconnues mondialement comme LPIC-1 ou Red Hat Certified System Administrator (RHCSA).",
    EXPERT_TRAINERS_TITLE: "Formateurs experts",
    EXPERT_TRAINERS_DESCRIPTION: "Des professionnels certifiés avec une expérience concrète dans l'administration, la sécurisation et l'optimisation de systèmes Linux en environnement de production.",
    PRACTICAL_APPROACH_TITLE: "Approche pratique",
    PRACTICAL_APPROACH_DESCRIPTION: "Nos formations en administration Linux allient théorie et ateliers pratiques sur des systèmes Linux réels, avec des cas concrets de gestion, de sécurité et de dépannage.",
    RECOGNIZED_CERTIFICATIONS_TITLE: "Certifications reconnues",
    RECOGNIZED_CERTIFICATIONS_DESCRIPTION: "Préparez-vous aux certifications de l'industrie les plus demandées sur le marché de l'emploi en administration système Linux.",
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
  LOADING_SPINNER_ALT: "Animation de chargement",
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
                {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.RETURN_HOME}
              </Link>

              <motion.div
                className="relative h-64 md:h-80 w-full mb-12 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={TEXT_CONSTANTS.IMAGE_2A_PATH}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL_1;
                    e.currentTarget.alt = "[Image de remplacement pour la formation Linux]";
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
                      {isMobile ? TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.HEADER_TITLE_MOBILE : TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.HEADER_TITLE_DESKTOP}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-base sm:text-lg text-white/90"
                    >
                      {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.HEADER_DESCRIPTION}
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
                    <Terminal className="w-5 h-5 text-gray-700" />
                    <h2 className="text-2xl font-bold">
                      {isMobile ? TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.OBJECTIVES_TITLE_MOBILE : TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.OBJECTIVES_TITLE_DESKTOP}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {[
                      { text: TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.OBJECTIVE_1, icon: <Server className="w-6 h-6 text-gray-600" /> },
                      { text: TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.OBJECTIVE_2, icon: <Shield className="w-6 h-6 text-gray-600" /> },
                      { text: TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.OBJECTIVE_3, icon: <Code className="w-6 h-6 text-gray-600" /> },
                      { text: TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.OBJECTIVE_4, icon: <Terminal className="w-6 h-6 text-gray-600" /> }
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
                      src={TEXT_CONSTANTS.IMAGE_2B_PATH}
                      alt=""
                      className="w-full h-64 md:h-80 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
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
                    <h2 className="text-2xl font-bold">
                      {isMobile ? TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.CONTENT_DETAILS_TITLE_MOBILE : TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.CONTENT_DETAILS_TITLE_DESKTOP}
                    </h2>
                  </div>

                  <p className="text-gray-600 mb-8 text-base max-w-3xl">
                    {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.CONTENT_DETAILS_DESCRIPTION}
                  </p>

                  <Tabs defaultValue="content" className="w-full mb-12">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                      <TabsTrigger value="content">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.TAB_CONTENT}</TabsTrigger>
                      <TabsTrigger value="duration">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.TAB_DURATION}</TabsTrigger>
                      <TabsTrigger value="audience">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.TAB_AUDIENCE}</TabsTrigger>
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
                      <Card>
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
                      <Card>
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

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-gray-700" />
                      <h3 className="text-xl font-bold">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.CERTIFICATION_TITLE}</h3>
                    </div>
                    <p className="text-gray-600">
                      {TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.CERTIFICATION_DESCRIPTION}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
                <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.EXPERT_TRAINERS_TITLE}</h3>
                  <p className="text-gray-600">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.EXPERT_TRAINERS_DESCRIPTION}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.PRACTICAL_APPROACH_TITLE}</h3>
                  <p className="text-gray-600">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.PRACTICAL_APPROACH_DESCRIPTION}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.RECOGNIZED_CERTIFICATIONS_TITLE}</h3>
                  <p className="text-gray-600">{TEXT_CONSTANTS.LINUX_ADMIN_MESSAGES.RECOGNIZED_CERTIFICATIONS_DESCRIPTION}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </Suspense>
  );
};

export default LinuxAdministration;
