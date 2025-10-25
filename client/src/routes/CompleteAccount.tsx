import { useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useNavigate } from "react-router";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

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
  return (
    <div>
      <Card className="md:w-[60%] md:mx-auto lg:w-[50%]">
        <CardHeader>
          <CardTitle className="text-[#737373] text-xl sm:text-center md:text-start lg:text-2xl">
            Please take a moment to set up your account.
          </CardTitle>
          <CardDescription className="sm:text-center md:text-start">
            You have two options to set up your account: you can choose to be a{" "}
            <strong>Buyer</strong> or a <strong>Seller</strong>. Please select
            the role that best fits your needs to proceed.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
F