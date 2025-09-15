import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";

interface UserProfile {
  displayName?: string;
  mail?: string;
  userPrincipalName?: string;
}

const Header = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (isAuthenticated && accounts[0]) {
      // Use the account information from MSAL
      const account = accounts[0];
      setUserProfile({
        displayName: account.name || "",
        mail: account.username || "",
        userPrincipalName: account.username || "",
      });
    }
  }, [isAuthenticated, accounts]);

  const handleLogout = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-bold tracking-wide">AMS.AI</h1>
          </div>

          {/* User Profile & Logout */}
          {isAuthenticated && userProfile && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {userProfile.displayName || userProfile.mail || userProfile.userPrincipalName}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-primary-foreground/20 text-primary-foreground bg-primary-foreground/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;