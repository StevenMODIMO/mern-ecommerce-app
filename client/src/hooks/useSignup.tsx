import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

interface SignupInput {
  email: string;
  password: string;
  display_name: string;
  avatar_url?: File;
}

export const useSignup = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async ({
    email,
    password,
    display_name,
    avatar_url,
  }: SignupInput) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("display_name", display_name);
      if (avatar_url) {
        formData.append("avatar_url", avatar_url);
      }

      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Signup failed");
      }

      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };
};
