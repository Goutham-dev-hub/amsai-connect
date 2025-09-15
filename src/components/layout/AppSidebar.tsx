import { useState, useEffect } from "react";
import { 
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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
  url: string;
  subInitiatives?: SubInitiative[];
}

const iconMap: Record<string, any> = {
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
  onInitiativeClick: (initiative: Initiative) => void;
}

export function AppSidebar({ onInitiativeClick }: AppSidebarProps) {
  const { state } = useSidebar();
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [selectedInitiative, setSelectedInitiative] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await fetch("/initiatives_v2.json");
        if (response.ok) {
          const data = await response.json();
          setInitiatives(data);
        }
      } catch (error) {
        console.error("Failed to load initiatives:", error);
      }
    };

    fetchInitiatives();
  }, []);

  const handleInitiativeClick = (initiative: Initiative) => {
    setSelectedInitiative(initiative.id);
    onInitiativeClick(initiative);
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-border h-[calc(100vh-4rem)]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Initiatives
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {initiatives.map((initiative) => {
                const IconComponent = iconMap[initiative.icon] || Cpu;
                const isSelected = selectedInitiative === initiative.id;

                return (
                  <SidebarMenuItem key={initiative.id}>
                    <SidebarMenuButton
                      onClick={() => handleInitiativeClick(initiative)}
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