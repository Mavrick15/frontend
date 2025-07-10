import React, { useEffect, useState, Suspense } from 'react';
import { Mail, Linkedin, Phone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { motion } from 'framer-motion';

const ContactInfo = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress < 95) {
          return prevProgress + 5;
        }
        return prevProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
    exit: { opacity: 0, y: 20 },
  };

  const title = "Politique de confidentialité | Zetoun Labs";
  const description = `Consultez notre politique de confidentialité pour comprendre comment nous
    collectons, utilisons et protégeons vos informations personnelles.`;
  const keywords = ["politique de confidentialité", "vie privée", "protection des données", "Zetoun Labs"];

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
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Link>

              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold mb-6"
              >
                Contactez-nous
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-gray-600 mb-12"
              >
                Vous souhaitez en savoir plus sur nos formations ou avoir des informations personnalisées ?
                N'hésitez pas à nous contacter directement.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-200"
                >
                  <div className="flex flex-col items-center text-center">
                    <img
                      src="/lovable-uploads/aa5291bd-2417-4c1e-9a02-0bcc71a92507.png"
                      alt="Felix von Heland"
                      className="w-32 h-32 rounded-full mb-4 object-cover filter grayscale"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/128x128/e2e8f0/64748b?text=FVH";
                        e.currentTarget.alt = "Image de remplacement pour Felix von Heland";
                      }}
                    />
                    <h3 className="text-xl font-bold text-gray-900">Felix von Heland</h3>
                    <p className="text-gray-600 mb-4">Directeur des formations</p>
                    <div className="flex flex-col space-y-3">
                      <a href="mailto:felix@wrlds.com" className="flex items-center text-gray-700 hover:text-blue-600">
                        <Mail className="w-5 h-5 mr-2" />
                        felix@wrlds.com
                      </a>
                      <a
                        href="https://www.linkedin.com/in/felixvonheland/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-blue-600"
                      >
                        <Linkedin className="w-5 h-5 mr-2" />
                        LinkedIn Profile
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-200"
                >
                  <div className="flex flex-col items-center text-center">
                    <img
                      src="/lovable-uploads/a9bb9110-964a-43b0-a5ab-7162140cd133.png"
                      alt="Love Anderberg"
                      className="w-32 h-32 rounded-full mb-4 object-cover filter grayscale"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/128x128/e2e8f0/64748b?text=LA";
                        e.currentTarget.alt = "Image de remplacement pour Love Anderberg";
                      }}
                    />
                    <h3 className="text-xl font-bold text-gray-900">Love Anderberg</h3>
                    <p className="text-gray-600 mb-4">Responsable pédagogique</p>
                    <div className="flex flex-col space-y-3">
                      <a href="mailto:love@wrlds.com" className="flex items-center text-gray-700 hover:text-blue-600">
                        <Mail className="w-5 h-5 mr-2" />
                        love@wrlds.com
                      </a>
                      <a
                        href="https://www.linkedin.com/in/love-anderberg-67549a174/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-blue-600"
                      >
                        <Linkedin className="w-5 h-5 mr-2" />
                        LinkedIn Profile
                      </a>
                      <a href="tel:+46760149508" className="flex items-center text-gray-700 hover:text-blue-600">
                        <Phone className="w-5 h-5 mr-2" />
                        076-014 95 08
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-50 p-8 rounded-lg border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-4">Informations complémentaires</h3>
                <p className="mb-4">
                  Nos formations sont disponibles en présentiel et en distanciel. Nous proposons également des solutions
                  sur mesure pour les entreprises qui souhaitent former leurs équipes sur des technologies spécifiques.
                </p>
                <p className="mb-2">
                  N'hésitez pas à nous contacter pour toute question ou pour réserver votre place dans l'une de nos formations.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </PageLayout>
    </Suspense>
  );
};

export default ContactInfo;
