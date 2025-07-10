import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, Network, Shield, Globe, Server, HeadsetIcon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from './ui/navigation-menu';

// Text Constants
const NAV_LINKS = {
  HOME: { text: "Accueil", path: "/" },
  ABOUT: { text: "À propos", path: "/about" },
  NEWS: { text: "Nouveautés", path: "/blog" },
  CONTACT_US: { text: "Contactez-nous", path: "/add/contact-nous" },
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
    },
    {
      title: "Administration sous Windows",
      description: "Formation Windows et gestion de serveurs",
      path: "/formations/windows-administration",
    },
    {
      title: "Administration Réseau",
      description: "Formation routage et switching CISCO",
      path: "/formations/network-administration",
    },
    {
      title: "Maintenance des Ordinateurs",
      description: "Formation dépannage matériel et logiciel",
      path: "/formations/computer-maintenance",
    },
    {
      title: "Virtualisation",
      description: "Formation aux technologies de virtualisation",
      path: "/formations/virtualization-training",
    },
    {
      title: "Voir plus...",
      description: "Explorer toutes nos formations",
      path: "/add/calendar-form",
    },
  ],
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isFormationsOpen, setIsFormationsOpen] = useState(false);

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
    // Close all sub-menus when the main menu is toggled
    setIsAchievementsOpen(false);
    setIsServicesOpen(false);
    setIsFormationsOpen(false);
  };

  const handleMobileNavLinkClick = () => {
    // Close all menus and scroll to top on mobile navigation link click
    setIsMenuOpen(false);
    setIsAchievementsOpen(false);
    setIsServicesOpen(false);
    setIsFormationsOpen(false);
    window.scrollTo(0, 0);
  };

  const linkClasses = (scrolled) => cn(
    navigationMenuTriggerStyle(),
    scrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800"
  );

  const mobileLinkClasses = (scrolled) => cn(
    "block px-3 py-2 rounded-md",
    scrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900"
  );

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled ? "bg-white shadow-sm" : "bg-black"
      )}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to={NAV_LINKS.HOME.path} className="flex items-center">
              <div className={cn("flex items-center")}>
                <img
                  src="/lovable-uploads/logo/Logo1.svg"
                  alt="ZetounLabs Logo"
                  className={cn(
                    "h-8 mr-2",
                    isScrolled ? "filter-none" : "filter invert"
                  )}
                />
                <span className={cn("text-xl font-bold", isScrolled ? "text-gray-800" : "text-white")}>
                  Zetoun Labs
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:block">
            <NavigationMenu className={cn(isScrolled ? "" : "text-white")}>
              <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to={NAV_LINKS.HOME.path} className={linkClasses(isScrolled)}>
                      {NAV_LINKS.HOME.text}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* About */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to={NAV_LINKS.ABOUT.path} className={linkClasses(isScrolled)}>
                      {NAV_LINKS.ABOUT.text}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Achievements */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={linkClasses(isScrolled)}>
                    {ACHIEVEMENTS_MENU.TITLE}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px]">
                      {ACHIEVEMENTS_MENU.ITEMS.map((item, index) => (
                        <li key={index}>
                          <NavigationMenuLink asChild className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                            <Link to={item.path}>
                              <div className="font-medium">{item.title}</div>
                              <p className="text-sm text-gray-500">{item.description}</p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Services */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={linkClasses(isScrolled)}>
                    {SERVICES_MENU.TITLE}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px]">
                      {SERVICES_MENU.ITEMS.map((item, index) => {
                        const Icon = item.icon; // Get the icon component
                        return (
                          <li key={index}>
                            <NavigationMenuLink asChild className="flex items-center p-3 space-x-3 rounded-md hover:bg-gray-100 transition-all">
                              <Link to={item.path} className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-800">
                                  <Icon size={20} />
                                </div>
                                <div>
                                  <div className="font-medium">{item.title}</div>
                                  <p className="text-sm text-gray-700">{item.description}</p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Formations */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={linkClasses(isScrolled)}>
                    {FORMATIONS_MENU.TITLE}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px]">
                      {FORMATIONS_MENU.ITEMS.map((item, index) => (
                        <li key={index}>
                          <NavigationMenuLink asChild className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                            <Link to={item.path}>
                              <div className="font-medium">{item.title}</div>
                              <p className="text-sm text-gray-500">{item.description}</p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* News */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to={NAV_LINKS.NEWS.path} className={linkClasses(isScrolled)}>
                      {NAV_LINKS.NEWS.text}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
              <div className={cn("h-6 w-px mx-4", isScrolled ? "bg-gray-300" : "bg-gray-600")}></div>
              <div className="flex items-center "> <UserMenu /> </div>
            </NavigationMenu>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className={cn("focus:outline-none", isScrolled ? "text-gray-700" : "text-white")}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn("md:hidden transition-all duration-300 overflow-hidden w-full", isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")}>
        <div className={cn("px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-sm", isScrolled ? "bg-white" : "bg-black")}>
          {/* Home Mobile */}
          <Link to={NAV_LINKS.HOME.path} className={mobileLinkClasses(isScrolled)} onClick={handleMobileNavLinkClick}>
            {NAV_LINKS.HOME.text}
          </Link>

          {/* About Mobile */}
          <Link to={NAV_LINKS.ABOUT.path} className={mobileLinkClasses(isScrolled)} onClick={handleMobileNavLinkClick}>
            {NAV_LINKS.ABOUT.text}
          </Link>

          {/* Achievements Mobile */}
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

          {/* Services Mobile */}
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

          {/* Formations Mobile */}
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

          {/* News Mobile */}
          <Link to={NAV_LINKS.NEWS.path} className={mobileLinkClasses(isScrolled)} onClick={handleMobileNavLinkClick}>
            {NAV_LINKS.NEWS.text}
          </Link>

          {/* Contact Us Mobile */}
          <Link to={NAV_LINKS.CONTACT_US.path} className={cn("block w-full text-center px-3 py-2 rounded-md", isScrolled ? "text-gray-900 bg-gray-200 hover:bg-gray-300" : "text-white bg-gray-700 hover:bg-gray-600")} onClick={handleMobileNavLinkClick}>
            {NAV_LINKS.CONTACT_US.text}
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
