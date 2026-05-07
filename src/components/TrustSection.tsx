import { motion } from "framer-motion";
import { Shield, Award, Clock, Users, CheckCircle2, Building2, Landmark, Factory, Briefcase, Server, Wifi, HardHat } from "lucide-react";

const TRUST_DATA = {
  badges: [
    { icon: Shield, label: "ISO 27001", description: "Certifié sécurité" },
    { icon: Award, label: "500+ Projets", description: "Livrés avec succès" },
    { icon: Clock, label: "99.9% Uptime", description: "Disponibilité garantie" },
    { icon: Users, label: "98% Satisfaction", description: "Clients satisfaits" },
  ],
  clients: [
    { name: "Banque Commerciale", icon: Landmark },
    { name: "Ministère Digital", icon: Building2 },
    { name: "TechStart RDC", icon: Briefcase },
    { name: "Congo Telecom", icon: Wifi },
    { name: "Kinshasa Business", icon: Factory },
    { name: "RDC Mining Corp", icon: HardHat },
  ],
  certifications: [
    "Cisco Partner",
    "Microsoft Certified",
    "AWS Solutions Architect",
    "CompTIA Security+",
    "ISO 27001 Lead Implementer",
  ],
};

const TrustSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold mb-4">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Ils nous font confiance
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Un partenaire IT de confiance pour les leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des entreprises de tailles variées comptent sur notre expertise pour leur transformation digitale
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {TRUST_DATA.badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <badge.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{badge.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{badge.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Client Logos - Scrolling Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 sm:p-12 mb-12 border border-gray-100 shadow-lg"
        >
          <h3 className="text-gray-900 text-center text-lg font-semibold mb-8">
            Ils nous font confiance
          </h3>
          
          {/* Scrolling Marquee Container */}
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            {/* Marquee */}
            <motion.div
              className="flex gap-12 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {/* Double the items for seamless loop */}
              {[...TRUST_DATA.clients, ...TRUST_DATA.clients].map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="flex flex-col items-center group cursor-pointer flex-shrink-0"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-2 border border-gray-200 group-hover:bg-gray-200 group-hover:border-gray-300 transition-all">
                    <client.icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <span className="text-xs text-gray-600 text-center group-hover:text-gray-900 transition-colors whitespace-nowrap">
                    {client.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {TRUST_DATA.certifications.map((cert, index) => (
            <motion.div
              key={cert}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <Award className="w-4 h-4 text-gray-700 mr-2" />
              <span className="text-sm font-medium text-gray-700">{cert}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
