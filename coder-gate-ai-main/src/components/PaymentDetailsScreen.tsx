import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Phone, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface PaymentDetailsScreenProps {
  onSuccess: () => void;
}

export const PaymentDetailsScreen = ({ onSuccess }: PaymentDetailsScreenProps) => {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [generatedCode] = useState(() => Math.floor(1000 + Math.random() * 9000).toString());

  const handlePaymentConfirm = () => {
    setPaymentConfirmed(true);
    toast.success("Payment confirmed! Please verify your phone number.");
  };

  const handleVerifySMS = () => {
    if (smsCode === generatedCode) {
      toast.success("Verification successful!");
      onSuccess();
    } else {
      toast.error("Invalid SMS code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="card-elevated max-w-2xl w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Payment Details
          </h2>
          <p className="text-muted-foreground">Complete your payment to unlock access</p>
        </div>

        {!paymentConfirmed ? (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-hero rounded-lg border border-primary/20">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Payment Instructions</h3>
                  <p className="text-sm text-muted-foreground">
                    Transfer ₹20 to the following number via UPI or any payment app:
                  </p>
                  <div className="p-3 bg-card rounded-md">
                    <p className="text-2xl font-mono font-bold text-primary">+91 9440754377</p>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handlePaymentConfirm} className="btn-hero w-full">
              <CheckCircle className="mr-2 h-5 w-5" />
              I have completed the ₹20 payment
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-destructive">TEST ENVIRONMENT</p>
                  <p className="text-sm text-muted-foreground">
                    Simulated SMS Code: <span className="font-mono font-bold text-foreground">{generatedCode}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Your Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="input-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sms">Enter SMS Confirmation Code</Label>
                <Input
                  id="sms"
                  type="text"
                  placeholder="Enter 4-digit code"
                  value={smsCode}
                  onChange={(e) => setSmsCode(e.target.value)}
                  className="input-glow"
                  maxLength={4}
                />
              </div>

              <Button onClick={handleVerifySMS} className="btn-hero w-full">
                Verify & Continue
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
