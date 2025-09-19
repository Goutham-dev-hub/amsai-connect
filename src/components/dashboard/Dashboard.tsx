import { useEffect, useState } from "react";
import { DashboardWidget } from "./DashboardWidget";

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
  iconColor: string;
  subInitiatives?: SubInitiative[];
}

interface DashboardProps {
  selectedInitiative?: Initiative;
}

export const Dashboard = ({ selectedInitiative }: DashboardProps) => {
  const [amsAiSubInitiatives, setAmsAiSubInitiatives] = useState<SubInitiative[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await fetch("/initiatives_v2.json");
        const initiatives: Initiative[] = await response.json();
        const amsAi = initiatives.find(init => init.id === "ams-ai");
        if (amsAi && amsAi.subInitiatives) {
          setAmsAiSubInitiatives(amsAi.subInitiatives);
        }
      } catch (error) {
        console.error("Failed to load initiatives", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitiatives();
  }, []);

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-muted-foreground">Loading dashboard...</div>
        </div>
    );
  }

  // If a specific initiative is selected, show its dashboard
  if (selectedInitiative && selectedInitiative.id !== "ams-ai") {
    return (
      <div className="w-full px-6 py-8">
        <h2 className="text-3xl font-bold text-foreground mb-8">{selectedInitiative.title} Dashboard</h2>
        <div className="w-full max-w-none">
          <DashboardWidget key={selectedInitiative.id} initiative={selectedInitiative} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-foreground mb-8">AMS.AI Platform Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {amsAiSubInitiatives.map(sub => (
                <DashboardWidget key={sub.id} initiative={sub} />
            ))}
        </div>
    </div>
  );
};

export default Dashboard;