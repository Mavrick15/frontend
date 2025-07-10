import { ArrowRight, Linkedin, Mail, Phone, MapPin, Facebook, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const TEXT_CONSTANTS = {
  COMPANY_NAME: "Zetoun Labs",
  COMPANY_DESCRIPTION: "Zetoun Labs est une plateforme tout-en-un pour le développement et le déploiement de solutions informatiques intelligentes, offrant à ses clients une maîtrise totale de leurs outils tout en assurant la prise en charge complète du développement technologique.",
  COMPANY_LINKS_HEADING: "Company",
  ABOUT_US: "À propos de nous",
  CAREERS: "Parcours professionnel",
  PRIVACY_POLICY: "Politique de confidentialité",
  CONTACT_US_HEADING: "Contactez-nous",
  ADDRESS_LINE_1: "6284 1st Street",
  ADDRESS_LINE_2: "Matete, Kinshasa DRCongo",
  EMAIL_ADDRESS: "zetouncontacts@gmail.com",
  PHONE_NUMBER: "+243 812 583 947",
  LINKEDIN_URL: "https://www.linkedin.com/company/zetounlabs/",
  WHATSAPP_URL: "https://wa.me/243812583947",
  FACEBOOK_URL: "https://www.facebook.com/Xeboulon.baki",
  COPYRIGHT_TEXT: (year: number) => `© ${year} Zetoun Labs inc. Tous droits réservés.`,
  LOGO_ALT_TEXT: "Zetoun Labs Logo",
  LOGO_PLACEHOLDER_ALT_TEXT: "ZetounLabs Logo Placeholder",
  PLACEHOLDER_LOGO_URL: "https://placehold.co/48x48/000000/FFFFFF?text=ZL",
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-black text-white pt-16 pb-8 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-700">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 mr-2">
                <img
                  src="/lovable-uploads/logo/Logo2.png"
                  alt={TEXT_CONSTANTS.LOGO_ALT_TEXT}
                  className="h-full w-full object-contain"
                  onError={(e) => { // Fallback for image loading error
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_LOGO_URL; // Placeholder image
                    e.currentTarget.alt = TEXT_CONSTANTS.LOGO_PLACEHOLDER_ALT_TEXT;
                  }}
                />
              </div>
              <span className="text-2xl font-bold text-white">{TEXT_CONSTANTS.COMPANY_NAME}</span>
            </div>
            <p className="text-gray-300 mb-6">
              {TEXT_CONSTANTS.COMPANY_DESCRIPTION}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">{TEXT_CONSTANTS.COMPANY_LINKS_HEADING}</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">{TEXT_CONSTANTS.ABOUT_US}</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition-colors">{TEXT_CONSTANTS.CAREERS}</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">{TEXT_CONSTANTS.PRIVACY_POLICY}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">{TEXT_CONSTANTS.CONTACT_US_HEADING}</h3>
            <div className="space-y-4">
              {/* Physical Address */}
              <div className="flex items-start text-gray-300">
                <MapPin size={20} className="mr-3 mt-1 flex-shrink-0" />
                <span>
                  {TEXT_CONSTANTS.ADDRESS_LINE_1}<br />
                  {TEXT_CONSTANTS.ADDRESS_LINE_2}
                </span>
              </div>

              {/* Email Address */}
              <div className="flex items-center text-gray-300">
                <Mail size={20} className="mr-3 flex-shrink-0" />
                <a href={`mailto:${TEXT_CONSTANTS.EMAIL_ADDRESS}`} className="hover:text-white transition-colors">{TEXT_CONSTANTS.EMAIL_ADDRESS}</a>
              </div>

              {/* Phone Number */}
              <div className="flex items-center text-gray-300">
                <Phone size={20} className="mr-3 flex-shrink-0" />
                <a href={`tel:${TEXT_CONSTANTS.PHONE_NUMBER.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{TEXT_CONSTANTS.PHONE_NUMBER}</a>
              </div>

              {/* Social Media Accounts */}
              <div className="flex space-x-4 pt-2">
                {/* LinkedIn */}
                <a
                  href={TEXT_CONSTANTS.LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                {/* WhatsApp */}
                <a
                  href={TEXT_CONSTANTS.WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={20} />
                </a>
                {/* Facebook */}
                <a
                  href={TEXT_CONSTANTS.FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            {TEXT_CONSTANTS.COPYRIGHT_TEXT(new Date().getFullYear())}
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">{TEXT_CONSTANTS.PRIVACY_POLICY}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
