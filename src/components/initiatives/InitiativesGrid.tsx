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
  initiatives: Initiative[];
  selectedInitiative?: Initiative | null;
  onInitiativeSelect?: (initiative: Initiative) => void;
}

const InitiativesGrid = ({ initiatives, selectedInitiative, onInitiativeSelect }: InitiativesGridProps) => {
  const displayInitiatives = selectedInitiative
    ? selectedInitiative.subInitiatives || []
    : initiatives;

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
              onInitiativeSelect={onInitiativeSelect}
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