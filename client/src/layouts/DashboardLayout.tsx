import { Outlet } from "react-router";
import { ChartArea, ChartBarIcon } from "lucide-react";

export default function DashboardLayout() {
  return (
    <div>
      <ChartBarIcon className="w-5 h-5" />
      <h1>Seller's Dashboard Layout</h1>
      <Outlet />
    </div>
  );
}
