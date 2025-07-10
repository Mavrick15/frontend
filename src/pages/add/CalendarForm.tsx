import React, { useState, useEffect, Suspense } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPin, Clock, Users, UserCircle, Search, Filter, AlertCircle, ArrowLeft, Loader2, DollarSign, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import useFormations, { Formation } from '@/hooks/useFormations';
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import FloatingCart from '@/hooks/FloatingCart';
import { CartProvider, useCart } from '@/hooks/CartContext';

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
  CARD_BOTTOM_BORDER_CLASS: "flex flex-wrap items-center justify-end gap-4 border-t border-gray-100 pt-4",
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
  ADD_TO_CART_BUTTON: "+",
  ADD_TO_CART_ICON_ALT: "Ajouter au panier",
  IMAGE_PLACEHOLDER_ALT: "Image de remplacement pour la formation",
  LOADING_SPINNER_ALT: "Animation de chargement",
};

const CalendarForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

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
        <CartProvider allFormations={formations}>
          <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
              <div className="max-w-6xl mx-auto">
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {TEXT_CONSTANTS.BACK_TO_HOME}
                </Link>

                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={containerVariants}
                  className="text-center mb-8"
                >
                  <motion.h1
                    variants={textVariants}
                    className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-space"
                  >
                    {TEXT_CONSTANTS.CALENDAR_TITLE}
                  </motion.h1>
                  <motion.p
                    variants={textVariants}
                    className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
                  >
                    {TEXT_CONSTANTS.CALENDAR_SUBTITLE}
                  </motion.p>
                </motion.div>

                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="relative w-full sm:max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder={TEXT_CONSTANTS.SEARCH_PLACEHOLDER}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border-gray-200 focus:border-blue-500 rounded-lg w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="text-sm text-gray-500 hidden sm:inline">
                        {pagination?.total} {TEXT_CONSTANTS.FORMATIONS_AVAILABLE_TEXT}
                      </span>
                    </div>
                  </div>
                </div>

                <FloatingCart allFormations={formations} />

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
                      <AlertCircle className="h-12 w-12 mx-auto text-red-400 mb-3" />
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
                        <FormationCard key={course._id} course={course} index={index} />
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
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl text-center shadow-sm"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{TEXT_CONSTANTS.CUSTOM_FORMATION_SECTION_TITLE}</h2>
                  <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
                    {TEXT_CONSTANTS.CUSTOM_FORMATION_SECTION_DESCRIPTION}
                  </p>
                  <Link to={TEXT_CONSTANTS.CUSTOM_FORMATION_SECTION_LINK}>
                    <Button
                      variant="outline"
                      className="bg-white hover:bg-blue-50 w-full sm:w-auto text-sm sm:text-base"
                    >
                      {TEXT_CONSTANTS.CUSTOM_FORMATION_SECTION_BUTTON_TEXT}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
        </CartProvider>
      </PageLayout>
    </Suspense>
  );
};

const FormationCard = ({ course, index }) => {
  const { addToCart, isCourseInCart, enrollingId } = useCart();
  const alreadyInCart = isCourseInCart(course._id);

  return (
    <motion.div
      key={course._id}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow-md`}>
        <div className="grid md:grid-cols-3 gap-0">
          {course.image && (
            <div className="relative h-full min-h-[200px] md:min-h-0 bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover absolute inset-0"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/300x200/e2e8f0/64748b?text=${course.title.split(' ').map(n => n[0]).join('')}`;
                  e.currentTarget.alt = TEXT_CONSTANTS.IMAGE_PLACEHOLDER_ALT;
                }}
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 text-blue-600 hover:bg-white/80 backdrop-blur-sm font-medium px-3 py-1">
                  {course.level}
                </Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4 md:hidden">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3">
                  <p className="font-semibold text-blue-600">{typeof course.price === 'number' ? `${course.price.toFixed(2)}$` : course.price}</p>
                  <p className="text-sm text-gray-700">{course.seats} places disponibles</p>
                </div>
              </div>
            </div>
          )}
          <div className={`p-6 ${course.image ? 'md:col-span-2' : 'md:col-span-3'}`}>
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h2>
                <p className="text-gray-700">{course.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="flex items-start">
                  <CalendarIcon className={TEXT_CONSTANTS.ICON_CLASS} />
                  <div>
                    <p className="font-medium">{TEXT_CONSTANTS.DATE_LABEL}</p>
                    <p className="text-gray-700">{course.date}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className={TEXT_CONSTANTS.ICON_CLASS} />
                  <div>
                    <p className="font-medium">{TEXT_CONSTANTS.LOCATION_LABEL}</p>
                    <p className="text-gray-700">{course.location}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className={TEXT_CONSTANTS.ICON_CLASS} />
                  <div>
                    <p className="font-medium">{TEXT_CONSTANTS.DURATION_LABEL}</p>
                    <p className="text-gray-700">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className={TEXT_CONSTANTS.ICON_CLASS} />
                  <div>
                    <p className="font-medium">{TEXT_CONSTANTS.AVAILABLE_SEATS_LABEL}</p>
                    <p className="text-gray-700">{course.seats} places</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign className={TEXT_CONSTANTS.ICON_CLASS} />
                  <div>
                    <p className="font-medium">{TEXT_CONSTANTS.PRICE_LABEL}</p>
                    <p className="text-gray-700">{typeof course.price === 'number' ? `${course.price.toFixed(2)}$` : course.price}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <UserCircle className={TEXT_CONSTANTS.ICON_CLASS} />
                  <div>
                    <p className="font-medium">{TEXT_CONSTANTS.INSTRUCTOR_LABEL}</p>
                    <p className="text-gray-700">{course.instructor}</p>
                  </div>
                </div>
              </div>

              <div className={TEXT_CONSTANTS.CARD_BOTTOM_BORDER_CLASS}>
                <Button
                  onClick={() => addToCart(course._id)}
                  disabled={alreadyInCart || course.isEnrolled || enrollingId === course._id}
                  className="relative overflow-hidden group px-4 py-2"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {enrollingId === course._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : alreadyInCart || course.isEnrolled ? (
                      <ShoppingCart className="h-4 w-4" />
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        <span className="font-bold text-lg">{TEXT_CONSTANTS.ADD_TO_CART_BUTTON}</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CalendarForm;
