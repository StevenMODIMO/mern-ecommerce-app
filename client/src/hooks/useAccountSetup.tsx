import { useNavigate } from "react-router";
import { useAuthContext } from "@/hooks/useAuthContext";

interface CompleteInput {
  role: string;
}

export const useAccountSetup = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { state } = useAuthContext();

  const email = state.user?.email;

  const complete = async ({ role }: CompleteInput) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/complete-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      });

      const json = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        navigate("/dashboard");
      } else {
        console.log(json);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return { complete };
};
