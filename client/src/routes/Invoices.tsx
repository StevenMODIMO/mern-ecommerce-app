import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Invoices() {
  const { state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.user) {
      navigate("/login");
      return;
    }

    if (!state.user.account_completed) {
      navigate("/account-setup");
      return;
    }

    if (state.user.role !== "seller") {
      navigate("/products");
    }
  }, [state.user, navigate]);

  if (
    !state.user ||
    !state.user.account_completed ||
    state.user.role !== "seller"
  ) {
    return null;
  }

  return <div>Invoices</div>;
}
