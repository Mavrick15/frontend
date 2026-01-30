import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ENDPOINTS } from '@/config/api.config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Loader2 } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import type { Invoice, InvoicesResponse } from '@/types/api';
import { getNetworkErrorMessage, parseApiResponse } from '@/utils/apiMessages';
import { toast } from 'sonner';

const TEXT_CONSTANTS = {
  SEO_TITLE: "Mes Factures - Zetoun Labs",
  SEO_DESCRIPTION: "Consultez l'historique de vos factures",
  PAGE_TITLE: "Mes Factures",
  PAGE_SUBTITLE: "Historique de toutes vos factures",
  NO_INVOICES: "Aucune facture trouvée",
  NO_INVOICES_DESCRIPTION: "Vous n'avez pas encore de factures.",
  LOADING: "Chargement des factures...",
  INVOICE_NUMBER: "N° Facture",
  DATE: "Date",
  STATUS: "Statut",
  TOTAL: "Total",
  VIEW: "Voir",
  DOWNLOAD: "Télécharger",
  STATUS_PENDING: "En attente",
  STATUS_PAID: "Payée",
  STATUS_CANCELLED: "Annulée",
  STATUS_REFUNDED: "Remboursée",
};

const Invoices = () => {
  const { user, isAuthenticated } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchInvoices();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Vous devez être connecté');
        return;
      }

      const response = await fetch(ENDPOINTS.INVOICES.LIST, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const { ok, data, errorMessage } = await parseApiResponse(response);

      if (!ok) {
        const msg = errorMessage || 'Erreur lors de la récupération des factures';
        setError(msg);
        toast.error(msg);
        return;
      }

      const invoicesData = data as InvoicesResponse;
      setInvoices(invoicesData.invoices || []);
    } catch (err) {
      console.error('Erreur:', err);
      const msg = err instanceof Error ? err.message : getNetworkErrorMessage();
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: TEXT_CONSTANTS.STATUS_PENDING, variant: 'secondary' as const },
      paid: { label: TEXT_CONSTANTS.STATUS_PAID, variant: 'default' as const },
      cancelled: { label: TEXT_CONSTANTS.STATUS_CANCELLED, variant: 'destructive' as const },
      refunded: { label: TEXT_CONSTANTS.STATUS_REFUNDED, variant: 'outline' as const },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    // Ouvrir une nouvelle fenêtre pour imprimer/télécharger
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Impossible d\'ouvrir la fenêtre d\'impression');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Facture ${invoice.invoiceNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
          .header h1 { margin: 0; font-size: 28px; }
          .invoice-info { margin-bottom: 20px; }
          .client-info { margin-bottom: 20px; background: #f8f8f8; padding: 15px; border-radius: 5px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #000; color: white; }
          .total { text-align: right; font-weight: bold; font-size: 20px; margin-top: 20px; padding-top: 10px; border-top: 2px solid #000; }
          @media print { .no-print { display: none; } button { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>ZETOUN LABS</h1>
          <p>L'expertise au service de votre avenir numérique</p>
        </div>
        <div class="invoice-info">
          <h2>FACTURE N° ${invoice.invoiceNumber}</h2>
          <p><strong>Date:</strong> ${new Date(invoice.createdAt || '').toLocaleDateString('fr-FR')}</p>
          <p><strong>Statut:</strong> ${invoice.status.toUpperCase()}</p>
        </div>
        <div class="client-info">
          <h3>Informations Client:</h3>
          <p><strong>Nom:</strong> ${invoice.clientInfo.name}<br/>
          <strong>Email:</strong> ${invoice.clientInfo.email}<br/>
          ${invoice.clientInfo.phone ? `<strong>Téléphone:</strong> ${invoice.clientInfo.phone}<br/>` : ''}
          ${invoice.clientInfo.address?.street ? `<strong>Adresse:</strong> ${invoice.clientInfo.address.street}<br/>` : ''}
          ${invoice.clientInfo.address?.city || invoice.clientInfo.address?.postalCode ? 
            `${invoice.clientInfo.address.postalCode || ''} ${invoice.clientInfo.address.city || ''}`.trim() + '<br/>' : ''}
          ${invoice.clientInfo.address?.country ? `<strong>Pays:</strong> ${invoice.clientInfo.address.country}` : ''}
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
            ${invoice.items.map((item, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${item.title}</td>
                <td>${item.quantity}</td>
                <td>${item.price.toFixed(2)} $</td>
                <td>${(item.price * item.quantity).toFixed(2)} $</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="total">
          ${invoice.subtotal !== invoice.total ? `<p>Sous-total: ${invoice.subtotal.toFixed(2)} $</p>` : ''}
          ${invoice.tax > 0 ? `<p>Taxe: ${invoice.tax.toFixed(2)} $</p>` : ''}
          ${invoice.discount > 0 ? `<p>Remise: -${invoice.discount.toFixed(2)} $</p>` : ''}
          <p>Total TTC: ${invoice.total.toFixed(2)} $</p>
        </div>
        ${invoice.notes ? `<div style="margin-top: 30px;"><strong>Notes:</strong> ${invoice.notes}</div>` : ''}
        <div class="no-print" style="margin-top: 30px; text-align: center;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #000; color: white; border: none; border-radius: 5px; cursor: pointer;">Imprimer</button>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  if (!isAuthenticated) {
    return (
      <PageLayout>
        <SEO title={TEXT_CONSTANTS.SEO_TITLE} description={TEXT_CONSTANTS.SEO_DESCRIPTION} />
        <div className="flex items-center justify-center min-h-screen">
          <Card>
            <CardContent className="p-6 text-center">
              <p>Vous devez être connecté pour voir vos factures.</p>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SEO title={TEXT_CONSTANTS.SEO_TITLE} description={TEXT_CONSTANTS.SEO_DESCRIPTION} />
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{TEXT_CONSTANTS.PAGE_TITLE}</h1>
            <p className="text-gray-600">{TEXT_CONSTANTS.PAGE_SUBTITLE}</p>
          </div>

          {loading ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>{TEXT_CONSTANTS.LOADING}</p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-red-500">{error}</p>
                <Button onClick={fetchInvoices} className="mt-4">Réessayer</Button>
              </CardContent>
            </Card>
          ) : invoices.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center py-12">
                <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{TEXT_CONSTANTS.NO_INVOICES}</h3>
                <p className="text-gray-600">{TEXT_CONSTANTS.NO_INVOICES_DESCRIPTION}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <Card key={invoice._id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="h-5 w-5 text-gray-600" />
                          <h3 className="text-lg font-semibold text-gray-900">
                            {TEXT_CONSTANTS.INVOICE_NUMBER}: {invoice.invoiceNumber}
                          </h3>
                          {getStatusBadge(invoice.status)}
                        </div>
                        <p className="text-sm text-gray-600">
                          {TEXT_CONSTANTS.DATE}: {new Date(invoice.createdAt || '').toLocaleDateString('fr-FR')}
                        </p>
                        <p className="text-sm text-gray-600">
                          {invoice.items.length} formation(s)
                        </p>
                      </div>
                      <div className="flex flex-col md:items-end gap-2">
                        <p className="text-xl font-bold text-gray-900">
                          {invoice.total.toFixed(2)} $
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadInvoice(invoice)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            {TEXT_CONSTANTS.DOWNLOAD}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Invoices;
