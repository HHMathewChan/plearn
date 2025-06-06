/* this is the implementation of the Register use case */
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Register = () => {
    const [registerDetails, setRegisterDetails] = useState({
        role: "student", // Default role set to "student"
        name: "",
        email: "",
        password: "",
    });

    const [isRegistered, setIsRegistered] = useState(false);    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setRegisterDetails((registerDetails) => ({
            ...registerDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    role: registerDetails.role,
                    name: registerDetails.name,
                    email: registerDetails.email,
                    password: registerDetails.password
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            window.alert("Registration successful!");
            setIsRegistered(true);
        } catch (error) {
            console.error("Error registering user:", error);
            window.alert("Registration failed. Please try again.");
        }
    };
    if (isRegistered) {
        // Redirect to login page after successful registration
        return <Navigate to="/login" replace={true} />;
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <select
                    name="role"
                    value={registerDetails.role}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                </select> 
                <button type="submit">
                    submit
                </button>
            </form>
        </div>
    );
}
export default Register;