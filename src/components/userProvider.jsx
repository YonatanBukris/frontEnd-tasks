import React, { createContext, useContext, useEffect, useState } from "react";
import { formatJWTTokenToUser } from "../utils/formatJWTTokenToUser";
import axios from "axios";
import api from "../services/api.service";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Get token and userId
  const token = localStorage.getItem("token");
  const { userId } = token ? formatJWTTokenToUser(token) : {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      return; // Skip fetching if there's no userId
    }

    const fetchUser = async () => {
      try {
        const userInfo = await api.get(`/auth/login/${userId}`);
        setUser(userInfo.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUser();
  }, [userId]);

  const login = (userInfo) => {
    setUser(userInfo);
    navigate("./task");
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("../");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("This context should be used only inside UserProvider");
  }
  return context;
}