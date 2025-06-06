import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
    const navigate = useNavigate();
  return(
    <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is the main content area.</p>
        < div>
            <button onClick={() => navigate('/login')}>Login</button>
        </div>
        < div>
            <button>Register</button>
        </div>
    </div>
  );
}

export default LandingPage;