// src/components/ProtectedRoute/ProtectedRoute.js
import React, {useContext, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'; // Import AuthContext

function ProtectedRoute({ children }) {

  const { isAuthenticated } = useContext(AuthContext);
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;