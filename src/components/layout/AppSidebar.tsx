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
    <Sidebar style={{position:"fixed", top:"68px"}} className="border-r border-border h-[calc(100vh-4rem)]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {initiatives.map((initiative) => {
                const IconComponent = iconMap[initiative.icon] || Cpu;
                const isSelected = selectedInitiative?.id === initiative.id;

                return (
                  <SidebarMenuItem key={initiative.id}>
                    <SidebarMenuButton
                      onClick={() => onInitiativeClick(initiative)}
                      className={`w-full ${isSelected ? 'bg-accent text-accent-foreground' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        {!isCollapsed && <span className="truncate">{initiative.title}</span>}
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