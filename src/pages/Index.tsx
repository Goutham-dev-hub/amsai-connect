import { useState } from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import Header from "@/components/layout/Header";
import LoginButton from "@/components/auth/LoginButton";
import InitiativesGrid from "@/components/initiatives/InitiativesGrid";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface Initiative {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  url: string;
  subInitiatives?: {
    id: string;
    title: string;
    description: string;
    icon: string;
    iconColor: string;
    url: string;
  }[];
}

const Index = () => {
  const isAuthenticated = useIsAuthenticated();
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  const handleInitiativeClick = (initiative: Initiative) => {
    setSelectedInitiative(initiative);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex pt-16"> {/* Add padding-top to account for fixed header */}
          <AppSidebar onInitiativeClick={handleInitiativeClick} />
          <main className="flex-1 overflow-auto">
            <InitiativesGrid selectedInitiative={selectedInitiative} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
