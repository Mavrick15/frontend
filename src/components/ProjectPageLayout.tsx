import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { useEffect } from 'react';
import SEO from '@/components/SEO'; // Importez le composant SEO

// Constantes pour le composant ProjectPageLayout
const TEXT_CONSTANTS = {
  BACK_BUTTON: "Retour à l'accueil",
};

interface ProjectPageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  imageUrl: string;
  brandName: string; // This prop is not used in the current component, but kept for interface consistency.
  darkMode?: boolean;
  imageOnError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const ProjectPageLayout: React.FC<ProjectPageLayoutProps> = ({
  children,
  title,
  subtitle,
  imageUrl,
  brandName,
  darkMode = false,
  imageOnError
}) => {
  // Ensure page scrolls to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bgColor = darkMode ? 'bg-[#0c151c]' : 'bg-gray-100';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';

  return (
    <PageLayout>
      {/* SEO component for meta tags */}
      <SEO title={title} description={subtitle} />
      <div className="pt-16 pb-20 bg-gradient-to-br from-white via-gray-50 to-gray-100">
        {/* Hero Section */}
        <div
          className={`relative w-full h-[45vh] md:h-[55vh] lg:h-[60vh] overflow-hidden flex items-center justify-center group`}
        >
          {/* Background Image with Overlay */}
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={imageOnError}
          />
          {/* Overlay for readability */}
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-black/80 via-black/70 to-black/80' : 'bg-gradient-to-br from-white/85 via-white/75 to-white/85'}`}></div>
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
            <motion.div
              className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center ${textColor} font-space leading-tight drop-shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {title}
              </motion.h1>
              <motion.div
                className={`w-24 h-1 ${darkMode ? 'bg-white' : 'bg-gray-900'} mb-6 rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.p
                className={`text-lg md:text-xl lg:text-2xl text-center max-w-3xl ${darkMode ? 'text-gray-100' : 'text-gray-700'} leading-relaxed`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {subtitle}
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Back Button */}
        <div className="w-full max-w-6xl mx-auto px-6 md:px-8 mt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/#projects" 
              className="inline-flex items-center group text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>{TEXT_CONSTANTS.BACK_BUTTON}</span>
            </Link>
          </motion.div>
        </div>

        {/* Case Study Content */}
        <div className="w-full max-w-6xl mx-auto px-6 md:px-8 py-12">
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProjectPageLayout;
