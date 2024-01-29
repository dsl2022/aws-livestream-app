// src/components/Login.tsx
import React, { useState } from 'react';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '../awsConfig'; // Adjust the import path as necessary
import ConfirmSignup from './ConfirmSignup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
const Login: React.FC = () => {
  const navigate = useNavigate();
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
        console.log('Login successful', session);
        localStorage.setItem('idToken', session.getIdToken().getJwtToken());
        localStorage.setItem('accessToken', session.getAccessToken().getJwtToken());
        localStorage.setItem('refreshToken', session.getRefreshToken().getToken());        
        login();
        navigate('/dashboard');
      },
      onFailure: (err) => {
        if (err.code === 'UserNotConfirmedException') {
            setIsUnConfirmed(true)
          console.log('User is not confirmed');
        } else {
          setError(err.message || JSON.stringify(err));
        }
      },      
    });
  };

  return (
    <div>
      {isUnConfirmed?<ConfirmSignup username={username}/>:(<form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>)}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Login;
