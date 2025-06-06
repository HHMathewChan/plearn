import { BrowserRouter,Routes, Route} from 'react-router-dom';
import StudentHome from './Pages/StudentHome';
import LandingPage from './Pages/LandingPage';
import Login from './UseCases/Login';


function App() {
  return (
    <div  className="p-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student-home" element={<StudentHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App