import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
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
  ShoppingCart,
  Home,
  HeartPulse,
  HeartOff
} from "lucide-react";
import { cn } from "@/lib/utils";

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

interface InitiativeCardProps {
  initiative: Initiative;
  onInitiativeSelect?: (initiative: Initiative) => void;
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

const InitiativeCard = ({ initiative, onInitiativeSelect }: InitiativeCardProps) => {
  const [healthStatus, setHealthStatus] = useState<'idle' | 'checking' | 'ok' | 'failed'>('idle');
  const IconComponent = iconMap[initiative.icon] || Cpu;
  const hasSubInitiatives = initiative.subInitiatives && initiative.subInitiatives.length > 0;

  const handleClick = () => {
    if (initiative.id === 'dashboard' && onInitiativeSelect) {
        onInitiativeSelect(initiative);
    } else if (hasSubInitiatives && onInitiativeSelect) {
      onInitiativeSelect(initiative);
    } else if (initiative.url && initiative.url !== "#") {
      window.open(initiative.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleSubInitiativeClick = (e: React.MouseEvent, subInitiative: SubInitiative) => {
    e.stopPropagation();
    if (subInitiative.url && subInitiative.url !== "#") {
      window.open(subInitiative.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleHealthCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (healthStatus === 'checking') return;

    setHealthStatus('checking');
    // Simulate API call
    setTimeout(() => {
        const isSuccess = Math.random() > 0.3; // 70% chance of success
        setHealthStatus(isSuccess ? 'ok' : 'failed');

        // Reset to idle after a few seconds
        setTimeout(() => {
            setHealthStatus('idle');
        }, 3000);
    }, 2000);
  };

  const isChecking = healthStatus === 'checking';
  const iconTextColorClass = initiative.iconColor.replace('bg-', 'text-');

  return (
    <Card
      className="group cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:scale-[1.02] border border-border/50 bg-card relative"
      onClick={handleClick}
    >
        {initiative.healthCheckUrl && (
            <Button 
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-100"
                onClick={handleHealthCheck}
                disabled={isChecking}
            >
                {healthStatus === 'failed' ? (
                    <HeartOff className="h-4 w-4 text-destructive" />
                ) : (
                    <HeartPulse className={cn(
                        "h-4 w-4",
                        isChecking && "animate-ping",
                        healthStatus === 'ok' ? "text-green-500" : iconTextColorClass
                    )} />
                )}
            </Button>
        )}
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", initiative.iconColor || "bg-primary")}>
              {IconComponent && <IconComponent className="h-6 w-6 text-white" />}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                {initiative.title}
              </h3>
              {hasSubInitiatives && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  {initiative.subInitiatives!.length} tools
                </Badge>
              )}
            </div>
          </div>
          {/* This is a spacer to prevent title from overlapping the button */}
          <div className="w-8"></div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {initiative.description}
          </p>
          
          {hasSubInitiatives && (
            <div className="space-y-2 pt-2">
              <h4 className="text-sm font-medium text-foreground">Available Tools:</h4>
              <div className="grid gap-2">
                {initiative.subInitiatives!.slice(0, 3).map((subItem) => {
                  const SubIconComponent = iconMap[subItem.icon] || Cpu;
                  return (
                    <div
                      key={subItem.id}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors cursor-pointer"
                      onClick={(e) => handleSubInitiativeClick(e, subItem)}
                    >
                       <div className={cn("p-1 rounded", subItem.iconColor || "bg-primary")}>
                        {SubIconComponent && <SubIconComponent className="h-3 w-3 text-white" />}
                      </div>
                      <span className="text-xs text-muted-foreground truncate">{subItem.title}</span>
                    </div>
                  );
                })}
                {initiative.subInitiatives!.length > 3 && (
                  <div className="text-xs text-muted-foreground text-center py-1">
                    +{initiative.subInitiatives!.length - 3} more tools
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InitiativeCard;