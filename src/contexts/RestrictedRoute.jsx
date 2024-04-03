import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RestrictedRoute = ({ children, page }) => {
  const { user } = useAuth();

  switch (page) {
    case "login":
      if (user) {
        return <Navigate to="/" replace />;
      }
      break;
    case "profile":
      if (!user) {
        return <Navigate to="/login" replace />;
      }
      break;
    case "admin":
      if (!user || user.roles !== "admin") {
        return <Navigate to="/" replace />;
      }
      break;
    default:
      break;
  }

  return children;
};

export default RestrictedRoute;