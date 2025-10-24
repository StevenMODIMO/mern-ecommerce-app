import { useState, useEffect } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useNavigate } from "react-router";
import { useAuthContext } from "@/hooks/useAuthContext";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading, setError } = useLogin();

  const { state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user) {
      navigate("/dashboard");
    }
  }, [state.user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({
      email,
      password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Card className="border-none shadow-xs sm:w-[60%] sm:mx-auto lg:w-[30%]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Login to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={handleSubmit}
            onFocus={() => setError(null)}
          >
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <CardFooter>
              <Button type="submit" className="w-full">
                {!loading ? (
                  <span>Log in</span>
                ) : (
                  <span className="border-4 border-t-transparent p-2 rounded-full animate-spin"></span>
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
        {error && <span className="text-center text-red-500">{error}</span>}
        {loading && <span>{loading}</span>}
      </Card>
    </div>
  );
}
