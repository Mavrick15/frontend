import { motion } from "framer-motion";
import { 
  Code2, 
  Shield, 
  Network, 
  Sun, 
  GraduationCap, 
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    id: "dev-web",
    icon: Code2,
    title: "Développement Web & Mobile",
    subtitle: "Applications sur mesure",
    description: "Solutions web et mobiles scalables avec les technologies les plus récentes. React, Node.js, cloud-native.",
    features: ["Applications React/Next.js", "APIs REST & GraphQL", "Apps Mobile React Native", "Architecture Cloud"],
    link: "/services/web-development",
  },
  {
    id: "cybersecurite",
    icon: Shield,
    title: "Cybersécurité & Vidéosurveillance",
    subtitle: "Protection avancée",
    description: "Audit de sécurité, pentesting, vidéosurveillance HD et stratégies de sécurité de niveau entreprise.",
    features: ["Audit de sécurité", "Caméras HD", "Détection mouvement", "Contrôle accès"],
    link: "/services/video-surveillance",
  },
  {
    id: "reseau",
    icon: Network,
    title: "Ingénierie Réseau",
    subtitle: "Infrastructure haute performance",
    description: "Conception et déploiement d'infrastructures réseau 10Gb+ avec redondance et haute disponibilité.",
    features: ["Design réseau 10Gb+", "Cisco & Huawei", "SD-WAN", "Datacenter"],
    link: "/services/network-engineering",
  },
  {
    id: "solaire",
    icon: Sun,
    title: "Énergie Solaire",
    subtitle: "Solutions durables",
    description: "Installation de systèmes solaires pour data centers et entreprises. Autonomie énergétique garantie.",
    features: ["Installations 10-100kW", "Batteries lithium", "Monitoring IoT", "ROI optimisé"],
    link: "/services/solar-installation",
  },
  {
    id: "formation",
    icon: GraduationCap,
    title: "Formations Certifiantes",
    subtitle: "Montée en compétences",
    description: "Programmes de formation professionnels avec certification reconnue internationalement.",
    features: ["Cisco CCNA/CCNP", "AWS/Azure", "Cybersécurité", "DevOps"],
    link: "/formations",
  },
  {
    id: "support",
    icon: HeadphonesIcon,
    title: "Support IT & Infogérance",
    subtitle: "Assistance permanente",
    description: "Support technique réactif avec SLA garanti et infogérance IT. Résolution 95% des incidents dès le premier contact.",
    features: ["Hotline 24/7", "SLA garanti", "Monitoring IA", "Supervision 24/7"],
    link: "/services/technical-support",
  },
];

const ServicesShowcase = () => {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold mb-4">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Notre expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Services IT d'excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une gamme complète de services pour accompagner votre transformation digitale de A à Z
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="relative">
                <p className="text-sm font-semibold text-gray-500 mb-1">{service.subtitle}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link
                  to={service.link}
                  className="inline-flex items-center text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors group/link"
                >
                  En savoir plus
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                </Link>
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
          <p className="text-gray-600 mb-6">
            Besoin d'une solution personnalisée ? Nous adaptons nos services à vos besoins spécifiques.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
          >
            <Link to="/add/contact-nous">
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
