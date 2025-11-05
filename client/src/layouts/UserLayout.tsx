import { Outlet } from "react-router";
import { User2 } from "lucide-react";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function UserLayout() {
  const {
    state: { user },
  } = useAuthContext();
  return (
    <div>
      <header className="flex items-center gap-2 font-bold text-[#737373] text-xl">
        <User2 />
        <h1>
          Welcome! <span>{user?.display_name}</span>
        </h1>
      </header>
      <Outlet />
    </div>
  );
}
