import React, { useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load page components
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PoliceJudiciaire = lazy(() => import("./pages/realisations/PoliceJudiciaire"));
const EyanoSecurity = lazy(() => import("./pages/realisations/EyanoSecurity"));
const CreditShopAfrica = lazy(() => import("./pages/realisations/CreditShopAfrica"));
const DevelopmentProcess = lazy(() => import("./pages/realisations/DevelopmentProcess"));
const About = lazy(() => import("./pages/About"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostDetail = lazy(() => import("./pages/BlogPostDetail"));
const NetworkEngineering = lazy(() => import("./pages/services/NetworkEngineering"));
const VideoSurveillance = lazy(() => import("./pages/services/VideoSurveillance"));
const WebDevelopment = lazy(() => import("./pages/services/WebDevelopment"));
const ITManagement = lazy(() => import("./pages/services/ITManagement"));
const TechnicalSupport = lazy(() => import("./pages/services/TechnicalSupport"));
const SolarInstallation = lazy(() => import("./pages/services/SolarInstallation"));
const LinuxAdministration = lazy(() => import("./pages/formations/LinuxAdministration"));
const NetworkAdministration = lazy(() => import("./pages/formations/NetworkAdministration"));
const ComputerMaintenance = lazy(() => import("./pages/formations/ComputerMaintenance"));
const WindowsAdministration = lazy(() => import("./pages/formations/WindowsAdministration"));
const VirtualizationTraining = lazy(() => import("./pages/formations/VirtualizationTraining"));
const ContactNous = lazy(() => import("./pages/add/ContactNous"));
const CalendarForm = lazy(() => import("./pages/add/CalendarForm"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

// Constants for ErrorBoundary and Suspense fallback messages
const APP_MESSAGES = {
  ERROR_BOUNDARY_TITLE: "Oups ! Quelque chose s'est mal passé.",
  ERROR_BOUNDARY_P1: "Nous rencontrons un problème pour afficher cette partie de la page.",
  ERROR_BOUNDARY_P2: "Veuillez essayer de rafraîchir la page ou de revenir plus tard.",
  ERROR_DETAILS_SUMMARY: "Détails de l'erreur",
  LOADING_PROGRESS_INTERVAL_MS: 200,
  LOADING_PROGRESS_STEP: 5,
  MAX_LOADING_PROGRESS: 95,
};

// ErrorBoundary component to catch JavaScript errors in its child component tree
class ErrorBoundary extends React.Component<any, { hasError: boolean; error: Error | null; errorInfo: React.ErrorInfo | null }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Erreur détectée par ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI for errors
      return (
        <div className="flex items-center justify-center min-h-screen bg-red-50 text-red-700 p-4 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              {APP_MESSAGES.ERROR_BOUNDARY_TITLE}
            </h2>
            <p className="mb-2">
              {APP_MESSAGES.ERROR_BOUNDARY_P1}
            </p>
            <p className="text-sm text-red-500">
              {APP_MESSAGES.ERROR_BOUNDARY_P2}
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left p-2 bg-red-100 rounded">
                <summary>{APP_MESSAGES.ERROR_DETAILS_SUMMARY}</summary>
                <pre className="whitespace-pre-wrap break-all text-xs">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Effect to simulate loading progress for Suspense fallback
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress < APP_MESSAGES.MAX_LOADING_PROGRESS) {
          return prevProgress + APP_MESSAGES.LOADING_PROGRESS_STEP;
        }
        return prevProgress;
      });
    }, APP_MESSAGES.LOADING_PROGRESS_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <Suspense fallback={
              // Fallback UI for lazy loaded components
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
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/projects/realisations/police-judiciaire" element={<PoliceJudiciaire />} />
                <Route path="/projects/realisations/eyano-security" element={<EyanoSecurity />} />
                <Route path="/projects/realisations/credit-shop-africa" element={<CreditShopAfrica />} />
                <Route path="/development-process" element={<DevelopmentProcess />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPostDetail />} />
                <Route path="/services/network-engineering" element={<NetworkEngineering />} />
                <Route path="/services/video-surveillance" element={<VideoSurveillance />} />
                <Route path="/services/web-development" element={<WebDevelopment />} />
                <Route path="/services/it-management" element={<ITManagement />} />
                <Route path="/services/technical-support" element={<TechnicalSupport />} />
                <Route path="/services/solar-installation" element={<SolarInstallation />} />
                <Route path="/formations/linux-administration" element={<LinuxAdministration />} />
                <Route path="/formations/windows-administration" element={<WindowsAdministration />} />
                <Route path="/formations/virtualization-training" element={<VirtualizationTraining />} />
                <Route path="/formations/network-administration" element={<NetworkAdministration />} />
                <Route path="/formations/computer-maintenance" element={<ComputerMaintenance />} />
                <Route path="/add/contact-nous" element={<ContactNous />} />
                <Route path="/add/calendar-form" element={
                  <ProtectedRoute>
                    <CalendarForm />
                  </ProtectedRoute>
                } />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
