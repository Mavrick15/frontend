import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCart } from '@/hooks/CartContext';

import { Mail, Phone, MapPin, FileText, CreditCard } from 'lucide-react';
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

  const handleGenerateInvoice = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const invoiceNum = `ZT${year}${month}${day}${hours}${minutes}${seconds}`;
    setGeneratedInvoiceNumber(invoiceNum);

    setGeneratedClientName(fullName);
    setGeneratedClientEmail(email);
    setGeneratedTotalAmount(getCartTotal());
    setGeneratedInvoiceItems(cartItems);

    setIsClientInfoDialogOpen(false);
    setIsInvoiceGeneratedDialogOpen(true);

    console.log({
      fullName,
      email,
      phone,
      postalCode,
      address,
      city,
      country,
      cartItems,
      total: getCartTotal(),
      invoiceNumber: invoiceNum,
    });
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

  return (
    <>
      <Dialog open={isClientInfoDialogOpen} onOpenChange={setIsClientInfoDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-full bg-black hover:bg-gray-700 text-white font-semibold py-2 rounded-md transition-colors"
            onClick={() => setIsClientInfoDialogOpen(true)}
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Procéder au paiement
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
          <DialogHeader className="bg-gradient-to-r from-gray-700 to-gray-900 p-4 flex flex-row justify-between items-center">
            <DialogTitle className="text-white text-xl flex items-center">
              <FileText className="mr-2 h-6 w-6" /> Informations sur le client !
            </DialogTitle>
          </DialogHeader>

          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Récapitulatif de la commande</h2>
            <div className="space-y-2 mb-6 overflow-y-auto max-h-[80px] pr-2 border-b border-gray-200 pb-2">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center text-gray-700 text-base">
                  <span>{item.title}</span>
                  <span className="font-semibold">
                    {item.price === 0 ? "Gratuit" : `${(item.price * (item.quantity || 1)).toFixed(2)}$`}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-lg font-bold text-gray-900 pt-2">
              <span>Total TTC</span>
              <span>{getCartTotal().toFixed(2)}$</span>
            </div>

            <div className="my-6"></div>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">Informations de facturation</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nom complet</Label>
                <Input
                  id="fullName"
                  placeholder="Votre nom complet"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+243 999 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Code postal</Label>
                <Input
                  id="postalCode"
                  placeholder="Ex: 00243"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Adresse</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="address"
                    placeholder="Numéro, Rue, Quartier"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  placeholder="Kinshasa"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Pays</Label>
                <Input
                  id="country"
                  placeholder="R.D. Congo"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="p-6 pt-0 bg-gray-50 border-t border-gray-200">
            <Button
              onClick={handleGenerateInvoice}
              className="w-full bg-black hover:bg-gray-700 text-white font-semibold py-3 rounded-md transition-colors flex items-center justify-center"
            >
              <FileText className="mr-2 h-5 w-5" />
              Générer la facture
            </Button>
          </div>
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
