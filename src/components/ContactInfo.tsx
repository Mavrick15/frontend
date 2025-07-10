import React from 'react';
import { useLocation } from 'react-router-dom';

const TEXT_CONSTANTS = {
  DEFAULT_TITLE: "Une question n'hésitez pas à nous contacter !",
  DEFAULT_TEXT: "Nous sommes là pour vous aider à chaque étape. Que ce soit pour un projet, une consultation ou simplement pour discuter de vos besoins, notre équipe est à votre écoute.",
  CONTACT_US_LABEL: "Contactez-nous",
  MAIN_HEADING: "Transformez vos idées en solutions concrètes",
  MAIN_DESCRIPTION: "Découvrez comment Zetoun Labs peut devenir le partenaire de votre croissance digitale. Notre équipe est prête à répondre à toutes vos questions et à construire l'avenir de votre entreprise.",
  CONTACT_BUTTON_TEXT: "Contactez nous !",
  CONTACT_PAGE_PATH: "/add/contact-nous",
  PATH_CONTENT_MAP: {
    '/projects/realisations/eyano-security': {
      title: "Votre Sécurité, Notre Engagement",
      text: "Comme pour le Centre de Diagnostic EYANO, nous sommes dédiés à fournir des solutions de sécurité informatique sur mesure qui protègent vos actifs les plus précieux. Que vous soyez une entreprise ou une institution, nous avons l'expertise pour concevoir et déployer des systèmes de surveillance et de protection adaptés à vos besoins spécifiques.",
    },
    '/projects/realisations/police-judiciaire': {
      title: "Transformez Votre Infrastructure IT",
      text: "Forts de notre expérience avec la Police Judiciaire, nous sommes prêts à moderniser et sécuriser votre infrastructure IT. Que vous ayez besoin d'une refonte complète, d'une amélioration de la sécurité ou d'une haute disponibilité, nos experts sont à votre écoute pour des solutions sur mesure.",
    },
    '/projects/realisations/credit-shop-africa': {
      title: "Votre sécurité, notre engagement",
      text: "Comme pour Credit Shop Africa, nous sommes dédiés à fournir des solutions de sécurité informatique sur mesure qui protègent vos actifs les plus précieux. Que vous soyez une entreprise ou une institution, nous avons l'expertise pour concevoir et déployer des systèmes de surveillance et de protection adaptés à vos besoins spécifiques.",
    },
    '/services/network-engineering': {
      title: "Un réseau adapté à vos enjeux",
      text: "Que vous soyez une PME en pleine croissance ou une grande entreprise avec des besoins complexes, nous concevons des architectures réseau qui s'adaptent à vos contraintes techniques et budgétaires. Notre objectif est de vous offrir une infrastructure fiable, performante et évolutive.",
    },
    '/services/video-surveillance': {
      title: "Une sécurité sur mesure pour votre tranquillité d'esprit",
      text: "Que vous cherchiez à protéger un commerce, un bureau, un entrepôt ou un site industriel, Zetoun Labs conçoit des systèmes de vidéosurveillance adaptés à vos enjeux spécifiques. Nos solutions sont conformes à la réglementation locale et respectueuses de la vie privée, vous offrant une sécurité complète et une tranquillité d'esprit totale.",
    },
    '/services/web-development': {
      title: "Un site web professionnel à votre image avec Zetoun Labs",
      text: "Que vous ayez besoin d'une simple vitrine numérique ou d'un site e-commerce complet, Zetoun Labs vous accompagne dans toutes les étapes de votre projet web. De la conception initiale à la mise en ligne, en passant par l'hébergement et la maintenance, nous garantissons une solution web qui renforce votre présence en ligne et atteint vos objectifs commerciaux.",
    },
    '/services/it-management': {
      title: "Une infogérance sur mesure pour votre entreprise",
      text: "Nos formules d'infogérance s'adaptent à vos besoins spécifiques, qu'il s'agisse d'une supervision ponctuelle ou d'une prise en charge complète de votre système d'information. Chez Zetoun Labs, nous élaborons avec vous un contrat de service (SLA) précis, détaillant les niveaux de disponibilité garantis et les temps de réponse en cas d'incident pour une tranquillité d'esprit totale.",
    },
    '/services/solar-installation': {
      title: "Passez à l'énergie solaire avec Zetoun Labs",
      text: "Que vous soyez un particulier souhaitant réduire sa facture d'électricité ou une entreprise visant l'autonomie énergétique, Zetoun Labs est votre partenaire idéal. Nous vous accompagnons à chaque étape de votre projet solaire, de l'étude à la mise en service.",
    },
    '/services/technical-support': {
      title: "Un support informatique adapté à vos besoins",
      text: "Que vous soyez une petite entreprise avec quelques postes ou une structure plus importante avec des besoins spécifiques, Zetoun Labs propose des formules de support technique adaptées à votre taille et à vos contraintes opérationnelles. Nous sommes votre partenaire de confiance pour une informatique sans souci.",
    },
    '/formations/linux-administration': {
      title: "Prêt à devenir un expert en administration système Linux ?",
      text: "Contactez notre équipe dès aujourd'hui pour obtenir plus d'informations sur les dates de formation, les tarifs et les modalités d'inscription. Nous sommes là pour vous accompagner.",
    },
    '/formations/windows-administration': {
      title: "Prêt à devenir un expert en administration système Windows Server ?",
      text: "Contactez notre équipe des formateurs dès aujourd'hui pour obtenir plus d'informations sur les dates de formation, les tarifs et les modalités d'inscription. Nous sommes là pour vous accompagner.",
    },
    '/formations/network-administration': {
      title: "Prêt à devenir un expert en administration réseau cisco ?",
      text: "Contactez notre équipe des formateurs dès aujourd'hui pour obtenir plus d'informations sur les dates de formation, les tarifs et les modalités d'inscription. Nous sommes là pour vous accompagner.",
    },
    '/formations/computer-maintenance': {
      title: "Prêt à devenir un expert en maintenance informatique ?",
      text: "Contactez notre équipe des formateurs dès aujourd'hui pour obtenir plus d'informations sur les dates de formation, les tarifs et les modalités d'inscription. Nous sommes là pour vous accompagner.",
    },
    '/formations/virtualization-training': {
      title: "Prêt à maîtriser la virtualisation pour des infrastructures agiles ?",
      text: "Contactez notre équipe des formateurs dès aujourd'hui pour obtenir plus d'informations sur les dates de formation, les tarifs et les modalités d'inscription. Nous sommes là pour vous accompagner.",
    },
    '/formations/web-development-training': {
      title: "Prêt à devenir un expert en développement web ?",
      text: "Contactez notre équipe des formateurs dès aujourd'hui pour obtenir plus d'informations sur les dates de formation, les tarifs et les modalités d'inscription. Nous sommes là pour vous accompagner.",
    },
  },
};

interface ContactInfoPageProps {
  dynamicTitle?: string;
  dynamicText?: string;
}

const ContactInfoPage = ({ dynamicTitle, dynamicText }: ContactInfoPageProps) => {
  const location = useLocation();

  const content = TEXT_CONSTANTS.PATH_CONTENT_MAP[location.pathname] || {
    title: TEXT_CONSTANTS.DEFAULT_TITLE,
    text: TEXT_CONSTANTS.DEFAULT_TEXT,
  };

  const currentDynamicTitle = dynamicTitle || content.title;
  const currentDynamicText = dynamicText || content.text;

  if (location.pathname === TEXT_CONSTANTS.CONTACT_PAGE_PATH) {
    return null;
  }

  return (
    <section className="bg-gradient-to-b from-transparent to-black py-16 md:py-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4 px-4 py-1 bg-gray-50 text-gray-700 rounded-full text-sm font-semibold">
            {TEXT_CONSTANTS.CONTACT_US_LABEL}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {TEXT_CONSTANTS.MAIN_HEADING}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {TEXT_CONSTANTS.MAIN_DESCRIPTION}
          </p>
        </div>

        <div className="bg-gradient-to-b from-transparent to-black rounded-3xl shadow-xl p-8 md:p-12 flex flex-col items-center space-y-8 border border-gray-700">
          <div className="text-center max-w-3xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              {currentDynamicTitle}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {currentDynamicText}
            </p>
          </div>

          <a
            href={TEXT_CONSTANTS.CONTACT_PAGE_PATH}
            className="inline-flex items-center justify-center bg-white text-gray-900 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-75"
          >
            {TEXT_CONSTANTS.CONTACT_BUTTON_TEXT}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoPage;
