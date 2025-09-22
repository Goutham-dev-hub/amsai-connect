import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import LoginButton from "@/components/auth/LoginButton";

const Index = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-muted-foreground">Redirecting to dashboard...</div>
    </div>
  );
};

export default Index;