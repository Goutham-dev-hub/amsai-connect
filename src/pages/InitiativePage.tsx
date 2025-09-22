import { useParams, Navigate } from "react-router-dom";
import { Dashboard } from "@/components/dashboard/Dashboard";
import Header from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useIsAuthenticated } from "@azure/msal-react";
import LoginButton from "@/components/auth/LoginButton";
import { useEffect, useState } from "react";
import InitiativesGrid from "@/components/initiatives/InitiativesGrid";

interface SubInitiative {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  url: string;
  healthCheckUrl?: string;
}

interface Initiative {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  url?: string;
  healthCheckUrl?: string;
  subInitiatives?: SubInitiative[];
}

const InitiativePage = () => {
  const { initiativeId } = useParams();
  const isAuthenticated = useIsAuthenticated();
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await fetch("/initiatives_v2.json");
        const data = await response.json();
        setInitiatives(data);
      } catch (error) {
        console.error("Failed to load initiatives", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitiatives();
  }, []);

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const selectedInitiative = initiatives.find(init => init.id === initiativeId);

  if (!selectedInitiative) {
    return <Navigate to="/404" replace />;
  }

  const renderContent = () => {
    if (selectedInitiative.id === "ams-ai") {
      return <InitiativesGrid initiatives={initiatives} selectedInitiative={selectedInitiative} />;
    }
    return <Dashboard selectedInitiative={selectedInitiative} />;
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar 
          initiatives={initiatives} 
          selectedInitiative={selectedInitiative}
          onInitiativeClick={() => {}}
        />
        <SidebarInset className="flex-1">
          <Header />
          <main className="flex-1">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InitiativePage;