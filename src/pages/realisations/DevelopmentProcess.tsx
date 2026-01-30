import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { cn } from '@/lib/utils';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const DevelopmentProcess = () => {
  const [activeProcess, setActiveProcess] = useState(1);

  const TEXT_CONSTANTS = {
    SEO_TITLE: "Notre Processus de Déploiement Structuré - Zetoun Labs",
    SEO_DESCRIPTION: `Découvrez notre processus de développement IT structuré, de la compréhension des besoins au support continu, pour des solutions innovantes et efficaces.`,
    SEO_KEYWORDS: ["processus de développement", "déploiement IT", "méthodologie", "gestion de projet", "ZL Technologies"],
    BACK_TO_HOME: "Retour à l'accueil",
    MAIN_TITLE: "Notre processus de déploiement structuré",
    INTRO_PARAGRAPH: "Nous avons affiné notre méthodologie de développement pour minimiser les risques et maximiser l'innovation, en veillant à ce que votre solution IT passe efficacement du concept à la réalité.",
    PROCESS_STEPS: [
      {
        id: 1,
        title: "Compréhension des besoins",
        description: `Cette première étape vise à établir une vision claire et partagée du projet. Elle consiste à analyser l’environnement du client, comprendre ses enjeux métiers, identifier ses objectifs et déterminer les contraintes techniques ou budgétaires. L’objectif est de poser des bases solides pour une solution réellement adaptée.`,
        steps: [
          "Organisation de réunions d’échange avec les parties prenantes",
          "Analyse de l’existant (infrastructure, logiciels, flux de travail)",
          "Identification des points de douleur et des opportunités",
          "Rédaction d’un cahier des charges fonctionnel et technique"
        ]
      },
      {
        id: 2,
        title: "Conception de la solution",
        description: `À partir des besoins identifiés, cette étape permet de concevoir l’architecture de la solution IT. Elle comprend le choix des technologies, la définition des modules fonctionnels, ainsi que la planification globale du projet. C’est ici que la solution prend forme sur le papier.`,
        steps: [
          "Élaboration de l’architecture logicielle et réseau",
          "Sélection des outils, frameworks et plateformes adaptés",
          "Modélisation des processus (diagrammes, maquettes, wireframes)",
          "Construction du planning projet (jalons, livrables, ressources nécessaires)"
        ]
      },
      {
        id: 3,
        title: "Développement & Intégration",
        description: `L’étape de mise en œuvre technique où la solution est construite et intégrée à l’environnement IT existant. Elle requiert des tests rigoureux, un contrôle qualité permanent, et une communication continue avec le client.`,
        steps: [
          "Développement des composants logiciels, API, bases de données",
          "Configuration des serveurs, réseaux et environnements cloud",
          "Intégration avec les systèmes internes ou tiers (ERP, CRM, etc.)",
          "Réalisation des tests unitaires et tests d’intégration"
        ]
      },
      {
        id: 4,
        title: "Déploiement & Mise en production",
        description: `C’est le moment de rendre la solution pleinement opérationnelle. Elle est installée dans l’environnement final, testée à grande échelle, et les utilisateurs sont accompagnés pour une adoption fluide.`,
        steps: [
          "Déploiement dans l’environnement de production",
          "Exécution des tests de validation (charge, sécurité, stabilité)",
          "Migration des données et synchronisation des systèmes",
          "Formation des utilisateurs finaux et livraison de la documentation"
        ]
      },
      {
        id: 5,
        title: "Support & Amélioration continue",
        description: `Une fois la solution en place, le travail continue : garantir la stabilité, corriger les éventuels problèmes, et faire évoluer le système selon les besoins futurs. Cette phase favorise la pérennité de la solution.`,
        steps: [
          {
            type: "link",
            textBefore: "Mise en place du ",
            link: { to: "/services/technical-support", label: "support technique" },
            textAfter: " (helpdesk, supervision)"
          },
          "Maintenance corrective et préventive",
          "Suivi des indicateurs de performance",
          "Recueil des retours utilisateurs et implémentation d’évolutions."
        ]
      }
    ],
    CURRENTLY_VIEWING: "actuellement en cours de visualisation",
    VIEW_DETAILS: "voir les détails",
    KEY_ACTIVITIES: "Activités clés :",
    DEVELOPMENT_PRINCIPLE_TITLE: "Notre principe de développement",
    DEVELOPMENT_PRINCIPLES: [
      "Itérations rapides pour une amélioration continue",
      "Communication transparente à chaque étape",
      "Architecture modulaire et évolutive",
      "Stratégies de réduction des risques intégrées",
      "Priorité à l’expérience utilisateur et à l’utilité"
    ]
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      <SEO title={TEXT_CONSTANTS.SEO_TITLE} description={TEXT_CONSTANTS.SEO_DESCRIPTION} keywords={TEXT_CONSTANTS.SEO_KEYWORDS} />
      <section className="pt-20 pb-20 bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                to="/" 
                className="inline-flex items-center group text-gray-600 hover:text-gray-900 mb-8 transition-all duration-300 font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {TEXT_CONSTANTS.BACK_TO_HOME}
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 font-space leading-tight"
            >
              {TEXT_CONSTANTS.MAIN_TITLE}
            </motion.h1>

            <div className="prose prose-lg max-w-none">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-700 mb-12 leading-relaxed bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50"
              >
                {TEXT_CONSTANTS.INTRO_PARAGRAPH}
              </motion.p>

              <div className="relative mt-12">
                <div className="hidden md:block absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 -translate-x-1/2 rounded-full"></div>

                <div className="space-y-10 relative">
                  {TEXT_CONSTANTS.PROCESS_STEPS.map((process, index) => (
                    <div
                      key={process.id}
                      className={cn(
                        "relative flex flex-col md:flex-row md:items-center gap-6",
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse text-right"
                      )}
                    >
                      <div className="md:w-1/2">
                        <div
                          className={cn(
                            "md:absolute top-0 left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center z-10 transition-all duration-300 shadow-lg",
                            activeProcess === process.id ? "bg-gray-900 text-white scale-110 shadow-xl" : "bg-white/90 backdrop-blur-sm text-gray-900 border-2 border-gray-300 hover:border-gray-900"
                          )}
                          onClick={() => setActiveProcess(process.id)}
                        >
                          <span className="font-bold text-lg">{process.id}</span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold mb-3 mt-3 md:mt-0 text-gray-900">{process.title}</h3>
                        <p className="text-gray-700 mb-3 text-base leading-relaxed">{process.description}</p>

                        <button
                          onClick={() => setActiveProcess(process.id)}
                          className={cn(
                            "text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-lg",
                            activeProcess === process.id 
                              ? "text-gray-900 bg-gray-100" 
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          )}
                        >
                          {activeProcess === process.id ? TEXT_CONSTANTS.CURRENTLY_VIEWING : TEXT_CONSTANTS.VIEW_DETAILS}
                        </button>
                      </div>

                      <div
                        className={cn(
                          "md:w-1/2 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 transition-all duration-300",
                          activeProcess === process.id 
                            ? "opacity-100 translate-y-0 shadow-xl border-gray-300 scale-105" 
                            : "opacity-50 md:opacity-30 hover:opacity-70 hover:scale-102 cursor-pointer"
                        )}
                        onClick={() => setActiveProcess(process.id)}
                      >
                        <h4 className="font-bold mb-4 text-gray-900 text-lg">{TEXT_CONSTANTS.KEY_ACTIVITIES}</h4>
                        <ul className="space-y-3">
                          {process.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start group/item">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center mt-0.5 mr-3 group-hover/item:scale-110 transition-transform">
                                <Check className="w-4 h-4" />
                              </span>
                              {typeof step === 'object' && step.type === 'link' ? (
                                <span className="text-gray-700 text-base text-left leading-relaxed">
                                  {step.textBefore}
                                  <Link to={step.link.to} className="text-gray-900 hover:text-gray-700 underline font-semibold transition-colors">
                                    {step.link.label}
                                  </Link>
                                  {step.textAfter}
                                </span>
                              ) : (
                                <span className="text-gray-700 text-base text-left leading-relaxed">{step}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl my-12 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900">{TEXT_CONSTANTS.DEVELOPMENT_PRINCIPLE_TITLE}</h3>
                <ul className="space-y-4">
                  {TEXT_CONSTANTS.DEVELOPMENT_PRINCIPLES.map((principle, index) => (
                    <li key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group/item">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center mt-0.5 mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-gray-700 text-base leading-relaxed">{principle}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DevelopmentProcess;
