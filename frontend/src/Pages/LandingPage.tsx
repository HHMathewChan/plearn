import { useNavigate } from 'react-router-dom';
import FeaturesSection from '../Components/FeaturesSection';

const LandingPage = () => {
    const navigate = useNavigate();
    
    return (
        <main 
            role="main" 
            aria-label="Landing page"
            className="min-h-screen bg-white flex flex-col justify-center items-center px-4 py-12"
        >
            <section 
                aria-labelledby="welcome-heading"
                className="text-center mb-10 max-w-3xl"
            >
                <h1 
                    id="welcome-heading"
                    className="text-5xl font-bold text-purple-600 mb-4"
                >
                    Welcome to the plearn platform
                </h1>
                <p className="text-xl text-gray-700">
                    Choose an option below to get started.
                </p>
            </section>

            <FeaturesSection />

            <nav 
                aria-label="Authentication navigation"
                className="flex gap-6 flex-wrap justify-center"
            >
                <button 
                    onClick={() => navigate('/login')}
                    aria-label="Navigate to login page"
                    className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-purple-900 focus:ring-offset-2 transition-all duration-300"
                >
                    Login
                </button>
                <button 
                    onClick={() => navigate('/register')}
                    aria-label="Navigate to registration page"
                    className="px-8 py-3 bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-800 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-purple-600 focus:ring-offset-2 transition-all duration-300"
                >
                    Register
                </button>
            </nav>
        </main>
    );
};

export default LandingPage;