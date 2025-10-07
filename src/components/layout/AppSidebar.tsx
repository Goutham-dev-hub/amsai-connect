import { 
  Home,
  Hospital, 
  Database, 
  Truck, 
  TestTube, 
  Cpu,
  Eye,
  Ticket,
  FileText,
  Bot,
  Code,
  Activity,
  Users,
  ShoppingCart
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface SubInitiative {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  url: string;
}

interface Initiative {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  url?: string;
  subInitiatives?: SubInitiative[];
}

const iconMap: Record<string, any> = {
  home: Home,
  hospital: Hospital,
  database: Database,
  truck: Truck,
  beaker: TestTube,
  cpu: Cpu,
  eye: Eye,
  ticket: Ticket,
  "file-text": FileText,
  bot: Bot,
  code: Code,
  activity: Activity,
  users: Users,
  "shopping-cart": ShoppingCart,
};

interface AppSidebarProps {
  initiatives: Initiative[];
  selectedInitiative: Initiative | null;
  onInitiativeClick: (initiative: Initiative) => void;
}

export function AppSidebar({ initiatives, selectedInitiative, onInitiativeClick }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const location = useLocation();
  const isGlassThemeEnabled = import.meta.env.VITE_ENABLE_GLASS_THEME === 'true';

  return (
    <Sidebar 
      style={{position:"fixed", top:"68px"}} 
      className={isGlassThemeEnabled ? "glass-sidebar border-r h-[calc(100vh-4rem)]" : "border-r border-sidebar-border bg-sidebar h-[calc(100vh-4rem)]"}
    >
      <SidebarContent className="p-0">
        <div className="p-6 border-b border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            Menu
          </h2>
        </div>
        <SidebarGroup className="px-4 py-2">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {/* Dashboard Link */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/dashboard"
                    className={`
                      w-full px-4 py-3 rounded-lg flex items-center gap-3
                      ${location.pathname === '/dashboard' 
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                        : 'text-sidebar-foreground'
                      }
                    `}
                  >
                    <Home className="h-4 w-4" />
                    {!isCollapsed && (
                      <span className="font-medium text-sm">Dashboard</span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Initiative Links */}
              {initiatives.filter(init => init.id !== 'dashboard').map((initiative) => {
                const IconComponent = iconMap[initiative.icon] || Cpu;
                const routePath = `/initiative/${initiative.id}`;
                const isSelected = location.pathname === routePath || location.pathname.startsWith(routePath + '/');

                return (
                  <SidebarMenuItem key={initiative.id}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={routePath}
                        className={`
                          w-full px-4 py-3 rounded-lg flex items-center gap-3
                          ${isSelected 
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                            : 'text-sidebar-foreground'
                          }
                        `}
                      >
                        <IconComponent className="h-4 w-4" />
                        {!isCollapsed && (
                          <span className="font-medium text-sm">
                            {initiative.title}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}