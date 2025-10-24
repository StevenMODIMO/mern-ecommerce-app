import { useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useNavigate } from "react-router";
import { Navigate } from "react-router-dom";

export default function CompleteAccount() {
  const { state } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.user) {
      navigate("/login");
    } else if (state.user?.account_completed) {
      navigate("/dashboard");
    }
  }, [state.user]);
  return <div>CompleteAccount</div>;
}
