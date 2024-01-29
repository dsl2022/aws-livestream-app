// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUp from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useAuth } from './context/AuthContext'; // Import the useAuth hook
import ConfirmSignup from './components/ConfirmSignup';

function App() {
  const { isLoggedIn, logout } = useAuth(); // Use the isLoggedIn state and logout function

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            {!isLoggedIn ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) : (
              <li>
                <Link to="/" onClick={logout}>Logout</Link>
              </li>
            )}
            {!isLoggedIn && <li>
              <Link to="/signup">Sign Up</Link>
            </li>}
            {isLoggedIn && <li>
               <Link to="/dashboard">Dashboard</Link>
            </li>}
          </ul>
        </nav>

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />  
          <Route path="/confirm-signup" element={<ConfirmSignup />} />
          <Route path="/" element={<div>IVS livestream app</div>} /> {/* Optional: Home page or Redirect */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
