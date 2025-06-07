import { Navigate } from "react-router-dom";
import { useState } from "react";

/* this is the implemntation of the login use case, which is a functional component that handles user login.
It includes a form for the user to enter their email and password, and it sends a request to the server to validate the user's credentials. 
If the login is successful, it stores the token in session storage and redirects the user to the student home page. */
async function requestLogin(credentials:Credentials) {
    try {
        const response = await fetch('http://localhost:3001/api/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Save the token to session storage or state management
        sessionStorage.setItem('token', data.token);
        return data.token;
    } 
    catch (error) {
        console.error("Error validating user:", error);
        throw error; // Re-throw the error for further handling
    }        
}

const Login = () => {
    const [loginDetails, setLoginDetails] = useState({
        email: "", //This is for email property starts as an empty string, not define its type
        password: ""
    });
    const [token, setToken] = useState<string | null>(sessionStorage.getItem('token'));

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginDetails((loginDetails) => ({
            ...loginDetails,
            [name]: value
        }));
    };
    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitting login details:", loginDetails);
        try {
            console.log("Login details:", loginDetails);
            const token = await requestLogin(loginDetails);
            sessionStorage.setItem('token', token);
            setToken(token); // Update the token state to trigger rendering
        } catch (error) {
            console.error("Login failed:", error);
            window.alert("Login failed. Please check your credentials and try again.");
        }
    };
    // If token is set, redirect to student-home page
    if (token) {
        return <Navigate to="/student-home" replace={true} />;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={loginDetails.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={loginDetails.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;