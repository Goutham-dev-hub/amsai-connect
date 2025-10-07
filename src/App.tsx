import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/config/authConfig";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import InitiativePage from "./pages/InitiativePage";
import SubInitiativePage from "./pages/SubInitiativePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const msalInstance = new PublicClientApplication(msalConfig);
const isDarkModeEnabled = import.meta.env.VITE_ENABLE_DARK_MODE === 'true';
const isGlassThemeEnabled = import.meta.env.VITE_ENABLE_GLASS_THEME === 'true';

const AppContent = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className={isGlassThemeEnabled ? "glass-theme min-h-screen" : ""}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/initiative/:initiativeId" element={<InitiativePage />} />
            <Route path="/initiative/:initiativeId/:subInitiativeId" element={<SubInitiativePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <MsalProvider instance={msalInstance}>
    {isDarkModeEnabled ? (
      <ThemeProvider defaultTheme="light" storageKey="ams-ui-theme">
        <AppContent />
      </ThemeProvider>
    ) : (
      <AppContent />
    )}
  </MsalProvider>
);

export default App;
