import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ENDPOINTS } from "@/config/api.config";
import { parseApiResponse } from "@/utils/apiMessages";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  CheckCircle2,
  Clock,
  Copy,
  Loader2,
  Phone,
  Smartphone,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  XCircle,
} from "lucide-react";
import type {
  MobileMoneyProvider,
  Payment,
} from "@/types/api";

const PROVIDERS: {
  id: MobileMoneyProvider;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  prefix: string;
  icon: string;
}[] = [
  {
    id: "mpesa",
    name: "M-Pesa",
    color: "text-red-700",
    bgColor: "bg-red-50 hover:bg-red-100",
    borderColor: "border-red-200 hover:border-red-400",
    prefix: "+243 81/82/83",
    icon: "🔴",
  },
  {
    id: "orange_money",
    name: "Orange Money",
    color: "text-orange-700",
    bgColor: "bg-orange-50 hover:bg-orange-100",
    borderColor: "border-orange-200 hover:border-orange-400",
    prefix: "+243 84/85",
    icon: "🟠",
  },
  {
    id: "airtel_money",
    name: "Airtel Money",
    color: "text-rose-700",
    bgColor: "bg-rose-50 hover:bg-rose-100",
    borderColor: "border-rose-200 hover:border-rose-400",
    prefix: "+243 99/97",
    icon: "🔵",
  },
  {
    id: "africell_money",
    name: "Africell Money",
    color: "text-purple-700",
    bgColor: "bg-purple-50 hover:bg-purple-100",
    borderColor: "border-purple-200 hover:border-purple-400",
    prefix: "+243 90",
    icon: "🟣",
  },
];

type PaymentStep = "select_provider" | "enter_phone" | "instructions" | "confirm" | "success" | "failed";

interface MobileMoneyPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceId: string;
  invoiceNumber: string;
  totalAmount: number;
  onPaymentComplete?: () => void;
}

const TEXT = {
  DIALOG_TITLE: "Paiement Mobile Money",
  SELECT_PROVIDER_TITLE: "Choisissez votre opérateur",
  SELECT_PROVIDER_DESC: "Sélectionnez l'opérateur Mobile Money que vous souhaitez utiliser pour payer.",
  ENTER_PHONE_TITLE: "Numéro de téléphone",
  ENTER_PHONE_DESC: "Entrez le numéro associé à votre compte",
  PHONE_PLACEHOLDER: "Ex: 0812345678",
  PHONE_LABEL: "Numéro Mobile Money",
  INSTRUCTIONS_TITLE: "Instructions de paiement",
  INSTRUCTIONS_DESC: "Suivez ces étapes pour compléter votre paiement",
  CONFIRM_TITLE: "Confirmer le paiement",
  CONFIRM_DESC: "Entrez le code de transaction reçu par SMS après avoir effectué le paiement.",
  TRANSACTION_CODE_LABEL: "Code de transaction (reçu par SMS)",
  TRANSACTION_CODE_PLACEHOLDER: "Ex: MP240315XXXXX",
  SUCCESS_TITLE: "Paiement confirmé !",
  SUCCESS_DESC: "Votre paiement a été confirmé avec succès. Votre inscription est validée.",
  FAILED_TITLE: "Paiement échoué",
  FAILED_DESC: "Le paiement n'a pas pu être complété.",
  BTN_NEXT: "Suivant",
  BTN_BACK: "Retour",
  BTN_PAY: "J'ai effectué le paiement",
  BTN_CONFIRM: "Confirmer le paiement",
  BTN_CLOSE: "Fermer",
  BTN_RETRY: "Réessayer",
  COPY_REF: "Référence copiée !",
  AMOUNT_LABEL: "Montant à payer",
  REF_LABEL: "Référence de transaction",
  EXPIRES_LABEL: "Expire dans",
  INVOICE_LABEL: "Facture",
};

const MobileMoneyPaymentDialog: React.FC<MobileMoneyPaymentDialogProps> = ({
  isOpen,
  onClose,
  invoiceId,
  invoiceNumber,
  totalAmount,
  onPaymentComplete,
}) => {
  const [step, setStep] = useState<PaymentStep>("select_provider");
  const [selectedProvider, setSelectedProvider] = useState<MobileMoneyProvider | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [transactionCode, setTransactionCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setStep("select_provider");
      setSelectedProvider(null);
      setPhoneNumber("");
      setTransactionCode("");
      setPayment(null);
    }
  }, [isOpen]);

  // Countdown timer for payment expiration
  useEffect(() => {
    if (!payment?.expiresAt || step !== "instructions") return;

    const interval = setInterval(() => {
      const now = new Date();
      const expires = new Date(payment.expiresAt!);
      const diff = expires.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining("Expiré");
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [payment?.expiresAt, step]);

  const getToken = () => localStorage.getItem("token");

  const handleInitiatePayment = useCallback(async () => {
    if (!selectedProvider || !phoneNumber.trim()) return;

    setIsLoading(true);
    try {
      const token = getToken();
      if (!token) {
        toast.error("Vous devez être connecté pour effectuer un paiement.");
        return;
      }

      const response = await fetch(ENDPOINTS.PAYMENTS.INITIATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          invoiceId,
          provider: selectedProvider,
          phoneNumber: phoneNumber.trim(),
        }),
      });

      const { ok, data, errorMessage } = await parseApiResponse(response);

      if (!ok) {
        throw new Error(errorMessage || "Erreur lors de l'initiation du paiement");
      }

      setPayment(data.payment as Payment);
      setStep("instructions");
      toast.success("Paiement initié ! Suivez les instructions.");
    } catch (error) {
      console.error("Erreur paiement:", error);
      const msg = error instanceof Error ? error.message : "Erreur réseau";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, [selectedProvider, phoneNumber, invoiceId]);

  const handleConfirmPayment = useCallback(async () => {
    if (!payment || !transactionCode.trim()) return;

    setIsLoading(true);
    try {
      const token = getToken();
      if (!token) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
        return;
      }

      const response = await fetch(ENDPOINTS.PAYMENTS.CONFIRM(payment._id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          providerTransactionId: transactionCode.trim(),
        }),
      });

      const { ok, data, errorMessage } = await parseApiResponse(response);

      if (!ok) {
        throw new Error(errorMessage || "Erreur lors de la confirmation");
      }

      setPayment(data.payment as Payment);
      setStep("success");
      toast.success("Paiement confirmé avec succès !");
      onPaymentComplete?.();
    } catch (error) {
      console.error("Erreur confirmation:", error);
      const msg = error instanceof Error ? error.message : "Erreur réseau";
      toast.error(msg);
      setStep("failed");
    } finally {
      setIsLoading(false);
    }
  }, [payment, transactionCode, onPaymentComplete]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(TEXT.COPY_REF);
  };

  const providerInfo = PROVIDERS.find((p) => p.id === selectedProvider);

  const renderSelectProvider = () => (
    <motion.div
      key="select_provider"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <Smartphone className="h-12 w-12 mx-auto text-gray-700 mb-3" />
        <h3 className="text-xl font-bold text-gray-900">{TEXT.SELECT_PROVIDER_TITLE}</h3>
        <p className="text-sm text-gray-500 mt-1">{TEXT.SELECT_PROVIDER_DESC}</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{TEXT.INVOICE_LABEL}</span>
          <span className="font-mono font-bold text-gray-900">{invoiceNumber}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{TEXT.AMOUNT_LABEL}</span>
          <span className="text-xl font-extrabold text-gray-900">{totalAmount.toFixed(2)} $</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PROVIDERS.map((provider) => (
          <Card
            key={provider.id}
            className={`cursor-pointer transition-all duration-200 border-2 ${
              selectedProvider === provider.id
                ? `${provider.borderColor.split(" ")[0].replace("border-", "border-")} ring-2 ring-offset-1 shadow-lg ${provider.bgColor.split(" ")[0]}`
                : `border-gray-200 hover:border-gray-300 ${provider.bgColor}`
            }`}
            onClick={() => setSelectedProvider(provider.id)}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <span className="text-2xl">{provider.icon}</span>
              <div className="flex-1">
                <p className={`font-bold ${provider.color}`}>{provider.name}</p>
                <p className="text-xs text-gray-500">{provider.prefix}</p>
              </div>
              {selectedProvider === provider.id && (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={() => setStep("enter_phone")}
        disabled={!selectedProvider}
        className="w-full mt-4 bg-gray-900 text-white hover:bg-gray-800 py-6 text-lg rounded-xl"
      >
        {TEXT.BTN_NEXT}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </motion.div>
  );

  const renderEnterPhone = () => (
    <motion.div
      key="enter_phone"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <Phone className="h-12 w-12 mx-auto text-gray-700 mb-3" />
        <h3 className="text-xl font-bold text-gray-900">{TEXT.ENTER_PHONE_TITLE}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {TEXT.ENTER_PHONE_DESC} {providerInfo?.name}
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 mb-4">
        <span className="text-2xl">{providerInfo?.icon}</span>
        <div>
          <p className={`font-bold ${providerInfo?.color}`}>{providerInfo?.name}</p>
          <p className="text-sm text-gray-500">{totalAmount.toFixed(2)} $ à payer</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
          {TEXT.PHONE_LABEL}
        </Label>
        <Input
          id="phone"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder={TEXT.PHONE_PLACEHOLDER}
          className="text-lg py-6 rounded-xl border-gray-300 focus:border-gray-500 focus:ring-gray-500"
        />
        <p className="text-xs text-gray-400">Format : 0812345678 ou +243812345678</p>
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          variant="outline"
          onClick={() => setStep("select_provider")}
          className="flex-1 py-6 rounded-xl border-gray-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {TEXT.BTN_BACK}
        </Button>
        <Button
          onClick={handleInitiatePayment}
          disabled={!phoneNumber.trim() || phoneNumber.trim().length < 9 || isLoading}
          className="flex-1 bg-gray-900 text-white hover:bg-gray-800 py-6 rounded-xl"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <ArrowRight className="mr-2 h-5 w-5" />
          )}
          {isLoading ? "Traitement..." : TEXT.BTN_PAY}
        </Button>
      </div>
    </motion.div>
  );

  const renderInstructions = () => (
    <motion.div
      key="instructions"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <div className="relative inline-block">
          <Smartphone className="h-12 w-12 mx-auto text-gray-700 mb-3" />
          <span className="absolute -top-1 -right-1 text-lg">{providerInfo?.icon}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{TEXT.INSTRUCTIONS_TITLE}</h3>
        <p className="text-sm text-gray-500 mt-1">{TEXT.INSTRUCTIONS_DESC}</p>
      </div>

      {/* Payment info summary */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{TEXT.REF_LABEL}</span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-gray-900 text-sm">
              {payment?.transactionReference}
            </span>
            <button
              onClick={() => copyToClipboard(payment?.transactionReference || "")}
              className="p-1 hover:bg-gray-200 rounded-md transition-colors"
            >
              <Copy className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{TEXT.AMOUNT_LABEL}</span>
          <span className="text-lg font-extrabold text-gray-900">{payment?.amount?.toFixed(2)} $</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{TEXT.EXPIRES_LABEL}</span>
          <span className="flex items-center gap-1 text-sm font-semibold text-amber-600">
            <Clock className="h-4 w-4" />
            {timeRemaining}
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
          {payment?.paymentInstructions}
        </pre>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700">
          Après avoir effectué le paiement sur votre téléphone, vous recevrez un SMS de confirmation
          avec un code de transaction. Cliquez sur le bouton ci-dessous pour confirmer.
        </p>
      </div>

      <Button
        onClick={() => setStep("confirm")}
        className="w-full bg-gray-900 text-white hover:bg-gray-800 py-6 text-lg rounded-xl"
      >
        <CheckCircle2 className="mr-2 h-5 w-5" />
        {TEXT.BTN_PAY}
      </Button>
    </motion.div>
  );

  const renderConfirm = () => (
    <motion.div
      key="confirm"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <CheckCircle2 className="h-12 w-12 mx-auto text-green-600 mb-3" />
        <h3 className="text-xl font-bold text-gray-900">{TEXT.CONFIRM_TITLE}</h3>
        <p className="text-sm text-gray-500 mt-1">{TEXT.CONFIRM_DESC}</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 mb-4">
        <span className="text-2xl">{providerInfo?.icon}</span>
        <div>
          <p className={`font-bold ${providerInfo?.color}`}>{providerInfo?.name}</p>
          <p className="text-sm text-gray-500">
            {payment?.phoneNumber} — {payment?.amount?.toFixed(2)} $
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="transactionCode" className="text-sm font-semibold text-gray-700">
          {TEXT.TRANSACTION_CODE_LABEL}
        </Label>
        <Input
          id="transactionCode"
          type="text"
          value={transactionCode}
          onChange={(e) => setTransactionCode(e.target.value)}
          placeholder={TEXT.TRANSACTION_CODE_PLACEHOLDER}
          className="text-lg py-6 rounded-xl border-gray-300 focus:border-gray-500 focus:ring-gray-500 font-mono"
        />
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          variant="outline"
          onClick={() => setStep("instructions")}
          className="flex-1 py-6 rounded-xl border-gray-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {TEXT.BTN_BACK}
        </Button>
        <Button
          onClick={handleConfirmPayment}
          disabled={!transactionCode.trim() || transactionCode.trim().length < 4 || isLoading}
          className="flex-1 bg-green-700 text-white hover:bg-green-800 py-6 rounded-xl"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <CheckCircle2 className="mr-2 h-5 w-5" />
          )}
          {isLoading ? "Vérification..." : TEXT.BTN_CONFIRM}
        </Button>
      </div>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <CheckCircle2 className="h-20 w-20 mx-auto text-green-500 mb-4" />
      </motion.div>
      <h3 className="text-2xl font-bold text-gray-900">{TEXT.SUCCESS_TITLE}</h3>
      <p className="text-gray-600">{TEXT.SUCCESS_DESC}</p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2 text-left">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">{TEXT.REF_LABEL}</span>
          <span className="font-mono font-bold text-gray-900 text-sm">{payment?.transactionReference}</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Code opérateur</span>
          <span className="font-mono font-bold text-gray-900 text-sm">{payment?.providerTransactionId}</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">{TEXT.AMOUNT_LABEL}</span>
          <span className="text-lg font-extrabold text-green-700">{payment?.amount?.toFixed(2)} $</span>
        </div>
      </div>

      <Button
        onClick={onClose}
        className="w-full bg-gray-900 text-white hover:bg-gray-800 py-6 text-lg rounded-xl mt-4"
      >
        {TEXT.BTN_CLOSE}
      </Button>
    </motion.div>
  );

  const renderFailed = () => (
    <motion.div
      key="failed"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-4 text-center"
    >
      <XCircle className="h-20 w-20 mx-auto text-red-500 mb-4" />
      <h3 className="text-2xl font-bold text-gray-900">{TEXT.FAILED_TITLE}</h3>
      <p className="text-gray-600">{TEXT.FAILED_DESC}</p>

      <div className="flex gap-3 mt-6">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex-1 py-6 rounded-xl border-gray-300"
        >
          {TEXT.BTN_CLOSE}
        </Button>
        <Button
          onClick={() => {
            setStep("select_provider");
            setTransactionCode("");
          }}
          className="flex-1 bg-gray-900 text-white hover:bg-gray-800 py-6 rounded-xl"
        >
          {TEXT.BTN_RETRY}
        </Button>
      </div>
    </motion.div>
  );

  const renderStep = () => {
    switch (step) {
      case "select_provider":
        return renderSelectProvider();
      case "enter_phone":
        return renderEnterPhone();
      case "instructions":
        return renderInstructions();
      case "confirm":
        return renderConfirm();
      case "success":
        return renderSuccess();
      case "failed":
        return renderFailed();
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Smartphone className="h-6 w-6" />
            {TEXT.DIALOG_TITLE}
          </DialogTitle>
        </DialogHeader>

        {/* Step indicator */}
        {step !== "success" && step !== "failed" && (
          <div className="flex items-center justify-center gap-2 my-2">
            {["select_provider", "enter_phone", "instructions", "confirm"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    step === s
                      ? "bg-gray-900 text-white"
                      : ["select_provider", "enter_phone", "instructions", "confirm"].indexOf(step) > i
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {["select_provider", "enter_phone", "instructions", "confirm"].indexOf(step) > i ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < 3 && (
                  <div
                    className={`w-8 h-0.5 ${
                      ["select_provider", "enter_phone", "instructions", "confirm"].indexOf(step) > i
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default MobileMoneyPaymentDialog;
