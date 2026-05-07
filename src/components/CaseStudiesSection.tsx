import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Clock, DollarSign, Shield, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

const CASE_STUDIES = [
  {
    id: 1,
    client: "Banque Commerciale du Congo",
    industry: "Finance",
    title: "Infrastructure réseau haute disponibilité",
    description: "Migration complète de l'infrastructure réseau vers une architecture haute disponibilité avec redondance totale.",
    image: "/lovable-uploads/img/network-infrastructure.jpg",
    icon: Server,
    results: [
      { label: "Uptime", value: "99.99%", icon: Clock },
      { label: "ROI", value: "340%", icon: DollarSign },
      { label: "Latence", value: "-65%", icon: TrendingUp },
    ],
    tags: ["Réseau", "Cisco", "Sécurité"],
    color: "from-blue-600 to-blue-800",
  },
  {
    id: 2,
    client: "Ministère de la Digitalisation",
    industry: "Gouvernement",
    title: "Cybersécurité gouvernementale",
    description: "Audit complet et mise en place d'une stratégie de cybersécurité de niveau militaire pour protéger les données sensibles.",
    image: "/lovable-uploads/img/cybersecurity.jpg",
    icon: Shield,
    results: [
      { label: "Menaces bloquées", value: "12K+", icon: Shield },
      { label: "Temps de réponse", value: "<2min", icon: Clock },
      { label: "Satisfaction", value: "100%", icon: TrendingUp },
    ],
    tags: ["Cybersécurité", "Audit", "ISO 27001"],
    color: "from-emerald-600 to-emerald-800",
  },
  {
    id: 3,
    client: "Congo Telecom",
    industry: "Télécom",
    title: "Système de monitoring intelligent",
    description: "Déploiement d'une solution de monitoring proactif avec IA pour anticiper les pannes avant qu'elles n'affectent les clients.",
    image: "/lovable-uploads/img/monitoring.jpg",
    icon: TrendingUp,
    results: [
      { label: "Pannes évitées", value: "85%", icon: TrendingUp },
      { label: "Économie", value: "$2.4M", icon: DollarSign },
      { label: "MTTR", value: "-70%", icon: Clock },
    ],
    tags: ["Monitoring", "IA", "DevOps"],
    color: "from-violet-600 to-violet-800",
  },
];

const CaseStudiesSection = () => {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Études de cas
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Résultats concrets, impact mesurable
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez comment nous avons transformé les défis technologiques de nos clients en avantages compétitifs
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500"
            >
              {/* Top Color Bar */}
              <div className={`h-2 bg-gradient-to-r ${study.color}`} />
              
              {/* Content */}
              <div className="p-8">
                {/* Industry Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                    {study.industry}
                  </span>
                  <div className={`p-3 bg-gradient-to-br ${study.color} rounded-xl shadow-lg`}>
                    <study.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Client & Title */}
                <p className="text-sm text-gray-500 font-medium mb-2">{study.client}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {study.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {study.description}
                </p>

                {/* Results */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.results.map((result) => (
                    <div key={result.label} className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <result.icon className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-lg font-bold text-gray-900">{result.value}</span>
                      </div>
                      <span className="text-xs text-gray-500">{result.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  variant="ghost"
                  className="w-full group/btn hover:bg-gray-100"
                >
                  <span className="text-gray-700 group-hover/btn:text-gray-900 font-medium">
                    Voir l'étude complète
                  </span>
                  <ArrowUpRight className="w-4 h-4 ml-2 text-gray-400 group-hover/btn:text-gray-900 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">
            Vous aussi, transformez vos défis technologiques en succès
          </p>
          <Button
            size="lg"
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
          >
            Discuter de votre projet
            <ArrowUpRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
