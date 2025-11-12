// PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from './../context/Context';

AuthContext
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Auth state load হচ্ছে
  if (loading) {
    return <div>Loading...</div>; // অথবা spinner
  }

  // ইউজার লগইন না থাকলে login page এ redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ইউজার থাকলে route render করবে
  return children;
};

export default PrivateRoute;
