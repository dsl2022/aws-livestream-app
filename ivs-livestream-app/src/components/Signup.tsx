// src/SignUp.tsx
import React, { useState } from 'react';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import awsConfig from '../awsConfig';
import { useNavigate } from 'react-router-dom';
const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.userPoolId!,
  ClientId: awsConfig.userPoolWebClientId!,
});

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const attributeList = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
    ];

    userPool.signUp(username, password, attributeList, [], (err, result) => {
      if (err) {
        setError(err.message || JSON.stringify(err));
        return;
      }
      console.log('User signed up');
      navigate('/login');
      // Handle post sign-up actions here (e.g., confirmation code step)
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            {/* Your logo here */}
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up for StreamPals Live</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    type="submit"
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                  >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                    <span className="ml-3">Sign Up</span>
                  </button>
                </form>
                {error && <p className="mt-3 text-xs text-red-500 text-center">{error}</p>}
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by StreamPals Live's
                  <a href="#" className="border-b border-gray-500 border-dotted">Terms of Service</a>
                  and its
                  <a href="#" className="border-b border-gray-500 border-dotted">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Optional: Other content here */}
      </div>
    </div>
  );
};

export default SignUp;
