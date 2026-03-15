import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Box, CheckCircle, Code, LifeBuoy, MessageSquare, MonitorCog, BrainCog, RefreshCcw, Rocket } from "lucide-react";
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from "@/components/ui/button";

const TEXT_CONSTANTS = {
  OUR_APPROACH_LABEL: "Notre méthodologie éprouvée en 3 phases",
  MAIN_HEADING: "Une approche structurée qui garantit votre succès",
  MAIN_DESCRIPTION: "Zetoun Labs transforme vos défis technologiques en avantages compétitifs grâce à une méthodologie rigoureuse : analyse stratégique approfondie, développement agile sur mesure et optimisation continue basée sur les données.",
  STEP_FLOW_ITEMS: [
    {
      icon: <BrainCog className="h-10 w-10 text-gray-700" />,
      title: "Audit stratégique & architecture",
      description: "Diagnostic approfondi de vos besoins avec cartographie complète de votre écosystème IT - Plan d'action chiffré livré en 48h.",
      hoverDetail: "Analyse 360° de votre infrastructure, benchmark concurrentiel et roadmap technologique personnalisée."
    },
    {
      icon: <MonitorCog className="h-10 w-10 text-gray-700" />,
      title: "Développement agile & déploiement",
      description: "Sprints de 2 semaines avec démos régulières - Déploiement progressif zero-downtime et tests automatisés à chaque étape.",
      hoverDetail: "CI/CD automatisé, tests unitaires 90%+ de couverture et déploiement blue-green pour zéro interruption."
    },
    {
      icon: <LifeBuoy className="h-10 w-10 text-gray-700" />,
      title: "Support proactif & évolution continue",
      description: "Monitoring 24/7 avec IA prédictive - Optimisation mensuelle des performances et mises à jour de sécurité automatiques.",
      hoverDetail: "Dashboard temps réel, rapports mensuels de performance et roadmap d'évolution trimestrielle."
    }
  ],
  ADAPTATION_HEADING: "Méthodologie Agile certifiée",
  INTERACTIVE_DEVELOPMENT_LABEL: "Développement itératif de précision",
  ADAPTATION_DESCRIPTION: "Chaque sprint livre de la valeur mesurable - Itérations rapides avec validation client intégrée pour un produit final parfaitement aligné sur vos objectifs.",
  SPRINT_PHASES: [
    { name: "Planification", icon: <CheckCircle className="h-4 w-4" /> },
    { name: "Développement", icon: <Code className="h-4 w-4" /> },
    { name: "Essais", icon: <Box className="h-4 w-4" /> },
    { name: "Examen", icon: <RefreshCcw className="h-4 w-4" /> }
  ],
  CUSTOMER_FEEDBACK_LABEL: "Feedback client intégré à chaque sprint pour une satisfaction garantie",
  CONTINUOUS_IMPROVEMENT_LABEL: "Amélioration continue basée sur les métriques",
  CONQUER_MARKET_HEADING: "Prêt pour le lancement",
  CONQUER_MARKET_DESCRIPTION: "Solution testée, validée et optimisée - Prête à dominer votre marché.",
};

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [progressValue, setProgressValue] = useState(0);
  const isMobile = useIsMobile();

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-in');
          (entry.target as HTMLElement).style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    if (featuresRef.current) {
      const elements = featuresRef.current.querySelectorAll('.feature-item');
      elements.forEach(el => {
        if (!el.classList.contains('animate-slide-in')) {
          (el as HTMLElement).style.opacity = '0';
          observer.observe(el);
        }
      });
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const animateProgress = () => {
      setProgressValue(0);
      interval = setInterval(() => {
        setProgressValue(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              animateProgress();
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    };

    animateProgress();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <>
      <section id="technology" className="bg-gradient-to-br from-white via-gray-50 to-gray-100 py-16 sm:py-20 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            <div className="relative z-10">
              <div className="inline-block mb-4 px-5 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold tracking-wide border border-white/30 shadow-md">
                {TEXT_CONSTANTS.OUR_APPROACH_LABEL}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">{TEXT_CONSTANTS.MAIN_HEADING}</h2>
              <p className="text-gray-200 max-w-4xl mx-auto text-lg md:text-xl leading-relaxed">
                {TEXT_CONSTANTS.MAIN_DESCRIPTION}
              </p>
            </div>
          </motion.div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 p-8 sm:p-10 lg:p-12 mb-10 transition-all duration-300 hover:shadow-3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {TEXT_CONSTANTS.STEP_FLOW_ITEMS.map((item) => (
                <HoverCard key={item.title} openDelay={100} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 h-full cursor-pointer flex flex-col items-center text-center hover:-translate-y-2 group">
                      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-full p-5 mb-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        {React.cloneElement(item.icon, { className: "h-10 w-10 text-white" })}
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-gray-700 transition-colors">{item.title}</h3>
                      <p className="text-sm text-gray-600 flex-grow leading-relaxed">{item.description}</p>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 shadow-2xl border-gray-200/50 bg-white/95 backdrop-blur-sm p-5 rounded-xl text-gray-700">
                    <div className="space-y-2">
                      <h4 className="text-base font-bold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-700">{item.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{item.hoverDetail}</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>

            <div className="relative h-16 mb-10 flex items-center justify-center">
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-300 to-gray-400"></div>
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full -mt-3">
                <div className="bg-gray-700 rounded-full p-1 shadow-md">
                  <ArrowRight className="w-5 h-5 text-white rotate-90" />
                </div>
              </div>

              <div className="md:hidden flex justify-center items-center h-full w-full">
                <div className="flex-grow h-0.5 bg-gray-300"></div>
                <div className="bg-gray-700 rounded-full p-1 mx-2 shadow-md">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <div className="flex-grow h-0.5 bg-gray-300"></div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-10 shadow-xl border border-gray-200/50">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                  <div className="flex items-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{TEXT_CONSTANTS.ADAPTATION_HEADING}</h3>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-sm mr-2 font-semibold">{TEXT_CONSTANTS.INTERACTIVE_DEVELOPMENT_LABEL}</span>
                    <RefreshCcw className="h-5 w-5 text-gray-700 animate-spin-slow" />
                  </div>
                </div>

                <p className="text-gray-700 mb-5 text-base leading-relaxed">{TEXT_CONSTANTS.ADAPTATION_DESCRIPTION}</p>

                <div className="relative mb-4">
                  <Progress value={progressValue} className="h-3 bg-gray-200 rounded-full" indicatorClassName="bg-gray-900" />
                </div>

                <div className={cn("grid gap-2 mt-6", isMobile ? "grid-cols-2 gap-y-3" : "grid-cols-4")}>
                  {TEXT_CONSTANTS.SPRINT_PHASES.map((phase, index) => (
                    <div key={phase.name} className={cn(
                      "text-center p-3 rounded-xl transition-all duration-300 border shadow-md",
                      progressValue >= (index / TEXT_CONSTANTS.SPRINT_PHASES.length) * 100 && progressValue < ((index + 1) / TEXT_CONSTANTS.SPRINT_PHASES.length) * 100
                        ? "bg-gray-900 border-gray-800 text-white shadow-lg"
                        : "bg-gray-50 border-gray-200 text-gray-700"
                    )}>
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "rounded-full p-2 mb-2",
                          progressValue >= (index / TEXT_CONSTANTS.SPRINT_PHASES.length) * 100
                            ? "bg-white text-gray-900"
                            : "bg-gray-100 text-gray-500"
                        )}>
                          {phase.icon}
                        </div>
                        <span className="text-sm font-semibold">{phase.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-3">
                  <div className="flex items-center">
                    <div className="bg-gray-900 rounded-full p-1.5 mr-2 shrink-0">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 font-semibold">{TEXT_CONSTANTS.CUSTOMER_FEEDBACK_LABEL}</span>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center mt-2 sm:mt-0">
                    <span className="mr-2 font-medium">{TEXT_CONSTANTS.CONTINUOUS_IMPROVEMENT_LABEL}</span>
                    <div className="flex space-x-1.5">
                      <span className="inline-block w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse-fast"></span>
                      <span className="inline-block w-2.5 h-2.5 bg-gray-500 rounded-full animate-pulse-fast animation-delay-200"></span>
                      <span className="inline-block w-2.5 h-2.5 bg-gray-600 rounded-full animate-pulse-fast animation-delay-400"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-16 mb-10 flex items-center justify-center">
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-300 to-gray-400"></div>
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full -mt-3">
                <div className="bg-gray-700 rounded-full p-1 shadow-md">
                  <ArrowRight className="w-5 h-5 text-white rotate-90" />
                </div>
              </div>

              <div className="md:hidden flex justify-center items-center h-full w-full">
                <div className="flex-grow h-0.5 bg-gray-300"></div>
                <div className="bg-gray-700 rounded-full p-1 mx-2 shadow-md">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <div className="flex-grow h-0.5 bg-gray-300"></div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 max-w-2xl mx-auto text-center shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-200/50 hover:-translate-y-1">
              <div className="relative inline-block mb-5">
                <div className="absolute inset-0 bg-gray-900/10 rounded-full animate-pulse-slow"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-full p-5 border border-gray-200 shadow-xl flex items-center justify-center">
                  <Rocket className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">{TEXT_CONSTANTS.CONQUER_MARKET_HEADING}</h3>
              <p className="text-gray-700 text-base leading-relaxed">{TEXT_CONSTANTS.CONQUER_MARKET_DESCRIPTION}</p>
              <div className="flex justify-center mt-5 space-x-2.5">
                <span className="inline-block w-3.5 h-3.5 rounded-full bg-gray-400 animate-pulse-fast"></span>
                <span className="inline-block w-3.5 h-3.5 bg-gray-600 animate-pulse-fast animation-delay-200"></span>
                <span className="inline-block w-3.5 h-3.5 bg-gray-800 animate-pulse-fast animation-delay-400"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
