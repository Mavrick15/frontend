import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, UserPlus, Loader2, Mail, Lock, User, ArrowLeft, Calendar, FileCheck, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { ENDPOINTS } from '@/config/api.config';
import { useAuth } from '@/hooks/useAuth';
import { getNetworkErrorMessage, parseApiResponse } from '@/utils/apiMessages';

const TEXT_CONSTANTS = {
  SIGNUP_DELAY_MS: 700,
  NAV_CALENDAR_FORM: '/add/calendar-form',
  NAV_LOGIN: '/login',
  NAV_HOME: '/',

  MESSAGES: {
    NAME_MIN_LENGTH: 'Le nom doit contenir au moins 3 caractères',
    NAME_MAX_LENGTH: 'Le nom ne peut pas dépasser 20 caractères',
    EMAIL_INVALID: 'Veuillez entrer une adresse email valide',
    PASSWORD_MIN_LENGTH: 'Le mot de passe doit contenir au moins 8 caractères',
    PASSWORD_MAX_LENGTH: 'Le mot de passe ne peut pas dépasser 20 caractères',
    PASSWORDS_MISMATCH: 'Les mots de passe ne correspondent pas',
    SIGNUP_IN_PROGRESS: "Inscription en cours...",
    SIGNUP_BUTTON: "S'inscrire",
    HAS_ACCOUNT_QUESTION: 'Déjà un compte ?',
    LOGIN_LINK: 'Connectez-vous',
    PAGE_TITLE: 'Inscription - Zetoun Labs',
    PAGE_DESCRIPTION: "Inscrivez-vous pour accéder à notre calendrier des formations en télécommunication",
    HEADING: 'Créer un compte',
    SUBHEADING: "Inscrivez-vous pour accéder à notre calendrier des formations",
    SIGNUP_SUCCESS_TITLE: 'Inscription réussie',
    SIGNUP_SUCCESS_DESCRIPTION: 'Bienvenue sur notre plateforme de formations.',
    SIGNUP_ERROR_TITLE: "Erreur d'inscription",
    SIGNUP_ERROR_GENERIC: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
    NETWORK_ERROR_TITLE: 'Erreur réseau',
    NETWORK_ERROR_DESCRIPTION: 'Impossible de se connecter au serveur. Veuillez vérifier votre connexion.',
    BACK_HOME: "Retour à l'accueil",
    BENEFITS_TITLE: "Ce que vous obtenez",
    BENEFITS_INTRO: "En créant un compte, vous débloquez l'accès à nos formations et services réservés aux membres.",
    BENEFIT_CALENDAR: "Calendrier des formations",
    BENEFIT_CALENDAR_DESC: "Réservez vos places aux prochaines sessions Linux, Windows, Réseau, Virtualisation et plus.",
    BENEFIT_INVOICES: "Factures & suivi",
    BENEFIT_INVOICES_DESC: "Générez vos factures et suivez vos commandes depuis votre espace.",
    BENEFIT_CERTIFICATIONS: "Attestations",
    BENEFIT_CERTIFICATIONS_DESC: "Téléchargez vos attestations de formation après chaque session.",
    BENEFIT_SECURE: "Compte sécurisé",
    BENEFIT_SECURE_DESC: "Vos données sont protégées. Connexion par mot de passe sécurisé.",
  },
};

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: TEXT_CONSTANTS.MESSAGES.NAME_MIN_LENGTH })
      .max(20, { message: TEXT_CONSTANTS.MESSAGES.NAME_MAX_LENGTH }),
    email: z.string().email({ message: TEXT_CONSTANTS.MESSAGES.EMAIL_INVALID }),
    password: z
      .string()
      .min(8, { message: TEXT_CONSTANTS.MESSAGES.PASSWORD_MIN_LENGTH })
      .max(20, { message: TEXT_CONSTANTS.MESSAGES.PASSWORD_MAX_LENGTH }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: TEXT_CONSTANTS.MESSAGES.PASSWORDS_MISMATCH,
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

const SVG_PATTERN = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
};

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, TEXT_CONSTANTS.SIGNUP_DELAY_MS));

      const response = await fetch(ENDPOINTS.AUTH.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const { ok, data, errorMessage } = await parseApiResponse(response);

      if (ok) {
        const user = data.user as { _id: string; name: string; email: string; role?: string };
        login(
          {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: (user.role as "user" | "admin") ?? "user",
          },
          data.token as string,
          data.refreshToken as string
        );

        toast({
          title: TEXT_CONSTANTS.MESSAGES.SIGNUP_SUCCESS_TITLE,
          description: (data.message as string) || TEXT_CONSTANTS.MESSAGES.SIGNUP_SUCCESS_DESCRIPTION,
        });

        navigate(TEXT_CONSTANTS.NAV_CALENDAR_FORM);
      } else {
        const msg = errorMessage || TEXT_CONSTANTS.MESSAGES.SIGNUP_ERROR_GENERIC;
        setError(msg);
        toast({
          title: TEXT_CONSTANTS.MESSAGES.SIGNUP_ERROR_TITLE,
          description: msg,
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error("Erreur d'inscription:", err);
      const msg = getNetworkErrorMessage();
      setError(msg);
      toast({
        title: TEXT_CONSTANTS.MESSAGES.NETWORK_ERROR_TITLE,
        description: msg,
        variant: 'destructive',
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
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:max-w-none flex flex-col items-center lg:items-start pt-8 lg:pt-12">
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Nom complet</FormLabel>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                        <FormControl>
                          <Input
                            autoComplete="name"
                            placeholder="Entrez votre nom"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Adresse email</FormLabel>
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
                      <FormLabel className="text-gray-700 font-semibold">Mot de passe</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                        <FormControl>
                          <Input
                            type="password"
                            autoComplete="new-password"
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Confirmation du mot de passe</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                        <FormControl>
                          <Input
                            type="password"
                            autoComplete="new-password"
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
                      {TEXT_CONSTANTS.MESSAGES.SIGNUP_IN_PROGRESS}
                    </>
                  ) : (
                    <>
                      {TEXT_CONSTANTS.MESSAGES.SIGNUP_BUTTON}
                      <UserPlus className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <p className="mt-6 text-center text-sm text-gray-600">
              {TEXT_CONSTANTS.MESSAGES.HAS_ACCOUNT_QUESTION}{' '}
              <Button
                type="button"
                variant="link"
                onClick={() => navigate(TEXT_CONSTANTS.NAV_LOGIN)}
                className="p-0 ml-1 text-gray-900 font-semibold hover:text-gray-700 hover:underline"
              >
                {TEXT_CONSTANTS.MESSAGES.LOGIN_LINK}
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
                {TEXT_CONSTANTS.MESSAGES.BENEFITS_TITLE}
              </h2>
              <p className="text-gray-600 mt-2">
                {TEXT_CONSTANTS.MESSAGES.BENEFITS_INTRO}
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
                <h3 className="font-semibold text-gray-900 mb-1">{TEXT_CONSTANTS.MESSAGES.BENEFIT_CALENDAR}</h3>
                <p className="text-sm text-gray-600">{TEXT_CONSTANTS.MESSAGES.BENEFIT_CALENDAR_DESC}</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="p-2.5 rounded-xl bg-gray-900 text-white w-fit mb-3">
                  <FileCheck className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{TEXT_CONSTANTS.MESSAGES.BENEFIT_INVOICES}</h3>
                <p className="text-sm text-gray-600">{TEXT_CONSTANTS.MESSAGES.BENEFIT_INVOICES_DESC}</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="p-2.5 rounded-xl bg-gray-900 text-white w-fit mb-3">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{TEXT_CONSTANTS.MESSAGES.BENEFIT_CERTIFICATIONS}</h3>
                <p className="text-sm text-gray-600">{TEXT_CONSTANTS.MESSAGES.BENEFIT_CERTIFICATIONS_DESC}</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="p-2.5 rounded-xl bg-gray-900 text-white w-fit mb-3">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{TEXT_CONSTANTS.MESSAGES.BENEFIT_SECURE}</h3>
                <p className="text-sm text-gray-600">{TEXT_CONSTANTS.MESSAGES.BENEFIT_SECURE_DESC}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      </div>
    </PageLayout>
  );
};

export default SignUp;
