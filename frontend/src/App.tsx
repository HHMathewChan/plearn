import { BrowserRouter,Routes, Route} from 'react-router-dom';
import StudentHome from './Pages/StudentHome';
import LandingPage from './Pages/LandingPage';
import { LoginFacade } from './UseCases/LoginFacade';
import ProtectedRoute from './Components/ProtectedRoute';
import RegisterFacade from './UseCases/RegisterFacade';


function App() {
  return (
    <div  className="p-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginFacade />} />
          <Route path="/register" element={<RegisterFacade />} />
          // Protected route for student home 
          <Route 
            path="/student-home" 
            element={
              <ProtectedRoute>
                <StudentHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App