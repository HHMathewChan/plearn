import { useState } from 'react';
import { BrowserRouter,Routes, Route} from 'react-router-dom';

import Dashboard from './Components/Dashboard';
import Preference from './Components/Preference';
import Login from './Components/Login'; 

function App() {
  const [token, setToken] = useState<string | null>(null);
  if (!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div  className="p-5">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preference" element={<Preference />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App