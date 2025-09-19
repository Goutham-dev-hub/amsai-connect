import { useEffect, useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { LogMonitorChart } from "./charts/LogMonitorChart";
import { TsenseChart } from "./charts/TsenseChart";
import { TicketBotChart } from "./charts/TicketBotChart";
import { EcommercePortalChart } from "./charts/EcommercePortalChart";
import { ApiTestAutomationChart } from "./charts/ApiTestAutomationChart";

interface DashboardWidgetProps {
  initiative: {
    id: string;
    title: string;
    iconColor: string;
  };
}

const chartComponents = {
    'log-monitor': LogMonitorChart,
    'tsense': TsenseChart,
    'ticket-bot': TicketBotChart,
    'ecommerce-portal': EcommercePortalChart,
    'api-testing': ApiTestAutomationChart,
};

// Map initiative IDs to their respective JSON file names
const dataFileMap = {
    'api-testing': 'api-test-automation.json'
};

function formatKey(key: string) {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

export const DashboardWidget = ({ initiative }: DashboardWidgetProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fileName = dataFileMap[initiative.id] || `${initiative.id}.json`;
        const response = await fetch(`/${fileName}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(`Failed to load data for ${initiative.id}`, error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initiative.id]);

  const ChartComponent = chartComponents[initiative.id];
  const displayData = data?.summary || data;

  return (
    <DashboardCard title={initiative.title}>
      {loading ? (
        <div className="h-48 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      ) : data ? (
        <div>
            {ChartComponent ? (
                <ChartComponent data={data.series || data} />
            ) : (
                <div className="grid grid-cols-2 gap-4 text-sm p-4">
                {Object.entries(displayData).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                    <p className="text-xs text-muted-foreground">{formatKey(key)}</p>
                    <p className="font-semibold text-lg">{String(value)}</p>
                    </div>
                ))}
                </div>
            )}
        </div>
      ) : (
        <div className="h-48 flex items-center justify-center">
            <p className="text-sm text-destructive">Failed to load data.</p>
        </div>
      )}
    </DashboardCard>
  );
};