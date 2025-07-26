import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Download, Share2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartItem {
    _id: string;
    title: string;
    price: number;
    quantity?: number;
}

interface InvoiceGeneratedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  invoiceItems: CartItem[];
  totalAmount: number;
}

const InvoiceGeneratedDialog: React.FC<InvoiceGeneratedDialogProps> = ({
  isOpen,
  onClose,
  invoiceNumber,
  clientName,
  clientEmail,
  invoiceItems,
  totalAmount,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-orange-500 to-orange-700 p-4 flex flex-row justify-between items-center">
          <DialogTitle className="text-white text-xl flex items-center">
            <FileText className="mr-2 h-6 w-6" /> Facture Générée
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 text-center">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Facture générée avec succès !</h3>
          <p className="text-gray-600 mb-6">Facture N° <span className="font-semibold">{invoiceNumber}</span></p>

          <div className="text-left bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">Détails de la facture</h4>
            
            <div className="pb-4 mb-4 border-b border-gray-200 space-y-2">
                {invoiceItems.map((item) => (
                    <div key={item._id} className="flex justify-between items-center text-gray-700 text-sm">
                        <span>{item.title}</span>
                        <span className="font-medium">
                            {item.price === 0 ? "Gratuit" : `${(item.price * (item.quantity || 1)).toFixed(2)}$`}
                        </span>
                    </div>
                ))}
                {invoiceItems.length === 0 && (
                  <div className="text-gray-500 text-sm">Aucun article dans la commande.</div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-gray-700 text-sm mb-4">
              <div>Client: <span className="font-medium">{clientName}</span></div>
              <div className="text-right">Email: <span className="font-medium">{clientEmail}</span></div>
            </div>
            
            <div className="col-span-2 text-right text-lg font-bold text-gray-900 mt-2">
                Montant TTC: <span className="text-green-600">{totalAmount.toFixed(2)}$</span>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition-colors flex items-center justify-center"
            >
              <Download className="mr-2 h-5 w-5" />
              Télécharger PDF
            </Button>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition-colors flex items-center justify-center"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Envoyer sur WhatsApp
            </Button>
            <Button
              variant="link"
              onClick={onClose}
              className="w-full text-gray-600 hover:text-gray-900 mt-4 flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux informations client
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceGeneratedDialog;
