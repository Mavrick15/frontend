import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, LogIn, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { motion } from "framer-motion";

const TEXT_CONSTANTS = {
  LOGIN_DELAY_MS: 700,
  API_LOGIN_ENDPOINT: "/api/auth/login",
  NAV_CALENDAR_FORM: '/add/calendar-form',
  NAV_SIGNUP: '/signup',

  MESSAGES: {
    EMAIL_INVALID: 'Veuillez entrer une adresse email valide',
    PASSWORD_REQUIRED: 'Le mot de passe est requis',
    LOGIN_SUCCESS_TITLE: "Connexion réussie",
    LOGIN_SUCCESS_DESCRIPTION: "Vous êtes maintenant connecté à votre compte.",
    LOGIN_ERROR_TITLE: "Erreur de connexion",
    LOGIN_ERROR_INVALID_CREDENTIALS: 'Identifiants invalides. Veuillez réessayer.',
    NETWORK_ERROR_TITLE: "Erreur réseau",
    NETWORK_ERROR_DESCRIPTION: "Impossible de se connecter au serveur. Veuillez vérifier votre connexion.",
    LOGIN_IN_PROGRESS: "Connexion en cours...",
    LOGIN_BUTTON: "Se connecter",
    NO_ACCOUNT_QUESTION: "Pas encore de compte ?",
    SIGNUP_LINK: "Inscrivez-vous",
    PAGE_TITLE: "Connexion - Zetoun Labs",
    PAGE_DESCRIPTION: "Connectez-vous pour accéder à notre calendrier des formations en télécommunication",
    HEADING: "Connexion",
    SUBHEADING: "Connectez-vous pour accéder à notre calendrier des formations",
  },
};

const formSchema = z.object({
  email: z.string().email({ message: TEXT_CONSTANTS.MESSAGES.EMAIL_INVALID }),
  password: z.string().min(1, { message: TEXT_CONSTANTS.MESSAGES.PASSWORD_REQUIRED }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, TEXT_CONSTANTS.LOGIN_DELAY_MS));

      const response = await fetch(TEXT_CONSTANTS.API_LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify({
          email: values.email,
          isAuthenticated: true,
          token: data.token
        }));

        toast({
          title: TEXT_CONSTANTS.MESSAGES.LOGIN_SUCCESS_TITLE,
          description: TEXT_CONSTANTS.MESSAGES.LOGIN_SUCCESS_DESCRIPTION,
        });

        navigate(TEXT_CONSTANTS.NAV_CALENDAR_FORM);
      } else {
        const errorData = await response.json();
        setError(errorData.message || TEXT_CONSTANTS.MESSAGES.LOGIN_ERROR_INVALID_CREDENTIALS);
        toast({
          title: TEXT_CONSTANTS.MESSAGES.LOGIN_ERROR_TITLE,
          description: errorData.message || TEXT_CONSTANTS.MESSAGES.LOGIN_ERROR_INVALID_CREDENTIALS,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('Login error:', err);
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
    <PageLayout showContact={false}>
      <SEO
        title={TEXT_CONSTANTS.MESSAGES.PAGE_TITLE}
        description={TEXT_CONSTANTS.MESSAGES.PAGE_DESCRIPTION}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-24 pb-16 py-16 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center justify-center bg-gray-50"
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

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {TEXT_CONSTANTS.MESSAGES.LOGIN_IN_PROGRESS}
                    </>
                  ) : (
                    <>
                      {TEXT_CONSTANTS.MESSAGES.LOGIN_BUTTON} <LogIn className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                {TEXT_CONSTANTS.MESSAGES.NO_ACCOUNT_QUESTION}
                <Button
                  variant="link"
                  onClick={() => navigate(TEXT_CONSTANTS.NAV_SIGNUP)}
                  className="p-0 ml-2 text-blue-600 hover:text-blue-500"
                >
                  {TEXT_CONSTANTS.MESSAGES.SIGNUP_LINK}
                </Button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Login;
