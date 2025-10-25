import { useEffect, useState } from "react";
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { useAccountSetup } from "@/hooks/useAccountSetup";

export default function CompleteAccount() {
  const [role, setRole] = useState("");
  const { state } = useAuthContext();
  const navigate = useNavigate();
  const { complete } = useAccountSetup();

  const email = state.user?.email || "";

  const handleSubmit = async () => {
    await complete({ role });
  };

  useEffect(() => {
    if (!state.user) {
      navigate("/login");
      return;
    }
    if (state.user.account_completed) {
      navigate("/dashboard");
    }
  }, [state.user?.account_completed]);

  return (
    <div>
      <Card className="md:w-[60%] md:mx-auto lg:w-[50%]">
        <CardHeader>
          <CardTitle className="text-[#737373] text-xl sm:text-center md:text-start lg:text-center lg:text-2xl">
            Please take a moment to set up your account.
          </CardTitle>
          <CardDescription className="sm:text-center md:text-start lg:text-center">
            You have two options to set up your account: you can choose to be a{" "}
            <strong>Buyer</strong> or a <strong>Seller</strong>. Please select
            the role that best fits your needs to proceed.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-fit mx-auto">
          <Select
            defaultValue="buyer"
            value={role}
            onValueChange={(e) => setRole(e)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>User Role</SelectLabel>
                <SelectItem value="buyer">Buyer</SelectItem>
                <SelectItem value="seller">Seller</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            className="w-fit mx-auto px-4 py-2 rounded disabled:opacity-50"
            disabled={!role}
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
