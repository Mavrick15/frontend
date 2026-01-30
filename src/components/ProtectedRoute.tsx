import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Loader2, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const LOADING_PROGRESS_INTERVAL_MS = 200;
const INITIAL_LOADING_PROGRESS_STEP = 5;
const MAX_LOADING_PROGRESS = 95;
const NAV_SIGNUP_PATH = '/signup';
const NAV_LOGIN_PATH = '/login';
const NAV_HOME = '/';

const MESSAGES = {
  LOADING_TEXT: 'Chargement...',
  ACCESS_RESTRICTED_TITLE: 'Accès restreint',
  ACCESS_RESTRICTED_DESCRIPTION: 'Cette page est réservée aux membres connectés. Connectez-vous ou créez un compte pour accéder au calendrier des formations et à vos inscriptions.',
  SIGNUP_BUTTON_TEXT: "S'inscrire",
  LOGIN_BUTTON_TEXT: 'Se connecter',
  BACK_HOME: "Retour à l'accueil",
};

const SVG_PATTERN = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user && JSON.parse(user).isAuthenticated);

    const interval = setInterval(() => {
      setLoadingProgress((prev) =>
        prev < MAX_LOADING_PROGRESS ? prev + INITIAL_LOADING_PROGRESS_STEP : prev
      );
    }, LOADING_PROGRESS_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-28 h-28"
        >
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 rounded-full border-4 border-t-gray-900 border-b-gray-900 border-l-gray-300 border-r-gray-300 animate-spin" />
          <div
            className="absolute inset-2 rounded-full bg-white flex items-center justify-center"
            style={{
              clipPath: `inset(${100 - loadingProgress}% 0 0 0)`,
              backgroundColor: 'rgba(0,0,0,0.03)',
              transition: 'clip-path 0.2s ease-out',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-gray-900 animate-spin" />
          </div>
        </motion.div>
        <p className="mt-4 text-gray-600 font-medium">{MESSAGES.LOADING_TEXT}</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-b-3xl shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 opacity-30" style={SVG_PATTERN} />
          <div className="container mx-auto px-4 relative z-10">
            <Link
              to={NAV_HOME}
              className="inline-flex items-center text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {MESSAGES.BACK_HOME}
            </Link>
            <div className="max-w-2xl flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <Lock className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold font-space drop-shadow-lg">
                  {MESSAGES.ACCESS_RESTRICTED_TITLE}
                </h1>
                <p className="mt-2 text-lg text-gray-200">
                  {MESSAGES.ACCESS_RESTRICTED_DESCRIPTION}
                </p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Card + actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="container mx-auto px-4 -mt-8 relative z-20 py-12 pb-24"
        >
          <div className="max-w-md mx-auto">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl p-8">
              <p className="text-gray-600 mb-8 text-center">
                Choisissez une option ci-dessous pour continuer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate(NAV_LOGIN_PATH)}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  {MESSAGES.LOGIN_BUTTON_TEXT}
                </Button>
                <Button
                  onClick={() => navigate(NAV_SIGNUP_PATH)}
                  variant="outline"
                  className="flex-1 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold py-6 rounded-xl transition-all"
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  {MESSAGES.SIGNUP_BUTTON_TEXT}
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
