// src/components/ConfirmSignup.tsx
import React, { useState } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '../awsConfig';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
interface ConfirmSignupProps {
  username: string;
}

const ConfirmSignup: React.FC = () => {
  const [code, setCode] = useState('');
  const { username } = useUser();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        setError(err.message || JSON.stringify(err));
        return;
      }
      console.log('Confirmation successful', result);
      navigate('/login');
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Confirmation Code"
        />
        <button type="submit">Confirm</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ConfirmSignup;
