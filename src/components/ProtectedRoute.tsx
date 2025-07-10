import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";

// Constantes pour le composant ProtectedRoute
const LOADING_PROGRESS_INTERVAL_MS = 200;
const INITIAL_LOADING_PROGRESS_STEP = 5;
const MAX_LOADING_PROGRESS = 95;
const DEFAULT_REDIRECT_PATH = '/signup';
const NAV_SIGNUP_PATH = '/signup';
const NAV_LOGIN_PATH = '/login';

const MESSAGES = {
  LOADING_TEXT: "Chargement...",
  ACCESS_RESTRICTED_TITLE: "Accès restreint",
  ACCESS_RESTRICTED_DESCRIPTION: "Vous devez être inscrit pour accéder au calendrier des formations.",
  SIGNUP_BUTTON_TEXT: "S'inscrire",
  LOGIN_BUTTON_TEXT: "Se connecter",
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = DEFAULT_REDIRECT_PATH
}) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Check user authentication status from localStorage
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user && JSON.parse(user).isAuthenticated);

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress < MAX_LOADING_PROGRESS) {
          return prevProgress + INITIAL_LOADING_PROGRESS_STEP;
        }
        return prevProgress;
      });
    }, LOADING_PROGRESS_INTERVAL_MS);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Animation variants for the container
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  // Animation variants for the alert message
  const alertVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4, type: 'spring', stiffness: 100 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  // Show loading spinner if authentication status is still being determined
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="relative w-28 h-28">
          {/* Outer circle for the spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          {/* Spinning part of the loader */}
          <div className="absolute inset-0 rounded-full border-4 border-t-gray-800 border-b-gray-800 border-l-gray-400 border-r-gray-400 animate-spin"></div>
          {/* Inner circle with progress fill */}
          <div
            className="absolute inset-2 rounded-full bg-gray-50 flex items-center justify-center"
            style={{
              clipPath: `inset(${100 - loadingProgress}% 0 0 0)`, // Controls the fill level
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              transition: 'clip-path 0.2s ease-out'
            }}
          ></div>
          {/* Loading percentage text */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-900 text-2xl font-bold">
            {loadingProgress}%
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, display access restricted message and navigation options
  if (!isAuthenticated) {
    return (
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex flex-col items-center justify-center min-h-[60vh] px-4"
      >
        <motion.div
          variants={alertVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full max-w-md"
        >
          <Alert className="mb-4 border-blue-200 bg-blue-50">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-800 font-medium text-lg">
              {MESSAGES.ACCESS_RESTRICTED_TITLE}
            </AlertTitle>
            <AlertDescription className="text-blue-700 mt-2 text-center">
              <p className="mb-4">
                {MESSAGES.ACCESS_RESTRICTED_DESCRIPTION}
              </p>
              <div className="flex flex-wrap gap-3 mt-2 justify-center">
                <Button
                  onClick={() => navigate(NAV_SIGNUP_PATH)}
                  variant="default"
                >
                  {MESSAGES.SIGNUP_BUTTON_TEXT}
                </Button>
                <Button
                  onClick={() => navigate(NAV_LOGIN_PATH)}
                  variant="outline"
                  className="border-blue-300"
                >
                  {MESSAGES.LOGIN_BUTTON_TEXT}
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </motion.div>
      </motion.div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
