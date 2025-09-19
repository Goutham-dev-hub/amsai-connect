import { useState, useEffect } from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import Header from "@/components/layout/Header";
import LoginButton from "@/components/auth/LoginButton";
import InitiativesGrid from "@/components/initiatives/InitiativesGrid";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Dashboard from "@/components/dashboard/Dashboard";

interface Initiative {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  url?: string;
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
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await fetch("/initiatives_v2.json");
        const data: Initiative[] = await response.json();
        setInitiatives(data);
        if (data.length > 0) {
          setSelectedInitiative(data[0]); // Select dashboard by default
        }
      } catch (error) {
        console.error("Failed to load initiatives:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitiatives();
  }, []);

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  const handleInitiativeClick = (initiative: Initiative) => {
    setSelectedInitiative(initiative);
  };

  const renderContent = () => {
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        );
    }

    if (!selectedInitiative) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-muted-foreground">No initiatives found.</div>
            </div>
        );
    }

    if (selectedInitiative.id === 'dashboard') {
      return <Dashboard />;
    }

    if (selectedInitiative.id === 'api-testing') {
      return <Dashboard selectedInitiative={selectedInitiative} />;
    }

    return (
      <InitiativesGrid
        initiatives={initiatives}
        selectedInitiative={selectedInitiative}
        onInitiativeSelect={handleInitiativeClick}
      />
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex pt-16"> {/* Add padding-top to account for fixed header */}
          <AppSidebar 
            initiatives={initiatives}
            selectedInitiative={selectedInitiative}
            onInitiativeClick={handleInitiativeClick} 
          />
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;