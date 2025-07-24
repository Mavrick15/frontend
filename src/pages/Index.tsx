import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react'; // Ensure ArrowRight is imported if used in CTA buttons

const PageLayout = lazy(() => import('@/components/PageLayout'));
const Hero = lazy(() => import('@/components/Hero'));
const Features = lazy(() => import('@/components/Features'));
const Projects = lazy(() => import('@/components/Projects'));
const WhyWrlds = lazy(() => import('@/components/WhyWrlds'));
const BlogPreview = lazy(() => import('@/components/BlogPreview'));
const SEO = lazy(() => import('@/components/SEO'));
const ContactSection = lazy(() => import('@/components/ContactSection')); // Assuming you have or will create this component

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
      'formation professionnelle IT',
      'solutions technologiques Kinshasa'
    ]
  },
  LOADING_TEXT: "Chargement...",
  LOADING_SPINNER_ALT: "Animation de chargement",

  FEATURES_SECTION_TITLE: "Nos Services IT & Solutions Innovantes",
  WHY_US_SECTION_TITLE: "Pourquoi Choisir Zetoun Labs ?",
  PROJECTS_SECTION_TITLE: "Nos Réalisations & Études de Cas",
  BLOG_SECTION_TITLE: "Dernières Actualités & Insights de Zetoun Labs",
  CONTACT_SECTION_TITLE: "Contactez Zetoun Labs",
  CTA_SERVICE_DESCRIPTION: "Découvrez comment nos services IT et formations peuvent transformer votre entreprise. De l'infogérance à la cybersécurité, en passant par le développement web et l'énergie solaire, nous avons la solution qu'il vous faut.",
  CTA_BUTTON_TEXT: "Découvrir tous nos services",
};

const Index = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const contactElements = document.querySelectorAll(`[id="${TEXT_CONSTANTS.CONTACT_ELEMENT_ID}"]`);
    if (contactElements.length > 1) {
      contactElements[1].id = TEXT_CONSTANTS.CONTACT_FOOTER_ID;
    }

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
        <Suspense fallback={<div>{TEXT_CONSTANTS.LOADING_TEXT} {loadingProgress}%</div>}>
          <Hero />

          <section className="py-12 md:py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
                {TEXT_CONSTANTS.FEATURES_SECTION_TITLE}
              </h2>
              <Features />
              <div className="text-center mt-10">
                <p className="text-lg text-gray-700 mb-4 max-w-2xl mx-auto">
                  {TEXT_CONSTANTS.CTA_SERVICE_DESCRIPTION}
                </p>
                <Link to="/services" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  {TEXT_CONSTANTS.CTA_BUTTON_TEXT}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 py-12 md:py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
                {TEXT_CONSTANTS.WHY_US_SECTION_TITLE}
              </h2>
              <WhyWrlds />
            </div>
          </section>

          <section className="py-12 md:py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
                {TEXT_CONSTANTS.PROJECTS_SECTION_TITLE}
              </h2>
              <Projects />
              <div className="text-center mt-10">
                <Link to="/projects" className="text-blue-600 hover:underline font-medium">
                  Voir tous nos projets
                </Link>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 py-12 md:py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
                {TEXT_CONSTANTS.BLOG_SECTION_TITLE}
              </h2>
              <BlogPreview />
              <div className="text-center mt-10">
                <Link to="/blog" className="text-blue-600 hover:underline font-medium">
                  Lire tous les articles
                </Link>
              </div>
            </div>
          </section>

          <section id={TEXT_CONSTANTS.CONTACT_ELEMENT_ID} className="py-12 md:py-20 bg-blue-700 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {TEXT_CONSTANTS.CONTACT_SECTION_TITLE}
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Prêt à transformer votre entreprise ou à acquérir de nouvelles compétences ? Contactez Zetoun Labs dès aujourd'hui pour discuter de vos besoins.
              </p>
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-lg text-blue-700 bg-white hover:bg-gray-100">
                Demander un devis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </section>

        </Suspense>
      </motion.div>
    </PageLayout>
  );
};

export default Index;
