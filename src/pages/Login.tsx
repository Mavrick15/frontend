import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, LogIn, Loader2, ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { motion } from "framer-motion";
import { ENDPOINTS } from '@/config/api.config';

const PasswordInput = React.forwardRef(({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = isPasswordVisible ? 'text' : 'password';

  return (
    <div className="relative flex items-center">
      <Lock className="absolute left-3 text-gray-400 h-5 w-5" />
      <Input
        type={inputType}
        className={`pl-10 ${className}`}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        className="absolute right-3 text-gray-400 hover:text-white focus:outline-none"
      >
        {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

const TEXT_CONSTANTS = {
  LOGIN_DELAY_MS: 700,
  NAV_CALENDAR_FORM: '/add/calendar-form',
  NAV_SIGNUP: '/signup',
  NAV_HOME: '/',

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
    SUBHEADING: "Accédez à votre compte",
    REMEMBER_ME: "Se souvenir de moi",
    FORGOT_PASSWORD: "Mot de passe oublié ?",
    OR_TEXT: "ou",
    BACK_TO_HOME: "Retour à l'accueil",
  },
};

const FIREWORKS_COLORS = [
  '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF',
  '#4B0082', '#9400D3', '#FFC0CB', '#ADD8E6', '#FFFFFF',
];

const getRandomColor = () => {
  return FIREWORKS_COLORS[Math.floor(Math.random() * FIREWORKS_COLORS.length)];
};

const formSchema = z.object({
  email: z.string()
    .email({ message: TEXT_CONSTANTS.MESSAGES.EMAIL_INVALID }),
  password: z.string()
    .min(1, { message: TEXT_CONSTANTS.MESSAGES.PASSWORD_REQUIRED }),
  rememberMe: z.boolean().optional(), // Add rememberMe to the schema
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drops: any[] = [];
    const splashes: any[] = [];
    const numDrops = 100;
    const maxSplashLife = 25;

    for (let i = 0; i < numDrops; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 3 + 1,
        color: getRandomColor(),
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
        ctx.fillStyle = drop.color;
        ctx.fill();

        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          const numSplashParticles = 10;
          const splashParticles = [];
          for (let j = 0; j < numSplashParticles; j++) {
            const angle = Math.random() * Math.PI;
            const speed = Math.random() * 6 + 2;
            splashParticles.push({
              x: drop.x,
              y: canvas.height,
              vx: Math.cos(angle) * speed,
              vy: -Math.sin(angle) * speed,
              life: maxSplashLife,
              color: getRandomColor(),
              radius: Math.random() * 1 + 0.5,
            });
          }
          splashes.push({ particles: splashParticles });

          drop.y = -drop.radius;
          drop.x = Math.random() * canvas.width;
          drop.color = getRandomColor();
        }
      }

      for (let i = splashes.length - 1; i >= 0; i--) {
        const splash = splashes[i];
        for (let j = splash.particles.length - 1; j >= 0; j--) {
          const particle = splash.particles[j];

          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.2;
          particle.life--;

          const opacity = particle.life / maxSplashLife;
          if (opacity > 0) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${parseInt(particle.color.slice(1, 3), 16)}, ${parseInt(particle.color.slice(3, 5), 16)}, ${parseInt(particle.color.slice(5, 7), 16)}, ${opacity})`;
            ctx.fill();
          } else {
            splash.particles.splice(j, 1);
          }
        }
        if (splash.particles.length === 0) {
          splashes.splice(i, 1);
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    animate();
  }, []);

  useEffect(() => {
    drawParticles();

    const handleResize = () => {
      drawParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [drawParticles]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false, // Set default value for rememberMe
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, TEXT_CONSTANTS.LOGIN_DELAY_MS));

      const response = await fetch(ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
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

      <div className="relative min-h-screen bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 pt-16 pb-12 py-12 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center justify-center"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            // Apply ContactInfo's card styles: darker background, gray-700 border, rounded-3xl
            className="w-full max-w-md bg-gray-900 rounded-3xl shadow-2xl p-6 border border-gray-700 relative overflow-hidden"
          >
            {/* Removed the fancy gradient border to match ContactInfo's simpler border */}

            <div className="flex flex-col items-center mb-6 relative z-10">
              {/* Icon container: bg-gray-700 for a solid dark background, matching ContactInfo's subtle dark elements */}
              <motion.div
                className="bg-gray-700 p-5 rounded-full mb-4 shadow-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <LogIn className="h-9 w-9 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-2">{TEXT_CONSTANTS.MESSAGES.HEADING}</h1>
              <p className="text-gray-400 text-sm text-center">{TEXT_CONSTANTS.MESSAGES.SUBHEADING}</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 mb-6"
              >
                <Alert variant="destructive" className="bg-red-900 text-red-200 border-red-700">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative z-10"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Adresse email</FormLabel>
                        <FormControl>
                          <div className="relative flex items-center">
                            <Mail className="absolute left-3 text-gray-400 h-5 w-5" />
                            <Input
                              type="email"
                              placeholder="votre@email.com"
                              // Input style aligned with ContactInfo's dark theme
                              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 h-12 rounded-lg"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Mot de passe</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="••••••••"
                            // Input style aligned with ContactInfo's dark theme
                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 h-12 rounded-lg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between text-sm mt-4 pr-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember-me"
                        // Correctly bind checkbox value using form.watch and form.setValue
                        checked={form.watch('rememberMe')}
                        onChange={(e) => form.setValue('rememberMe', e.target.checked)}
                        // Consistent styling for checkbox
                        className="h-4 w-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 cursor-pointer"
                      />
                      <label htmlFor="remember-me" className="text-sm font-medium text-gray-400 cursor-pointer">
                        {TEXT_CONSTANTS.MESSAGES.REMEMBER_ME}
                      </label>
                    </div>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                      {TEXT_CONSTANTS.MESSAGES.FORGOT_PASSWORD}
                    </a>
                  </div>

                  <Button
                    type="submit"
                    // Button style aligned with ContactInfo's button (white text, gray background, subtle hover)
                    className="w-full py-3 text-lg bg-white text-gray-900 font-bold hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-lg mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {TEXT_CONSTANTS.MESSAGES.LOGIN_IN_PROGRESS}
                      </>
                    ) : (
                      <>
                        {TEXT_CONSTANTS.MESSAGES.LOGIN_BUTTON} <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="relative flex items-center justify-center my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-700"></span>
                </div>
                <div className="relative z-10 bg-gray-900 px-4 text-sm text-gray-400">
                  {TEXT_CONSTANTS.MESSAGES.OR_TEXT}
                </div>
              </div>

              <p className="text-center text-gray-400 text-sm mb-4">
                {TEXT_CONSTANTS.MESSAGES.NO_ACCOUNT_QUESTION}{' '}
                <a onClick={() => navigate(TEXT_CONSTANTS.NAV_SIGNUP)} className="text-gray-300 hover:text-white transition-colors duration-200 font-medium cursor-pointer">
                  {TEXT_CONSTANTS.MESSAGES.SIGNUP_LINK}
                </a>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Login;
