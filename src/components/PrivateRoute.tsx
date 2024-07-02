import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({
  isValidUser,
  invalidRoute,
  children,
}: {
  isValidUser: boolean;
  invalidRoute: string;
  children: ReactNode;
}) => {
  return isValidUser ? children : <Navigate to={`${invalidRoute}`} replace />;
};
