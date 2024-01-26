// You don't need to modify this file

import { IvsClient } from "@aws-sdk/client-ivs";
import { GetStreamCommand, ListStreamsCommand } from "@aws-sdk/client-ivs";
import {getCredentials} from "../auth";
import { Stream, StreamSummary } from "../types";

let ivsClient: IvsClient;

async function getIVSClient() {
  if (ivsClient) {
    return ivsClient;
  }

  const region = "us-east-1";
  const idToken = localStorage.getItem('idToken');
if (!idToken) {
  // Use idToken to authenticate with Cognito Identity Pool or make requests to IVS
  throw new Error("idToken is not defined"); 
}
  const credentials = await getCredentials(region,idToken);
  ivsClient = new IvsClient({ region, credentials });

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
  return streams.map((stream) => ({ id: stream.channelArn as string }));
}

export { getStream, listStreams };
