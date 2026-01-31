import { Skeleton } from "@/components/ui/skeleton";
import { ENDPOINTS } from "@/config/api.config";
import type { Statistic, StatisticsResponse } from "@/types/api";
import { getNetworkErrorMessage, parseApiResponse } from "@/utils/apiMessages";
import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Calendar,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const TEXT_CONSTANTS = {
  TITLE: "Zetoun Labs en Chiffres",
  SUBTITLE: "Notre expertise au service de votre réussite",
  LOADING: "Chargement des statistiques...",
  ERROR: "Erreur lors du chargement des statistiques",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  clients: Users,
  projets: Briefcase,
  formations: GraduationCap,
  certifications: Award,
  experience: Calendar,
  autre: TrendingUp,
};

const Statistics = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(ENDPOINTS.STATISTICS.LIST);
      const { ok, data, errorMessage } = await parseApiResponse(response);

      if (!ok) {
        setError(errorMessage || TEXT_CONSTANTS.ERROR);
        return;
      }

      const res = data as StatisticsResponse;
      setStatistics(res.statistics || []);
    } catch (err) {
      console.error("Erreur:", err);
      setError(err instanceof Error ? err.message : getNetworkErrorMessage());
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-72 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200/50"
              >
                <Skeleton className="w-16 h-16 rounded-xl mx-auto mb-4" />
                <div className="space-y-2 text-center">
                  <Skeleton className="h-10 w-24 mx-auto" />
                  <Skeleton className="h-5 w-32 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || statistics.length === 0) {
    return null; // Ne rien afficher si erreur ou pas de statistiques
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="text-center mb-12">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              {TEXT_CONSTANTS.TITLE}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              {TEXT_CONSTANTS.SUBTITLE}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {statistics.map((stat) => {
              const IconComponent = iconMap[stat.category] || TrendingUp;
              return (
                <motion.div
                  key={stat._id}
                  variants={itemVariants}
                  className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 hover:-translate-y-2 group"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {stat.value.toLocaleString()}
                      {stat.unit && (
                        <span className="text-xl text-gray-600 ml-1">
                          {stat.unit}
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-700 font-bold mb-1 text-base">
                      {stat.label}
                    </p>
                    {stat.description && (
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {stat.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
