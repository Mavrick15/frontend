import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, Network, Shield, Globe, Server, HeadsetIcon, Sun, ShoppingCart, Sparkles, Terminal, Monitor, Wrench, Box, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from './ui/navigation-menu';
import { useCart } from '@/hooks/CartContext';

const NAV_LINKS = {
  HOME: { text: "Accueil", path: "/" },
  ABOUT: { text: "À propos", path: "/about" },
  NEWS: { text: "Nouveautés", path: "/blog" },
  CONTACT_US: { text: "Contactez-nous", path: "/add/contact-nous" },
  CART: { text: "Panier", path: "/cart" },
};

const ACHIEVEMENTS_MENU = {
  TITLE: "Réalisations",
  ITEMS: [
    {
      title: "Police judiciaire",
      description: "Réhabilitation de l’infrastructure IT",
      path: "/projects/realisations/police-judiciaire",
    },
    {
      title: "Centre de Diagnostic EYANO",
      description: "Renforcement et extension du système de sécurité",
      path: "/projects/realisations/eyano-security",
    },
    {
      title: "Credit Shop Africa",
      description: "Installation d'un nouveau système de vidéosurveillance",
      path: "/projects/realisations/credit-shop-africa",
    },
    {
      title: "Processus de déploiement",
      description: "Notre approche pour créer des solutions IT sur mesure",
      path: "/development-process",
    },
  ],
};

const SERVICES_MENU = {
  TITLE: "Services",
  ITEMS: [
    {
      title: "Ingénierie Réseau",
      description: "Conception & installation réseau",
      path: "/services/network-engineering",
      icon: Network,
    },
    {
      title: "Vidéosurveillance & Sécurité",
      description: "Installations de vidéosurveillance adaptées",
      path: "/services/video-surveillance",
      icon: Shield,
    },
    {
      title: "Conception Web",
      description: "Solutions web taillées pour votre activité",
      path: "/services/web-development",
      icon: Globe,
    },
    {
      title: "Infogérance",
      description: "Supervision et maintenance IT",
      path: "/services/it-management",
      icon: Server,
    },
    {
      title: "Installation solaire",
      description: "Conception et installation de systèmes solaires",
      path: "/services/solar-installation",
      icon: Sun,
    },
    {
      title: "Support Technique",
      description: "Assistance technique réactive",
      path: "/services/technical-support",
      icon: HeadsetIcon,
    },
  ],
};

const FORMATIONS_MENU = {
  TITLE: "Formations",
  ITEMS: [
    {
      title: "Administration sous Linux",
      description: "Formation Linux et gestion de serveurs",
      path: "/formations/linux-administration",
      icon: Terminal,
    },
    {
      title: "Administration sous Windows",
      description: "Formation Windows et gestion de serveurs",
      path: "/formations/windows-administration",
      icon: Monitor,
    },
    {
      title: "Administration Réseau",
      description: "Formation routage et switching CISCO",
      path: "/formations/network-administration",
      icon: Network,
    },
    {
      title: "Maintenance des Ordinateurs",
      description: "Formation dépannage matériel et logiciel",
      path: "/formations/computer-maintenance",
      icon: Wrench,
    },
    {
      title: "Virtualisation",
      description: "Formation aux technologies de virtualisation",
      path: "/formations/virtualization-training",
      icon: Box,
    },
    {
      title: "Voir plus...",
      description: "Explorer toutes nos formations",
      path: "/add/calendar-form",
      icon: ArrowRight,
    },
  ],
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isFormationsOpen, setIsFormationsOpen] = useState(false);

  const { cartItems } = useCart();
  const cartItemCount = cartItems.length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsAchievementsOpen(false);
    setIsServicesOpen(false);
    setIsFormationsOpen(false);
  };

  const handleMobileNavLinkClick = () => {
    setIsMenuOpen(false);
    setIsAchievementsOpen(false);
    setIsServicesOpen(false);
    setIsFormationsOpen(false);
    window.scrollTo(0, 0);
  };

  const linkClasses = (scrolled: boolean) => cn(
    navigationMenuTriggerStyle(),
    "font-semibold transition-all duration-300",
    scrolled 
      ? "text-gray-700 hover:text-gray-900 hover:bg-white/80 backdrop-blur-sm" 
      : "text-gray-100 hover:text-white bg-transparent hover:bg-white/10 backdrop-blur-sm"
  );

  const mobileLinkClasses = (scrolled: boolean) => cn(
    "block px-3 py-2 rounded-md font-medium transition-all duration-300",
    scrolled ? "text-gray-700 hover:bg-white/80 backdrop-blur-sm" : "text-gray-200 hover:bg-white/10 backdrop-blur-sm"
  );

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-xl border-b border-gray-200/50" 
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to={NAV_LINKS.HOME.path} className="flex items-center group">
              <motion.div 
                className={cn("flex items-center")}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className={cn(
                  "h-10 w-10 mr-3 rounded-xl p-2 transition-all duration-300",
                  isScrolled 
                    ? "bg-gray-900 group-hover:bg-gray-800" 
                    : "bg-white/10 backdrop-blur-sm group-hover:bg-white/20"
                )}>
                  <img
                    src={isScrolled ? "/lovable-uploads/logo/Logo2.png" : "/lovable-uploads/logo/Logo1.svg"}
                    alt="ZetounLabs Logo"
                    className={cn(
                      "h-full w-full transition-all duration-300 object-contain",
                      !isScrolled && "filter invert"
                    )}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-xl font-bold transition-colors duration-300",
                    isScrolled ? "text-gray-900" : "text-white"
                  )}>
                    Zetoun Labs
                  </span>
                  {!isScrolled && (
                    <Sparkles className="h-4 w-4 text-white opacity-70 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </motion.div>
            </Link>
          </div>

          <div className="hidden md:block">
            <NavigationMenu className={cn(isScrolled ? "" : "text-white")}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to={NAV_LINKS.HOME.path} className={linkClasses(isScrolled)}>
                      {NAV_LINKS.HOME.text}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to={NAV_LINKS.ABOUT.path} className={linkClasses(isScrolled)}>
                      {NAV_LINKS.ABOUT.text}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={linkClasses(isScrolled)}>
                    {ACHIEVEMENTS_MENU.TITLE}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.ul 
                      className="grid gap-3 p-4 w-[400px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {ACHIEVEMENTS_MENU.ITEMS.map((item, index) => (
                        <motion.li 
                          key={index}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <NavigationMenuLink asChild className="block p-4 space-y-1 rounded-xl hover:bg-gray-50/80 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-gray-200/50">
                            <Link to={item.path}>
                              <div className="font-bold text-gray-900">{item.title}</div>
                              <p className="text-sm text-gray-600">{item.description}</p>
                            </Link>
                          </NavigationMenuLink>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={linkClasses(isScrolled)}>
                    {SERVICES_MENU.TITLE}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.ul 
                      className="grid gap-3 p-4 w-[400px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {SERVICES_MENU.ITEMS.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.li 
                            key={index}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <NavigationMenuLink asChild className="flex items-center p-4 space-x-3 rounded-xl hover:bg-gray-50/80 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-gray-200/50 group">
                              <Link to={item.path} className="flex items-center space-x-3 w-full">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                  <Icon size={20} />
                                </div>
                                <div className="flex-1">
                                  <div className="font-bold text-gray-900">{item.title}</div>
                                  <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={linkClasses(isScrolled)}>
                    {FORMATIONS_MENU.TITLE}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.ul 
                      className="grid gap-3 p-4 w-[400px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {FORMATIONS_MENU.ITEMS.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.li 
                            key={index}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <NavigationMenuLink asChild className="flex items-center p-4 space-x-3 rounded-xl hover:bg-gray-50/80 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-gray-200/50 group">
                              <Link to={item.path} className="flex items-center space-x-3 w-full">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                  <Icon size={20} />
                                </div>
                                <div className="flex-1">
                                  <div className="font-bold text-gray-900">{item.title}</div>
                                  <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to={NAV_LINKS.NEWS.path} className={linkClasses(isScrolled)}>
                      {NAV_LINKS.NEWS.text}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link to={NAV_LINKS.CART.path} className={cn(linkClasses(isScrolled), "relative p-2 rounded-xl")}>
                        <ShoppingCart size={20} />
                        {cartItemCount > 0 && (
                          <motion.span 
                            className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[0.6rem] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-lg"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            {cartItemCount}
                          </motion.span>
                        )}
                      </Link>
                    </motion.div>
                  </NavigationMenuLink>
                </NavigationMenuItem>

              </NavigationMenuList>
              <div className={cn("h-6 w-px mx-4", isScrolled ? "bg-gray-300" : "bg-gray-600/50")}></div>
              <div className="flex items-center"> <UserMenu /> </div>
            </NavigationMenu>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={NAV_LINKS.CART.path} className={cn(
                isScrolled ? "text-gray-700" : "text-white", 
                "relative p-2 rounded-xl transition-all duration-300",
                isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
              )}>
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <motion.span 
                    className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[0.6rem] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>
            <motion.button 
              onClick={toggleMenu} 
              className={cn(
                "focus:outline-none p-2 rounded-xl transition-all duration-300",
                isScrolled 
                  ? "text-gray-700 hover:bg-gray-100" 
                  : "text-white hover:bg-white/10"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div 
        className={cn("md:hidden transition-all duration-300 overflow-hidden w-full", isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")}
        initial={false}
        animate={{ 
          maxHeight: isMenuOpen ? "500px" : "0px",
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className={cn(
          "px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-xl border-t",
          isScrolled 
            ? "bg-white/95 backdrop-blur-md border-gray-200/50" 
            : "bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700/50"
        )}>
          <Link to={NAV_LINKS.HOME.path} className={mobileLinkClasses(isScrolled)} onClick={handleMobileNavLinkClick}>
            {NAV_LINKS.HOME.text}
          </Link>

          <Link to={NAV_LINKS.ABOUT.path} className={mobileLinkClasses(isScrolled)} onClick={handleMobileNavLinkClick}>
            {NAV_LINKS.ABOUT.text}
          </Link>

          <div className="block">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsAchievementsOpen(!isAchievementsOpen);
                setIsServicesOpen(false);
                setIsFormationsOpen(false);
              }}
              className={cn("flex w-full justify-between items-center px-3 py-2 rounded-md", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")}
            >
              <span>{ACHIEVEMENTS_MENU.TITLE}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", isAchievementsOpen ? "rotate-180" : "")} />
            </button>
            <div className={cn("ml-4 mt-1 space-y-1", isAchievementsOpen ? "block" : "hidden")}>
              {ACHIEVEMENTS_MENU.ITEMS.map((item, index) => (
                <Link key={index} to={item.path} className={mobileLinkClasses(isScrolled)} onClick={handleMobileNavLinkClick}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="block">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsServicesOpen(!isServicesOpen);
                setIsAchievementsOpen(false);
                setIsFormationsOpen(false);
              }}
              className={cn("flex w-full justify-between items-center px-3 py-2 rounded-md", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")}
            >
              <span>{SERVICES_MENU.TITLE}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", isServicesOpen ? "rotate-180" : "")} />
            </button>
            <div className={cn("ml-4 mt-1 space-y-1", isServicesOpen ? "block" : "hidden")}>
              {SERVICES_MENU.ITEMS.map((item, index) => (
                <Link key={index} to={item.path} className={mobileLinkClasses(isScrolled)} onClick={handleMobileNavLinkClick}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="block">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsFormationsOpen(!isFormationsOpen);
                setIsAchievementsOpen(false);
                setIsServicesOpen(false);
              }}
              className={cn("flex w-full justify-between items-center px-3 py-2 rounded-md", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")}
            >
              <span>{FORMATIONS_MENU.TITLE}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", isFormationsOpen ? "rotate-180" : "")} />
            </button>
            <div className={cn("ml-4 mt-1 space-y-1", isFormationsOpen ? "block" : "hidden")}>
              {FORMATIONS_MENU.ITEMS.map((item, index) => (
                <Link key={index} to={item.path} className={mobileLinkClasses(isScrolled)} onClick={handleMobileNavLinkClick}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <Link to={NAV_LINKS.NEWS.path} className={mobileLinkClasses(isScrolled)} onClick={handleMobileNavLinkClick}>
            {NAV_LINKS.NEWS.text}
          </Link>

          <Link to={NAV_LINKS.CART.path} className={cn(mobileLinkClasses(isScrolled), "flex items-center")} onClick={handleMobileNavLinkClick}>
            <ShoppingCart size={20} className="mr-2" />
            {NAV_LINKS.CART.text}
            {cartItemCount > 0 && (
              <span className="ml-2 bg-red-500 text-[0.6rem] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              to={NAV_LINKS.CONTACT_US.path} 
              className={cn(
                "block w-full text-center px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg",
                isScrolled 
                  ? "text-white bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700" 
                  : "text-gray-900 bg-white/90 backdrop-blur-sm hover:bg-white"
              )} 
              onClick={handleMobileNavLinkClick}
            >
              {NAV_LINKS.CONTACT_US.text}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
