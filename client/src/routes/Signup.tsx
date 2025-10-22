import { useState } from "react";

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

export default function Signup() {
  const [display_name, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
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
          <form className="space-y-4">
            <div>
              <Label htmlFor="username">Avatar (optional)</Label>
              <Input
                type="file"
                id="username"
                placeholder="Enter your username"
                className="mt-1"
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
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="mt-1"
                value={display_name}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
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
                Sign Up
              </Button>
            </CardFooter>
          </form>
        </CardContent>
        <span>{email}</span> <span>{password}</span>{" "}
        <span>{display_name} </span>
      </Card>
    </div>
  );
}
