import { MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from 'react-router-dom'; // Importer useLocation

const FloatingContactButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation(); // Obtenir l'objet de localisation actuel

  // Vérifier si le bouton doit être masqué sur la page CalendarForm
  // La route est maintenant vérifiée pour '/add/calendar-form'
  const isCalendarFormPage = location.pathname === '/add/calendar-form';

  // Afficher le bouton après un certain défilement, sauf sur la page CalendarForm
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  // Ne pas rendre le bouton s'il n'est pas visible OU si nous sommes sur la page CalendarForm
  if (!isVisible || isCalendarFormPage) return null;

  return (
    <Button
      onClick={scrollToContact}
      className="fixed bottom-6 right-6 z-50 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
      size="icon"
      aria-label="Contact Us"
    >
      <MessageSquare className="h-6 w-6" />
    </Button>
  );
};

export default FloatingContactButton;
