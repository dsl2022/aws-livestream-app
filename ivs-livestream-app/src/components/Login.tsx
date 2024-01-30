// src/components/Login.tsx
import React, { useState } from 'react';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '../awsConfig'; // Adjust the import path as necessary
import ConfirmSignup from './ConfirmSignup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { useUser } from '../context/UserContext'; 
const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUsername: setGlobalUsername } = useUser();
  const { login } = useAuth(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUnConfirmed, setIsUnConfirmed]= useState(false)
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        console.log('Login successful');
        const idToken = session.getIdToken().getJwtToken();
        const accessToken = session.getAccessToken().getJwtToken();
        const refreshToken = session.getRefreshToken().getToken();
  
        localStorage.setItem('idToken', idToken);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);        
  
        // Now call login with the idToken and accessToken
        login(idToken, accessToken); // Adjust this line
        navigate('/dashboard');
      },
      onFailure: (err) => {
        if (err.code === 'UserNotConfirmedException') {
            setIsUnConfirmed(true)
            setGlobalUsername(username);
            navigate('/confirm-signup')
          console.log('User is not confirmed');
        } else {
          setError(err.message || JSON.stringify(err));
        }
      },      
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white rounded p-8 shadow-md">
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        {error && <p className="mt-3 text-center text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
