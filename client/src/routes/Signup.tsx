import { useState, useEffect } from "react";
import { useSignup } from "@/hooks/useSignup";
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
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";

export default function Signup() {
  const [display_name, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const { signup, error, loading, setError } = useSignup();

  const { state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user) {
      navigate("/dashboard");
    }
  }, [state.user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup({
      email,
      password,
      display_name,
      avatar_url: avatar || undefined,
    });
    setEmail("");
    setPassword("");
    setDisplayName("");
    setAvatar(null);
    setPreview("");
  };

  return (
    <div>
      <Card className="border-none shadow-xs sm:w-[60%] sm:mx-auto lg:w-[30%]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          {preview && (
            <img
              src={preview}
              alt={preview}
              className="w-20 h-20 mx-auto rounded-full"
            />
          )}
          <form
            className="space-y-4"
            onSubmit={handleSubmit}
            onFocus={() => setError(null)}
          >
            <div>
              <Label htmlFor="avatar">Avatar (optional)</Label>
              <Input
                type="file"
                id="avatar"
                placeholder="Enter your username"
                className="mt-1 text-[#737373]"
                name="avatar"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setAvatar(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1 text-[#737373]"
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
                className="mt-1 text-[#737373]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="mt-1 text-[#737373]"
                value={display_name}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <CardFooter>
              <Button type="submit" className="w-full">
                {!loading ? (
                  <span>Sign Up</span>
                ) : (
                  <span className="border-4 border-t-transparent p-2 rounded-full animate-spin"></span>
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
        {error && (
          <Alert className="mx-auto w-fit" variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
      </Card>
    </div>
  );
}
