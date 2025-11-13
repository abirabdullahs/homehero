// PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from './../context/Context';

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);

  // Auth state is being checked from Firebase
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  
  if (!user) {
    return <Navigate to="/login" replace />;
  }


  return children;
};

export default PrivateRoute;
