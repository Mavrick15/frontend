import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import PageLayout from '@/components/PageLayout';
import { useCompany } from '@/hooks/useCompany';

const TEXT_CONSTANTS = {
  SCROLL_AMOUNT: 300,
  IMAGE_PLACEHOLDER_BASE_URL: "https://placehold.co/128x128/e2e8f0/64748b?text=",
  HOME_PATH: "/",

  RETURN_HOME: "Retour à l'accueil",
  PAGE_TITLE_MAIN: "À propos de Zetoun Labs",
  PAGE_DESCRIPTION_INTRO: "Nous sommes une équipe d’innovateurs engagés à transformer le quotidien des entreprises et des particuliers en alliant technologies intelligentes, services informatiques sur mesure, formations adaptées et support technique complet.",
  VISION_TITLE: "Notre vision",
  VISION_P1: "Être le partenaire de confiance qui comble le fossé entre les technologies émergentes et les besoins du monde réel, en transformant les idées en solutions robustes et intelligentes qui stimulent la croissance et l’innovation des entreprises.",
  VISION_P2: "Notre vision est de devenir le catalyseur de la transformation numérique en démocratisant l’accès aux technologies intelligentes : nous imaginons un futur où chaque entreprise et chaque particulier bénéficient d’infrastructures IT flexibles, de savoir-faire pointus et d’un support infaillible, pour libérer tout leur potentiel d’innovation et de croissance.",
  VALUES_TITLE: "Nos valeurs",
  VALUE_INNOVATION: "Innovation:",
  VALUE_INNOVATION_DESC: "Nous franchissons les limites technologiques pour donner vie à des solutions inédites.",
  VALUE_QUALITY: "Qualité:",
  VALUE_QUALITY_DESC: "Nous nous engageons à atteindre l’excellence dans chaque projet que nous entreprenons.",
  VALUE_COLLABORATION: "Collaboration:",
  VALUE_COLLABORATION_DESC: "Nous coopérons étroitement avec nos clients pour concevoir des solutions sur mesure.",
  VALUE_IMPACT: "Impact:",
  VALUE_IMPACT_DESC: "Le véritable indicateur de notre réussite, ce sont les bénéfices tangibles que nos interventions apportent à nos clients.",
  HISTORY_TITLE: "Notre histoire",
  HISTORY_P1: "Nous sommes partis d’un constat simple : le paysage des services IT et de la formation était trop morcelé et complexe. Dès début 2024, notre ambition était de rassembler ces offres – infrastructures, déploiement logiciel, cybersécurité, support – en modules modulaires et intuitifs, accessibles aussi bien aux entreprises qu’aux particuliers.",
  HISTORY_P2: "Grâce à notre premier tour de table, nous avons consacré les six premiers mois au “full code” : concevoir, tester et peaufiner chaque brique logicielle et chaque composant de notre plateforme. Pour valider notre approche, nous avons rapidement mis en œuvre des prototypes chez nos premiers clients pilotes – PME locales, start-ups et associations – en leur fournissant des environnements réseau clés en main et des modules de formation adaptés à leurs besoins réels.",
  HISTORY_P3: "À l’aube de 2025, notre plateforme était assez robuste pour passer à l’échelle : nous avons alors élargi notre offre aux grands comptes, en intégrant des solutions de monitoring, d’automatisation et de formation certifiante.",
  TEAM_TITLE: "Notre équipe",
  TEAM_DESCRIPTION: "Notre équipe se compose d’un ingénieur réseaux certifié Cisco, d’un ingénieur vidéosurveillance et d’ingénieurs télécom, prêts à concevoir et déployer des solutions IT complètes.",
  SCROLL_LEFT_ARIA: "Défiler les membres de l'équipe vers la gauche",
  SCROLL_RIGHT_ARIA: "Défiler les membres de l'équipe vers la droite",
  SEO_TITLE: "À propos de Zetoun Labs - Innovation et expertise technologique",
  SEO_DESCRIPTION: "Découvrez l'équipe, la vision, les valeurs et l'histoire de Zetoun Labs, votre partenaire en transformation numérique.",
  SEO_KEYWORDS: ["Zetoun Labs", "à propos", "équipe", "vision", "valeurs", "histoire", "innovation", "technologie"],
  TEAM_MEMBER_IMAGE_ALT: "Image de l'équipe",
};

const teamMembersData = [
  {
    name: "Benjamin Baki",
    role: "Co-Founder and CEO",
    bio: "Acteur innovant de Zetoun Labs: avec une vision pour transformer le numérique des entreprises.",
    image: "/lovable-uploads/img/moi.png"
  },
  {
    name: "Evra Lashe",
    role: "Co-Founder and COO",
    bio: "Administrateur réseau et systèmes, garant de la stabilité technique.",
    image: "/lovable-uploads/img/evra.png"
  },
  {
    name: "Kevine Etanaka",
    role: "Co-Founder and CFO",
    bio: "Ingénieure télécom, experte en transmission de données sol-sol.",
    image: "/lovable-uploads/img/kevine.png"
  },
  {
    name: "Glody Nzuzi",
    role: "Co-Founder and COO",
    bio: "Spécialiste réseau & systèmes, garant de la stabilité technique.",
    image: "/lovable-uploads/img/glody.png"
  },
  {
    name: "Grace Moke",
    role: "Co-Founder and CMO",
    bio: "Ingénieure télécom, expert en montage de systèmes PV.",
    image: "/lovable-uploads/img/grace.png"
  }
];

const About = () => {
  const { company, loading: companyLoading } = useCompany();

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
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  {TEXT_CONSTANTS.TEAM_TITLE}
                </h2>

                <div className="relative">
                  <div ref={teamRef} className="flex overflow-x-auto gap-6 py-4 scroll-smooth scrollbar-hide">
                    {teamMembersData.map((member, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 * i }}
                        className="w-72 sm:w-80 flex-shrink-0"
                      >
                        <div className="relative p-[1px] rounded-lg bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group h-full">
                          <Card className="bg-white/90 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                            <CardContent className="p-8 flex flex-col h-full">
                            <div className="flex flex-col items-center text-center h-full justify-start">
                              <div className="w-36 h-36 relative mb-6 rounded-full overflow-hidden shadow-lg mx-auto flex-shrink-0">
                                <div className="w-full h-full rounded-full overflow-hidden">
                                  <img
                                    src={member.image}
                                    alt={`${member.name} - ${TEXT_CONSTANTS.TEAM_MEMBER_IMAGE_ALT}`}
                                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                    style={{ 
                                      objectPosition: 'center center',
                                      objectFit: 'cover',
                                      width: '100%',
                                      height: '100%',
                                      display: 'block',
                                      margin: 0,
                                      padding: 0,
                                      WebkitMaskImage: 'radial-gradient(circle, black 75%, transparent 100%)',
                                      maskImage: 'radial-gradient(circle, black 75%, transparent 100%)'
                                    }}
                                    onError={(e) => {
                                      e.currentTarget.onerror = null;
                                      e.currentTarget.src = `${TEXT_CONSTANTS.IMAGE_PLACEHOLDER_BASE_URL}${member.name.split(' ').map(n => n[0]).join('')}`;
                                    }}
                                  />
                                </div>
                              </div>
                              <h3 className="font-bold text-xl text-gray-900 mb-2 w-full">{member.name}</h3>
                              <p className="text-gray-900 font-semibold text-sm mb-4 px-4 py-2 bg-gray-100 rounded-full inline-block">{member.role}</p>
                              <p className="text-gray-600 text-sm leading-relaxed w-full">{member.bio}</p>
                            </div>
                          </CardContent>
                        </Card>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleScrollLeft}
                      className="rounded-full border-2 border-gray-300 shadow-lg bg-white/95 backdrop-blur-sm text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
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
                      className="rounded-full border-2 border-gray-300 shadow-lg bg-white/95 backdrop-blur-sm text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
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
