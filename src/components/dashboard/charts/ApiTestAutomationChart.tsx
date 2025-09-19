import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface EndpointData {
  passed: number;
  failed: number;
  pending: number;
  endpointId: string;
  endpointName: string;
  totalTestCases: number;
}

interface ProjectData {
  name: string;
  id: string;
  data: {
    totalEndpoints: number;
    endpoints: EndpointData[];
  };
}

interface UserData {
  id: string;
  role: string;
  projects: ProjectData[];
}

interface ApiTestAutomationData {
  [userName: string]: UserData;
}

interface ApiTestAutomationChartProps {
  data: ApiTestAutomationData;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--destructive))', 'hsl(var(--muted))'];

export const ApiTestAutomationChart = ({ data }: ApiTestAutomationChartProps) => {
  // Aggregate test results across all users and projects
  const aggregatedData = Object.entries(data).reduce((acc, [userName, userData]) => {
    userData.projects.forEach(project => {
      project.data.endpoints.forEach(endpoint => {
        acc.totalPassed += endpoint.passed;
        acc.totalFailed += endpoint.failed;
        acc.totalPending += endpoint.pending;
        acc.totalTests += endpoint.totalTestCases;
      });
    });
    return acc;
  }, { totalPassed: 0, totalFailed: 0, totalPending: 0, totalTests: 0 });

  // Prepare data for charts
  const pieData = [
    { name: 'Passed', value: aggregatedData.totalPassed, color: COLORS[0] },
    { name: 'Failed', value: aggregatedData.totalFailed, color: COLORS[1] },
    { name: 'Pending', value: aggregatedData.totalPending, color: COLORS[2] }
  ].filter(item => item.value > 0);

  // User-wise breakdown
  const userBarData = Object.entries(data).map(([userName, userData]) => {
    const userStats = userData.projects.reduce((acc, project) => {
      project.data.endpoints.forEach(endpoint => {
        acc.passed += endpoint.passed;
        acc.failed += endpoint.failed;
        acc.pending += endpoint.pending;
      });
      return acc;
    }, { passed: 0, failed: 0, pending: 0 });

    return {
      user: userName,
      ...userStats
    };
  });

  return (
    <div className="w-full space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-muted/50 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-primary">{aggregatedData.totalTests}</div>
          <div className="text-sm text-muted-foreground">Total Tests</div>
        </div>
        <div className="bg-muted/50 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-green-600">{aggregatedData.totalPassed}</div>
          <div className="text-sm text-muted-foreground">Passed</div>
        </div>
        <div className="bg-muted/50 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-destructive">{aggregatedData.totalFailed}</div>
          <div className="text-sm text-muted-foreground">Failed</div>
        </div>
        <div className="bg-muted/50 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-orange-500">{aggregatedData.totalPending}</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Test Status Distribution */}
        {pieData.length > 0 && (
          <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-6">Test Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* User Performance */}
        <div className="bg-card rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-6">User Test Results</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userBarData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="user" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="passed" fill="hsl(var(--primary))" name="Passed" />
              <Bar dataKey="failed" fill="hsl(var(--destructive))" name="Failed" />
              <Bar dataKey="pending" fill="hsl(var(--muted-foreground))" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Endpoint View */}
      <div className="bg-card rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Endpoint Details</h3>
        <div className="space-y-4">
          {Object.entries(data).map(([userName, userData]) => (
            <div key={userName} className="border rounded-lg p-4">
              <h4 className="font-medium text-primary mb-2">{userName} ({userData.role})</h4>
              {userData.projects.map(project => (
                <div key={project.id} className="ml-4 space-y-2">
                  <h5 className="font-medium text-sm">{project.name}</h5>
                  <div className="grid gap-2">
                    {project.data.endpoints.map(endpoint => (
                      <div key={endpoint.endpointId} className="flex items-center justify-between text-sm bg-muted/30 p-2 rounded">
                        <span className="truncate max-w-[200px]" title={endpoint.endpointName}>
                          {endpoint.endpointName}
                        </span>
                        <div className="flex gap-2 text-xs">
                          <span className="text-green-600">✓{endpoint.passed}</span>
                          <span className="text-destructive">✗{endpoint.failed}</span>
                          <span className="text-orange-500">⏳{endpoint.pending}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};