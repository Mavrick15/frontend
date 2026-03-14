import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Home, 
  Briefcase, 
  GraduationCap, 
  Phone, 
  ShoppingCart,
  User,
  Search,
  Heart,
  Settings,
  LogOut,
  ArrowRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  cartItemCount?: number;
  userName?: string;
}

const MobileOptimizedNav: React.FC<MobileNavProps> = ({
  isOpen,
  onToggle,
  cartItemCount = 0,
  userName
}) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navSections = [
    {
      id: 'services',
      title: 'Services',
      icon: Briefcase,
      items: [
        { title: 'Ingénierie Réseau', path: '/services/network-engineering' },
        { title: 'Vidéosurveillance', path: '/services/video-surveillance' },
        { title: 'Développement Web', path: '/services/web-development' },
        { title: 'Infogérance', path: '/services/it-management' },
        { title: 'Support Technique', path: '/services/technical-support' },
        { title: 'Installation Solaire', path: '/services/solar-installation' }
      ]
    },
    {
      id: 'formations',
      title: 'Formations',
      icon: GraduationCap,
      items: [
        { title: 'Administration Linux', path: '/formations/linux-administration' },
        { title: 'Administration Windows', path: '/formations/windows-administration' },
        { title: 'Administration Réseau', path: '/formations/network-administration' },
        { title: 'Maintenance PC', path: '/formations/computer-maintenance' },
        { title: 'Virtualisation', path: '/formations/virtualization-training' }
      ]
    }
  ];

  const quickActions = [
    { icon: Home, title: 'Accueil', path: '/' },
    { icon: Phone, title: 'Contact', path: '/add/contact-nous' },
    { icon: Heart, title: 'Favoris', path: '/favorites' },
    { icon: Settings, title: 'Paramètres', path: '/settings' }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    // Close expanded section when route changes
    setExpandedSection(null);
  }, [location]);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const slideVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 md:hidden overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src="/lovable-uploads/logo/Logo2.png"
                    alt="Zetoun Labs"
                    className="w-10 h-10"
                  />
                  <div>
                    <h2 className="text-lg font-bold">Zetoun Labs</h2>
                    {userName && <p className="text-sm opacity-90">Bonjour {userName}</p>}
                  </div>
                </div>
                <button
                  onClick={onToggle}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative">
                <div className={`flex items-center bg-white/20 backdrop-blur-sm rounded-lg transition-all duration-300 ${
                  isSearchFocused ? 'bg-white/30' : ''
                }`}>
                  <Search className="w-5 h-5 text-white/70 ml-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Rechercher..."
                    className="flex-1 bg-transparent text-white placeholder-white/70 px-3 py-2 outline-none"
                  />
                </div>
              </form>
            </div>

            {/* Navigation Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
              {/* Quick Actions */}
              <div className="p-4">
                <div className="grid grid-cols-4 gap-3">
                  {quickActions.map((action, index) => (
                    <Link
                      key={index}
                      to={action.path}
                      onClick={onToggle}
                      className="flex flex-col items-center p-3 bg-white rounded-xl hover:bg-blue-50 transition-colors group"
                    >
                      <action.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 mb-1" />
                      <span className="text-xs text-gray-600 group-hover:text-blue-600">{action.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Navigation Sections */}
              <div className="px-4 pb-4 space-y-2">
                {navSections.map((section) => (
                  <div key={section.id} className="bg-white rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <section.icon className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">{section.title}</span>
                      </div>
                      {expandedSection === section.id ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedSection === section.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-1">
                            {section.items.map((item, index) => (
                              <Link
                                key={index}
                                to={item.path}
                                onClick={onToggle}
                                className="flex items-center justify-between p-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
                              >
                                <span className="text-sm">{item.title}</span>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* User Section */}
              {userName ? (
                <div className="p-4 border-t border-gray-200">
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{userName}</p>
                        <p className="text-sm text-gray-500">Client</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link
                        to="/profile"
                        onClick={onToggle}
                        className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm">Mon profil</span>
                      </Link>
                      <Link
                        to="/orders"
                        onClick={onToggle}
                        className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="text-sm">Mes commandes</span>
                      </Link>
                      <button className="flex items-center space-x-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full">
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Déconnexion</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 border-t border-gray-200">
                  <Link
                    to="/login"
                    onClick={onToggle}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Se connecter</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Bottom Bar */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <Link
                  to="/cart"
                  onClick={onToggle}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm">Panier</span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/add/contact-nous"
                  onClick={onToggle}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">Contact</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileOptimizedNav;
