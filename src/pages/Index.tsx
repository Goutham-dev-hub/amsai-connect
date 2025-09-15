import { useIsAuthenticated } from "@azure/msal-react";
import Header from "@/components/layout/Header";
import LoginButton from "@/components/auth/LoginButton";
import InitiativesGrid from "@/components/initiatives/InitiativesGrid";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const Index = () => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Header />
          <main className="flex-1">
            <InitiativesGrid />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
