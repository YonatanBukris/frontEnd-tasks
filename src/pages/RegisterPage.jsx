import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import api from "../services/api.service"; // Import your API service

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
        firstName,
        lastName,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
   
      navigate("/auth/login"); 
    } catch (error) {
      console.error("Registration failed:", error.response ? error.response.data.message : error.message);
      // Handle error state or display error message
    }
  };

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Register</span> <UserPlus />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label>Username:</Label>
            <Input
              name="username"
              placeholder="Enter username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Label>Email:</Label>
            <Input
              name="email"
              type="email"
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label>Password:</Label>
            <Input
              name="password"
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Label>First name:</Label>
            <Input
              name="firstName"
              placeholder="Enter first name..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <Label>Last name:</Label>
            <Input
              name="lastName"
              placeholder="Enter last name..."
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <Button type="submit">Register</Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs">
          Already have an account?{" "}
          <Link className="underline font-bold" to="/auth/login">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default RegisterPage;
