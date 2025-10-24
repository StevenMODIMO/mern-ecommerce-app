import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Home() {
  const { state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user) {
      navigate("/dashboard");
    }
  }, [state.user]);
  return <div>Home</div>;
}
