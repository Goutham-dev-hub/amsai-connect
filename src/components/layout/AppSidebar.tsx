import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  ChevronDown, 
  ChevronRight,
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

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

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

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Initiatives
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {initiatives.map((initiative) => {
                const IconComponent = iconMap[initiative.icon] || Cpu;
                const hasSubItems = initiative.subInitiatives && initiative.subInitiatives.length > 0;
                const isExpanded = expandedItems.has(initiative.id);

                return (
                  <SidebarMenuItem key={initiative.id}>
                    <SidebarMenuButton
                      onClick={() => hasSubItems ? toggleExpanded(initiative.id) : window.open(initiative.url, '_blank')}
                      className="w-full justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        {!isCollapsed && <span className="truncate">{initiative.title}</span>}
                      </div>
                      {!isCollapsed && hasSubItems && (
                        isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                      )}
                    </SidebarMenuButton>
                    {hasSubItems && isExpanded && !isCollapsed && (
                      <SidebarMenuSub>
                        {initiative.subInitiatives?.map((subItem) => {
                          const SubIconComponent = iconMap[subItem.icon] || Cpu;
                          return (
                            <SidebarMenuSubItem key={subItem.id}>
                              <SidebarMenuSubButton
                                asChild
                                onClick={() => window.open(subItem.url, '_blank')}
                              >
                                <div className="flex items-center gap-2 cursor-pointer">
                                  <SubIconComponent className="h-3 w-3" />
                                  <span className="truncate text-xs">{subItem.title}</span>
                                </div>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
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