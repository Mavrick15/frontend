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
            <DialogContent className="w-[95%] max-w-[500px] p-0 rounded-lg md:w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader className="bg-gradient-to-r from-gray-700 to-gray-900 p-4 flex flex-row justify-between items-center">
                    <DialogTitle className="text-white text-lg md:text-xl flex items-center">
                        <FileText className="mr-2 h-5 w-5 md:h-6 md:w-6" /> Facture Générée
                    </DialogTitle>
                </DialogHeader>

                <div className="p-4 md:p-6 text-center">
                    <CheckCircle className="h-16 w-16 md:h-20 md:w-20 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Facture générée avec succès !</h3>
                    <p className="text-gray-600 mb-6 text-sm md:text-base">Facture N° <span className="font-semibold">{invoiceNumber}</span></p>

                    <div className="text-left bg-gray-50 p-3 md:p-4 rounded-lg mb-6">
                        <h4 className="font-semibold text-gray-800 mb-2 text-base md:text-lg">Détails de la facture</h4>

                        <div className="pb-3 mb-3 border-b border-gray-200 space-y-2 overflow-y-auto max-h-[100px] md:max-h-[120px] pr-2">
                            {invoiceItems.length > 0 ? (
                                invoiceItems.map((item, index) => (
                                    <div key={item._id} className="flex justify-between items-center text-gray-700 text-xs md:text-sm">
                                        <span>{index + 1}. {item.title}</span>
                                        <span className="font-medium">
                                            {item.price === 0 ? "Gratuit" : `${(item.price * (item.quantity || 1)).toFixed(2)}$`}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500 text-xs md:text-sm">Aucun article dans la commande.</div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-gray-700 text-sm mb-4">
                            <div>Client: <span className="font-medium">{clientName}</span></div>
                            <div className="md:text-right">Email: <span className="font-medium">{clientEmail}</span></div>
                        </div>

                        <div className="col-span-2 text-right text-lg font-bold text-gray-900 mt-2 md:text-xl">
                            Montant : <span className="text-gray-700">{totalAmount.toFixed(2)}$</span>
                        </div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <Button
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 md:py-3 rounded-md transition-colors flex items-center justify-center text-sm md:text-base"
                        >
                            <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                            Télécharger PDF
                        </Button>
                        <Button
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 md:py-3 rounded-md transition-colors flex items-center justify-center text-sm md:text-base"
                        >
                            <Share2 className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                            Envoyer sur WhatsApp
                        </Button>
                        <Button
                            variant="link"
                            onClick={onClose}
                            className="w-full text-gray-600 hover:text-gray-900 mt-3 md:mt-4 flex items-center justify-center text-sm md:text-base"
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
