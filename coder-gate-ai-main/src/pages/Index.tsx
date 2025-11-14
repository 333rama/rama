import { useState } from "react";
import { PaymentScreen } from "@/components/PaymentScreen";
import { PaymentDetailsScreen } from "@/components/PaymentDetailsScreen";
import { AlternativeAccessScreen } from "@/components/AlternativeAccessScreen";
import { FinalAuthScreen } from "@/components/FinalAuthScreen";
import { MainApp } from "@/components/MainApp";

type Screen = "payment" | "payment-details" | "alternative" | "final-auth" | "app";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("payment");

  return (
    <>
      {currentScreen === "payment" && (
        <PaymentScreen
          onPaymentChoice={() => setCurrentScreen("payment-details")}
          onAlternativeChoice={() => setCurrentScreen("alternative")}
        />
      )}
      
      {currentScreen === "payment-details" && (
        <PaymentDetailsScreen onSuccess={() => setCurrentScreen("final-auth")} />
      )}
      
      {currentScreen === "alternative" && (
        <AlternativeAccessScreen onSuccess={() => setCurrentScreen("final-auth")} />
      )}
      
      {currentScreen === "final-auth" && (
        <FinalAuthScreen onSuccess={() => setCurrentScreen("app")} />
      )}
      
      {currentScreen === "app" && <MainApp />}
    </>
  );
};

export default Index;
