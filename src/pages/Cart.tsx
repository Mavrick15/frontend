import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/CartContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ShoppingCart, Trash2, UserCircle, Star, Clock, ListOrdered, CreditCard, Sparkles } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import ClientInformationDialog from '@/components/ClientInformationDialog';

const TEXT_CONSTANTS = {
  SEO_TITLE: "Votre Panier - Zetoun Labs",
  SEO_DESCRIPTION: "Consultez et gérez les formations dans votre panier.",
  CART_TITLE: "Mon Panier",
  CART_SUBTITLE: "{count} article(s) dans votre panier",
  EMPTY_CART_TITLE: "Votre panier est vide.",
  EMPTY_CART_DESCRIPTION: "Ajoutez des formations depuis le calendrier pour commencer.",
  GO_TO_CALENDAR_BUTTON: "Aller au calendrier des formations",
  CONTINUE_SHOPPING_BUTTON: "Continuer les achats",
  ORDER_SUMMARY_TITLE: "Résumé de la commande",
  TOTAL_LABEL: "Total",
  CHECKOUT_BUTTON: "Procéder au paiement",
  REMOVE_ITEM_BUTTON: "Supprimer",
  CLEAR_CART_BUTTON: "Vider le panier",
  BACK_TO_HOME: "Retour à l'accueil",
  PRICE_LABEL: "Prix",
  FORMATEUR_LABEL: "Instructeur",
  LEVEL_LABEL: "Niveau",
  DURATION_LABEL: "Durée",
  DELIVERY_FEES_LABEL: "Frais de livraison calculés à l'étape suivante",
};

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleRemoveClick = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <PageLayout>
      <SEO
        title={TEXT_CONSTANTS.SEO_TITLE}
        description={TEXT_CONSTANTS.SEO_DESCRIPTION}
      />
      
      {/* Header avec gradient et pattern */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={containerVariants}
        className="w-full pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-b-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={textVariants}
              className="flex items-center justify-center mb-6"
            >
              <ShoppingCart className="h-12 w-12 md:h-16 md:w-16 text-white mr-4" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg text-white">
                {TEXT_CONSTANTS.CART_TITLE}
              </h1>
            </motion.div>
            <motion.p
              variants={textVariants}
              className="text-xl md:text-2xl text-gray-200 mb-6 max-w-2xl mx-auto leading-relaxed"
            >
              {TEXT_CONSTANTS.CART_SUBTITLE.replace('{count}', cartItems.length.toString())}
            </motion.p>
          </div>
        </div>
      </motion.div>

      <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-screen">
        <div className="container mx-auto max-w-6xl">

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-2xl border border-gray-200/50 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                <CardContent className="p-12">
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="mb-6"
                    >
                      <div className="relative inline-block">
                        <ShoppingCart className="h-24 w-24 mx-auto text-gray-300 mb-4" />
                        <Sparkles className="h-8 w-8 text-gray-400 absolute -top-2 -right-2 animate-pulse" />
                      </div>
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl font-bold text-gray-900 mb-4"
                    >
                      {TEXT_CONSTANTS.EMPTY_CART_TITLE}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed"
                    >
                      {TEXT_CONSTANTS.EMPTY_CART_DESCRIPTION}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button 
                        onClick={() => navigate('/add/calendar-form')} 
                        className="bg-gray-900 text-white border-0 hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg rounded-xl group"
                      >
                        <ListOrdered className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                        {TEXT_CONSTANTS.GO_TO_CALENDAR_BUTTON}
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="md:col-span-2">
                <Card className="shadow-2xl border border-gray-200/50 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                  <CardHeader className="p-6 pb-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200/50">
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                      <ShoppingCart className="mr-3 h-6 w-6 text-gray-700" />
                      Formations sélectionnées
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item._id}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                          className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-gray-300/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            {item.image && (
                              <div className="relative w-32 h-32 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-lg flex-shrink-0 group-hover:shadow-xl transition-shadow duration-300">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                  onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = `https://placehold.co/112x112/e2e8f0/64748b?text=${item.title.split(' ').map(n => n[0]).join('')}`;
                                    e.currentTarget.alt = "Image placeholder";
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">{item.title}</h4>
                              <div className="space-y-2">
                                {item.formateur && (
                                  <p className="text-sm text-gray-600 flex items-center">
                                    <UserCircle className="mr-2 h-4 w-4 text-gray-500" />
                                    <span className="font-medium">{TEXT_CONSTANTS.FORMATEUR_LABEL}:</span>
                                    <span className="ml-2">{item.formateur}</span>
                                  </p>
                                )}
                                {item.level && (
                                  <p className="text-sm text-gray-600 flex items-center">
                                    <Star className="mr-2 h-4 w-4 text-gray-500" />
                                    <span className="font-medium">{TEXT_CONSTANTS.LEVEL_LABEL}:</span>
                                    <span className="ml-2">{item.level}</span>
                                  </p>
                                )}
                                {item.duration && (
                                  <p className="text-sm text-gray-600 flex items-center">
                                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                                    <span className="font-medium">{TEXT_CONSTANTS.DURATION_LABEL}:</span>
                                    <span className="ml-2">{item.duration}</span>
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 w-full sm:w-auto">
                              <div className="text-right">
                                <p className="text-2xl font-bold text-gray-900">
                                  {item.price === 0 ? "Gratuit" : typeof item.price === 'number' ? `${item.price.toFixed(2)}$` : item.price}
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveClick(item._id)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg transition-all duration-300 px-4 py-2 rounded-xl group/btn"
                                title={TEXT_CONSTANTS.REMOVE_ITEM_BUTTON}
                              >
                                <Trash2 className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                                <span className="hidden sm:inline">{TEXT_CONSTANTS.REMOVE_ITEM_BUTTON}</span>
                                <span className="sm:hidden">Supprimer</span>
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Card className="shadow-2xl border border-gray-200/50 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden sticky top-24">
                    <CardHeader className="p-6 pb-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200/50">
                      <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                        <CreditCard className="mr-3 h-5 w-5 text-gray-700" />
                        {TEXT_CONSTANTS.ORDER_SUMMARY_TITLE}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-4">
                      <div className="space-y-3 mb-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                        {cartItems.map((item, index) => (
                          <motion.div
                            key={item._id + '-summary'}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                            className="flex justify-between items-start text-sm bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg border border-gray-200/50 hover:bg-gray-100/80 transition-colors duration-200"
                          >
                            <span className="text-gray-700 font-medium flex-1 pr-2 line-clamp-2">{item.title}</span>
                            <span className="text-gray-900 font-bold whitespace-nowrap">
                              {item.price === 0 ? "Gratuit" : typeof item.price === 'number' ? `${item.price.toFixed(2)}$` : item.price}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                      <Separator className="my-6 bg-gray-300" />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl shadow-lg mb-4"
                      >
                        <span className="text-lg font-bold">{TEXT_CONSTANTS.TOTAL_LABEL}</span>
                        <span className="text-2xl font-extrabold">{getCartTotal().toFixed(2)}$</span>
                      </motion.div>
                      <p className="text-xs text-gray-500 mb-6 text-center italic">{TEXT_CONSTANTS.DELIVERY_FEES_LABEL}</p>
                      <ClientInformationDialog />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-between gap-4 mt-8"
          >
            <Link to="/add/calendar-form" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 px-6 py-6 rounded-xl group"
              >
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                {TEXT_CONSTANTS.CONTINUE_SHOPPING_BUTTON}
              </Button>
            </Link>
            {cartItems.length > 0 && (
              <Button
                variant="outline"
                onClick={handleClearCart}
                className="w-full sm:w-auto flex items-center bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 px-6 py-6 rounded-xl group"
              >
                <Trash2 className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                {TEXT_CONSTANTS.CLEAR_CART_BUTTON}
              </Button>
            )}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Cart;
