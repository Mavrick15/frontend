import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, ChevronLeft, ChevronRight, Mail, Linkedin, Twitter, Award, Users, Target, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import PageLayout from '@/components/PageLayout';
import { useCompany } from '@/hooks/useCompany';

const teamMembersData = [
  {
    name: "Benjamin Baki",
    role: "Co-Founder & CEO",
    bio: "Visionnaire stratégique avec plus de 8 ans d'expérience en transformation digitale. Passionné par l'innovation technologique et l'entrepreneuriat.",
    image: "/lovable-uploads/img/moi.png",
    expertise: ["Leadership", "Stratégie", "Innovation", "Business Development"],
    achievements: ["+50 projets menés", "Expert Cloud Computing", "Certifié AWS Solutions Architect"],
    social: { linkedin: "https://www.linkedin.com/in/benjamin-baki", twitter: "https://www.twitter.com/BenyaminBaki", email: "admin@zetounlabs.com" }
  },
  {
    name: "Evra Lashe",
    role: "Co-Founder & COO",
    bio: "Ingénieur réseau certifié Cisco (CCNP) avec 7 ans d'expérience en conception d'infrastructures complexes et en optimisation des performances réseau.",
    image: "/lovable-uploads/img/evra.png",
    expertise: ["Cisco Networking", "Sécurité Réseau", "Cloud Infrastructure", "DevOps"],
    achievements: ["Certifié CCNP", "Expert en cybersécurité", "Architecte de 20+ réseaux d'entreprise"],
    social: { linkedin: "#", twitter: "#", email: "evra@zetounlabs.cd" }
  },
  {
    name: "Kevine Etanaka",
    role: "Co-Founder & CFO",
    bio: "Ingénieure télécom spécialisée en transmission de données et en gestion de projet. Expertise en systèmes de communication sans fil et fibre optique.",
    image: "/lovable-uploads/img/kevine.png",
    expertise: ["Télécommunications", "Fibre Optique", "Gestion de Projet", "RF Engineering"],
    achievements: ["+15 km de fibre déployée", "Expert 5G/4G", "Certifiée PMP"],
    social: { linkedin: "#", twitter: "#", email: "kevine@zetounlabs.cd" }
  },
  {
    name: "Glody Nzuzi",
    role: "Co-Founder & CTO",
    bio: "Spécialiste en systèmes et réseaux avec une expertise approfondie en virtualisation, conteneurisation et automatisation des infrastructures IT.",
    image: "/lovable-uploads/img/glody.png",
    expertise: ["Virtualisation", "Docker/Kubernetes", "Automatisation", "Monitoring"],
    achievements: ["Architecte Cloud", "Expert DevOps", "Certifié VMware vSphere"],
    social: { linkedin: "#", twitter: "#", email: "glody@zetounlabs.cd" }
  },
  {
    name: "Grace Moke",
    role: "Co-Founder & CMO",
    bio: "Ingénieure télécom et experte en systèmes photovoltaïques. Spécialisée dans les solutions hybrides IT-énergie pour les entreprises durables.",
    image: "/lovable-uploads/img/grace.png",
    expertise: ["Énergie Solaire", "Marketing Tech", "Développement Durable", "Solutions Hybrides"],
    achievements: ["+50 installations solaires", "Expert en marketing B2B", "Certifiée en énergies renouvelables"],
    social: { linkedin: "#", twitter: "#", email: "grace@zetounlabs.cd" }
  },
  {
    name: "David Matungulu",
    role: "Senior Network Engineer",
    bio: "Ingénieur réseau spécialisé en sécurité informatique et en architecture cloud. Expert en conception d'infrastructures sécurisées et en gestion des systèmes distribués.",
    image: "/lovable-uploads/img/David.jpeg",
    expertise: ["Sécurité Réseau", "Monitoring", "Cybersécurité", "Systèmes Distribués"],
    achievements: ["Certifié CISSP", "Architecte de 30+ infrastructures cloud", "Expert en audit de sécurité"],
    social: { linkedin: "https://www.linkedin.com/in/david-matungulu", twitter: "#", email: "david@zetounlabs.cd" }
  },
  {
    name: "Jeanick Ilondji",
    role: "System & Network Administrator",
    bio: "Administrateur réseau et système expert en gestion d'infrastructures, sécurité informatique et optimisation des performances.",
    image: "/lovable-uploads/img/jeanick.png",
    expertise: ["Administration Système", "Réseaux", "Sécurité IT", "Monitoring"],
    achievements: ["Administration de 10+ serveurs", "Expert en sécurité réseau", "Optimisation des performances système", "Gestion des infrastructures cloud"],
    social: { linkedin: "#", twitter: "#", email: "jeanick@zetounlabs.cd" }
  }
];

const About = () => {
  const { company, loading: companyLoading } = useCompany();
  
  // Calcul dynamique de l'expérience depuis le 11 novembre 2023
  const getYearsOfExperience = () => {
    const startDate = new Date('2023-11-11');
    const currentDate = new Date();
    const years = currentDate.getFullYear() - startDate.getFullYear();
    const monthDiff = currentDate.getMonth() - startDate.getMonth();
    const dayDiff = currentDate.getDate() - startDate.getDate();
    
    // Si la date actuelle est avant le 11 novembre, on ne compte pas l'année en cours
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      return years;
    }
    return years + 1;
  };

  const yearsOfExperience = getYearsOfExperience();

  // Définir les constantes ici pour accéder à yearsOfExperience
  const TEXT_CONSTANTS = {
    SCROLL_AMOUNT: 300,
    IMAGE_PLACEHOLDER_BASE_URL: "https://placehold.co/128x128/e2e8f0/64748b?text=",
    HOME_PATH: "/",

    RETURN_HOME: "Retour à l'accueil",
    PAGE_TITLE_MAIN: "À propos de Zetoun Labs",
    PAGE_DESCRIPTION_INTRO: "Nous sommes une équipe d'innovateurs engagés à transformer le quotidien des entreprises et des particuliers en alliant technologies intelligentes, services informatiques sur mesure, formations adaptées et support technique complet.",
    VISION_TITLE: "Notre vision",
    VISION_P1: "Être le partenaire de confiance qui comble le fossé entre les technologies émergentes et les besoins du monde réel, en transformant les idées en solutions robustes et intelligentes qui stimulent la croissance et l'innovation des entreprises.",
    VISION_P2: "Notre vision est de devenir le catalyseur de la transformation numérique en démocratisant l'accès aux technologies intelligentes : nous imaginons un futur où chaque entreprise et chaque particulier bénéficient d'infrastructures IT flexibles, de savoir-faire pointus et d'un support infaillible, pour libérer tout leur potentiel d'innovation et de croissance.",
    VALUES_TITLE: "Nos valeurs",
    VALUE_INNOVATION: "Innovation:",
    VALUE_INNOVATION_DESC: "Nous franchissons les limites technologiques pour donner vie à des solutions inédites.",
    VALUE_QUALITY: "Qualité:",
    VALUE_QUALITY_DESC: "Nous nous engageons à atteindre l'excellence dans chaque projet que nous entreprenons.",
    VALUE_COLLABORATION: "Collaboration:",
    VALUE_COLLABORATION_DESC: "Nous coopérons étroitement avec nos clients pour concevoir des solutions sur mesure.",
    VALUE_IMPACT: "Impact:",
    VALUE_IMPACT_DESC: "Le véritable indicateur de notre réussite, ce sont les bénéfices tangibles que nos interventions apportent à nos clients.",
    HISTORY_TITLE: "Notre histoire",
    HISTORY_P1: "Nous sommes partis d'un constat simple : le paysage des services IT et de la formation était trop morcelé et complexe. Dès début 2024, notre ambition était de rassembler ces offres – infrastructures, déploiement logiciel, cybersécurité, support – en modules modulaires et intuitifs, accessibles aussi bien aux entreprises qu'aux particuliers.",
    HISTORY_P2: "Grâce à notre premier tour de table, nous avons consacré les six premiers mois au 'full code' : concevoir, tester et peaufiner chaque brique logicielle et chaque composant de notre plateforme. Pour valider notre approche, nous avons rapidement mis en œuvre des prototypes chez nos premiers clients pilotes – PME locales, start-ups et associations – en leur fournissant des environnements réseau clés en main et des modules de formation adaptés à leurs besoins réels.",
    HISTORY_P3: "À l'aube de 2025, notre plateforme était assez robuste pour passer à l'échelle : nous avons alors élargi notre offre aux grands comptes, en intégrant des solutions de monitoring, d'automatisation et de formation certifiante.",
    TEAM_TITLE: "Notre équipe",
    TEAM_DESCRIPTION: "Une équipe d'experts passionnés, unie par la vision de transformer le paysage technologique africain.",
    TEAM_SUBTITLE: "Rencontrez les talents qui façonnent votre avenir numérique",
    TEAM_EXPERTISE_TITLE: "Notre expertise collective",
    TEAM_EXPERTISE_DESC: `Plus de ${yearsOfExperience} an${yearsOfExperience > 1 ? 's' : ''} d'expérience cumulée dans les domaines de l'ingénierie réseau, des télécommunications, de la cybersécurité, du développement web et de l'énergie solaire.`,
    SCROLL_LEFT_ARIA: "Défiler les membres de l'équipe vers la gauche",
    SCROLL_RIGHT_ARIA: "Défiler les membres de l'équipe vers la droite",
    SEO_TITLE: "À propos de Zetoun Labs - Innovation et expertise technologique",
    SEO_DESCRIPTION: "Découvrez l'équipe, la vision, les valeurs et l'histoire de Zetoun Labs, votre partenaire en transformation numérique.",
    SEO_KEYWORDS: ["Zetoun Labs", "à propos", "équipe", "vision", "valeurs", "histoire", "innovation", "technologie"],
    TEAM_MEMBER_IMAGE_ALT: "Image de l'équipe",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = useCallback(() => {
    if (teamRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = teamRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  }, []);

  useEffect(() => {
    const currentTeamRef = teamRef.current;
    if (currentTeamRef) {
      currentTeamRef.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      checkScrollability();
    }
    return () => {
      if (currentTeamRef) {
        currentTeamRef.removeEventListener('scroll', checkScrollability);
      }
      window.removeEventListener('resize', checkScrollability);
    };
  }, [checkScrollability]);

  const handleScrollLeft = () => {
    teamRef.current?.scrollBy({ left: -TEXT_CONSTANTS.SCROLL_AMOUNT, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    teamRef.current?.scrollBy({ left: TEXT_CONSTANTS.SCROLL_AMOUNT, behavior: 'smooth' });
  };

  return (
    <PageLayout>
      <SEO
        title={TEXT_CONSTANTS.SEO_TITLE}
        description={TEXT_CONSTANTS.SEO_DESCRIPTION}
        keywords={TEXT_CONSTANTS.SEO_KEYWORDS}
        type="website"
      />
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-screen">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                to={TEXT_CONSTANTS.HOME_PATH} 
                className="inline-flex items-center group text-gray-600 hover:text-gray-900 mb-8 transition-all duration-300 font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {TEXT_CONSTANTS.RETURN_HOME}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 font-space leading-tight">
                {TEXT_CONSTANTS.PAGE_TITLE_MAIN}
              </h1>
            </motion.div>

            <div className="prose prose-lg max-w-none">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-700 mb-12 leading-relaxed bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 shadow-sm"
              >
                {company?.description || TEXT_CONSTANTS.PAGE_DESCRIPTION_INTRO}
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-lg"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    {TEXT_CONSTANTS.VISION_TITLE}
                  </h2>
                  {company?.vision ? (
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base">{company.vision}</p>
                  ) : (
                    <>
                      <p className="text-gray-700 leading-relaxed text-base mb-4">
                        {TEXT_CONSTANTS.VISION_P1}
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base">
                        {TEXT_CONSTANTS.VISION_P2}
                      </p>
                    </>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200/50 shadow-lg"
                >
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">{TEXT_CONSTANTS.VALUES_TITLE}</h3>
                  {company?.values && company.values.length > 0 ? (
                    <ul className="space-y-3">
                      {company.values.map((value, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-gray-700 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">
                            <strong className="text-gray-800">{value.title}:</strong> {value.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="space-y-3">
                      <li className="flex items-start p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                        <CheckCircle className="h-6 w-6 text-gray-900 mt-0.5 mr-4 flex-shrink-0" />
                        <span className="text-gray-700"><strong className="text-gray-900 font-semibold">{TEXT_CONSTANTS.VALUE_INNOVATION}</strong> {TEXT_CONSTANTS.VALUE_INNOVATION_DESC}</span>
                      </li>
                      <li className="flex items-start p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                        <CheckCircle className="h-6 w-6 text-gray-900 mt-0.5 mr-4 flex-shrink-0" />
                        <span className="text-gray-700"><strong className="text-gray-900 font-semibold">{TEXT_CONSTANTS.VALUE_QUALITY}</strong> {TEXT_CONSTANTS.VALUE_QUALITY_DESC}</span>
                      </li>
                      <li className="flex items-start p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                        <CheckCircle className="h-6 w-6 text-gray-900 mt-0.5 mr-4 flex-shrink-0" />
                        <span className="text-gray-700"><strong className="text-gray-900 font-semibold">{TEXT_CONSTANTS.VALUE_COLLABORATION}</strong> {TEXT_CONSTANTS.VALUE_COLLABORATION_DESC}</span>
                      </li>
                      <li className="flex items-start p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                        <CheckCircle className="h-6 w-6 text-gray-900 mt-0.5 mr-4 flex-shrink-0" />
                        <span className="text-gray-700"><strong className="text-gray-900 font-semibold">{TEXT_CONSTANTS.VALUE_IMPACT}</strong> {TEXT_CONSTANTS.VALUE_IMPACT_DESC}</span>
                      </li>
                    </ul>
                  )}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  {TEXT_CONSTANTS.HISTORY_TITLE}
                </h2>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
                  <p className="text-gray-700 mb-6 leading-relaxed text-base">
                    {TEXT_CONSTANTS.HISTORY_P1}
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed text-base">
                    {TEXT_CONSTANTS.HISTORY_P2}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {TEXT_CONSTANTS.HISTORY_P3}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-16"
              >
                {/* Section Header */}
                <div className="text-center mb-12">
                  <motion.h2 
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {TEXT_CONSTANTS.TEAM_TITLE}
                  </motion.h2>
                  <motion.p 
                    className="text-xl text-gray-600 mb-2 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {TEXT_CONSTANTS.TEAM_DESCRIPTION}
                  </motion.p>
                  <motion.p 
                    className="text-lg text-gray-500 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {TEXT_CONSTANTS.TEAM_SUBTITLE}
                  </motion.p>
                </div>

                {/* Expertise Collective */}
                <motion.div 
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 mb-12 border border-gray-200/50 shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 mr-3 text-gray-700" />
                    <h3 className="text-2xl font-bold text-gray-900">{TEXT_CONSTANTS.TEAM_EXPERTISE_TITLE}</h3>
                  </div>
                  <p className="text-center text-lg text-gray-600 mb-6">
                    {TEXT_CONSTANTS.TEAM_EXPERTISE_DESC}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                      { icon: Target, text: `${yearsOfExperience}+ Ans d'expérience` },
                      { icon: Award, text: "15+ Certifications" },
                      { icon: Zap, text: "500+ Projets livrés" },
                      { icon: Users, text: "7 Experts spécialisés" }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex flex-col items-center"
                      >
                        <stat.icon className="w-8 h-8 mb-2 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{stat.text}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Additional Impact Stats */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    {[
                      { title: "99.8%", subtitle: "Taux de satisfaction client", desc: "Excellence prouvée" },
                      { title: "24/7", subtitle: "Support technique", desc: "Intervention <2h" },
                      { title: "200+", subtitle: "Entreprises transformées", desc: "En RDC et internationally" }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50"
                      >
                        <div className="text-3xl font-bold text-gray-900 mb-1">{stat.title}</div>
                        <div className="text-sm font-medium text-gray-700 mb-1">{stat.subtitle}</div>
                        <div className="text-xs text-gray-500">{stat.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Team Members Grid */}
                <div className="relative">
                  <div ref={teamRef} className="flex overflow-x-auto gap-8 py-4 scroll-smooth scrollbar-hide">
                    {teamMembersData.map((member, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 * i }}
                        className="w-80 sm:w-96 flex-shrink-0"
                      >
                        <div className="relative group">
                          {/* Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
                          
                          <Card className="relative bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full">
                            <CardContent className="p-0">
                              {/* Header avec image */}
                              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <img
                                  src={member.image}
                                  alt={`${member.name} - ${TEXT_CONSTANTS.TEAM_MEMBER_IMAGE_ALT}`}
                                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                                  onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = `${TEXT_CONSTANTS.IMAGE_PLACEHOLDER_BASE_URL}${member.name.split(' ').map(n => n[0]).join('')}`;
                                  }}
                                />
                                <div className="absolute bottom-4 left-4 right-4">
                                  <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                                  <p className="text-gray-100 font-medium">{member.role}</p>
                                </div>
                              </div>

                              {/* Contenu */}
                              <div className="p-6">
                                {/* Bio */}
                                <p className="text-gray-600 leading-relaxed mb-6">{member.bio}</p>

                                {/* Expertise */}
                                <div className="mb-6">
                                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                    <Award className="w-4 h-4 mr-2 text-gray-600" />
                                    Expertise
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {member.expertise.map((skill, index) => (
                                      <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium border border-gray-200"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Réalisations */}
                                <div className="mb-6">
                                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                    <Target className="w-4 h-4 mr-2 text-gray-600" />
                                    Réalisations
                                  </h4>
                                  <ul className="space-y-2">
                                    {member.achievements.map((achievement, index) => (
                                      <li key={index} className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="w-3 h-3 mr-2 text-gray-500 flex-shrink-0" />
                                        {achievement}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Social Links */}
                                <div className="flex justify-center pt-4 border-t border-gray-200">
                                  <div className="flex items-center space-x-3">
                                    <a
                                      href={member.social.linkedin}
                                      className="w-10 h-10 bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                                      aria-label={`LinkedIn de ${member.name}`}
                                    >
                                      <Linkedin className="w-4 h-4" />
                                    </a>
                                    <a
                                      href={member.social.twitter}
                                      className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                      aria-label={`Twitter de ${member.name}`}
                                    >
                                      <Twitter className="w-4 h-4" />
                                    </a>
                                    <a
                                      href={`mailto:${member.social.email}`}
                                      className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                                      aria-label={`Email de ${member.name}`}
                                    >
                                      <Mail className="w-4 h-4" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleScrollLeft}
                      className="rounded-full border-2 border-gray-300 shadow-lg bg-white/95 backdrop-blur-sm text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed w-12 h-12"
                      disabled={!canScrollLeft}
                      aria-label={TEXT_CONSTANTS.SCROLL_LEFT_ARIA}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleScrollRight}
                      className="rounded-full border-2 border-gray-300 shadow-lg bg-white/95 backdrop-blur-sm text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed w-12 h-12"
                      disabled={!canScrollRight}
                      aria-label={TEXT_CONSTANTS.SCROLL_RIGHT_ARIA}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 pt-8"
            >
              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Rejoignez-nous dans notre mission de transformation numérique
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
