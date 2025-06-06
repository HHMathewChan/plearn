import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = sessionStorage.getItem('token');

    // If token is not set, redirect to login page
    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }

    // If token is set, render the children components
    return children;
}

export default ProtectedRoute;