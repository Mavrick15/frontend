import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Globe,
  Shield,
  Users,
  Award
} from 'lucide-react';

const ProfessionalFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { text: 'Ingénierie Réseau', path: '/services/network-engineering' },
        { text: 'Vidéosurveillance', path: '/services/video-surveillance' },
        { text: 'Développement Web', path: '/services/web-development' },
        { text: 'Infogérance IT', path: '/services/it-management' },
        { text: 'Support Technique', path: '/services/technical-support' },
        { text: 'Installation Solaire', path: '/services/solar-installation' }
      ]
    },
    {
      title: 'Formations',
      links: [
        { text: 'Administration Linux', path: '/formations/linux-administration' },
        { text: 'Administration Windows', path: '/formations/windows-administration' },
        { text: 'Administration Réseau', path: '/formations/network-administration' },
        { text: 'Maintenance PC', path: '/formations/computer-maintenance' },
        { text: 'Virtualisation', path: '/formations/virtualization-training' }
      ]
    },
    {
      title: 'Entreprise',
      links: [
        { text: 'À Propos', path: '/about' },
        { text: 'Réalisations', path: '/projects/realisations/police-judiciaire' },
        { text: 'Blog', path: '/blog' },
        { text: 'Contact', path: '/add/contact-nous' },
        { text: 'Carrières', path: '/add/calendar-form' }
      ]
    },
    {
      title: 'Légal',
      links: [
        { text: 'Politique de Confidentialité', path: '/privacy-policy' },
        { text: 'Mentions Légales', path: '/legal' },
        { text: 'CGV', path: '/cgv' },
        { text: 'Cookies', path: '/cookies' }
      ]
    }
  ];

  const certifications = [
    { icon: Shield, text: 'Certifié ISO 27001' },
    { icon: Users, text: 'Membre AFRIKICOM' },
    { icon: Award, text: 'Partenaire Microsoft' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Company Info */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <div className="mb-6">
                <img
                  src="/lovable-uploads/logo/Logo2.png"
                  alt="Zetoun Labs"
                  className="h-12 w-auto mb-4"
                />
                <p className="text-gray-300 leading-relaxed mb-6">
                  Expert en solutions IT complètes à Kinshasa. Nous accompagnons votre transformation digitale avec des services sur mesure, des formations certifiantes et un support technique exceptionnel.
                </p>
                
                {/* Certifications */}
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-300">
                      <cert.icon className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{cert.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div key={sectionIndex} variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-4 text-blue-400">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Contact Bar */}
        <motion.div
          className="border-t border-gray-700 py-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div className="flex items-center space-x-3" variants={itemVariants}>
              <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="font-semibold">Adresse</p>
                <p className="text-sm text-gray-300">Kinshasa, RDC</p>
              </div>
            </motion.div>

            <motion.div className="flex items-center space-x-3" variants={itemVariants}>
              <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="font-semibold">Téléphone</p>
                <p className="text-sm text-gray-300">+243 XXX XXX XXX</p>
              </div>
            </motion.div>

            <motion.div className="flex items-center space-x-3" variants={itemVariants}>
              <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm text-gray-300">contact@zetounlabs.cd</p>
              </div>
            </motion.div>

            <motion.div className="flex items-center space-x-3" variants={itemVariants}>
              <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="font-semibold">Horaires</p>
                <p className="text-sm text-gray-300">Lun-Ven: 8h-18h</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} Zetoun Labs. Tous droits réservés.
              </p>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>RDC - Kinshasa</span>
              </div>
              <span>|</span>
              <span>Fait avec ❤️ à Kinshasa</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;
