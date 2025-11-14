import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Shield } from "lucide-react";
import { toast } from "sonner";

interface AlternativeAccessScreenProps {
  onSuccess: () => void;
}

export const AlternativeAccessScreen = ({ onSuccess }: AlternativeAccessScreenProps) => {
  const [accessCode, setAccessCode] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const code = accessCode.toLowerCase().trim();
    
    if (code === "rama") {
      toast.success("Access granted! Welcome, Rama.");
      onSuccess();
    } else if (code === "admin" && password === "@password") {
      toast.success("Admin access granted!");
      onSuccess();
    } else {
      toast.error("Invalid access credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="card-elevated max-w-md w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block p-3 bg-gradient-primary rounded-full pulse-glow">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Alternative Access
          </h2>
          <p className="text-muted-foreground">Enter your access credentials</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Name / Access Code</Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter access code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="input-glow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Optional Password (for Admin)</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glow"
            />
          </div>

          <div className="pt-2">
            <Button onClick={handleSubmit} className="btn-hero w-full">
              <Key className="mr-2 h-5 w-5" />
              Access Application
            </Button>
          </div>

          <div className="p-3 bg-muted/20 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground text-center">
              Valid codes: "Rama" or "Admin" with password
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
