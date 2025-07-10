import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from './CartContext';

const SCROLL_THRESHOLD = 100;

const CART_BUTTON_SIZE_CLASSES = "w-16 h-12";
const CART_BUTTON_COLORS = "bg-gradient-to-br from-black to-gray-800 text-white";
const CART_BADGE_COLORS = "bg-white/90 text-black border-2 border-black/50";

const MODAL_BORDER_COLOR_SOFTER = "border-gray-200";
const MODAL_BG_COLOR_HEADER_FOOTER = "bg-gray-50";
const MODAL_MAIN_BG_COLOR = "bg-white";
const MODAL_CLOSE_BUTTON_COLORS = "text-gray-500 hover:bg-gray-200";
const MODAL_ENROLL_BUTTON_COLORS = "bg-gray-800 hover:bg-gray-900 text-white";

const floatingCartButtonVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 50, scale: 0.8 },
};

const notificationVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 50, scale: 0.8 },
};

const genieModalVariants = {
  hidden: {
    opacity: 0,
    y: 0,
    scaleY: 0,
    scaleX: 0.8,
    transformOrigin: 'bottom',
    transition: {
      opacity: { duration: 0.1, ease: "easeOut" },
      y: { duration: 0.1, ease: "easeOut" },
      scaleY: { duration: 0.15, ease: "easeOut" },
      scaleX: { duration: 0.15, ease: "easeOut" },
      when: "afterChildren"
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    scaleX: 1,
    transformOrigin: 'bottom',
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 25,
      mass: 0.7,
      when: "beforeChildren",
    }
  },
  exit: {
    opacity: 0,
    y: 0,
    scaleY: 0,
    scaleX: 0.8,
    transformOrigin: 'bottom',
    transition: {
      opacity: { duration: 0.1, ease: "easeOut" },
      y: { duration: 0.1, ease: "easeOut" },
      scaleY: { duration: 0.15, ease: "easeOut" },
      scaleX: { duration: 0.15, ease: "easeOut" },
      when: "afterChildren"
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.05, ease: "easeOut" } }
};

const FloatingCart = ({ allFormations }) => {
  const {
    selectedFormations,
    removeFromCart,
    handleBulkEnrollment,
    isBulkEnrolling,
    enrollingId
  } = useCart();

  const [isVisibleCartButton, setIsVisibleCartButton] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsVisibleCartButton(scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    let notificationTimer;
    if (isBulkEnrolling) {
      setIsNotificationVisible(false);
    } else if (enrollingId === 'success') {
      setIsNotificationVisible(true);
      setIsCartModalOpen(false);
      notificationTimer = setTimeout(() => {
        setIsNotificationVisible(false);
      }, 3000);
    } else {
      setIsNotificationVisible(false);
    }

    return () => clearTimeout(notificationTimer);
  }, [isBulkEnrolling, enrollingId]);

  const offsetY = isNotificationVisible ? -70 : 0;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsCartModalOpen(false);
      }
    };

    if (isCartModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartModalOpen]);

  return (
    <>
      <AnimatePresence>
        {isNotificationVisible && (
          <motion.div
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-lg shadow-xl flex items-center space-x-2"
            role="status"
            aria-live="polite"
          >
            <CheckCircle className="h-5 w-5" />
            <span>Action validée !</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisibleCartButton && !isCartModalOpen && (
          <motion.button
            variants={floatingCartButtonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
            onClick={() => setIsCartModalOpen(true)}
            className={`fixed bottom-12 right-6 z-50 ${CART_BUTTON_COLORS} rounded-full ${CART_BUTTON_SIZE_CLASSES} flex items-center justify-center shadow-xl hover:shadow-2xl transition-all`}
            aria-label="Voir le panier des formations"
            whileHover={{ scale: 1.1 }}
            style={{ translateY: offsetY }}
          >
            <ShoppingCart className="h-6 w-6" />
            {selectedFormations.length > 0 && (
              <span
                className={`absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 ${CART_BADGE_COLORS}`}
                aria-live="polite"
              >
                {selectedFormations.length}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartModalOpen && (
          <motion.div
            variants={genieModalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed right-4 bottom-[calc(theme(spacing.12)+theme(spacing.12)+theme(spacing.2))]
                             md:max-w-xs
                             z-[60] ${MODAL_MAIN_BG_COLOR} border ${MODAL_BORDER_COLOR_SOFTER} shadow-xl rounded-t-2xl flex flex-col`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-modal-title"
            style={{ translateY: offsetY }}
          >
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col h-full"
            >
              <div className={`flex items-center justify-between p-3 border-b ${MODAL_BORDER_COLOR_SOFTER} ${MODAL_BG_COLOR_HEADER_FOOTER} rounded-t-2xl`}>
                <h2 id="cart-modal-title" className="text-lg font-bold">Votre panier a cours</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCartModalOpen(false)}
                  aria-label="Fermer le panier"
                  className={MODAL_CLOSE_BUTTON_COLORS}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-60">
                {selectedFormations.length === 0 ? (
                  <p className="text-gray-600 text-center text-sm py-4">Votre panier est vide.</p>
                ) : (
                  selectedFormations.map((formationId) => {
                    const course = allFormations?.find(f => f._id === formationId);
                    return (
                      <Card
                        key={formationId}
                        className="p-2 shadow-sm flex items-center justify-between bg-white text-gray-900 text-sm hover:shadow-md hover:scale-[1.02] transition-all"
                      >
                        <span className="font-medium truncate">{course ? course.title : `Formation inconnue (ID: ${formationId})`}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(formationId)}
                          aria-label={`Retirer ${course ? course.title : 'cette formation'} du panier`}
                          className="text-gray-500 hover:text-red-600 hover:bg-gray-100"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </Card>
                    );
                  })
                )}
              </div>

              <div className={`p-3 border-t ${MODAL_BORDER_COLOR_SOFTER} ${MODAL_BG_COLOR_HEADER_FOOTER} rounded-b-2xl`}>
                <Button
                  size="sm"
                  onClick={handleBulkEnrollment}
                  disabled={selectedFormations.length === 0 || isBulkEnrolling}
                  className={`relative overflow-hidden group w-full ${MODAL_ENROLL_BUTTON_COLORS} shadow-md`}
                >
                  <span className="relative z-10 flex items-center justify-center text-sm">
                    {isBulkEnrolling ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                    {isBulkEnrolling ? "Inscription en cours..." : `S'inscrire (${selectedFormations.length})`}
                  </span>
                  <div className="absolute inset-0 bg-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingCart;
