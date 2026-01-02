import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    
    return (
        <main role="main" aria-label="Landing page">
            <section aria-labelledby="welcome-heading">
                <h1 id="welcome-heading">Welcome to the plearn platform</h1>
                <p> Choose an option below to get started.</p>
            </section>

            <nav aria-label="Authentication navigation">
                <div>
                    <button 
                        onClick={() => navigate('/login')}
                        aria-label="Navigate to login page"
                        className="btn btn-primary"
                    >
                        Login
                    </button>
                </div>
                <div>
                    <button 
                        onClick={() => navigate('/register')}
                        aria-label="Navigate to registration page"
                        className="btn btn-primary"
                    >
                        Register
                    </button>
                </div>
            </nav>
        </main>
    );
};

export default LandingPage;