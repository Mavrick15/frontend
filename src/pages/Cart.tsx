import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { motion } from "framer-motion";

const TEXT_CONSTANTS = {
  NAV_HOME: '/',
  NAV_FORMATIONS: '/add/calendar-form',

  MESSAGES: {
    PAGE_TITLE: "Mon Panier - Zetoun Labs",
    PAGE_DESCRIPTION: "Visualisez et gérez les articles de votre panier.",
    HEADING: "Mon Panier",
    SUBHEADING: "Les articles que vous avez ajoutés",
    EMPTY_CART: "Votre panier est vide",
    EMPTY_CART_SUBTEXT: "Découvrez nos cours et formations pour commencer votre apprentissage",
    RETURN_TO_HOME: "Retour à l'accueil",
    RETURN_TO_FORMATIONS: "Retour aux formations",
    ITEM_NAME: "Nom de l'article",
    ITEM_PRICE: "Prix",
    ITEM_QUANTITY: "Quantité",
    ITEM_TOTAL: "Total",
    TOTAL_AMOUNT: "Montant total",
    CHECKOUT_BUTTON: "Passer à la caisse",
  },
};

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleReturnToHome = () => {
    navigate(TEXT_CONSTANTS.NAV_HOME);
  };

  const handleReturnToFormations = () => {
    navigate(TEXT_CONSTANTS.NAV_FORMATIONS);
  };

  const handleCheckout = () => {
    console.log("Procédure de paiement avec les articles :", cartItems);
    setCartItems([]);
    navigate(TEXT_CONSTANTS.NAV_HOME);
    alert("Votre commande a été passée avec succès !");
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
        className="pt-24 pb-16 py-16 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex flex-col items-center justify-center bg-gray-50"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-2xl space-y-8"
        >
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center py-20"
            >
              <div className="mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-24 h-24 text-gray-400 mx-auto"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <p className="text-gray-900 text-3xl font-bold mb-2">
                {TEXT_CONSTANTS.MESSAGES.EMPTY_CART}
              </p>
              <p className="text-gray-600 text-lg mb-8">
                {TEXT_CONSTANTS.MESSAGES.EMPTY_CART_SUBTEXT}
              </p>
              <div className="flex space-x-4">
                <Button
                  onClick={handleReturnToHome}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-md shadow-md"
                >
                  {TEXT_CONSTANTS.MESSAGES.RETURN_TO_HOME}
                </Button>
                <Button
                  onClick={handleReturnToFormations}
                  variant="outline"
                  className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 mr-2"
                  >
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                  </svg>
                  {TEXT_CONSTANTS.MESSAGES.RETURN_TO_FORMATIONS}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 font-space">
                  {TEXT_CONSTANTS.MESSAGES.HEADING}
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  {TEXT_CONSTANTS.MESSAGES.SUBHEADING}
                </p>
              </div>
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {TEXT_CONSTANTS.MESSAGES.ITEM_NAME}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {TEXT_CONSTANTS.MESSAGES.ITEM_PRICE}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {TEXT_CONSTANTS.MESSAGES.ITEM_QUANTITY}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {TEXT_CONSTANTS.MESSAGES.ITEM_TOTAL}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end items-center pt-4 border-t border-gray-200">
                  <p className="text-lg font-bold text-gray-900 mr-4">
                    {TEXT_CONSTANTS.MESSAGES.TOTAL_AMOUNT}: ${calculateTotal().toFixed(2)}
                  </p>
                  <Button onClick={handleCheckout} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white">
                    {TEXT_CONSTANTS.MESSAGES.CHECKOUT_BUTTON}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Cart;
