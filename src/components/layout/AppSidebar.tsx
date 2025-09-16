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

  return (
    <Sidebar 
      style={{position:"fixed", top:"68px"}} 
      className="border-r border-sidebar-border bg-sidebar shadow-lg h-[calc(100vh-4rem)]"
    >
      <SidebarContent className="p-0">
        <div className="p-6 border-b border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            Navigation
          </h2>
          <p className="text-sm text-sidebar-foreground/70 mt-1">
            AMS.AI Platform
          </p>
        </div>
        <SidebarGroup className="px-4 py-2">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {initiatives.map((initiative) => {
                const IconComponent = iconMap[initiative.icon] || Cpu;
                const isSelected = selectedInitiative?.id === initiative.id;

                return (
                  <SidebarMenuItem key={initiative.id}>
                    <SidebarMenuButton
                      onClick={() => onInitiativeClick(initiative)}
                      className={`
                        w-full px-4 py-3 rounded-lg transition-all duration-200 group
                        ${isSelected 
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm border border-sidebar-accent/20' 
                          : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground text-sidebar-foreground/80'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          flex items-center justify-center w-8 h-8 rounded-md shrink-0
                          ${isSelected 
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                            : 'bg-sidebar-accent/30 text-sidebar-foreground/60 group-hover:bg-sidebar-primary group-hover:text-sidebar-primary-foreground'
                          }
                          transition-all duration-200
                        `}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        {!isCollapsed && (
                          <div className="flex flex-col items-start min-w-0">
                            <span className="font-medium text-sm truncate">
                              {initiative.title}
                            </span>
                            {initiative.description && (
                              <span className="text-xs opacity-60 truncate max-w-full">
                                {initiative.description.length > 40 
                                  ? `${initiative.description.substring(0, 40)}...` 
                                  : initiative.description
                                }
                              </span>
                            )}
                          </div>
                        )}
                      </div>
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