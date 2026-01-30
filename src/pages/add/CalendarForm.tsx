import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPin, Clock, Users, UserCircle, Search, Filter, AlertCircle, ArrowLeft, DollarSign, ShoppingCart, Star, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import useFormations, { Formation } from '@/hooks/useFormations';
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useCart, CartItem as ICartItem } from '@/hooks/CartContext';

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const TEXT_CONSTANTS = {
  DEBOUNCE_DELAY_MS: 500,
  FORMATIONS_LIMIT_PER_PAGE: 5,
  EMPTY_STATE_TITLE: "Aucune formation trouvée",
  EMPTY_STATE_DESCRIPTION: "Veuillez ajuster vos critères de recherche ou consulter notre catalogue complet.",
  ERROR_STATE_TITLE: "Une erreur est survenue",
  ERROR_STATE_BUTTON_TEXT: "Réessayer",
  CUSTOM_FORMATION_SECTION_TITLE: "Vous ne trouvez pas la formation que vous cherchez ?",
  CUSTOM_FORMATION_SECTION_DESCRIPTION: "Nous proposons également des formations sur mesure adaptées aux besoins spécifiques de votre entreprise. Contactez-nous pour discuter de vos exigences en matière de formation.",
  CUSTOM_FORMATION_SECTION_BUTTON_TEXT: "Demander une formation personnalisée",
  CUSTOM_FORMATION_SECTION_LINK: "/add/contact-nous",
  ICON_CLASS: "h-5 w-5 text-blue-600 mr-3 mt-0.5",
  CARD_BOTTOM_BORDER_CLASS: "flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-4",
  SEO_TITLE: "Calendrier des formations - Zetoun Labs",
  SEO_DESCRIPTION: "Consultez notre calendrier de formations et trouvez la session qui vous convient.",
  BACK_TO_HOME: "Retour à l'accueil",
  CALENDAR_TITLE: "Calendrier des formations",
  CALENDAR_SUBTITLE: "Découvrez nos prochaines sessions de formation et inscrivez-vous dès aujourd'hui !",
  SEARCH_PLACEHOLDER: "Rechercher une formation...",
  FORMATIONS_AVAILABLE_TEXT: "formation(s) disponible(s)",
  LOADING_TEXT: "Chargement...",
  DATE_LABEL: "Date",
  LOCATION_LABEL: "Lieu",
  DURATION_LABEL: "Durée",
  AVAILABLE_SEATS_LABEL: "Places disponibles",
  PRICE_LABEL: "Prix",
  INSTRUCTOR_LABEL: "Formateur",
  ADD_TO_CART_BUTTON: "+ panier",
  ADD_TO_CART_ICON_ALT: "Ajouter au panier",
  VIEW_CART_BUTTON: "Voir panier",
  RATING_LABEL: "Note",
  REVIEWS_LABEL: "avis",
  RATING_SUCCESS_TITLE: "Note enregistrée",
  RATING_SUCCESS_DESCRIPTION: "Vous avez noté cette formation {rating} étoiles.",
  ADD_TO_CART_SUCCESS: "Formation ajoutée au panier !",
  ALREADY_IN_CART: "Cette formation est déjà dans votre panier.",
};

const CalendarForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, TEXT_CONSTANTS.DEBOUNCE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    formations,
    loading,
    error,
    pagination,
    goToPage,
    refetch
  } = useFormations({
    limit: TEXT_CONSTANTS.FORMATIONS_LIMIT_PER_PAGE,
    searchTerm: debouncedSearchTerm
  });

  const handleRatingChange = (courseId: string, selectedRating: number) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [courseId]: selectedRating,
    }));
    toast({
      title: TEXT_CONSTANTS.RATING_SUCCESS_TITLE,
      description: TEXT_CONSTANTS.RATING_SUCCESS_DESCRIPTION.replace('{rating}', selectedRating.toString()),
    });
  };

  const renderSkeletons = () => {
    return Array(TEXT_CONSTANTS.FORMATIONS_LIMIT_PER_PAGE).fill(0).map((_, index) => (
      <Card key={`skeleton-${index}`} className="overflow-hidden border-0 shadow-md">
        <div className="grid md:grid-cols-3 gap-0">
          <div className="relative h-[200px] md:h-full bg-gray-100">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="p-6 md:col-span-2">
            <div className="space-y-4">
              <div>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-1" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {Array(5).fill(0).map((_, idx) => (
                  <div key={`detail-${idx}`} className="flex items-start">
                    <Skeleton className="h-5 w-5 mr-3" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-4 border-t border-gray-100 pt-4">
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    ));
  };

  return (
    <PageLayout>
      <SEO
        title={TEXT_CONSTANTS.SEO_TITLE}
        description={TEXT_CONSTANTS.SEO_DESCRIPTION}
      />
        <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-screen">
          <div className="container mx-auto">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link 
                  to="/" 
                  className="inline-flex items-center group text-gray-600 hover:text-gray-900 mb-8 transition-all duration-300 font-medium"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  {TEXT_CONSTANTS.BACK_TO_HOME}
                </Link>
              </motion.div>

              <motion.div
                initial="initial"
                animate="animate"
                variants={containerVariants}
                className="text-center mb-12"
              >
                <motion.div
                  variants={textVariants}
                  className="inline-block mb-4"
                >
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-900 text-sm font-semibold mb-4">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Calendrier des formations
                  </span>
                </motion.div>
                <motion.h1
                  variants={textVariants}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-space leading-tight"
                >
                  {TEXT_CONSTANTS.CALENDAR_TITLE}
                </motion.h1>
                <motion.p
                  variants={textVariants}
                  className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                >
                  {TEXT_CONSTANTS.CALENDAR_SUBTITLE}
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-10"
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                  <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder={TEXT_CONSTANTS.SEARCH_PLACEHOLDER}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 pr-4 py-3 border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 rounded-xl w-full transition-all duration-300 bg-white"
                    />
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="px-4 py-2 bg-gray-900 rounded-lg text-white font-semibold shadow-md">
                      <span className="text-sm sm:text-base">
                        {pagination?.total || 0} {TEXT_CONSTANTS.FORMATIONS_AVAILABLE_TEXT}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading-skeletons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 gap-8 mb-8"
                  >
                    {renderSkeletons()}
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error-message"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100 mb-8"
                  >
                    <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{TEXT_CONSTANTS.ERROR_STATE_TITLE}</h3>
                    <p className="text-gray-600">{error}</p>
                    <Button
                      variant="outline"
                      onClick={refetch}
                      className="mt-4"
                    >
                      {TEXT_CONSTANTS.ERROR_STATE_BUTTON_TEXT}
                    </Button>
                  </motion.div>
                ) : formations?.length === 0 ? (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100"
                  >
                    <Filter className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{TEXT_CONSTANTS.EMPTY_STATE_TITLE}</h3>
                    <p className="text-gray-600">{TEXT_CONSTANTS.EMPTY_STATE_DESCRIPTION}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="formations-list"
                    initial="initial"
                    animate="animate"
                    variants={containerVariants}
                    className="grid grid-cols-1 gap-8 mb-8"
                  >
                    {formations.map((course, index) => (
                      <FormationCard
                        key={course._id}
                        course={course}
                        index={index}
                        toast={toast}
                        userRating={ratings[course._id] || 0}
                        onRatingChange={handleRatingChange}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {!loading && !error && formations?.length > 0 && pagination?.pages > 1 && (
                <Pagination className="my-8">
                  <PaginationContent className="flex flex-wrap justify-center gap-2">
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (pagination.offset > 0) {
                            const prevPage = Math.floor(pagination.offset / pagination.limit);
                            goToPage(prevPage);
                          }
                        }}
                        className={pagination.offset === 0 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>

                    <div className="hidden sm:flex flex-wrap justify-center gap-2">
                      {Array.from({ length: pagination.pages }, (_, i) => (
                        <PaginationItem key={i + 1}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              goToPage(i + 1);
                            }}
                            isActive={Math.floor(pagination.offset / pagination.limit) + 1 === i + 1}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </div>

                    {pagination.pages > 1 && (
                      <div className="flex sm:hidden flex-wrap justify-center gap-2">
                          <PaginationItem>
                              <PaginationLink
                              href="#"
                              onClick={(e) => { e.preventDefault(); goToPage(1); }}
                              isActive={Math.floor(pagination.offset / pagination.limit) + 1 === 1}
                              >
                              1
                              </PaginationLink>
                          </PaginationItem>

                          {Math.floor(pagination.offset / pagination.limit) + 1 > 2 && (
                              <PaginationItem>
                              <span className="px-3 py-1.5 text-gray-500">...</span>
                              </PaginationItem>
                          )}

                          {Math.floor(pagination.offset / pagination.limit) + 1 !== 1 &&
                          Math.floor(pagination.offset / pagination.limit) + 1 !== pagination.pages && (
                              <PaginationItem>
                              <PaginationLink
                                  href="#"
                                  onClick={(e) => { e.preventDefault(); goToPage(Math.floor(pagination.offset / pagination.limit) + 1); }}
                                  isActive={true}
                              >
                                  {Math.floor(pagination.offset / pagination.limit) + 1}
                              </PaginationLink>
                              </PaginationItem>
                          )}

                          {Math.floor(pagination.offset / pagination.limit) + 1 < pagination.pages - 1 && (
                              <PaginationItem>
                              <span className="px-3 py-1.5 text-gray-500">...</span>
                              </PaginationItem>
                          )}

                          {pagination.pages > 1 && (
                              <PaginationItem>
                              <PaginationLink
                                  href="#"
                                  onClick={(e) => { e.preventDefault(); goToPage(pagination.pages); }}
                                  isActive={Math.floor(pagination.offset / pagination.limit) + 1 === pagination.pages}
                              >
                                  {pagination.pages}
                              </PaginationLink>
                              </PaginationItem>
                          )}
                      </div>
                    )}


                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;
                          if (currentPage < pagination.pages) {
                            goToPage(currentPage + 1);
                          }
                        }}
                        className={Math.floor(pagination.offset / pagination.limit) + 1 >= pagination.pages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 lg:p-12 rounded-2xl text-center shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
                <div className="relative z-10">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                    {TEXT_CONSTANTS.CUSTOM_FORMATION_SECTION_TITLE}
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                    {TEXT_CONSTANTS.CUSTOM_FORMATION_SECTION_DESCRIPTION}
                  </p>
                  <Link to={TEXT_CONSTANTS.CUSTOM_FORMATION_SECTION_LINK}>
                    <Button
                      className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-3 text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      {TEXT_CONSTANTS.CUSTOM_FORMATION_SECTION_BUTTON_TEXT}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
    </PageLayout>
  );
};

interface ToastFunction {
  (props: {
    title?: React.ReactNode;
    description?: React.ReactNode;
    variant?: 'default' | 'destructive';
  }): {
    id: string;
    dismiss: () => void;
    update: (props: unknown) => void;
  };
}

interface FormationCardProps {
  course: Formation;
  index: number;
  toast: ToastFunction;
  userRating: number;
  onRatingChange: (courseId: string, rating: number) => void;
}

const FormationCard = ({ course, index, toast, userRating, onRatingChange }: FormationCardProps) => {
  const navigate = useNavigate();
  const { addToCart, isCourseInCart } = useCart();
  const alreadyInCart = isCourseInCart(course._id);

  const handleAddToCart = () => {
    const itemToAdd: ICartItem = {
      _id: course._id,
      title: course.title,
      price: course.price,
      image: course.image,
      formateur: course.instructor,
      level: course.level,
      duration: course.duration,
    };

    addToCart(itemToAdd);
    toast({
      title: alreadyInCart ? TEXT_CONSTANTS.ALREADY_IN_CART : TEXT_CONSTANTS.ADD_TO_CART_SUCCESS,
      description: alreadyInCart ? `${course.title} est déjà dans votre panier.` : `${course.title} a été ajoutée à votre panier.`,
    });
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  const handleStarClick = (selectedRating: number) => {
    onRatingChange(course._id, selectedRating);
  };

  const displayRating = userRating > 0 ? userRating : 4.5;

  const renderStars = (currentRating: number, onStarClick: (rating: number) => void) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 cursor-pointer ${
            currentRating >= i ? "fill-gray-900 text-gray-900" : "text-gray-300"
          }`}
          onClick={() => onStarClick(i)}
        />
      );
    }
    return stars;
  };

  return (
    <motion.div
      key={course._id}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Card className={`overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white/90 backdrop-blur-sm group hover:-translate-y-1`}>
        <div className="grid md:grid-cols-3 gap-0">
          {course.image && (
            <div className="relative h-full min-h-[250px] md:min-h-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/300x200/e2e8f0/64748b?text=${course.title.split(' ').map(n => n[0]).join('')}`;
                  e.currentTarget.alt = "Image placeholder";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-white/95 text-gray-900 hover:bg-white backdrop-blur-md font-semibold px-4 py-1.5 shadow-lg border border-gray-200/50">
                  {course.level}
                </Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4 md:hidden z-10">
                <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/50">
                  <p className="font-bold text-lg text-gray-900">
                    {course.price === 0 ? "Gratuit" : typeof course.price === 'number' ? `${course.price.toFixed(2)}$` : course.price}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">{course.seats} places disponibles</p>
                </div>
              </div>
            </div>
          )}
          <div className={`p-6 lg:p-8 ${course.image ? 'md:col-span-2' : 'md:col-span-3'}`}>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 leading-tight">
                  {course.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-base">{course.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="flex items-start group/item p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover/item:bg-gray-200 transition-colors">
                    <CalendarIcon className="h-5 w-5 text-gray-900" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900 text-sm">{TEXT_CONSTANTS.DATE_LABEL}</p>
                    <p className="text-gray-700 font-medium">{course.date}</p>
                  </div>
                </div>
                <div className="flex items-start group/item p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover/item:bg-gray-200 transition-colors">
                    <MapPin className="h-5 w-5 text-gray-900" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900 text-sm">{TEXT_CONSTANTS.LOCATION_LABEL}</p>
                    <p className="text-gray-700 font-medium">{course.location}</p>
                  </div>
                </div>
                <div className="flex items-start group/item p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover/item:bg-gray-200 transition-colors">
                    <Clock className="h-5 w-5 text-gray-900" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900 text-sm">{TEXT_CONSTANTS.DURATION_LABEL}</p>
                    <p className="text-gray-700 font-medium">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-start group/item p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover/item:bg-gray-200 transition-colors">
                    <Users className="h-5 w-5 text-gray-900" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900 text-sm">{TEXT_CONSTANTS.AVAILABLE_SEATS_LABEL}</p>
                    <p className="text-gray-700 font-medium">{course.seats} places</p>
                  </div>
                </div>
                <div className="flex items-start group/item p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover/item:bg-gray-200 transition-colors">
                    <DollarSign className="h-5 w-5 text-gray-900" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900 text-sm">{TEXT_CONSTANTS.PRICE_LABEL}</p>
                    <p className="text-gray-900 font-bold text-lg">
                      {course.price === 0 ? "Gratuit" : typeof course.price === 'number' ? `${course.price.toFixed(2)}$` : course.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-start group/item p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover/item:bg-gray-200 transition-colors">
                    <UserCircle className="h-5 w-5 text-gray-900" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900 text-sm">{TEXT_CONSTANTS.INSTRUCTOR_LABEL}</p>
                    <p className="text-gray-700 font-medium">{course.instructor}</p>
                  </div>
                </div>
              </div>

              <div className={`${TEXT_CONSTANTS.CARD_BOTTOM_BORDER_CLASS} bg-gradient-to-r from-gray-50 to-gray-100 -mx-6 lg:-mx-8 px-6 lg:px-8 py-5 rounded-b-lg`}>
                <div className="flex items-center mb-4 sm:mb-0">
                  <span className="font-semibold text-gray-700 mr-3">{TEXT_CONSTANTS.RATING_LABEL}:</span>
                  <div className="flex items-center gap-1">
                    {renderStars(displayRating, handleStarClick)}
                  </div>
                  <span className="text-sm font-semibold text-gray-600 ml-2 bg-white px-2 py-1 rounded-md">({displayRating.toFixed(1)})</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={alreadyInCart}
                    className={`relative overflow-hidden group px-6 py-3 font-semibold transition-all duration-300 ${
                      alreadyInCart 
                        ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {alreadyInCart ? (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span>Ajouté au panier</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          <span>{TEXT_CONSTANTS.ADD_TO_CART_BUTTON}</span>
                        </>
                      )}
                    </span>
                    {!alreadyInCart && (
                      <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-md"></div>
                    )}
                  </Button>

                  <Button
                    onClick={handleViewCart}
                    variant="outline"
                    className="relative overflow-hidden group px-6 py-3 font-semibold bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-900 hover:border-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {TEXT_CONSTANTS.VIEW_CART_BUTTON}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CalendarForm;
