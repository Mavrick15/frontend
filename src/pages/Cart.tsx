import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/CartContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ShoppingCart, Trash2, UserCircle, Star, Clock, ListOrdered, CreditCard } from 'lucide-react';
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

  return (
    <PageLayout>
      <SEO
        title={TEXT_CONSTANTS.SEO_TITLE}
        description={TEXT_CONSTANTS.SEO_DESCRIPTION}
      />
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto max-w-6xl">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{TEXT_CONSTANTS.CART_TITLE}</h1>
            <p className="text-gray-600">{TEXT_CONSTANTS.CART_SUBTITLE.replace('{count}', cartItems.length.toString())}</p>
          </div>

          {cartItems.length === 0 ? (
            <Card className="shadow-lg border-none">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <ListOrdered className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{TEXT_CONSTANTS.EMPTY_CART_TITLE}</h3>
                  <p className="text-gray-600 mb-6">{TEXT_CONSTANTS.EMPTY_CART_DESCRIPTION}</p>
                  <Button onClick={() => navigate('/add/calendar-form')} className="bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-700 hover:text-gray-900 transition-all duration-300">
                    {TEXT_CONSTANTS.GO_TO_CALENDAR_BUTTON}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card className="shadow-lg border-none">
                  <CardContent className="p-6">
                    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                      {cartItems.map((item) => (
                        <div key={item._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 border-b last:border-b-0">
                          <div className="flex items-start sm:items-center space-x-4 w-full sm:w-auto">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-24 h-24 object-cover rounded-md shadow-sm flex-shrink-0"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = `https://placehold.co/96x96/e2e8f0/64748b?text=${item.title.split(' ').map(n => n[0]).join('')}`;
                                  e.currentTarget.alt = "Image placeholder";
                                }}
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h4>
                              {item.formateur && (
                                <p className="text-sm text-gray-600 flex items-center mb-0.5">
                                  {TEXT_CONSTANTS.FORMATEUR_LABEL}: {item.formateur}
                                </p>
                              )}
                              {item.level && (
                                  <p className="text-sm text-gray-600 flex items-center mb-0.5">
                                      {TEXT_CONSTANTS.LEVEL_LABEL}: {item.level}
                                  </p>
                              )}
                              {item.duration && (
                                  <p className="text-sm text-gray-600 flex items-center">
                                      {TEXT_CONSTANTS.DURATION_LABEL}: {item.duration}
                                  </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                            <p className="font-bold text-gray-800 min-w-[70px] text-right">
                              {item.price === 0 ? "Gratuit" : typeof item.price === 'number' ? `${item.price.toFixed(2)}$` : item.price}
                            </p>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveClick(item._id)}
                              className="ml-4 px-3 py-1.5 text-xs sm:text-sm"
                              title={TEXT_CONSTANTS.REMOVE_ITEM_BUTTON}
                            >
                              <Trash2 className="mr-1 h-4 w-4" />
                              {TEXT_CONSTANTS.REMOVE_ITEM_BUTTON}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-1">
                <Card className="shadow-lg border-none">
                  <CardHeader className="p-6 pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900">{TEXT_CONSTANTS.ORDER_SUMMARY_TITLE}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    {/* Changé de h-[200px] à max-h-[200px] pour l'adaptation dynamique */}
                    <div className="space-y-3 mb-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                      {cartItems.map((item) => (
                        <div key={item._id + '-summary'} className="flex justify-between text-sm text-gray-700">
                          <span>{item.title}</span>
                          <span>
                            {item.price === 0 ? "Gratuit" : typeof item.price === 'number' ? `${item.price.toFixed(2)}$` : item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center text-lg font-bold text-gray-900 mb-2">
                      <span>{TEXT_CONSTANTS.TOTAL_LABEL}</span>
                      <span>{getCartTotal().toFixed(2)}$</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-6">{TEXT_CONSTANTS.DELIVERY_FEES_LABEL}</p>
                    <ClientInformationDialog />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Link to="/add/calendar-form">
              <Button variant="outline" className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {TEXT_CONSTANTS.CONTINUE_SHOPPING_BUTTON}
              </Button>
            </Link>
            {cartItems.length > 0 && (
              <Button
                variant="destructive"
                onClick={handleClearCart}
                className="flex items-center"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {TEXT_CONSTANTS.CLEAR_CART_BUTTON}
              </Button>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Cart;
