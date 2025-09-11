import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Gauge, Ticket, Code, Bandage, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Initiative {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  url: string;
}

interface InitiativeCardProps {
  initiative: Initiative;
}

const iconMap = {
  speedometer: Gauge,
  ticket: Ticket,
  code: Code,
  "band-aid": Bandage,
  users: Users,
};

const InitiativeCard = ({ initiative }: InitiativeCardProps) => {
  const IconComponent = iconMap[initiative.icon as keyof typeof iconMap] || Gauge;

  const handleClick = () => {
    window.open(initiative.url, "_blank", "noopener,noreferrer");
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case "dashboard":
        return "text-dashboard";
      case "tsense":
        return "text-tsense";
      case "csense":
        return "text-csense";
      case "selfheal":
        return "text-selfheal";
      default:
        return "text-primary";
    }
  };

  const getIconBgColor = (color: string) => {
    switch (color) {
      case "dashboard":
        return "bg-dashboard/10";
      case "tsense":
        return "bg-tsense/10";
      case "csense":
        return "bg-csense/10";
      case "selfheal":
        return "bg-selfheal/10";
      default:
        return "bg-primary/10";
    }
  };

  return (
    <Card
      className="group cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:scale-[1.02] border border-border/50 bg-card"
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
              getIconBgColor(initiative.color)
            )}
          >
            <IconComponent
              className={cn("h-6 w-6", getIconColor(initiative.color))}
            />
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {initiative.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {initiative.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InitiativeCard;