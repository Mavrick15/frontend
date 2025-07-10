import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ENDPOINTS } from '@/config/api.config';

const ADD_TO_CART_DELAY_MS = 1000;
const BULK_ENROLL_DELAY_MS = 700;

const TOAST_MESSAGES = {
  ALREADY_IN_CART: {
    variant: "info",
    title: "Déjà dans le panier",
    description: "Cette formation est déjà dans votre panier.",
  },
  ADD_SUCCESS: {
    title: "Ajouté au panier !",
    description: "La formation a été ajoutée à votre panier.",
  },
  ADD_ERROR: {
    variant: "destructive",
    title: "Erreur",
    description: "Une erreur est survenue lors de l'ajout au panier.",
  },
  REMOVE_SUCCESS: {
    title: "Retiré du panier",
    description: "La formation a été retirée de votre panier.",
  },
  EMPTY_CART_BULK_ENROLL: {
    variant: "info",
    title: "Panier vide",
    description: "Veuillez ajouter des formations à votre panier avant de vous inscrire.",
  },
  AUTH_ERROR: {
    variant: "destructive",
    title: "Erreur d'authentification",
    description: "Échec de la récupération des informations d'authentification. Veuillez vous reconnecter.",
  },
  UNAUTHORIZED: {
    variant: "destructive",
    title: "Non autorisé.",
    description: "Votre session semble invalide. Veuillez vous reconnecter.",
  },
  BULK_ENROLL_FAILED_GENERIC: {
    variant: "destructive",
    title: "Échec des inscriptions",
    description: "Aucune formation n'a pu être inscrite. Veuillez réessayer.",
  }
};

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart doit être utilisé au sein d\'un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children, allFormations }) => {
  const [selectedFormations, setSelectedFormations] = useState(() => {
    try {
      const storedFormations = localStorage.getItem('cartFormations');
      return storedFormations ? JSON.parse(storedFormations) : [];
    } catch (error) {
      console.error("Erreur lors de la lecture du Local Storage:", error);
      return [];
    }
  });

  const [enrollingId, setEnrollingId] = useState(null);
  const [isBulkEnrolling, setIsBulkEnrolling] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('cartFormations', JSON.stringify(selectedFormations));
    } catch (error) {
      console.error("Erreur lors de l'écriture dans le Local Storage:", error);
    }
  }, [selectedFormations]);

  const isCourseInCart = useCallback((formationId) => {
    return selectedFormations.includes(formationId);
  }, [selectedFormations]);

  const addToCart = useCallback(async (formationId) => {
    if (!formationId) {
      console.error("ID de formation invalide: undefined");
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "L'identifiant de la formation est invalide."
      });
      return;
    }

    if (isCourseInCart(formationId)) {
      toast(TOAST_MESSAGES.ALREADY_IN_CART);
      return;
    }

    setEnrollingId(formationId);

    try {
      await new Promise(resolve => setTimeout(resolve, ADD_TO_CART_DELAY_MS));
      setSelectedFormations((prevSelected) => [...prevSelected, formationId]);

      toast(TOAST_MESSAGES.ADD_SUCCESS);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      toast(TOAST_MESSAGES.ADD_ERROR);
    } finally {
      setEnrollingId(null);
    }
  }, [isCourseInCart, toast]);

  const removeFromCart = useCallback((formationIdToRemove) => {
    setSelectedFormations((prevSelected) =>
      prevSelected.filter((id) => id !== formationIdToRemove)
    );
    toast(TOAST_MESSAGES.REMOVE_SUCCESS);
  }, [toast]);

  const handleBulkEnrollment = useCallback(async () => {
    if (selectedFormations.length === 0) {
      toast(TOAST_MESSAGES.EMPTY_CART_BULK_ENROLL);
      return;
    }

    setIsBulkEnrolling(true);
    let successfulEnrollments = 0;
    const failedEnrollments = [];

    await new Promise(resolve => setTimeout(resolve, BULK_ENROLL_DELAY_MS));

    const userDataString = localStorage.getItem('user');
    let authToken = null;

    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        authToken = userData.token;
      } catch (error) {
        console.error("Erreur lors de l'analyse des informations utilisateur :", error);
        toast(TOAST_MESSAGES.AUTH_ERROR);
        setIsBulkEnrolling(false);
        return;
      }
    }

    const headers = {
      'Content-Type': 'application/json',
    };

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    } else {
      toast(TOAST_MESSAGES.UNAUTHORIZED);
      setIsBulkEnrolling(false);
      return;
    }

    const enrollmentPromises = selectedFormations.map(async (formationId) => {
      try {
        const response = await fetch(ENDPOINTS.ENROLLMENTS, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ formationId }),
        });

        if (response.ok) {
          successfulEnrollments++;
          return { status: 'fulfilled', formationId };
        } else {
          const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue du serveur' }));
          failedEnrollments.push({ id: formationId, message: errorData.message || 'Erreur inconnue' });
          console.error(`Échec de l'inscription pour ${formationId}:`, errorData);
          return { status: 'rejected', formationId, error: errorData.message || 'Erreur inconnue' };
        }
      } catch (error) {
        failedEnrollments.push({ id: formationId, message: 'Erreur de communication' });
        console.error(`Erreur de communication avec le serveur pour ${formationId}:`, error);
        return { status: 'rejected', formationId, error: 'Erreur de communication' };
      }
    });

    await Promise.allSettled(enrollmentPromises);

    const showFailedEnrollmentDetails = () => {
      if (failedEnrollments.length > 0) {
        const failedTitles = failedEnrollments.map(failed => {
          const formation = allFormations?.find(f => f._id === failed.id);
          return formation ? formation.title : `Formation inconnue (ID: ${failed.id})`;
        });
        toast({
          variant: "destructive",
          title: "Détails des échecs d'inscription",
          description: (
            <ul className="list-disc pl-5">
              {failedTitles.map((title, idx) => (
                <li key={idx}>{title}</li>
              ))}
            </ul>
          ),
        });
      }
    };

    if (successfulEnrollments > 0 || failedEnrollments.length > 0) {
      toast({
        title: "Inscriptions terminées !",
        description: (
          <>
            {successfulEnrollments > 0 && (
              <span className="text-green-600">{successfulEnrollments} formation(s) inscrite(s) avec succès.</span>
            )}
            {failedEnrollments.length > 0 && (
              <>
                <span className="text-red-600"> {failedEnrollments.length} échec(s).</span>
                <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800" onClick={showFailedEnrollmentDetails}>
                  Voir les détails
                </Button>
              </>
            )}
          </>
        ),
      });
    } else {
      toast(TOAST_MESSAGES.BULK_ENROLL_FAILED_GENERIC);
    }

    setSelectedFormations([]);
    setIsBulkEnrolling(false);
  }, [selectedFormations, toast, allFormations]);

  return (
    <CartContext.Provider value={{
      selectedFormations,
      addToCart,
      removeFromCart,
      handleBulkEnrollment,
      isCourseInCart,
      enrollingId,
      isBulkEnrolling
    }}>
      {children}
    </CartContext.Provider>
  );
};
