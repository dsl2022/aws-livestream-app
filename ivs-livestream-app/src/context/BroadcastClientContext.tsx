import React, { createContext, useContext, useState, useEffect } from 'react';
import IVSBroadcastClient,{AmazonIVSBroadcastClient} from 'amazon-ivs-web-broadcast';

interface BroadcastClientContextType {
  client: AmazonIVSBroadcastClient | null;
  isBroadcast:boolean;
  streamKey: string;
  setStreamKey:(setStreamKey:string)=>void;
  setIsBroadcast:(isBroadcast: boolean)=>void;
  isPreviewOn:boolean; 
  setIsPreviewOn:(isPreviewOn: boolean)=>void;
}

interface Props {
    children: React.ReactNode;
}

export const BroadcastClientContext = createContext<BroadcastClientContextType>({
  client: null,
  isBroadcast: false,
  streamKey:"",
  setStreamKey:()=>{},
  setIsBroadcast: () => {}, // Provide a no-op function
  isPreviewOn: false,
  setIsPreviewOn: () => {} // Provide a no-op function
});

export const BroadcastClientProvider: React.FC<Props> = ({ children }) => {
  const [client, setClient] = useState<AmazonIVSBroadcastClient | null>(null);
  const [isBroadcast,setIsBroadcast]=useState<boolean>(false)
  const [isPreviewOn, setIsPreviewOn] = useState(false);
  const [streamKey, setStreamKey] = useState<string>("");
  const ingestEndpoint = process.env.REACT_APP_INGEST_ENDPOINT
  useEffect(() => {
    const newClient = IVSBroadcastClient.create({
      streamConfig: IVSBroadcastClient.BASIC_LANDSCAPE,
      ingestEndpoint: ingestEndpoint,
    });

    setClient(newClient);
  }, []);
  useEffect(()=>{
    setStreamKey(streamKey)
    console.log("stream inside context",streamKey)
  },[])
  return (
    <BroadcastClientContext.Provider value={{ client,streamKey, setStreamKey, isBroadcast, setIsBroadcast, isPreviewOn, setIsPreviewOn }}>
      {children}
    </BroadcastClientContext.Provider>
  );
};

export const useBroadcastClient = () => {
  
  const context  = useContext(BroadcastClientContext);
  console.log("context broadcast",context)
  return context
}
