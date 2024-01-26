// src/awsConfig.ts
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const awsConfig = {
  region: process.env.REACT_APP_AWS_REGION,
  userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
  identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID
};
if (!awsConfig.userPoolId || !awsConfig.userPoolWebClientId) {
    throw new Error("Cognito User Pool ID and Client ID must be set in environment variables");
  }
export const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.userPoolId,
  ClientId: awsConfig.userPoolWebClientId,
});

export default awsConfig;
