import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { LogIn, Origami, SendHorizontal } from "lucide-react";
import { useUserContext } from "../components/userProvider";
import api from "../services/api.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserContext();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      login(user); // Use the user object directly from the response
      navigate("/task"); 
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-8 shadow-lg rounded-lg">
  <CardHeader className="mb-6">
    <CardTitle className="flex justify-between items-center text-2xl font-semibold">
      <span>Login</span> <SendHorizontal />
    </CardTitle>
  </CardHeader>
  <CardContent>
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label className="text-lg font-medium">Email:</Label>
        <Input
          name="email"
          type="email"
          placeholder="Enter email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-lg font-medium">Password:</Label>
        <Input
          name="password"
          type="password"
          placeholder="Enter password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border rounded-md"
        />
      </div>
      <Button type="submit" className="py-3 mt-4 rounded-md">Login</Button>
    </form>
  </CardContent>
  <CardFooter className="mt-6 text-center">
    <p className="text-sm">
      Don't have an account?{" "}
      <Link className="underline font-semibold" to="/auth/register">
        Register
      </Link>
    </p>
  </CardFooter>
</Card>
  );
}

export default LoginPage;
