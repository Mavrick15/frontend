import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/CartContext";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Share2,
  Sparkles,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
  const [isDownloading, setIsDownloading] = useState(false);
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      // Générer le PDF côté client (simple version HTML)
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        toast.error("Impossible d'ouvrir la fenêtre d'impression");
        return;
      }

      const logoUrl =
        window.location.origin + "/lovable-uploads/Logo/Logo21.png";

      const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Facture ${invoiceNumber}</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { 
                            font-family: 'Arial', sans-serif; 
                            padding: 40px; 
                            direction: ltr;
                            background: #fff;
                        }
                        .container {
                            max-width: 800px;
                            margin: 0 auto;
                            direction: ltr;
                        }
                        .header { 
                            text-align: left; 
                            margin-bottom: 40px;
                            border-bottom: 3px solid #000;
                            padding-bottom: 20px;
                        }
                        .header-content {
                            display: flex;
                            align-items: center;
                            gap: 20px;
                            flex-direction: row;
                        }
                        .logo-container {
                            flex-shrink: 0;
                        }
                        .logo {
                            max-width: 100px;
                            height: auto;
                            display: block;
                        }
                        .company-info {
                            text-align: left;
                            flex: 1;
                        }
                        .header h1 { 
                            margin: 0; 
                            font-size: 32px; 
                            font-weight: bold;
                            color: #000;
                            margin-bottom: 5px;
                        }
                        .header p {
                            font-size: 14px;
                            color: #666;
                            margin: 0;
                        }
                        .invoice-info { 
                            text-align: left;
                            margin-bottom: 30px;
                            background: #f8f8f8;
                            padding: 20px;
                            border-radius: 8px;
                        }
                        .invoice-info h2 {
                            font-size: 24px;
                            margin-bottom: 10px;
                            color: #000;
                        }
                        .invoice-info p {
                            font-size: 14px;
                            color: #333;
                        }
                        .client-info { 
                            text-align: left;
                            margin-bottom: 30px;
                            background: #f8f8f8;
                            padding: 20px;
                            border-radius: 8px;
                        }
                        .client-info h3 {
                            font-size: 18px;
                            margin-bottom: 10px;
                            color: #000;
                        }
                        .client-info p {
                            font-size: 14px;
                            color: #333;
                            line-height: 1.8;
                        }
                        table { 
                            width: 100%; 
                            border-collapse: collapse; 
                            margin-bottom: 30px;
                            direction: ltr;
                        }
                        th, td { 
                            padding: 12px 15px; 
                            text-align: left; 
                            border-bottom: 1px solid #ddd; 
                        }
                        th { 
                            background-color: #000;
                            color: #fff;
                            font-weight: bold;
                            font-size: 14px;
                        }
                        td {
                            background-color: #fff;
                            color: #333;
                        }
                        tr:nth-child(even) td {
                            background-color: #f9f9f9;
                        }
                        .total { 
                            text-align: left; 
                            font-weight: bold; 
                            font-size: 20px; 
                            margin-top: 20px;
                            background: #000;
                            color: #fff;
                            padding: 20px;
                            border-radius: 8px;
                        }
                        .total p {
                            margin: 0;
                        }
                        @media print { 
                            .no-print { display: none; }
                            body { padding: 20px; }
                        }
                        .no-print {
                            margin-top: 30px;
                            text-align: center;
                        }
                        .no-print button {
                            padding: 12px 30px;
                            background: #000;
                            color: #fff;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 16px;
                            font-weight: bold;
                        }
                        .no-print button:hover {
                            background: #333;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="header-content">
                                <div class="logo-container">
                                    <img src="${logoUrl}" alt="Zetoun Labs Logo" class="logo" onerror="this.style.display='none'" />
                                </div>
                                <div class="company-info">
                                    <h1>ZETOUN LABS</h1>
                                    <p>L'expertise au service de votre avenir numérique</p>
                                </div>
                            </div>
                        </div>
                        <div class="invoice-info">
                            <h2>FACTURE N° ${invoiceNumber}</h2>
                            <p>Date: ${new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })}</p>
                        </div>
                        <div class="client-info">
                            <h3>Informations Client:</h3>
                            <p>
                                <strong>Nom:</strong> ${clientName}<br/>
                                <strong>Email:</strong> ${clientEmail}
                            </p>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Formation</th>
                                    <th>Qté</th>
                                    <th>Prix unit.</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${invoiceItems
                                  .map(
                                    (item, index) => `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${item.title}</td>
                                        <td>${item.quantity || 1}</td>
                                        <td>${item.price.toFixed(2)} $</td>
                                        <td>${((item.price || 0) * (item.quantity || 1)).toFixed(2)} $</td>
                                    </tr>
                                `,
                                  )
                                  .join("")}
                            </tbody>
                        </table>
                        <div class="total">
                            <p>Total TTC: ${totalAmount.toFixed(2)} $</p>
                        </div>
                        <div class="no-print">
                            <button onclick="window.print()">Imprimer</button>
                        </div>
                    </div>
                </body>
                </html>
            `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();

      // Attendre que le contenu soit chargé avant d'imprimer
      setTimeout(() => {
        printWindow.print();
      }, 250);

      toast.success("Facture prête à être imprimée");
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      toast.error("Erreur lors du téléchargement de la facture");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareWhatsApp = () => {
    const message = `Bonjour, voici ma facture ${invoiceNumber} pour un montant de ${totalAmount.toFixed(2)} $. Merci !`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleClose = () => {
    clearCart();
    onClose();
    navigate("/add/calendar-form");
  };

  const containerVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-[600px] p-0 rounded-2xl md:w-full max-h-[90vh] flex flex-col border border-gray-200/50 shadow-2xl overflow-hidden">
        <DialogHeader className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 flex flex-row justify-between items-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <DialogTitle className="text-white text-xl md:text-2xl font-bold flex items-center relative z-10">
            <FileText className="mr-3 h-6 w-6 md:h-7 md:w-7" />
            Facture Générée
          </DialogTitle>
        </DialogHeader>

        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="p-6 md:p-8 text-center flex-grow overflow-y-auto bg-gradient-to-br from-white via-gray-50 to-gray-100"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative inline-block mb-6"
          >
            <CheckCircle2 className="h-20 w-20 md:h-24 md:w-24 text-gray-900 mx-auto" />
            <Sparkles className="h-8 w-8 text-gray-600 absolute -top-2 -right-2 animate-pulse" />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
          >
            Facture générée avec succès !
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8 text-base md:text-lg"
          >
            Facture N°{" "}
            <span className="font-bold text-gray-900">{invoiceNumber}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <h4 className="font-bold text-gray-900 mb-4 text-lg md:text-xl flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Détails de la facture
                </h4>

                <div className="pb-4 mb-4 border-b border-gray-300 space-y-3 overflow-y-auto max-h-[150px] md:max-h-[180px] pr-2 custom-scrollbar">
                  {invoiceItems.length > 0 ? (
                    invoiceItems.map((item, index) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                        className="flex justify-between items-center bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg border border-gray-200/50 hover:bg-gray-100/80 transition-colors duration-200"
                      >
                        <span className="text-gray-700 font-medium flex-1 pr-2">
                          {index + 1}. {item.title}
                        </span>
                        <span className="font-bold text-gray-900 whitespace-nowrap">
                          {item.price === 0
                            ? "Gratuit"
                            : `${(item.price * (item.quantity || 1)).toFixed(2)}$`}
                        </span>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm">
                      Aucun article dans la commande.
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-gray-700 text-sm mb-4">
                  <div className="bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg border border-gray-200/50">
                    <span className="font-semibold">Client:</span>{" "}
                    <span className="font-medium">{clientName}</span>
                  </div>
                  <div className="bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg border border-gray-200/50 md:text-right">
                    <span className="font-semibold">Email:</span>{" "}
                    <span className="font-medium">{clientEmail}</span>
                  </div>
                </div>

                <Separator className="my-4 bg-gray-300" />

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl shadow-lg">
                  <span className="text-lg font-bold">Montant Total</span>
                  <span className="text-2xl font-extrabold">
                    {totalAmount.toFixed(2)}$
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <Button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Génération...
                </>
              ) : (
                <>
                  <Download className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Télécharger/Imprimer PDF
                </>
              )}
            </Button>
            <Button
              onClick={handleShareWhatsApp}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-base group"
            >
              <Share2 className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              Partager sur WhatsApp
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
              className="w-full text-gray-700 hover:text-gray-900 border-gray-300 hover:bg-gray-100 font-semibold py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center text-base group"
            >
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Retour au calendrier
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceGeneratedDialog;
