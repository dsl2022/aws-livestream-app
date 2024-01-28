import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AmazonIVSBroadcastClient } from 'amazon-ivs-web-broadcast';
// import IVSBroadcast from 'amazon-ivs-web-broadcast';
import IVSBroadcastClient, {
    Errors,
    BASIC_LANDSCAPE
 } from 'amazon-ivs-web-broadcast';
// Creating a context
// Define a type for the context value
interface BroadcastContextValue {
    broadcastClient: AmazonIVSBroadcastClient | null;
    setBroadcastClient: React.Dispatch<React.SetStateAction<AmazonIVSBroadcastClient | null>>;
    isBroadcasting:boolean; 
    setIsBroadcasting:React.Dispatch<React.SetStateAction<boolean>>;
  }
  
// Creating a context with a default value
const BroadcastContext = createContext<BroadcastContextValue>({
    broadcastClient: null,
    setBroadcastClient: () => {}, // Default empty function
    isBroadcasting: false,
    setIsBroadcasting:()=>{}
  });

export const useBroadcastClient = () => {
  return useContext(BroadcastContext);
};

interface BroadcastProviderProps {
    children: ReactNode; // Define the type for children
  }

export const BroadcastProvider: React.FC<BroadcastProviderProps> = ({ children }) => {
  const [broadcastClient, setBroadcastClient] = useState<AmazonIVSBroadcastClient | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  useEffect(() => {
    // Initialize the broadcast client
    const client = IVSBroadcastClient.create({
        // Enter the desired stream configuration
        streamConfig: IVSBroadcastClient.BASIC_LANDSCAPE,
        // Enter the ingest endpoint from the AWS console or CreateChannel API
        ingestEndpoint: 'd948407a7e1a.global-contribute.live-video.net',
        // ingestEndpoint: 'UNIQUE_ID.global-contribute.live-video.net',
     });

    setBroadcastClient(client);

    return () => {
      // Cleanup if necessary
    };
  }, []);

  return (
    <BroadcastContext.Provider value={{broadcastClient,isBroadcasting, setBroadcastClient,setIsBroadcasting}}>
      {children}
    </BroadcastContext.Provider>
  );
};
