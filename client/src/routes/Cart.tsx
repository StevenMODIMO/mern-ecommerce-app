import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Cart() {
  const { state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.user) {
      navigate("/login");
    } else if (!state.user?.account_completed) {
      navigate("/account-setup");
    }
  }, [state.user]);
  return <div>Cart</div>;
}
