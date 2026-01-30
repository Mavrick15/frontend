import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ENDPOINTS } from "@/config/api.config";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Calendar,
  FileCheck,
  Loader2,
  Lock,
  LogIn,
  Mail,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { getApiErrorMessage, getNetworkErrorMessage, parseApiResponse } from "@/utils/apiMessages";

const TEXT_CONSTANTS = {
  LOGIN_DELAY_MS: 700,
  NAV_CALENDAR_FORM: "/add/calendar-form",
  NAV_SIGNUP: "/signup",
  NAV_HOME: "/",

  MESSAGES: {
    EMAIL_INVALID: "Veuillez entrer une adresse email valide",
    PASSWORD_REQUIRED: "Le mot de passe est requis",
    LOGIN_SUCCESS_TITLE: "Connexion réussie",
    LOGIN_SUCCESS_DESCRIPTION: "Vous êtes maintenant connecté à votre compte.",
    LOGIN_ERROR_TITLE: "Erreur de connexion",
    LOGIN_ERROR_INVALID_CREDENTIALS:
      "Identifiants invalides. Veuillez réessayer.",
    NETWORK_ERROR_TITLE: "Erreur réseau",
    NETWORK_ERROR_DESCRIPTION:
      "Impossible de se connecter au serveur. Veuillez vérifier votre connexion.",
    LOGIN_IN_PROGRESS: "Connexion en cours...",
    LOGIN_BUTTON: "Se connecter",
    NO_ACCOUNT_QUESTION: "Pas encore de compte ?",
    SIGNUP_LINK: "Inscrivez-vous",
    PAGE_TITLE: "Connexion - Zetoun Labs",
    PAGE_DESCRIPTION:
      "Connectez-vous pour accéder à notre calendrier des formations en télécommunication",
    HEADING: "Connexion",
    SUBHEADING: "Connectez-vous pour accéder à notre calendrier des formations",
    BACK_HOME: "Retour à l'accueil",
    WHY_TITLE: "Pourquoi se connecter ?",
    WHY_INTRO:
      "Accédez à l'ensemble des services réservés aux membres Zetoun Labs.",
    WHY_CALENDAR: "Calendrier des formations",
    WHY_CALENDAR_DESC:
      "Consultez et réservez vos places aux prochaines sessions.",
    WHY_INSCRIPTIONS: "Vos inscriptions",
    WHY_INSCRIPTIONS_DESC:
      "Suivez vos formations et téléchargez vos attestations.",
    WHY_INVOICES: "Factures & historique",
    WHY_INVOICES_DESC:
      "Retrouvez vos factures et votre historique de commandes.",
    WHY_SECURE: "Connexion sécurisée",
    WHY_SECURE_DESC: "Vos données sont protégées et chiffrées.",
  },
};

const formSchema = z.object({
  email: z.string().email({ message: TEXT_CONSTANTS.MESSAGES.EMAIL_INVALID }),
  password: z
    .string()
    .min(1, { message: TEXT_CONSTANTS.MESSAGES.PASSWORD_REQUIRED }),
});

type FormValues = z.infer<typeof formSchema>;

const SVG_PATTERN = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
};

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, TEXT_CONSTANTS.LOGIN_DELAY_MS),
      );

      const response = await fetch(ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const { ok, data, errorMessage } = await parseApiResponse(response);

      if (ok) {
        login(
          {
            _id: (data.user as { _id: string })._id,
            name: (data.user as { name: string }).name,
            email: (data.user as { email: string }).email,
            role: ((data.user as { role?: string }).role as "user" | "admin") ?? "user",
          },
          data.token as string,
          data.refreshToken as string,
        );

        toast({
          title: TEXT_CONSTANTS.MESSAGES.LOGIN_SUCCESS_TITLE,
          description: (data.message as string) || TEXT_CONSTANTS.MESSAGES.LOGIN_SUCCESS_DESCRIPTION,
        });

        navigate(TEXT_CONSTANTS.NAV_CALENDAR_FORM);
      } else {
        const msg = errorMessage || TEXT_CONSTANTS.MESSAGES.LOGIN_ERROR_INVALID_CREDENTIALS;
        setError(msg);
        toast({
          title: TEXT_CONSTANTS.MESSAGES.LOGIN_ERROR_TITLE,
          description: msg,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      const msg = getNetworkErrorMessage();
      setError(msg);
      toast({
        title: TEXT_CONSTANTS.MESSAGES.NETWORK_ERROR_TITLE,
        description: msg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout showContact={false}>
      <SEO
        title={TEXT_CONSTANTS.MESSAGES.PAGE_TITLE}
        description={TEXT_CONSTANTS.MESSAGES.PAGE_DESCRIPTION}
      />

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-b-3xl shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 opacity-30" style={SVG_PATTERN} />
          <div className="container mx-auto px-4 relative z-10">
            <Link
              to={TEXT_CONSTANTS.NAV_HOME}
              className="inline-flex items-center text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {TEXT_CONSTANTS.MESSAGES.BACK_HOME}
            </Link>
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-extrabold font-space drop-shadow-lg">
                {TEXT_CONSTANTS.MESSAGES.HEADING}
              </h1>
              <p className="mt-3 text-lg text-gray-200">
                {TEXT_CONSTANTS.MESSAGES.SUBHEADING}
              </p>
            </div>
          </div>
        </motion.header>

        {/* Form section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 container mx-auto px-4 sm:px-6 -mt-8 relative z-20 pt-16 sm:pt-20 pb-32"
        >
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Colonne gauche : formulaire (aligné avec les cartes à droite) */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:max-w-none flex flex-col items-center lg:items-start pt-8 lg:pt-10">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full mb-6"
                  >
                    <Alert
                      variant="destructive"
                      className="rounded-xl border-red-200 bg-red-50/90 backdrop-blur-sm"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl p-8 sm:p-10"
              >
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">
                            Adresse email
                          </FormLabel>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            <FormControl>
                              <Input
                                type="email"
                                autoComplete="email"
                                placeholder="votre@email.com"
                                className="pl-11 rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900 bg-white/90 transition-all"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">
                            Mot de passe
                          </FormLabel>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            <FormControl>
                              <Input
                                type="password"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="pl-11 rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900 bg-white/90 transition-all"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {TEXT_CONSTANTS.MESSAGES.LOGIN_IN_PROGRESS}
                        </>
                      ) : (
                        <>
                          {TEXT_CONSTANTS.MESSAGES.LOGIN_BUTTON}
                          <LogIn className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>

                <p className="mt-6 text-center text-sm text-gray-600">
                  {TEXT_CONSTANTS.MESSAGES.NO_ACCOUNT_QUESTION}{" "}
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => navigate(TEXT_CONSTANTS.NAV_SIGNUP)}
                    className="p-0 ml-1 text-gray-900 font-semibold hover:text-gray-700 hover:underline"
                  >
                    {TEXT_CONSTANTS.MESSAGES.SIGNUP_LINK}
                  </Button>
                </p>
              </motion.div>
            </div>

            {/* Colonne droite : avantages */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full space-y-8 pt-8 lg:pt-12 lg:sticky lg:top-24"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 font-space mb-2">
                  {TEXT_CONSTANTS.MESSAGES.WHY_TITLE}
                </h2>
                <p className="text-gray-600 mt-2">
                  {TEXT_CONSTANTS.MESSAGES.WHY_INTRO}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="p-2.5 rounded-xl bg-gray-900 text-white w-fit mb-3">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {TEXT_CONSTANTS.MESSAGES.WHY_CALENDAR}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {TEXT_CONSTANTS.MESSAGES.WHY_CALENDAR_DESC}
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="p-2.5 rounded-xl bg-gray-900 text-white w-fit mb-3">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {TEXT_CONSTANTS.MESSAGES.WHY_INSCRIPTIONS}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {TEXT_CONSTANTS.MESSAGES.WHY_INSCRIPTIONS_DESC}
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="p-2.5 rounded-xl bg-gray-900 text-white w-fit mb-3">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {TEXT_CONSTANTS.MESSAGES.WHY_INVOICES}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {TEXT_CONSTANTS.MESSAGES.WHY_INVOICES_DESC}
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="p-2.5 rounded-xl bg-gray-900 text-white w-fit mb-3">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {TEXT_CONSTANTS.MESSAGES.WHY_SECURE}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {TEXT_CONSTANTS.MESSAGES.WHY_SECURE_DESC}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </PageLayout>
  );
};

export default Login;
