import { useState } from 'react';
import type { RegisterDetails } from '../Types/RegisterUCType';
import RegisterPlatformUser from '../Services/PlatformUserService';

/**
 * Custom hook for managing student registration.
 * @returns An object containing registration details, loading state, response message, and handlers for form changes and submission.
 */
export const useRegistration = () => {
    const [registerDetails, setRegisterDetails] = useState<RegisterDetails>({
        role: "student",
        name: "",
        email: "",
        password: "",
    });

    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setRegisterDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setResponseMessage(""); // Clear previous message

        try {
            const response = await RegisterPlatformUser(registerDetails);
            setResponseMessage(`Registration successful! Your student code is: ${response.student_code}`);
            setIsRegistered(true);
        } catch (error) {
            console.error("Error registering student:", error);
            setResponseMessage("Registration failed. Please try again.");
            setIsRegistered(false);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        registerDetails,
        isRegistered,
        isLoading,
        responseMessage,
        handleChange,
        handleSubmit
    };
};