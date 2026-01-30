import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { motion } from 'framer-motion';

const TEXT_CONSTANTS = {
  HOME_PATH: '/',
  ERROR_LOG_PREFIX: "404 Erreur : L'utilisateur a tenté d'accéder à une route inexistante :",
  TITLE: 'Page introuvable',
  DESCRIPTION: "Désolé, nous n'avons pas pu trouver la page que vous recherchez. Elle a peut-être été déplacée ou supprimée.",
  BACK_BUTTON: 'Retour',
  HOME_BUTTON: "Retour à l'accueil",
  SUGGESTION: 'Vous pouvez retourner à l\'accueil ou utiliser le menu pour naviguer.',
};

const SVG_PATTERN = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
};

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(TEXT_CONSTANTS.ERROR_LOG_PREFIX, location.pathname);
  }, [location.pathname]);

  return (
    <PageLayout>
      <div className="min-h-screen flex flex-col">
        {/* Header 404 */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-b-3xl shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 opacity-30" style={SVG_PATTERN} />
          <div className="container mx-auto px-4 relative z-10">
            <Link
              to={TEXT_CONSTANTS.HOME_PATH}
              className="inline-flex items-center text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {TEXT_CONSTANTS.HOME_BUTTON}
            </Link>
            <div className="max-w-2xl flex items-center gap-6">
              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <FileQuestion className="h-14 w-14 text-white" />
              </div>
              <div>
                <span className="text-6xl md:text-7xl font-extrabold font-space drop-shadow-lg text-white/90">
                  404
                </span>
                <h1 className="mt-2 text-3xl md:text-4xl font-bold font-space">
                  {TEXT_CONSTANTS.TITLE}
                </h1>
                <p className="mt-2 text-lg text-gray-200">
                  {TEXT_CONSTANTS.DESCRIPTION}
                </p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Contenu + actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex-1 container mx-auto px-4 -mt-8 relative z-20 py-12 pb-24"
        >
          <div className="max-w-md mx-auto">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl p-8">
              <p className="text-gray-600 mb-8 text-center">
                {TEXT_CONSTANTS.SUGGESTION}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="flex-1 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold py-6 rounded-xl transition-all"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  {TEXT_CONSTANTS.BACK_BUTTON}
                </Button>
                <Link to={TEXT_CONSTANTS.HOME_PATH} className="flex-1">
                  <Button
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Home className="mr-2 h-5 w-5" />
                    {TEXT_CONSTANTS.HOME_BUTTON}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </PageLayout>
  );
};

export default NotFound;
