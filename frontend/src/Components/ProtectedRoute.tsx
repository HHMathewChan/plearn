/**
 * This file defines a ProtectedRoute component that checks for user authentication.
 * If the user is not authenticated (i.e., no token is found in sessionStorage),
 * it redirects the user to the login page.
 * If the user is authenticated, it renders the children components.
 */
import { Navigate } from "react-router-dom";
import { AuthService } from "../Services/AuthService";

type ProtectedRouteProps = {
    children: JSX.Element;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    // If isAuthenticated is false, redirect to login page
    if (!AuthService.isAuthenticated()) {
        return <Navigate to="/login" replace={true} />;
    }

    // If isAuthenticated is true, render the children components
    return children;
}

export default ProtectedRoute;