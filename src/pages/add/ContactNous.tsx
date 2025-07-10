import React, { useState, useEffect, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Send, CheckCircle2, Lightbulb, Clock, ArrowRight, MessageSquare, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { ENDPOINTS } from '@/config/api.config';

const ContactNous = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const TEXT_CONSTANTS = {
    SEO_TITLE: "Demander un avis - Zetoun Labs",
    SEO_DESCRIPTION: "Parlez-nous de vos besoins pour bénéficier de notre expertise.",
    BACK_TO_HOME: "Retour à l'accueil",
    MAIN_TITLE: "Demander un avis",
    MAIN_SUBTITLE: "Un spécialiste de notre équipe IT prendra contact avec vous dans les plus brefs délais.",
    WHY_ASK_TITLE: "Pourquoi demander un avis ?",
    FEATURES: [
      {
        title: "Conseils personnalisés",
        description: "Nos experts analysent vos besoins spécifiques et vous recommandent les formations les plus adaptées.",
        icon: <Lightbulb className="h-10 w-10 p-2 bg-amber-100 text-amber-600 rounded-full" />,
      },
      {
        title: "Parcours sur mesure",
        description: "Obtenez des recommandations pour un parcours de formation optimisé selon vos objectifs professionnels.",
        icon: <ArrowRight className="h-10 w-10 p-2 bg-green-100 text-green-600 rounded-full" />,
      },
      {
        title: "Solutions entreprise",
        description: "Découvrez nos offres spécifiques pour les entreprises souhaitant former plusieurs collaborateurs.",
        icon: <MessageSquare className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-full" />,
      },
      {
        title: "Réponse rapide",
        description: "Recevez des détails complets sur les prérequis, le contenu et les compétences acquises sous 48h.",
        icon: <Clock className="h-10 w-10 p-2 bg-purple-100 text-purple-600 rounded-full" />,
      },
    ],
    FORM_TITLE: "Formulaire de contact",
    FORM_BADGE: "Réponse sous 48h",
    FORM_DESCRIPTION: "Sollicitez l'expertise de nos spécialistes via ce formulaire.",
    NAME_LABEL: "Nom",
    NAME_PLACEHOLDER: "Votre nom",
    EMAIL_LABEL: "Email",
    EMAIL_PLACEHOLDER: "votre.email@exemple.com",
    SUBJECT_LABEL: "Sujet",
    SUBJECT_PLACEHOLDER: "Sujet de votre demande",
    MESSAGE_LABEL: "Message",
    MESSAGE_PLACEHOLDER: "Décrivez votre besoin en détail...",
    SUBMIT_BUTTON_SENDING: "Envoi en cours...",
    SUBMIT_BUTTON_TEXT: "Envoyer ma demande",
    SUBMITTED_THANK_YOU_TITLE: "Merci pour votre demande !",
    SUBMITTED_THANK_YOU_MESSAGE_PART1: "Merci pour votre message ! Notre équipe reviendra vers vous très vite pour discuter de votre projet ou de vos besoins.",
    SUBMITTED_THANK_YOU_MESSAGE_PART2: "Un email de confirmation a été envoyé à l'adresse",
    NEW_REQUEST_BUTTON: "Nouvelle demande",
    BACK_TO_FORMATIONS_BUTTON: "Retour aux formations",
    TOAST_SUCCESS_TITLE: "Demande envoyée",
    TOAST_SUCCESS_DESCRIPTION: "Nous avons bien reçu votre avis et nous vous répondrons dans les plus brefs délais.",
    TOAST_ERROR_TITLE: "Erreur lors de l'envoi",
    TOAST_ERROR_NETWORK: "Erreur réseau",
    TOAST_ERROR_NETWORK_DESCRIPTION: "Impossible de contacter le serveur.",
    LOADING_TEXT: "Chargement...",
    LOADING_SPINNER_ALT: "Animation de chargement",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(ENDPOINTS.TELECOM_OPINIONS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast({
          title: TEXT_CONSTANTS.TOAST_SUCCESS_TITLE,
          description: TEXT_CONSTANTS.TOAST_SUCCESS_DESCRIPTION,
        });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setIsSubmitting(false);
        toast({
          variant: 'destructive',
          title: TEXT_CONSTANTS.TOAST_ERROR_TITLE,
          description: data.message || 'Une erreur est survenue lors de l\'enregistrement de votre avis.',
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      toast({
        variant: 'destructive',
        title: TEXT_CONSTANTS.TOAST_ERROR_NETWORK,
        description: TEXT_CONSTANTS.TOAST_ERROR_NETWORK_DESCRIPTION,
      });
    }
  };

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-gray-800 border-b-gray-800 border-l-gray-400 border-r-gray-400 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-900 text-2xl font-bold">
            {TEXT_CONSTANTS.LOADING_TEXT}
          </div>
        </div>
      </div>
    }>
      <PageLayout>
        <SEO
          title={TEXT_CONSTANTS.SEO_TITLE}
          description={TEXT_CONSTANTS.SEO_DESCRIPTION}
        />

        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {TEXT_CONSTANTS.BACK_TO_HOME}
              </Link>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-space">{TEXT_CONSTANTS.MAIN_TITLE}</h1>
                <p className="text-lg sm:text-xl text-gray-600">
                  {TEXT_CONSTANTS.MAIN_SUBTITLE}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="order-2 md:order-1 mt-8 md:mt-0"
                >
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">{TEXT_CONSTANTS.WHY_ASK_TITLE}</h2>
                    <div className="grid gap-6">
                      {TEXT_CONSTANTS.FEATURES.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                          className="flex gap-4"
                        >
                          {feature.icon}
                          <div>
                            <h3 className="font-medium text-lg mb-1">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="order-1 md:order-2"
                >
                  {!isSubmitted ? (
                    <Card className="shadow-lg border-0">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-2xl">{TEXT_CONSTANTS.FORM_TITLE}</CardTitle>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 font-medium hover:bg-blue-200">{TEXT_CONSTANTS.FORM_BADGE}</Badge>
                        </div>
                        <CardDescription className="text-gray-700">
                          {TEXT_CONSTANTS.FORM_DESCRIPTION}
                        </CardDescription>
                      </CardHeader>
                      <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4 pt-6">
                          <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              {TEXT_CONSTANTS.NAME_LABEL}
                            </label>
                            <Input
                              id="name"
                              placeholder={TEXT_CONSTANTS.NAME_PLACEHOLDER}
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              {TEXT_CONSTANTS.EMAIL_LABEL}
                            </label>
                            <Input
                              id="email"
                              type="email"
                              placeholder={TEXT_CONSTANTS.EMAIL_PLACEHOLDER}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                              {TEXT_CONSTANTS.SUBJECT_LABEL}
                            </label>
                            <Input
                              id="subject"
                              placeholder={TEXT_CONSTANTS.SUBJECT_PLACEHOLDER}
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              required
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                              {TEXT_CONSTANTS.MESSAGE_LABEL}
                            </label>
                            <Textarea
                              id="message"
                              placeholder={TEXT_CONSTANTS.MESSAGE_PLACEHOLDER}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              required
                              className="w-full min-h-[150px]"
                            />
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end pb-6">
                          <Button
                            type="submit"
                            className="w-full md:w-auto px-8 py-2 relative overflow-hidden group"
                            disabled={isSubmitting}
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              {isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Send className="mr-2 h-4 w-4" />
                              )}
                              {isSubmitting ? TEXT_CONSTANTS.SUBMIT_BUTTON_SENDING : TEXT_CONSTANTS.SUBMIT_BUTTON_TEXT}
                            </span>
                            <div className="absolute inset-0 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                          </Button>
                        </CardFooter>
                      </form>
                    </Card>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="text-center shadow-lg border-0 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                            className="flex justify-center mb-4"
                          >
                            <CheckCircle2 className="h-16 w-16 text-green-500" />
                          </motion.div>
                        </div>

                        <CardContent className="pt-6 pb-6">
                          <CardTitle className="text-2xl mb-4">{TEXT_CONSTANTS.SUBMITTED_THANK_YOU_TITLE}</CardTitle>
                          <div className="text-base text-gray-700">
                            <div className="mb-4">
                              {TEXT_CONSTANTS.SUBMITTED_THANK_YOU_MESSAGE_PART1}
                            </div>
                            <div>
                              {TEXT_CONSTANTS.SUBMITTED_THANK_YOU_MESSAGE_PART2} <span className="font-medium">{email}</span>.
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-0 pb-6">
                          <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                            {TEXT_CONSTANTS.NEW_REQUEST_BUTTON}
                          </Button>
                          <Button onClick={() => window.location.href = "/add/calendar-form"}>
                            {TEXT_CONSTANTS.BACK_TO_FORMATIONS_BUTTON}
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-b from-transparent to-black py-8 md:py-12 font-sans text-white text-center"
        >
          <div className="container mx-auto max-w-3xl">
          </div>
        </motion.div>
      </PageLayout>
    </Suspense>
  );
};

export default ContactNous;
