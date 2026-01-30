import { useEffect } from 'react';

// Déclaration TypeScript pour silktideCookieBannerManager
declare global {
  interface Window {
    silktideCookieBannerManager?: {
      updateCookieBannerConfig: (config: any) => void;
      initCookieBanner: () => void;
    };
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Composant pour initialiser le gestionnaire de consentement des cookies Silktide
 */
const CookieConsent = () => {
  useEffect(() => {
    // Fonction pour initialiser la configuration une fois le script chargé
    const initializeCookieBanner = () => {
      // Attendre que le script soit chargé
      if (typeof window.silktideCookieBannerManager === 'undefined') {
        // Réessayer après un court délai
        setTimeout(initializeCookieBanner, 100);
        return;
      }

      // Initialiser le gestionnaire de cookies avec la configuration
      if (window.silktideCookieBannerManager) {
        window.silktideCookieBannerManager.updateCookieBannerConfig({
          background: {
            showBackground: true,
          },
          cookieIcon: {
            position: 'bottomRight',
          },
          cookieTypes: [
            {
              id: 'necessary',
              name: 'Cookies essentiels',
              description: '<p>Indispensables au fonctionnement du site (session, authentification, préférences de confidentialité). Ils ne peuvent pas être désactivés.</p>',
              required: true,
              onAccept: function() {
                if (typeof window.gtag === 'function') {
                  window.gtag('consent', 'update', {
                    functionality_storage: 'granted',
                    security_storage: 'granted',
                  });
                }
                localStorage.setItem('silktideCookieChoice_necessary', 'true');
              },
            },
            {
              id: 'analytical',
              name: 'Cookies d\'analyse',
              description: '<p>Ils nous permettent de mesurer l’audience et d’améliorer le site (pages vues, parcours). Les données sont agrégées et anonymisées.</p>',
              required: false,
              onAccept: function() {
                if (typeof window.gtag === 'function') {
                  window.gtag('consent', 'update', {
                    analytics_storage: 'granted',
                  });
                  if (window.dataLayer) {
                    window.dataLayer.push({ event: 'consent_accepted_analytical' });
                  }
                }
              },
              onReject: function() {
                if (typeof window.gtag === 'function') {
                  window.gtag('consent', 'update', {
                    analytics_storage: 'denied',
                  });
                }
              },
            },
            {
              id: 'advertising',
              name: 'Cookies marketing',
              description: '<p>Optionnels : personnalisation du contenu et publicités. Ils peuvent être déposés par nos partenaires. Vous pouvez les refuser sans impact sur la navigation.</p>',
              required: false,
              onAccept: function() {
                if (typeof window.gtag === 'function') {
                  window.gtag('consent', 'update', {
                    ad_storage: 'granted',
                    ad_user_data: 'granted',
                    ad_personalization: 'granted',
                  });
                  if (window.dataLayer) {
                    window.dataLayer.push({ event: 'consent_accepted_advertising' });
                  }
                }
              },
              onReject: function() {
                if (typeof window.gtag === 'function') {
                  window.gtag('consent', 'update', {
                    ad_storage: 'denied',
                    ad_user_data: 'denied',
                    ad_personalization: 'denied',
                  });
                }
              },
            },
          ],
          text: {
            banner: {
              description: '<h2 class="silktide-banner-title">Gestion des cookies</h2><p>Zetoun Labs utilise des cookies pour faire fonctionner le site, mesurer l’audience et personnaliser l’expérience. Vous pouvez accepter tout, refuser les cookies non essentiels ou <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">consulter notre politique de confidentialité</a>.</p>',
              acceptAllButtonText: 'Tout accepter',
              acceptAllButtonAccessibleLabel: 'Accepter tous les cookies',
              rejectNonEssentialButtonText: 'Refuser les non essentiels',
              rejectNonEssentialButtonAccessibleLabel: 'Refuser les cookies non essentiels',
              preferencesButtonText: 'Gérer les préférences',
              preferencesButtonAccessibleLabel: 'Ouvrir les préférences de cookies',
            },
            preferences: {
              title: 'Préférences de cookies',
              description: '<p>Choisissez les types de cookies que vous acceptez. Les cookies essentiels restent actifs. Vos choix s’appliquent à l’ensemble du site Zetoun Labs.</p>',
              creditLinkText: 'Bannière Silktide',
              creditLinkAccessibleLabel: 'En savoir plus sur Silktide Consent Manager',
            },
          },
        });
      }
    };

    // Initialiser la configuration
    // Le script est déjà chargé dans index.html, on attend juste qu'il soit prêt
    initializeCookieBanner();

    return () => {
      // Cleanup si nécessaire
    };
  }, []);

  return null; // Ce composant ne rend rien
};

export default CookieConsent;
