import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from '@/hooks/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { ENDPOINTS } from '@/config/api.config';
import { getNetworkErrorMessage, parseApiResponse } from '@/utils/apiMessages';
import { toast } from 'sonner';
import { validateEmail, validateName, validatePhone, validateRequired } from '@/utils/validation';
import type { CreateInvoiceRequest, Invoice } from '@/types/api';

import { Mail, Phone, MapPin, FileText, CreditCard, Loader2, ShoppingBag, CheckCircle2, User, Building2, Globe } from 'lucide-react';
import InvoiceGeneratedDialog from './InvoiceGeneratedDialog';

interface CartItem {
    _id: string;
    title: string;
    price: number;
    quantity?: number;
}

const ClientInformationDialog = () => {
  const { cartItems, getCartTotal } = useCart();

  const [isClientInfoDialogOpen, setIsClientInfoDialogOpen] = useState(false);
  const [isInvoiceGeneratedDialogOpen, setIsInvoiceGeneratedDialogOpen] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const [generatedInvoiceNumber, setGeneratedInvoiceNumber] = useState('');
  const [generatedClientName, setGeneratedClientName] = useState('');
  const [generatedClientEmail, setGeneratedClientEmail] = useState('');
  const [generatedInvoiceItems, setGeneratedInvoiceItems] = useState<CartItem[]>([]);
  const [generatedTotalAmount, setGeneratedTotalAmount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validation du nom complet (requis)
    const finalFullName = fullName || user?.name || '';
    if (!finalFullName.trim()) {
      newErrors.fullName = 'Le nom complet est requis';
    } else {
      const nameValidation = validateName(finalFullName);
      if (!nameValidation.isValid) {
        newErrors.fullName = nameValidation.errors[0];
      }
    }

    // Validation de l'email (requis)
    const finalEmail = email || user?.email || '';
    if (!finalEmail.trim()) {
      newErrors.email = 'L\'email est requis';
    } else {
      const emailValidation = validateEmail(finalEmail);
      if (!emailValidation.isValid) {
        newErrors.email = emailValidation.errors[0];
      }
    }

    // Validation du téléphone (optionnel mais validé si rempli)
    if (phone && phone.trim()) {
      const phoneValidation = validatePhone(phone);
      if (!phoneValidation.isValid) {
        newErrors.phone = phoneValidation.errors[0];
      }
    }

    // Validation de l'adresse (requis)
    if (!address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    } else {
      const addressValidation = validateRequired(address, 'Adresse');
      if (!addressValidation.isValid) {
        newErrors.address = addressValidation.errors[0];
      }
    }

    setErrors(newErrors);
    
    // Afficher un message d'erreur général si des erreurs existent
    if (Object.keys(newErrors).length > 0) {
      const missingFields = Object.keys(newErrors).length;
      toast.error(`${missingFields} champ(s) requis manquant(s). Veuillez remplir tous les champs obligatoires.`);
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerateInvoice = async () => {
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    setIsGenerating(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Vous devez être connecté pour générer une facture');
        return;
      }

      const invoiceData: CreateInvoiceRequest = {
        items: cartItems.map(item => ({
          _id: item._id,
          formationId: item._id,
          title: item.title,
          price: typeof item.price === 'number' ? item.price : parseFloat(item.price as string),
          quantity: 1,
        })),
        clientInfo: {
          name: fullName || user?.name || '',
          email: email || user?.email || '',
          phone: phone || '',
          address: {
            street: address || '',
            city: city || '',
            postalCode: postalCode || '',
            country: country || '',
          },
        },
        paymentMethod: 'other',
        tax: 0,
        discount: 0,
      };

      const response = await fetch(ENDPOINTS.INVOICES.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(invoiceData),
      });

      const { ok, data, errorMessage } = await parseApiResponse(response);

      if (!ok) {
        throw new Error(errorMessage || 'Erreur lors de la création de la facture');
      }

      const invoice: Invoice = data.invoice as Invoice;

      setGeneratedInvoiceNumber(invoice.invoiceNumber);
      setGeneratedClientName(invoice.clientInfo.name);
      setGeneratedClientEmail(invoice.clientInfo.email);
      setGeneratedTotalAmount(invoice.total);
      setGeneratedInvoiceItems(invoice.items.map(item => ({
        _id: item.formationId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })));

      setIsClientInfoDialogOpen(false);
      setIsInvoiceGeneratedDialogOpen(true);

      // Vider le panier après création de la facture
      // clearCart(); // Décommenter si vous voulez vider le panier automatiquement

      toast.success('Facture créée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la création de la facture:', error);
      const msg = error instanceof Error ? error.message : getNetworkErrorMessage();
      toast.error(msg || 'Erreur lors de la création de la facture');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCloseInvoiceGeneratedDialog = () => {
    setIsInvoiceGeneratedDialogOpen(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setPostalCode('');
    setAddress('');
    setCity('');
    setCountry('');
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <Dialog open={isClientInfoDialogOpen} onOpenChange={setIsClientInfoDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            onClick={() => setIsClientInfoDialogOpen(true)}
          >
            <CreditCard className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Procéder au paiement
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[95vw] sm:w-auto sm:max-w-[700px] p-0 overflow-hidden rounded-2xl border border-gray-200/50 shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 flex flex-row justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            <DialogTitle className="text-white text-2xl font-bold flex items-center relative z-10">
              <FileText className="mr-3 h-7 w-7" />
              Informations de facturation
            </DialogTitle>
          </DialogHeader>

          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <Card className="bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <ShoppingBag className="h-5 w-5 text-gray-700 mr-2" />
                    <h2 className="text-xl font-bold text-gray-900">Récapitulatif de la commande</h2>
                  </div>
                  <div className="space-y-3 mb-4 overflow-y-auto max-h-[120px] pr-2 custom-scrollbar">
                    {cartItems.map((item, index) => {
                      const rawPrice = typeof item.price === 'number' ? item.price : parseFloat(String(item.price ?? 0));
                      const linePrice = (Number.isFinite(rawPrice) ? rawPrice : 0) * (item.quantity ?? 1);
                      return (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex justify-between items-center bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg border border-gray-200/50 hover:bg-gray-100/80 transition-colors duration-200"
                      >
                        <span className="text-gray-700 font-medium flex-1 pr-2">{item.title}</span>
                        <span className="font-bold text-gray-900 whitespace-nowrap">
                          {linePrice === 0 ? "Gratuit" : `${linePrice.toFixed(2)}$`}
                        </span>
                      </motion.div>
                    ); })}
                  </div>
                  <Separator className="my-4 bg-gray-300" />
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl shadow-lg">
                    <span className="text-lg font-bold">Total TTC</span>
                    <span className="text-2xl font-extrabold">{getCartTotal().toFixed(2)}$</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <Card className="bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center mb-8 pb-6 border-b border-gray-200/50">
                    <div className="p-3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg mr-4">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Informations de facturation</h2>
                      <p className="text-sm text-gray-600 mt-1">Remplissez vos informations pour finaliser votre commande</p>
                    </div>
                  </div>
                  
                  {/* Section Informations personnelles */}
                  <div className="mb-8">
                    <div className="flex items-center mb-6">
                      <div className="p-2 bg-gray-100 rounded-lg mr-3">
                        <User className="h-5 w-5 text-gray-700" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Informations personnelles</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="fullName" className="text-gray-700 font-semibold flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Nom complet <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          autoComplete="name"
                          placeholder="Votre nom complet"
                          value={fullName || user?.name || ''}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                          }}
                          className={`rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900 bg-white/90 backdrop-blur-sm transition-all duration-200 hover:border-gray-400 ${errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                          required
                        />
                        <AnimatePresence>
                          {errors.fullName && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-sm text-red-500"
                            >
                              {errors.fullName}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-semibold flex items-center">
                          <Mail className="mr-2 h-4 w-4" />
                          Email <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="votre.email@exemple.com"
                            value={email || user?.email || ''}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                            }}
                            className={`pl-11 rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900 bg-white/90 backdrop-blur-sm transition-all duration-200 hover:border-gray-400 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                            required
                          />
                        </div>
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-sm text-red-500"
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                        <Label htmlFor="phone" className="text-gray-700 font-semibold flex items-center">
                          <Phone className="mr-2 h-4 w-4" />
                          Téléphone
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="+243 999 000 000"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                            }}
                            className={`pl-11 rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900 bg-white/90 backdrop-blur-sm transition-all duration-200 hover:border-gray-400 ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                          />
                        </div>
                        <AnimatePresence>
                          {errors.phone && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-sm text-red-500"
                            >
                              {errors.phone}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  </div>

                  <Separator className="my-8 bg-gray-200/50" />

                  {/* Section Adresse */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="p-2 bg-gray-100 rounded-lg mr-3">
                        <MapPin className="h-5 w-5 text-gray-700" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Adresse de facturation</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                        <Label htmlFor="address" className="text-gray-700 font-semibold flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          Adresse complète <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="address"
                            autoComplete="street-address"
                            placeholder="Numéro, Rue, Quartier"
                            value={address}
                            onChange={(e) => {
                              setAddress(e.target.value);
                              if (errors.address) setErrors(prev => ({ ...prev, address: '' }));
                            }}
                            className={`pl-11 rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900 bg-white/90 backdrop-blur-sm transition-all duration-200 hover:border-gray-400 ${errors.address ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                            required
                          />
                        </div>
                        <AnimatePresence>
                          {errors.address && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-sm text-red-500"
                            >
                              {errors.address}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="city" className="text-gray-700 font-semibold flex items-center">
                          <Building2 className="mr-2 h-4 w-4" />
                          Ville
                        </Label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="city"
                            autoComplete="address-level2"
                            placeholder="Kinshasa"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="pl-11 rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900 bg-white/90 backdrop-blur-sm transition-all duration-200 hover:border-gray-400"
                          />
                        </div>
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="postalCode" className="text-gray-700 font-semibold flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          Code postal
                        </Label>
                        <Input
                          id="postalCode"
                          autoComplete="postal-code"
                          placeholder="Ex: 00243"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900 bg-white/90 backdrop-blur-sm transition-all duration-200 hover:border-gray-400"
                        />
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                        <Label htmlFor="country" className="text-gray-700 font-semibold flex items-center">
                          <Globe className="mr-2 h-4 w-4" />
                          Pays
                        </Label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="country"
                            autoComplete="country-name"
                            placeholder="R.D. Congo"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="pl-11 rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900 bg-white/90 backdrop-blur-sm transition-all duration-200 hover:border-gray-400"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 pt-0 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200/50"
          >
            <Button
              onClick={handleGenerateInvoice}
              disabled={isGenerating || (!(fullName?.trim() || user?.name) || !(email?.trim() || user?.email) || !address?.trim())}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
              title={(!(fullName?.trim() || user?.name) || !(email?.trim() || user?.email) || !address?.trim()) ? 'Veuillez remplir tous les champs obligatoires' : ''}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <FileText className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Générer la facture
                </>
              )}
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>

      <InvoiceGeneratedDialog
        isOpen={isInvoiceGeneratedDialogOpen}
        onClose={handleCloseInvoiceGeneratedDialog}
        invoiceNumber={generatedInvoiceNumber}
        clientName={generatedClientName}
        clientEmail={generatedClientEmail}
        invoiceItems={generatedInvoiceItems}
        totalAmount={generatedTotalAmount}
      />
    </>
  );
};

export default ClientInformationDialog;
