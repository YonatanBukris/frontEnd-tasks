import React from 'react'
import { useUserContext } from './userProvider';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const { user } = useUserContext();
    
    if (user === null) {
      return <Navigate to="/auth/login" />;
    }
  
    return children;
  }

export default ProtectedRoute