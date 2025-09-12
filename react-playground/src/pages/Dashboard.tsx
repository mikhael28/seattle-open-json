import React from "react";
import { Button } from "../components/ui/button";
import { Map } from "lucide-react";
import SeattleMap from "../components/SeattleMap";
import ErrorBoundary from "../components/ErrorBoundary";

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


    </div>
  );
};

export default Dashboard;
