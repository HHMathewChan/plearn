import { BrowserRouter,Routes, Route} from 'react-router-dom';
import StudentHome from './Pages/StudentHome';
import LandingPage from './Pages/LandingPage';
import Login from './UseCases/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import Register from './UseCases/Register';


function App() {
  return (
    <div  className="p-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected route for student home */}
          <Route 
            path="/student-home" 
            element={
              <ProtectedRoute>
                <StudentHome />
              </ProtectedRoute>
            } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App