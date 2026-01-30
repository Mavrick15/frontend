<link rel="stylesheet" id="silktide-consent-manager-css" href="path-to-css/silktide-consent-manager.css">
<script src="path-to-js/silktide-consent-manager.js"></script>
<script>
silktideCookieBannerManager.updateCookieBannerConfig({
  background: {
    showBackground: true
  },
  cookieIcon: {
    position: "bottomLeft"
  },
  cookieTypes: [
    {
      id: "necessary",
      name: "Nécessaire",
      description: "<p>Ces cookies sont nécessaires au bon fonctionnement du site web et ne peuvent pas être désactivés. Ils permettent, par exemple, la connexion et la
sauvegarde de vos préférences de confidentialité.</p>",
      required: true,
      onAccept: function() {
        console.log('Ajoutez ici la logique pour les cookies Nécessaires');
      }
    },
    {
      id: "analytical",
      name: "Analytique",
      description: "<p>Ces cookies nous aident à améliorer le site en suivant les pages les plus populaires et la façon dont les visiteurs naviguent sur le site.</p>",
      required: false,
      onAccept: function() {
        gtag('consent', 'update', {
          analytics_storage: 'granted',
        });
        dataLayer.push({
          'event': 'consent_accepted_analytical',
        });
      },
      onReject: function() {
        gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
      }
    },
    {
      id: "advertising",
      name: "Publicité",
      description: "<p>Ces cookies offrent des fonctionnalités supplémentaires et une personnalisation pour améliorer votre expérience. Ils peuvent être définis par nous
ou par des partenaires dont nous utilisons les services.</p>",
      required: false,
      onAccept: function() {
        gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        });
        dataLayer.push({
          'event': 'consent_accepted_advertising',
        });
      },
      onReject: function() {
        gtag('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
      }
    }
  ],
  text: {
    banner: {
      description: "<p>Nous utilisons des cookies sur notre site pour améliorer votre expérience utilisateur, fournir du contenu personnalisé et analyser notre trafic. <a href=\"https://zetounlabs.onrender.com/cookie-policy\" target=\"_blank\">Politique en matière de cookies.</a></p>",
      acceptAllButtonText: "Tout accepter",
      acceptAllButtonAccessibleLabel: "Accepter tous les cookies",
      rejectNonEssentialButtonText: "Refuser les non-essentiels",
      rejectNonEssentialButtonAccessibleLabel: "Refuser les non-essentiels",
      preferencesButtonText: "Préférences",
      preferencesButtonAccessibleLabel: "Activer/désactiver les préférences"
    },
    preferences: {
      title: "Personnalisez vos préférences de cookies",
      description: "<p>Nous respectons votre droit à la vie privée. Vous pouvez choisir de ne pas autoriser certains types de cookies. Vos préférences de cookies
s'appliqueront à l'ensemble de notre site web.</p>",
      creditLinkText: "Obtenir cette bannière gratuitement",
      creditLinkAccessibleLabel: "Obtenir cette bannière gratuitement"
    }
  }
});
</script>
