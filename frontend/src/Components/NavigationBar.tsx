import { NavLink } from "react-router-dom";

const NavigationBar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          PLearn
        </div>
        
        <div className="flex space-x-6">
          <NavLink
            to="/student-home"
            className={({ isActive }) =>
              `px-3 py-2 rounded transition-colors ${
                isActive 
                  ? "bg-blue-800 text-white" 
                  : "hover:bg-blue-700"
              }`
            }
          >
            Home
          </NavLink>
          
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `px-3 py-2 rounded transition-colors ${
                isActive 
                  ? "bg-blue-800 text-white" 
                  : "hover:bg-blue-700"
              }`
            }
          >
            Courses
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;