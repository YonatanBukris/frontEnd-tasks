import React, { createContext, useContext, useEffect, useState } from "react";
import { formatJWTTokenToUser } from "../utils/formatJWTTokenToUser";
import api from "../services/api.service";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); 
  const navigate = useNavigate();

  // Get token and userId
  const token = localStorage.getItem("token");
  const  id  =  formatJWTTokenToUser(token);
 

  useEffect(() => {
    if (!token) {
      return; // Skip fetching if there's no userId
    }

    const fetchUser = async () => {
      try {
        const userInfo = await api.get(`/auth/user/${id}`);
        setUser(userInfo.data.user);
      } catch (error) {
        console.error("Failed to fetch user data", error);
        if (error.response?.status === 401) {
          // Token might be invalid or expired
          logout();
        }
      }
    };

    fetchUser();
  }, [id, token]); // Add token to dependency array

  const login = (userInfo) => {
    setUser(userInfo);
    navigate("/task");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
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
