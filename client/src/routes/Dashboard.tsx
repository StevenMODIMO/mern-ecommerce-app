import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Dashboard() {
  const { state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.user) {
      navigate("/login");
    }
  }, [state.user]);
  return <div>Dashboard</div>;
}
