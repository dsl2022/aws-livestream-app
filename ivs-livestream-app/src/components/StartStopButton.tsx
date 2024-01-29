import React from 'react';
import { useBroadcastClient } from '../context/BroadcastClientContext';

interface StartStopButtonProps {
  streamKey: string;
}

const StartStopButton: React.FC<StartStopButtonProps> = ({ streamKey }) => {
  const { client } = useBroadcastClient();

  const startBroadcast = async () => {
    try {
      await client?.startBroadcast(streamKey);
      console.log('Broadcast started');
    } catch (error) {
      console.error('Failed to start broadcast', error);
    }
  };

  const stopBroadcast = async () => {
    try {
      await client?.stopBroadcast();
      console.log('Broadcast stopped');
    } catch (error) {
      console.error('Failed to stop broadcast', error);
    }
  };

  return (
    <div>
      <button onClick={startBroadcast}>Start Broadcast</button>
      <button onClick={stopBroadcast}>Stop Broadcast</button>
    </div>
  );
};

export default StartStopButton;
