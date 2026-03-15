import React, { useEffect, useState, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PageLayout = lazy(() => import('@/components/PageLayout'));
const Hero = lazy(() => import('@/components/Hero'));
const Features = lazy(() => import('@/components/Features'));
const Projects = lazy(() => import('@/components/Projects'));
const WhyWrlds = lazy(() => import('@/components/WhyWrlds'));
const BlogPreview = lazy(() => import('@/components/BlogPreview'));
const Statistics = lazy(() => import('@/components/Statistics'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const SEO = lazy(() => import('@/components/SEO'));


const TEXT_CONSTANTS = {
  LOADING_PROGRESS_INTERVAL_MS: 200,
  INITIAL_LOADING_PROGRESS_STEP: 5,
  MAX_LOADING_PROGRESS: 95,


  SEO_METADATA: {
    TITLE: "Zetoun Labs | Leader IT à Kinshasa - Solutions Innovantes & Expertise Certifiée",
    DESCRIPTION: "Transformez votre entreprise avec Zetoun Labs - Développement web de pointe, cybersécurité militaire, ingénierie réseau 10Gb et énergie solaire innovante. Plus de 500 projets livrés avec 99.8% de satisfaction à Kinshasa, RDC.",
    KEYWORDS: [
      'leader IT Kinshasa',
      'expert cybersécurité RDC',
      'développement web professionnel',
      'ingénierie réseau haute performance',
      'solutions énergie solaire',
      'transformation digitale Kinshasa',
      'Zetoun Labs excellence',
      'infrastructure IT cloud',
      'formation certifiée IT',
      'support 24/7 RDC',
      'architecte solutions réseau',
      'expertise technologies innovantes'
    ]
  },
  LOADING_TEXT: "Chargement...",
  LOADING_SPINNER_ALT: "Animation de chargement",
};

const Index = () => {
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

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
  };

  return (
    <PageLayout>
      <SEO
        title={TEXT_CONSTANTS.SEO_METADATA.TITLE}
        description={TEXT_CONSTANTS.SEO_METADATA.DESCRIPTION}
        keywords={TEXT_CONSTANTS.SEO_METADATA.KEYWORDS}
      />
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Hero />
        <Statistics />
        <Features />
        <WhyWrlds />
        <Projects />
        <Testimonials />
        <BlogPreview />
      </motion.div>
    </PageLayout>
  );
};

export default Index;
