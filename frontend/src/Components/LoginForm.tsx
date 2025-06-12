/** 
 * LoginForm component for user authentication.
* This is the presentation layer of the login use case.
*/
import type { Credentials } from "../Types/AuthenticationType";

type LoginFormProps = {
    loginDetails: Credentials;
    isLoading: boolean;
    error: string | null;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({
    loginDetails,
    isLoading,
    error,
    onInputChange,
    onSubmit
}) => {
    // This component renders a login form with email and password fields.
    // It accepts props for login details, loading state, error messages, input change handler, and submit handler.
    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={loginDetails.email}
                        onChange={onInputChange}
                        required
                        disabled={isLoading}
                        placeholder="Enter your email"
                        title="Email"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={loginDetails.password}
                        onChange={onInputChange}
                        required
                        disabled={isLoading}
                        placeholder="Enter your password"
                        title="Password"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className={`w-full p-2 rounded text-white font-medium ${
                        isLoading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};