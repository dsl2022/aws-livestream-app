import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUp from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ConfirmSignup from './components/ConfirmSignup';
import { useAuth } from './context/AuthContext'; 
import LandingPage from './components/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import RealTimePlayBack from './components/RealtimePlayback';
// Import SVGs and other assets here if necessary

function App() {
  const { isLoggedIn, logout } = useAuth(); // Use the isLoggedIn state and logout function  
  return (
    <Router>
      <div className="App">
        <header>
          <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700 bg-white">
            <div>
              {/* Logo and SVG here */}
            </div>
            <div className="hidden w-full md:flex md:items-center md:w-auto">
              <ul className="text-base text-gray-700 pt-4 md:flex md:justify-between md:pt-0">
                {!isLoggedIn ? (
                  <>
                    <li><Link className="md:p-4 py-2 block hover:text-purple-400" to="/login">Login</Link></li>
                    <li><Link className="md:p-4 py-2 block hover:text-purple-400" to="/signup">Sign Up</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link className="md:p-4 py-2 block hover:text-purple-400" to="/" onClick={logout}>Logout</Link></li>
                    <li><Link className="md:p-4 py-2 block hover:text-purple-400" to="/dashboard">Dashboard</Link></li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />           
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/playback" element={<RealTimePlayBack />} />           
          </Route>
          <Route path="/confirm-signup" element={<ConfirmSignup />} />
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
