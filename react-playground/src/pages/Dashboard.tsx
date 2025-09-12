import React from "react";
import { Button } from "../components/ui/button";
import { BarChart3, Users, DollarSign, TrendingUp, Map } from "lucide-react";
import SeattleMap from "../components/SeattleMap";
import ErrorBoundary from "../components/ErrorBoundary";
import YouthProgramsVisualization from "../components/YouthProgramsVisualization";

interface ProgramActivity {
  id: string;
  organizationName: string;
  programDescription: string;
  activityName: string;
  activityDescription: string;
  location: string;
  ageRange: string;
  dates: string;
  day: string;
  times: string;
  cost: string;
  url: string;
  lastUpdated: string;
}

const Dashboard = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <Button>Generate Report</Button>
      </div>


      {/* Seattle Boundaries Map */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Map className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Seattle Boundaries Data</h2>
        </div>
        <ErrorBoundary>
          <SeattleMap />
        </ErrorBoundary>
      </div>

      {/* Youth Programs Visualization */}
      <div className="rounded-lg border bg-card p-6">
        <ErrorBoundary>
          <YouthProgramsVisualization />
        </ErrorBoundary>
      </div>

    </div>
  );
};

export default Dashboard;
