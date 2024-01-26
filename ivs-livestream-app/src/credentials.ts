import {
  CognitoIdentityClient,
  GetIdCommand,
  GetOpenIdTokenCommand,
} from "@aws-sdk/client-cognito-identity";
import { getDefaultRoleAssumerWithWebIdentity } from "@aws-sdk/client-sts";
import { fromWebToken } from "@aws-sdk/credential-provider-web-identity";
import { CredentialProvider } from "@aws-sdk/types";

async function getCredentials(region: string): Promise<CredentialProvider> {
  const cognitoClient = new CognitoIdentityClient({ region });
  const getIdentityId = new GetIdCommand({
    IdentityPoolId: `${region}:d708309a-dcdd-4d30-bc9c-c863d8e1cc8e`,
  });
  const { IdentityId = "" } = await cognitoClient.send(getIdentityId);
  console.log({IdentityId})
  const getOpenIdToken = new GetOpenIdTokenCommand({ IdentityId });
  const { Token = "" } = await cognitoClient.send(getOpenIdToken);

  return fromWebToken({
    roleArn: "arn:aws:iam::448723242191:role/Cognito_IvsAppAuthenticatedRole",
    webIdentityToken: Token,
    roleSessionName: IdentityId.substring(IdentityId.indexOf(":") + 1),
    roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(),
  });
}

export default getCredentials;
