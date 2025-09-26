import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "@/config/authConfig";
import LoginButton from "@/components/auth/LoginButton";

const Index = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const { instance } = useMsal();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleSilentLogin = async () => {
      try {
        const accounts = instance.getAllAccounts();
        console.log("Found accounts:", accounts.length);
        
        if (accounts.length > 0) {
          console.log("Attempting silent login for account:", accounts[0].username);
          // Set the active account
          instance.setActiveAccount(accounts[0]);
          
          // Try to acquire token silently
          await instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
          });
          
          console.log("Silent login successful");
          // If successful, user will be authenticated and redirected
        } else {
          console.log("No existing accounts found, showing login screen");
        }
      } catch (error) {
        console.log("Silent login failed:", error);
        // If silent login fails, user will see login button
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuthenticated) {
      handleSilentLogin();
    } else {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, instance]);

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Redirecting to dashboard...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Checking authentication...</div>
      </div>
    );
  }

  return <LoginButton />;
};

export default Index;