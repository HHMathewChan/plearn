import { Navigate } from 'react-router-dom';
import { useRegistration } from '../Hooks/useRegistration';
import { useEffect, useState } from 'react';

/**
 * This is the implementation of the Register use case
 * It uses the custom hook useRegistration to manage the registration state and logic.
 * The component displays a registration form and handles user input.
 * Upon successful registration, it redirects the user to the login page after displaying a window alert showing the student code.
 * If registration fails, it displays an error message.
 * The component also handles loading states to disable the submit button while the registration request is in progress.
 * The form includes fields for email, password, name, and role selection.
 * The role defaults to "student" but can be changed to "tutor" or "admin".
 */
const RegisterFacade = () => {
    const {
        registerDetails,
        isRegistered,
        isLoading,
        responseMessage,
        handleChange,
        handleSubmit
    } = useRegistration();

    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (isRegistered && responseMessage) {
            // Display message for 2 seconds before redirecting
            const timer = setTimeout(() => {
                setShouldRedirect(true);
            }, 12000);

            return () => clearTimeout(timer);
        }
    }, [isRegistered, responseMessage]);

    if (shouldRedirect) {
        return <Navigate to="/login" replace={true} />;
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            
            {/* Display response message */}
            {responseMessage && (
                <div className={`p-3 mb-4 rounded ${
                    isRegistered 
                        ? 'bg-green-100 text-green-700 border border-green-300' 
                        : 'bg-red-100 text-red-700 border border-red-300'
                }`}>
                    {responseMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* ...existing form code... */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registerDetails.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={registerDetails.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={registerDetails.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <label htmlFor='role' className="block mb-2">Role:</label>
                <select id='role'
                    name="role"
                    value={registerDetails.role}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default RegisterFacade;