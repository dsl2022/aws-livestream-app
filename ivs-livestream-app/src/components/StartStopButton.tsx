import React,{useState} from 'react';
import { useBroadcastClient } from '../context/BroadcastClientContext';
import RealTimePlayBack from './RealtimePlayback';
interface StartStopButtonProps {
  streamKey: string;
}

const StartStopButton: React.FC<StartStopButtonProps> = ({ streamKey }) => {
  const { client } = useBroadcastClient();
  const [isBroadcast,setIsBroadcast]=useState<boolean>(false)
  const startBroadcast = async () => {
    try {
      await client?.startBroadcast(streamKey);
      setIsBroadcast(!isBroadcast)
      console.log('Broadcast started');
    } catch (error) {
      console.error('Failed to start broadcast', error);
    }
  };

  const stopBroadcast = async () => {
    try {
      await client?.stopBroadcast();
      console.log('Broadcast stopped');
      setIsBroadcast(!isBroadcast)
    } catch (error) {
      console.error('Failed to stop broadcast', error);
    }
  };

  return (
    <div>
      <div>
        {isBroadcast&&"Broadcasting"}
      </div>
      <div>
      <button disabled={isBroadcast} onClick={startBroadcast}>Start Broadcast</button>
      <button disabled={!isBroadcast} onClick={stopBroadcast}>Stop Broadcast</button>
      </div>
    </div>
  );
};

export default StartStopButton;
