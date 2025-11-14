import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, Key } from "lucide-react";

interface PaymentScreenProps {
  onPaymentChoice: () => void;
  onAlternativeChoice: () => void;
}

export const PaymentScreen = ({ onPaymentChoice, onAlternativeChoice }: PaymentScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="card-elevated max-w-2xl w-full p-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-gradient-primary rounded-full pulse-glow">
            <CreditCard className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Advanced AI Multi-Modal Coder
          </h1>
          <p className="text-muted-foreground text-lg">
            Unlock powerful AI-driven code analysis and debugging capabilities
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-muted/30 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-2">Premium Access</h3>
            <p className="text-muted-foreground mb-4">
              One-time payment of ₹20 for unlimited access
            </p>
            <Button onClick={onPaymentChoice} className="btn-hero w-full">
              <CreditCard className="mr-2 h-5 w-5" />
              Proceed to Pay
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <div className="p-6 bg-muted/20 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-2">Alternative Access</h3>
            <p className="text-muted-foreground mb-4">
              Use a special access code if you have one
            </p>
            <Button onClick={onAlternativeChoice} variant="outline" className="w-full">
              <Key className="mr-2 h-5 w-5" />
              Use Alternative Access Code
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
