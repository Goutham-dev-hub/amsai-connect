import { useIsAuthenticated } from "@azure/msal-react";
import Header from "@/components/layout/Header";
import LoginButton from "@/components/auth/LoginButton";
import InitiativesGrid from "@/components/initiatives/InitiativesGrid";

const Index = () => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <InitiativesGrid />
      </main>
    </div>
  );
};

export default Index;
