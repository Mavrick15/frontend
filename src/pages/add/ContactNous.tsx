import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ENDPOINTS } from "@/config/api.config";
import { getNetworkErrorMessage, parseApiResponse } from "@/utils/apiMessages";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Lightbulb,
  Loader2,
  MessageSquare,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ContactNous = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const TEXT_CONSTANTS = {
    SEO_TITLE: "Demander un avis - Zetoun Labs",
    SEO_DESCRIPTION:
      "Parlez-nous de vos besoins pour bénéficier de notre expertise.",
    BACK_TO_HOME: "Retour à l'accueil",
    MAIN_TITLE: "Demander un avis",
    MAIN_SUBTITLE:
      "Un spécialiste de notre équipe IT prendra contact avec vous dans les plus brefs délais.",
    WHY_ASK_TITLE: "Pourquoi demander un avis ?",
    FEATURES: [
      {
        title: "Conseils personnalisés",
        description:
          "Nos experts analysent vos besoins spécifiques et vous recommandent les formations les plus adaptées.",
        icon: <Lightbulb className="h-6 w-6 text-white" />,
      },
      {
        title: "Parcours sur mesure",
        description:
          "Obtenez des recommandations pour un parcours de formation optimisé selon vos objectifs professionnels.",
        icon: <ArrowRight className="h-6 w-6 text-white" />,
      },
      {
        title: "Solutions entreprise",
        description:
          "Découvrez nos offres spécifiques pour les entreprises souhaitant former plusieurs collaborateurs.",
        icon: <MessageSquare className="h-6 w-6 text-white" />,
      },
      {
        title: "Réponse rapide",
        description:
          "Recevez des détails complets sur les prérequis, le contenu et les compétences acquises sous 48h.",
        icon: <Clock className="h-6 w-6 text-white" />,
      },
    ],
    FORM_TITLE: "Formulaire de contact",
    FORM_BADGE: "Réponse sous 48h",
    FORM_DESCRIPTION:
      "Sollicitez l'expertise de nos spécialistes via ce formulaire.",
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
    SUBMITTED_THANK_YOU_MESSAGE_PART1:
      "Merci pour votre message ! Notre équipe reviendra vers vous très vite pour discuter de votre projet ou de vos besoins.",
    SUBMITTED_THANK_YOU_MESSAGE_PART2:
      "Un email de confirmation a été envoyé à l'adresse",
    NEW_REQUEST_BUTTON: "Nouvelle demande",
    BACK_TO_FORMATIONS_BUTTON: "Retour aux formations",
    TOAST_SUCCESS_TITLE: "Demande envoyée",
    TOAST_SUCCESS_DESCRIPTION:
      "Nous avons bien reçu votre avis et nous vous répondrons dans les plus brefs délais.",
    TOAST_ERROR_TITLE: "Erreur lors de l'envoi",
    TOAST_ERROR_NETWORK: "Erreur réseau",
    TOAST_ERROR_NETWORK_DESCRIPTION: "Impossible de contacter le serveur.",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(ENDPOINTS.CONTACT_REQUESTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const { ok, errorMessage, successMessage } = await parseApiResponse(response);

      if (ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast({
          title: TEXT_CONSTANTS.TOAST_SUCCESS_TITLE,
          description: successMessage || TEXT_CONSTANTS.TOAST_SUCCESS_DESCRIPTION,
        });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setIsSubmitting(false);
        toast({
          variant: "destructive",
          title: TEXT_CONSTANTS.TOAST_ERROR_TITLE,
          description: errorMessage || "Une erreur est survenue lors de l'enregistrement de votre message.",
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: TEXT_CONSTANTS.TOAST_ERROR_NETWORK,
        description: getNetworkErrorMessage(),
      });
    }
  };

  return (
    <PageLayout>
      <SEO
        title={TEXT_CONSTANTS.SEO_TITLE}
        description={TEXT_CONSTANTS.SEO_DESCRIPTION}
      />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {TEXT_CONSTANTS.BACK_TO_HOME}
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>
              <div className="relative z-10">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                  {TEXT_CONSTANTS.MAIN_TITLE}
                </h1>
                <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  {TEXT_CONSTANTS.MAIN_SUBTITLE}
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-2 md:order-1 mt-8 md:mt-0"
              >
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200/50 h-full hover:shadow-2xl transition-all duration-300">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {TEXT_CONSTANTS.WHY_ASK_TITLE}
                  </h2>
                  <div className="grid gap-6">
                    {TEXT_CONSTANTS.FEATURES.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="flex gap-4 group"
                      >
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1 text-gray-900 group-hover:text-gray-700 transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {feature.description}
                          </p>
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
                  <Card className="shadow-2xl border border-gray-200/50 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-br from-gray-900 via-gray-800 to-black pb-6 relative overflow-hidden rounded-t-2xl">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-2xl text-white font-bold">
                            {TEXT_CONSTANTS.FORM_TITLE}
                          </CardTitle>
                          <Badge
                            variant="secondary"
                            className="bg-white/20 backdrop-blur-sm text-white border border-white/30 font-semibold hover:bg-white/30"
                          >
                            {TEXT_CONSTANTS.FORM_BADGE}
                          </Badge>
                        </div>
                        <CardDescription className="text-gray-200">
                          {TEXT_CONSTANTS.FORM_DESCRIPTION}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                      <CardContent className="space-y-4 pt-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-900"
                          >
                            {TEXT_CONSTANTS.NAME_LABEL}
                          </label>
                          <Input
                            id="name"
                            autoComplete="name"
                            placeholder={TEXT_CONSTANTS.NAME_PLACEHOLDER}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900 bg-white/90 backdrop-blur-sm transition-all duration-200 hover:border-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-900"
                          >
                            {TEXT_CONSTANTS.EMAIL_LABEL}
                          </label>
                          <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder={TEXT_CONSTANTS.EMAIL_PLACEHOLDER}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900 bg-white/90 backdrop-blur-sm transition-all duration-200 hover:border-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="subject"
                            className="block text-sm font-semibold text-gray-900"
                          >
                            {TEXT_CONSTANTS.SUBJECT_LABEL}
                          </label>
                          <Input
                            id="subject"
                            autoComplete="off"
                            placeholder={TEXT_CONSTANTS.SUBJECT_PLACEHOLDER}
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            className="w-full rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900 bg-white/90 backdrop-blur-sm transition-all duration-200 hover:border-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="message"
                            className="block text-sm font-semibold text-gray-900"
                          >
                            {TEXT_CONSTANTS.MESSAGE_LABEL}
                          </label>
                          <Textarea
                            id="message"
                            autoComplete="off"
                            placeholder={TEXT_CONSTANTS.MESSAGE_PLACEHOLDER}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="w-full min-h-[150px] rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900 bg-white/90 backdrop-blur-sm transition-all duration-200 hover:border-gray-400"
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end pb-6 pt-4 rounded-b-2xl">
                        <Button
                          type="submit"
                          className="w-full md:w-auto px-8 py-6 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                          disabled={isSubmitting}
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            {isSubmitting ? (
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                              <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            )}
                            {isSubmitting
                              ? TEXT_CONSTANTS.SUBMIT_BUTTON_SENDING
                              : TEXT_CONSTANTS.SUBMIT_BUTTON_TEXT}
                          </span>
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
                    <Card className="text-center shadow-2xl border border-gray-200/50 overflow-hidden bg-white/90 backdrop-blur-sm">
                      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 relative overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                          }}
                        ></div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                            delay: 0.2,
                          }}
                          className="flex justify-center mb-4 relative z-10"
                        >
                          <div className="bg-white rounded-full p-4 shadow-xl">
                            <CheckCircle2 className="h-16 w-16 text-gray-900" />
                          </div>
                        </motion.div>
                      </div>

                      <CardContent className="pt-8 pb-6">
                        <CardTitle className="text-2xl mb-4 font-bold text-gray-900">
                          {TEXT_CONSTANTS.SUBMITTED_THANK_YOU_TITLE}
                        </CardTitle>
                        <div className="text-base text-gray-700 leading-relaxed">
                          <div className="mb-4">
                            {TEXT_CONSTANTS.SUBMITTED_THANK_YOU_MESSAGE_PART1}
                          </div>
                          <div>
                            {TEXT_CONSTANTS.SUBMITTED_THANK_YOU_MESSAGE_PART2}{" "}
                            <span className="font-bold text-gray-900">
                              {email}
                            </span>
                            .
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-0 pb-6">
                        <Button
                          variant="outline"
                          onClick={() => setIsSubmitted(false)}
                          className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold rounded-xl"
                        >
                          {TEXT_CONSTANTS.NEW_REQUEST_BUTTON}
                        </Button>
                        <Button
                          onClick={() =>
                            (window.location.href = "/add/calendar-form")
                          }
                          className="bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl shadow-lg"
                        >
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
    </PageLayout>
  );
};

export default ContactNous;
