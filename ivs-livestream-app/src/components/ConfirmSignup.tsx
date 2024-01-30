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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white rounded p-8 shadow-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="confirmationCode" className="sr-only">Confirmation Code</label>
            <input
              id="confirmationCode"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Confirmation Code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Confirm
          </button>
        </form>
        {error && <p className="mt-3 text-center text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ConfirmSignup;
