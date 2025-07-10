import React, { useEffect, useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, UserPlus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { motion } from "framer-motion";

// Constants for the SignUp component
const TEXT_CONSTANTS = {
  LOADING_PROGRESS_INTERVAL_MS: 200,
  INITIAL_LOADING_PROGRESS_STEP: 5,
  MAX_LOADING_PROGRESS: 95,
  SIGNUP_DELAY_MS: 700, // Simule un délai de chargement de 700ms pour l'inscription
  API_SIGNUP_ENDPOINT: "/api/auth/signup",
  NAV_CALENDAR_FORM: '/add/calendar-form',
  NAV_LOGIN: '/login',

  MESSAGES: {
    NAME_MIN_LENGTH: 'Le nom doit contenir au moins 3 caractères',
    NAME_MAX_LENGTH: 'Le nom ne peut pas dépasser 20 caractères',
    EMAIL_INVALID: 'Veuillez entrer une adresse email valide',
    PASSWORD_MIN_LENGTH: 'Le mot de passe doit contenir au moins 8 caractères',
    PASSWORD_MAX_LENGTH: 'Le mot de passe ne peut pas dépasser 20 caractères',
    PASSWORDS_MISMATCH: "Les mots de passe ne correspondent pas",
    SIGNUP_IN_PROGRESS: "Inscription en cours...",
    SIGNUP_BUTTON: "S'inscrire",
    HAS_ACCOUNT_QUESTION: "Déjà un compte ?",
    LOGIN_LINK: "Connectez-vous",
    PAGE_TITLE: "Inscription - Zetoun Labs",
    PAGE_DESCRIPTION: "Inscrivez-vous pour accéder à notre calendrier des formations en télécommunication",
    HEADING: "Créer un compte",
    SUBHEADING: "Inscrivez-vous pour accéder à notre calendrier des formations",
    SIGNUP_SUCCESS_TITLE: "Inscription réussie",
    SIGNUP_SUCCESS_DESCRIPTION: "Bienvenue sur notre plateforme de formations.",
    SIGNUP_ERROR_TITLE: "Erreur d'inscription",
    SIGNUP_ERROR_GENERIC: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
    NETWORK_ERROR_TITLE: "Erreur réseau",
    NETWORK_ERROR_DESCRIPTION: "Impossible de se connecter au serveur. Veuillez vérifier votre connexion.",
  },
  LOADING_SPINNER_ALT: "Animation de chargement",
};

const formSchema = z.object({
  name: z.string()
    .min(3, { message: TEXT_CONSTANTS.MESSAGES.NAME_MIN_LENGTH })
    .max(20, { message: TEXT_CONSTANTS.MESSAGES.NAME_MAX_LENGTH }),
  email: z.string()
    .email({ message: TEXT_CONSTANTS.MESSAGES.EMAIL_INVALID }),
  password: z.string()
    .min(8, { message: TEXT_CONSTANTS.MESSAGES.PASSWORD_MIN_LENGTH })
    .max(20, { message: TEXT_CONSTANTS.MESSAGES.PASSWORD_MAX_LENGTH }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: TEXT_CONSTANTS.MESSAGES.PASSWORDS_MISMATCH,
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
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

      const response = await fetch(TEXT_CONSTANTS.API_SIGNUP_ENDPOINT, {
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

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify({
          name: values.name,
          email: values.email,
          isAuthenticated: true,
          token: data.token
        }));

        toast({
          title: TEXT_CONSTANTS.MESSAGES.SIGNUP_SUCCESS_TITLE,
          description: TEXT_CONSTANTS.MESSAGES.SIGNUP_SUCCESS_DESCRIPTION,
        });

        navigate(TEXT_CONSTANTS.NAV_CALENDAR_FORM);
      } else {
        const errorData = await response.json().catch(() => ({ message: TEXT_CONSTANTS.MESSAGES.SIGNUP_ERROR_GENERIC }));
        setError(errorData.message || TEXT_CONSTANTS.MESSAGES.SIGNUP_ERROR_GENERIC);
        toast({
          title: TEXT_CONSTANTS.MESSAGES.SIGNUP_ERROR_TITLE,
          description: errorData.message || TEXT_CONSTANTS.MESSAGES.SIGNUP_ERROR_GENERIC,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('Erreur d\'inscription:', err);
      setError(TEXT_CONSTANTS.MESSAGES.NETWORK_ERROR_DESCRIPTION);
      toast({
        title: TEXT_CONSTANTS.MESSAGES.NETWORK_ERROR_TITLE,
        description: TEXT_CONSTANTS.MESSAGES.NETWORK_ERROR_DESCRIPTION,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
      <PageLayout showContact={false}>
        <SEO
          title={TEXT_CONSTANTS.MESSAGES.PAGE_TITLE}
          description={TEXT_CONSTANTS.MESSAGES.PAGE_DESCRIPTION}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className=" pt-24 pb-16 py-16 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center justify-center bg-gray-50"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md space-y-8"
          >
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-gray-900 font-space"
              >
                {TEXT_CONSTANTS.MESSAGES.HEADING}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-2 text-sm text-gray-600"
              >
                {TEXT_CONSTANTS.MESSAGES.SUBHEADING}
              </motion.p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Entrez votre nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="votre@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmation du mot de passe</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {TEXT_CONSTANTS.MESSAGES.SIGNUP_IN_PROGRESS}
                      </>
                    ) : (
                      <>
                        {TEXT_CONSTANTS.MESSAGES.SIGNUP_BUTTON} <UserPlus className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  {TEXT_CONSTANTS.MESSAGES.HAS_ACCOUNT_QUESTION}
                  <Button
                    variant="link"
                    onClick={() => navigate(TEXT_CONSTANTS.NAV_LOGIN)}
                    className="p-0 ml-2 text-blue-600 hover:text-blue-500"
                  >
                    {TEXT_CONSTANTS.MESSAGES.LOGIN_LINK}
                  </Button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </PageLayout>
    </Suspense>
  );
};

export default SignUp;
