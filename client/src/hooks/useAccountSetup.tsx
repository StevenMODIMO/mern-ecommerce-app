import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export default function useAccountSetup() {
  const { state } = useAuthContext();
  return <div>useAccountSetup</div>;
}
