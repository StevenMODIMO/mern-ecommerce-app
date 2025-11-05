import { Outlet } from "react-router";
import { ChartBarIcon, User2, Mail, MessageCircleDashed } from "lucide-react";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function DashboardLayout() {
  const {
    state: { user },
  } = useAuthContext();
  return (
    <div>
      <header className="flex items-center gap-2 font-bold text-[#737373] text-xl">
        <User2 />
        <h1>
          Welcome! <span className="">{user?.display_name}</span>
        </h1>
      </header>
      {/* <ChartBarIcon className="w-5 h-5" />
      <h1>Seller's Dashboard Layout</h1> */}
      <Outlet />
    </div>
  );
}
