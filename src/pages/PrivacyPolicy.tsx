import React, { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

// Constantes pour le composant PrivacyPolicy
const TEXT_CONSTANTS = {
  LOADING_PROGRESS_INTERVAL_MS: 200,
  INITIAL_LOADING_PROGRESS_STEP: 5,
  MAX_LOADING_PROGRESS: 95,
  HOME_PATH: "/",
  CONTACT_EMAIL: "support@zetounlabs.cd",
  LAST_UPDATED_DATE: "Mardi le, 06 05 2025 à 16h 15' UTC+1",

  PRIVACY_MESSAGES: {
    RETURN_HOME: "Retour à l'accueil",
    PAGE_TITLE: "Politique de confidentialité",
    LAST_UPDATED: "Dernière mise à jour : ",
    INTRO_HEADING: "1. Introduction",
    INTRO_PARA: "Chez Zetoun Labs (« nous », « notre » ou « nos »), nous respectons votre vie privée et nous engageons à protéger vos informations personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site web ou utilisez nos services.",
    INFO_COLLECTION_HEADING: "2. Les informations que nous collectons",
    INFO_COLLECTION_PARA: "Nous pouvons collecter les informations personnelles que vous nous fournissez volontairement lorsque vous :",
    INFO_COLLECTION_LIST_ITEM_1: "Nous contactez via notre site web",
    INFO_COLLECTION_LIST_ITEM_2: "Vous abonnez à notre newsletter",
    INFO_COLLECTION_LIST_ITEM_3: "Vous inscrivez à nos services",
    INFO_COLLECTION_LIST_ITEM_4: "Vous participez à nos enquêtes ou promotions",
    INFO_COLLECTION_PARA_2: "Ces informations peuvent inclure votre nom, votre adresse e-mail, le nom de votre entreprise, votre numéro de téléphone et toute autre information que vous choisissez de nous fournir.",
    INFO_USAGE_HEADING: "3. Comment nous utilisons vos informations",
    INFO_USAGE_PARA: "Nous pouvons utiliser les informations que nous collectons à diverses fins, notamment pour :",
    INFO_USAGE_LIST_ITEM_1: "Fournir, exploiter et entretenir nos services",
    INFO_USAGE_LIST_ITEM_2: "Améliorer, personnaliser et étendre nos services",
    INFO_USAGE_LIST_ITEM_3: "Comprendre et analyser comment vous utilisez nos services",
    INFO_USAGE_LIST_ITEM_4: "Développer de nouveaux produits, services, fonctionnalités et caractéristiques",
    INFO_USAGE_LIST_ITEM_5: "Communiquer avec vous à propos de nos services, mises à jour et autres informations",
    INFO_USAGE_LIST_ITEM_6: "Traiter les transactions et envoyer les informations associées",
    INFO_USAGE_LIST_ITEM_7: "Détecter et prévenir la fraude",
    COOKIES_HEADING: "4. Cookies et technologies de suivi",
    COOKIES_PARA: "Nous pouvons utiliser des cookies et des technologies de suivi similaires pour suivre l'activité sur notre site web et stocker certaines informations. Les cookies sont des fichiers contenant une petite quantité de données pouvant inclure un identifiant unique anonyme. Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour vous avertir lorsqu'un cookie est envoyé.",
    THIRD_PARTY_HEADING: "5. Services tiers",
    THIRD_PARTY_PARA: "Nous pouvons utiliser des services tiers qui collectent, surveillent et analysent des données afin d'améliorer nos services. Ces tiers disposent de leurs propres politiques de confidentialité concernant l'utilisation de ces informations.",
    DATA_RETENTION_HEADING: "6. Conservation des données",
    DATA_RETENTION_PARA: "Nous conserverons vos informations personnelles uniquement aussi longtemps que nécessaire aux fins énoncées dans la présente politique de confidentialité.",
    SECURITY_HEADING: "7. Sécurité",
    SECURITY_PARA: "La sécurité de vos données est importante pour nous, mais n'oubliez pas qu'aucune méthode de transmission sur Internet ou méthode de stockage électronique n'est sûre à 100 %. Bien que nous nous efforcions d'utiliser des moyens commercialement acceptables pour protéger vos informations personnelles, nous ne pouvons garantir leur sécurité absolue.",
    YOUR_RIGHTS_HEADING: "8. Vos droits",
    YOUR_RIGHTS_PARA: "Selon votre emplacement, vous pouvez disposer de certains droits concernant vos informations personnelles, tels que le droit d'accéder, de corriger ou de supprimer vos informations personnelles.",
    CHANGES_HEADING: "9. Modifications de la présente politique de confidentialité",
    CHANGES_PARA: "Nous sommes susceptibles de mettre à jour notre Politique de confidentialité de temps à autre. Nous vous informerons de toute modification en publiant la nouvelle Politique de confidentialité sur cette page. Nous vous informerons par e-mail et/ou par un avis bien visible sur notre site web avant l'entrée en vigueur de la modification.",
    CONTACT_HEADING: "10. Contactez-nous",
    CONTACT_PARA: "Si vous avez des questions sur cette politique de confidentialité, veuillez nous contacter à ",
  },
  SEO_METADATA: {
    TITLE: "Politique de confidentialité | Zetoun Labs",
    DESCRIPTION: "Consultez notre politique de confidentialité pour comprendre comment nous collectons, utilisons et protégeons vos informations personnelles.",
    KEYWORDS: ["politique de confidentialité", "vie privée", "protection des données", "Zetoun Labs"],
  },
  LOADING_SPINNER_ALT: "Animation de chargement",
};

const PrivacyPolicy = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress < TEXT_CONSTANTS.MAX_LOADING_PROGRESS) {
          return prevProgress + TEXT_CONSTANTS.INITIAL_LOADING_PROGRESS_STEP;
        }
        return prevProgress;
      });
    }, TEXT_CONSTANTS.LOADING_PROGRESS_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-gray-800 border-b-gray-800 border-l-gray-400 border-r-gray-400 animate-spin"></div>
          <div
            className="absolute inset-2 rounded-full bg-gray-50 flex items-center justify-center"
            style={{
              clipPath: `inset(${100 - loadingProgress}% 0 0 0)`,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              transition: 'clip-path 0.2s ease-out'
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-900 text-2xl font-bold">
            {loadingProgress}%
          </div>
        </div>
      </div>
    }>
      <PageLayout>
        <SEO
          title={TEXT_CONSTANTS.SEO_METADATA.TITLE}
          description={TEXT_CONSTANTS.SEO_METADATA.DESCRIPTION}
          keywords={TEXT_CONSTANTS.SEO_METADATA.KEYWORDS}
        />
        <motion.section
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            variants={contentVariants}
            className="container mx-auto"
          >
            <div className="max-w-4xl mx-auto">
              <Link
                to={TEXT_CONSTANTS.HOME_PATH}
                className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {TEXT_CONSTANTS.PRIVACY_MESSAGES.RETURN_HOME}
              </Link>

              <h1 className="text-4xl font-bold mb-8">{TEXT_CONSTANTS.PRIVACY_MESSAGES.PAGE_TITLE}</h1>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-6">{TEXT_CONSTANTS.PRIVACY_MESSAGES.LAST_UPDATED} {TEXT_CONSTANTS.LAST_UPDATED_DATE}</p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">{TEXT_CONSTANTS.PRIVACY_MESSAGES.INTRO_HEADING}</h2>
                <p className="text-gray-600 mb-4">
                  {TEXT_CONSTANTS.PRIVACY_MESSAGES.INTRO_PARA}
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">{TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_COLLECTION_HEADING}</h2>
                <p className="text-gray-600 mb-4">
                  {TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_COLLECTION_PARA}
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-600">
                  <li>{TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_COLLECTION_LIST_ITEM_1}</li>
                  <li>{TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_COLLECTION_LIST_ITEM_2}</li>
                  <li>{TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_COLLECTION_LIST_ITEM_3}</li>
                  <li>{TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_COLLECTION_LIST_ITEM_4}</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  {TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_COLLECTION_PARA_2}
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">{TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_USAGE_HEADING}</h2>
                <p className="text-gray-600 mb-4">
                  {TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_USAGE_PARA}
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-600">
                  <li>{TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_USAGE_LIST_ITEM_1}</li>
                  <li>{TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_USAGE_LIST_ITEM_2}</li>
                  <li>{TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_USAGE_LIST_ITEM_3}</li>
                  <li>{TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_USAGE_LIST_ITEM_4}</li>
                  <li>{TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_USAGE_LIST_ITEM_5}</li>
                  <li>{TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_USAGE_LIST_ITEM_6}</li>
                  <li>{TEXT_CONSTANTS.PRIVACY_MESSAGES.INFO_USAGE_LIST_ITEM_7}</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">{TEXT_CONSTANTS.PRIVACY_MESSAGES.COOKIES_HEADING}</h2>
                <p className="text-gray-600 mb-4">
                  {TEXT_CONSTANTS.PRIVACY_MESSAGES.COOKIES_PARA}
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">{TEXT_CONSTANTS.PRIVACY_MESSAGES.THIRD_PARTY_HEADING}</h2>
                <p className="text-gray-600 mb-4">
                  {TEXT_CONSTANTS.PRIVACY_MESSAGES.THIRD_PARTY_PARA}
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">{TEXT_CONSTANTS.PRIVACY_MESSAGES.DATA_RETENTION_HEADING}</h2>
                <p className="text-gray-600 mb-4">
                  {TEXT_CONSTANTS.PRIVACY_MESSAGES.DATA_RETENTION_PARA}
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">{TEXT_CONSTANTS.PRIVACY_MESSAGES.SECURITY_HEADING}</h2>
                <p className="text-gray-600 mb-4">
                  {TEXT_CONSTANTS.PRIVACY_MESSAGES.SECURITY_PARA}
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">{TEXT_CONSTANTS.PRIVACY_MESSAGES.YOUR_RIGHTS_HEADING}</h2>
                <p className="text-gray-600 mb-4">
                  {TEXT_CONSTANTS.PRIVACY_MESSAGES.YOUR_RIGHTS_PARA}
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">{TEXT_CONSTANTS.PRIVACY_MESSAGES.CHANGES_HEADING}</h2>
                <p className="text-gray-600 mb-4">
                  {TEXT_CONSTANTS.PRIVACY_MESSAGES.CHANGES_PARA}
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">{TEXT_CONSTANTS.PRIVACY_MESSAGES.CONTACT_HEADING}</h2>
                <p className="text-gray-600 mb-4">{TEXT_CONSTANTS.PRIVACY_MESSAGES.CONTACT_PARA} <a href={`mailto:${TEXT_CONSTANTS.CONTACT_EMAIL}`} className="text-blue-600 hover:underline">{TEXT_CONSTANTS.CONTACT_EMAIL}</a></p>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </PageLayout>
    </Suspense>
  );
};

export default PrivacyPolicy;
