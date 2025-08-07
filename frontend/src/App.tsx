import { BrowserRouter,Routes, Route} from 'react-router-dom';
import StudentHome from './Pages/StudentHome';
import LandingPage from './Pages/LandingPage';
import CoursePage from './Pages/CoursePage';
import { LoginFacade } from './Facades/LoginFacade';
import ProtectedRoute from './Components/ProtectedRoute';
import ProtectedLayout from './Components/ProtectedLayout';
import RegisterFacade from './UseCases/RegisterFacade';
import CourseContentPage from './Pages/CourseContentPage';


function App() {
  return (
    <div  className="p-5">
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          {/* The following routes are for the landing page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginFacade />} />
          <Route path="/register" element={<RegisterFacade />} />
          {/* The following routes is protected */}
          {/* This route is for the student home page */}
          <Route
            path="/student-home"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <StudentHome />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          {/* This route is for the course page */}
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <CoursePage />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
           {/* This route is for the course content page */}
        < Route
          path="/courses/:courseId"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <CourseContentPage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App