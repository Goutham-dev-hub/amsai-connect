import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/config/authConfig";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const LoginButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error("Login failed:", e);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-8 max-w-md mx-auto p-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary">AMS.AI</h1>
          <p className="text-lg text-muted-foreground">
            Access your AI-powered management suite
          </p>
        </div>
        
        <Button
          onClick={handleLogin}
          size="lg"
          className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
        >
          <LogIn className="mr-2 h-5 w-5" />
          Sign in with Azure AD
        </Button>
        
        <p className="text-sm text-muted-foreground">
          Sign in with your organization account to access AMS.AI initiatives
        </p>
      </div>
    </div>
  );
};

export default LoginButton;