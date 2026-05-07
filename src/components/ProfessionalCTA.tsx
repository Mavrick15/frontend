import { motion } from "framer-motion";
import { Calendar, Phone, Mail, ArrowRight, Sparkles, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BENEFITS = [
  { icon: Clock, text: "Réponse sous 24h" },
  { icon: Shield, text: "Confidentialité garantie" },
  { icon: Sparkles, text: "Conseil personnalisé" },
];

const ProfessionalCTA = () => {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Consultation gratuite
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Prêt à transformer votre infrastructure IT ?
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Discutons de vos défis technologiques. Notre équipe d'experts vous accompagne dans la définition de la meilleure stratégie pour votre entreprise.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4 mb-10">
              {BENEFITS.map((benefit) => (
                <div key={benefit.text} className="flex items-center text-gray-300">
                  <benefit.icon className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-6 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all group"
              >
                <Link to="/contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Réserver un appel
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-2xl text-lg font-semibold backdrop-blur-sm"
              >
                <a href="https://wa.me/243812583947" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              {/* Consultant Preview */}
              <div className="flex items-center mb-8">
                <div className="flex -space-x-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white font-bold text-lg">
                    JM
                  </div>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-white flex items-center justify-center text-white font-bold text-lg">
                    JR
                  </div>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 border-2 border-white flex items-center justify-center text-white font-bold text-lg">
                    AB
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-white font-semibold">Experts certifiés</p>
                  <p className="text-gray-400 text-sm">À votre disposition</p>
                </div>
              </div>

              {/* What to expect */}
              <h3 className="text-xl font-bold text-white mb-4">Ce que vous allez obtenir :</h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Diagnostic gratuit de votre infrastructure",
                  "Roadmap personnalisée de transformation",
                  "Estimation budgétaire détaillée",
                  "Plan de mise en œuvre avec timeline",
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Contact Info */}
              <div className="border-t border-white/20 pt-6">
                <div className="flex items-center text-gray-300 mb-3">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-sm">+243 812 583 947</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-sm">contact@zetounlabs.cd</span>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Réponse rapide</p>
                  <p className="text-xs text-gray-500">Sous 24h ouvrées</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalCTA;
