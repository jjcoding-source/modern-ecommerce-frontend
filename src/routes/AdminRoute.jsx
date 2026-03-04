
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AdminRoute({ children }) {
  const { currentUser } = useUser();

  if (!currentUser) {
    
    return <Navigate to="/login" />;
  }

  if (currentUser.role !== "admin") {
    
    return <Navigate to="/" />;
  }

  return children;
}