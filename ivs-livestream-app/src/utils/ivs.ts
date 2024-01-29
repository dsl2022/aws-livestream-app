// You don't need to modify this file

import { IvsClient } from "@aws-sdk/client-ivs";
import { GetStreamCommand, ListStreamsCommand } from "@aws-sdk/client-ivs";
import {getCredentials} from "../auth";
import { Stream, StreamSummary } from "../types";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
let ivsClient: IvsClient;

async function getIVSClient() {
  if (ivsClient) {
    return ivsClient;
  }

  const region = "us-east-1";
  const idToken = localStorage.getItem('idToken');
  const identityPoolId:string = process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID as string
  const userPoolId:string = process.env.REACT_APP_COGNITO_USER_POOL_ID as string  
if (!idToken) {
  // Use idToken to authenticate with Cognito Identity Pool or make requests to IVS
  throw new Error("idToken is not defined"); 
}
const credentials = fromCognitoIdentityPool({
  client: new CognitoIdentityClient({ region }),
  identityPoolId,
  logins: {
    // Replace the key with your Cognito User Pool URL
    [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: idToken,
  },
});
  ivsClient = new IvsClient({ region, credentials: await credentials()  });  
  return ivsClient;
}

async function getStream(id: string): Promise<Stream> {
  const client = await getIVSClient();
  const getStreamCommand = new GetStreamCommand({ channelArn: id });
  const { stream } = await client.send(getStreamCommand);
  return stream as Stream;
}

async function listStreams(): Promise<Array<StreamSummary>> {
  const client = await getIVSClient();
  const listStreamsCommand = new ListStreamsCommand({});
  const { streams = [] } = await client.send(listStreamsCommand);
  console.log({streams})
  return streams.map((stream) => ({ id: stream.channelArn as string }));
}



export { getStream, listStreams };
