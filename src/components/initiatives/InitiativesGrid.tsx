import { useState, useEffect } from "react";
import InitiativeCard from "./InitiativeCard";

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

interface InitiativesGridProps {
  selectedInitiative?: Initiative | null;
}

const InitiativesGrid = ({ selectedInitiative }: InitiativesGridProps) => {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await fetch("/initiatives_v2.json");
        if (!response.ok) {
          throw new Error("Failed to load initiatives");
        }
        const data = await response.json();
        setInitiatives(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchInitiatives();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading initiatives...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-destructive">Error: {error}</div>
      </div>
    );
  }

  // Show sub-initiatives if a parent initiative is selected
  const displayInitiatives = selectedInitiative?.subInitiatives || initiatives;
  const isShowingSubInitiatives = selectedInitiative?.subInitiatives;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {isShowingSubInitiatives ? selectedInitiative.title : "AMS.AI Initiatives"}
        </h2>
        <p className="text-muted-foreground">
          {isShowingSubInitiatives 
            ? selectedInitiative.description 
            : "Access your AI-powered management tools and insights"
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {displayInitiatives.map((initiative) => (
          <InitiativeCard key={initiative.id} initiative={initiative} />
        ))}
      </div>
    </div>
  );
};

export default InitiativesGrid;