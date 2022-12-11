import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

export const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return <>{isLoggedIn ? children : <Navigate to="/login" />}</>;
};
