import React, { useEffect, useRef, useState, lazy, Suspense, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

// Importation dynamique des composants pour le lazy loading
const PageLayout = lazy(() => import('@/components/PageLayout'));

// Constantes pour le composant About
const TEXT_CONSTANTS = {
  LOADING_PROGRESS_INTERVAL_MS: 200,
  INITIAL_LOADING_PROGRESS_STEP: 5,
  MAX_LOADING_PROGRESS: 95,
  SCROLL_AMOUNT: 300,
  SCROLL_THRESHOLD: 100,
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
  LOADING_FALLBACK_TEXT: "Chargement...",
  SEO_TITLE: "À propos de Zetoun Labs - Innovation et expertise technologique",
  SEO_DESCRIPTION: "Découvrez l'équipe, la vision, les valeurs et l'histoire de Zetoun Labs, votre partenaire en transformation numérique.",
  SEO_KEYWORDS: ["Zetoun Labs", "à propos", "équipe", "vision", "valeurs", "histoire", "innovation", "technologie"],
  LOADING_SPINNER_ALT: "Animation de chargement",
  TEAM_MEMBER_IMAGE_ALT: "[Image de l'équipe]",
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
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress < TEXT_CONSTANTS.MAX_LOADING_PROGRESS) {
          return prevProgress + TEXT_CONSTANTS.INITIAL_LOADING_PROGRESS_STEP;
        }
        return prevProgress;
      });
    }, TEXT_CONSTANTS.LOADING_PROGRESS_INTERVAL_MS);

    return () => clearInterval(interval);
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
          title={TEXT_CONSTANTS.SEO_TITLE}
          description={TEXT_CONSTANTS.SEO_DESCRIPTION}
          keywords={TEXT_CONSTANTS.SEO_KEYWORDS}
          type="website"
        />
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <Link to={TEXT_CONSTANTS.HOME_PATH} className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {TEXT_CONSTANTS.RETURN_HOME}
              </Link>

              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-6 text-gray-900"
              >
                {TEXT_CONSTANTS.PAGE_TITLE_MAIN}
              </motion.h1>

              <div className="prose prose-lg max-w-none">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-gray-700 mb-12"
                >
                  {TEXT_CONSTANTS.PAGE_DESCRIPTION_INTRO}
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-bold text-gray-900">{TEXT_CONSTANTS.VISION_TITLE}</h2>
                    <p className="text-gray-700">
                      {TEXT_CONSTANTS.VISION_P1}
                    </p>
                    <p className="text-gray-700">
                      {TEXT_CONSTANTS.VISION_P2}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gray-100 rounded-2xl p-8 border border-gray-200"
                  >
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{TEXT_CONSTANTS.VALUES_TITLE}</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-gray-700 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700"><strong className="text-gray-800">{TEXT_CONSTANTS.VALUE_INNOVATION}</strong> {TEXT_CONSTANTS.VALUE_INNOVATION_DESC}</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-gray-700 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700"><strong className="text-gray-800">{TEXT_CONSTANTS.VALUE_QUALITY}</strong> {TEXT_CONSTANTS.VALUE_QUALITY_DESC}</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-gray-700 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700"><strong className="text-gray-800">{TEXT_CONSTANTS.VALUE_COLLABORATION}</strong> {TEXT_CONSTANTS.VALUE_COLLABORATION_DESC}</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-gray-700 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700"><strong className="text-gray-800">{TEXT_CONSTANTS.VALUE_IMPACT}</strong> {TEXT_CONSTANTS.VALUE_IMPACT_DESC}</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-16"
                >
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">{TEXT_CONSTANTS.HISTORY_TITLE}</h2>
                  <div className="bg-gray-100 rounded-xl border border-gray-200 p-8 shadow-sm">
                    <p className="text-gray-700 mb-4">
                      {TEXT_CONSTANTS.HISTORY_P1}
                    </p>
                    <p className="text-gray-700 mb-4">
                      {TEXT_CONSTANTS.HISTORY_P2}
                    </p>
                    <p className="text-gray-700">
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
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">{TEXT_CONSTANTS.TEAM_TITLE}</h2>
                  <p className="text-gray-700 mb-8">
                    {TEXT_CONSTANTS.TEAM_DESCRIPTION}
                  </p>

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
                          <Card className="bg-gray-100 border border-gray-200 overflow-hidden">
                            <CardContent className="p-6">
                              <div className="flex flex-col items-center text-center">
                                <div className="w-32 h-32 relative mb-4 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                                  <img
                                    src={member.image}
                                    alt={TEXT_CONSTANTS.TEAM_MEMBER_IMAGE_ALT}
                                    className="w-full h-full object-cover filter grayscale"
                                    onError={(e) => {
                                      e.currentTarget.onerror = null;
                                      e.currentTarget.src = `${TEXT_CONSTANTS.IMAGE_PLACEHOLDER_BASE_URL}${member.name.split(' ').map(n => n[0]).join('')}`;
                                    }}
                                  />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                                <p className="text-gray-700 text-sm mb-2">{member.role}</p>
                                <p className="text-gray-700 text-sm">{member.bio}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                    <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={handleScrollLeft}
                        className="rounded-full border-gray-300 shadow-md bg-white text-gray-800 hover:bg-gray-200 hover:text-gray-900"
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
                        className="rounded-full border-gray-300 shadow-md bg-white text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                        disabled={!canScrollRight}
                        aria-label={TEXT_CONSTANTS.SCROLL_RIGHT_ARIA}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="mt-16 pt-8 border-t border-gray-200">
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </Suspense>
  );
};

export default About;
