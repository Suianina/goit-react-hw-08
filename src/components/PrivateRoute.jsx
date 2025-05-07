import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedIn } from "../redux/auth/selectors";

const PrivateRoute = ({ children, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectLoggedIn);
  return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;