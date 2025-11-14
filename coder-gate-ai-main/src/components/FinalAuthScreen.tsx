import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, LogIn } from "lucide-react";
import { toast } from "sonner";

interface FinalAuthScreenProps {
  onSuccess: () => void;
}

const REQUIRED_PASSWORD = "@password";

export const FinalAuthScreen = ({ onSuccess }: FinalAuthScreenProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === REQUIRED_PASSWORD) {
      toast.success(`Welcome, ${username || "User"}!`);
      onSuccess();
    } else {
      toast.error("Invalid password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="card-elevated max-w-md w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block p-3 bg-gradient-primary rounded-full pulse-glow">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Final Authentication
          </h2>
          <p className="text-muted-foreground">One last step to access the coder</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-glow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glow"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <div className="pt-2">
            <Button onClick={handleLogin} className="btn-hero w-full">
              <LogIn className="mr-2 h-5 w-5" />
              Login to Application
            </Button>
          </div>

          <div className="p-3 bg-muted/20 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground text-center">
              Password: @password
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
