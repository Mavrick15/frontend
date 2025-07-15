import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const TEXT_CONSTANTS = {
  HOME_PATH: "/",
  GO_BACK_BUTTON_TEXT: "Retourner en arrière",
  GO_HOME_BUTTON_TEXT: "Retourner à l'accueil",

  NOT_FOUND_MESSAGES: {
    ERROR_LOG_PREFIX: "404 Erreur : L'utilisateur a tenté d'accéder à une route inexistante :",
    TITLE: "Page introuvable",
    DESCRIPTION: "Désolé, nous n'avons pas pu trouver la page que vous recherchez.",
  },
};

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      TEXT_CONSTANTS.NOT_FOUND_MESSAGES.ERROR_LOG_PREFIX,
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-25"></div>
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>

              <h1 className="text-5xl font-bold text-gray-900 dark:text-white font-space">404</h1>
              <p className="mt-3 text-xl font-medium text-gray-700 dark:text-gray-300">{TEXT_CONSTANTS.NOT_FOUND_MESSAGES.TITLE}</p>
              <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
                {TEXT_CONSTANTS.NOT_FOUND_MESSAGES.DESCRIPTION}
              </p>

              <div className="mt-8 space-y-4">
                <Button
                  className="w-full hover:scale-105 transition-transform"
                  onClick={() => navigate(-1)}
                >
                  {TEXT_CONSTANTS.GO_BACK_BUTTON_TEXT}
                </Button>

                <Button
                  variant="outline"
                  className="w-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => navigate(TEXT_CONSTANTS.HOME_PATH)}
                >
                  {TEXT_CONSTANTS.GO_HOME_BUTTON_TEXT}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
