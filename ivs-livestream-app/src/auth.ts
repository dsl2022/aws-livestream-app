// src/auth.ts
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from './awsConfig';
import { CognitoIdentityClient, GetIdCommand, GetCredentialsForIdentityCommand } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

export const authenticateUser = async (username: string, password: string) => {
  const user = new CognitoUser({ Username: username, Pool: userPool });
  const authenticationDetails = new AuthenticationDetails({ Username: username, Password: password });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authenticationDetails, {
      onSuccess: (session) => resolve(session),
      onFailure: (err) => reject(err)
    });
  });
};

export const getCredentials = async (region: string, idToken: string) => {
  const cognitoIdentityClient = new CognitoIdentityClient({ region });

  const identityPoolId = process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID
  if (!identityPoolId) {
    throw new Error("Cognito User Pool ID and Client ID must be set in environment variables");
  }
  const credentials = fromCognitoIdentityPool({
    client: cognitoIdentityClient,
    identityPoolId: identityPoolId,
    logins: {
      [`cognito-idp.${region}.amazonaws.com/${process.env.REACT_APP_COGNITO_USER_POOL_ID}`]: idToken
    }
  });

  return credentials;
};
