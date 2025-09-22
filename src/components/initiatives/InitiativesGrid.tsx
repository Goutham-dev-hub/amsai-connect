import InitiativeCard from "./InitiativeCard";
import { useNavigate, useParams } from "react-router-dom";

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

interface InitiativesGridProps {
  initiatives: Initiative[];
  selectedInitiative?: Initiative | null;
  onInitiativeSelect?: (initiative: Initiative) => void;
}

const InitiativesGrid = ({ initiatives, selectedInitiative, onInitiativeSelect }: InitiativesGridProps) => {
  const navigate = useNavigate();
  const { initiativeId } = useParams();
  const displayInitiatives = selectedInitiative
    ? selectedInitiative.subInitiatives || []
    : initiatives;

  const handleInitiativeSelect = (initiative: Initiative | SubInitiative) => {
    if (selectedInitiative && selectedInitiative.subInitiatives) {
      // This is a sub-initiative click
      navigate(`/initiative/${initiativeId}/${initiative.id}`);
    } else {
      // This is a main initiative click
      navigate(`/initiative/${initiative.id}`);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {selectedInitiative ? selectedInitiative.title : "AMS.AI Initiatives"}
        </h2>
        <p className="text-muted-foreground">
          {selectedInitiative
            ? selectedInitiative.description
            : "Access your AI-powered management tools and insights"}
        </p>
      </div>

      {displayInitiatives.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {displayInitiatives.map((initiative) => (
            <InitiativeCard
              key={initiative.id}
              initiative={initiative}
              onInitiativeSelect={handleInitiativeSelect}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-muted-foreground">
            {selectedInitiative
              ? "No sub-initiatives available for this selection."
              : "No initiatives found."}
          </p>
        </div>
      )}
    </div>
  );
};

export default InitiativesGrid;