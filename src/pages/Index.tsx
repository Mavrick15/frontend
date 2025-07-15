import React, { useEffect, useState, lazy } from 'react'; // Removed Suspense from import
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PageLayout = lazy(() => import('@/components/PageLayout'));
const Hero = lazy(() => import('@/components/Hero'));
const Features = lazy(() => import('@/components/Features'));
const Projects = lazy(() => import('@/components/Projects'));
const WhyWrlds = lazy(() => import('@/components/WhyWrlds'));
const BlogPreview = lazy(() => import('@/components/BlogPreview'));
const SEO = lazy(() => import('@/components/SEO'));

const TEXT_CONSTANTS = {
  LOADING_PROGRESS_INTERVAL_MS: 200,
  INITIAL_LOADING_PROGRESS_STEP: 5,
  MAX_LOADING_PROGRESS: 95,
  CONTACT_ELEMENT_ID: 'contact',
  CONTACT_FOOTER_ID: 'contact-footer',

  SEO_METADATA: {
    TITLE: "Zetoun Labs - Services IT & Formations | Kinshasa",
    DESCRIPTION: "Zetoun Labs offre des services IT complets et des formations certifiantes à Kinshasa, incluant le développement logiciel, la cybersécurité, l'ingénierie réseau et l'installation solaire. Boostez votre entreprise et vos compétences avec nos solutions innovantes.",
    KEYWORDS: [
      'services IT Kinshasa',
      'formations IT Kinshasa',
      'développement logiciel Kinshasa',
      'cybersécurité RDC',
      'ingénierie réseau Kinshasa',
      'installation solaire Kinshasa',
      'Zetoun Labs',
      'IT Congo',
      'formation professionnelle IT'
    ]
  },
  LOADING_TEXT: "Chargement...",
  LOADING_SPINNER_ALT: "Animation de chargement",
};

const Index = () => {
  // loadingProgress state is now redundant without Suspense fallback, but kept for context if needed elsewhere.
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Logic to handle duplicate contact IDs, ensuring unique IDs for footer
    const contactElements = document.querySelectorAll(`[id="${TEXT_CONSTANTS.CONTACT_ELEMENT_ID}"]`);
    if (contactElements.length > 1) {
      contactElements[1].id = TEXT_CONSTANTS.CONTACT_FOOTER_ID;
    }

    // Interval for simulating loading progress (can be removed if no longer needed)
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress < TEXT_CONSTANTS.MAX_LOADING_PROGRESS) {
          return prevProgress + TEXT_CONSTANTS.INITIAL_LOADING_PROGRESS_STEP;
        }
        return prevProgress;
      });
    }, TEXT_CONSTANTS.LOADING_PROGRESS_INTERVAL_MS);

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, []);

  // Framer Motion variants for page transitions
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
        {/* Lazy-loaded components for the main page content */}
        <Hero />
        <Features />
        <WhyWrlds />
        <Projects />
        <BlogPreview />
      </motion.div>
    </PageLayout>
  );
};

export default Index;
