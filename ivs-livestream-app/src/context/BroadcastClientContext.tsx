import React, { createContext, useContext, useState, useEffect } from 'react';
import IVSBroadcastClient,{AmazonIVSBroadcastClient} from 'amazon-ivs-web-broadcast';

interface BroadcastClientContextType {
  client: AmazonIVSBroadcastClient | null;
}

interface Props {
    children: any
}

export const BroadcastClientContext = createContext<BroadcastClientContextType>({ client: null });

export const BroadcastClientProvider: React.FC<Props> = ({ children }) => {
  const [client, setClient] = useState<AmazonIVSBroadcastClient | null>(null);

  useEffect(() => {
    const newClient = IVSBroadcastClient.create({
      streamConfig: IVSBroadcastClient.BASIC_LANDSCAPE,
      ingestEndpoint: 'd948407a7e1a.global-contribute.live-video.net',
    });

    setClient(newClient);
  }, []);

  return (
    <BroadcastClientContext.Provider value={{ client }}>
      {children}
    </BroadcastClientContext.Provider>
  );
};

export const useBroadcastClient = () => useContext(BroadcastClientContext);
