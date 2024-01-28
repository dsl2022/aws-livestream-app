import React, { useState, useEffect } from 'react';
import { AmazonIVSBroadcastClient } from 'amazon-ivs-web-broadcast'; // Corrected import
import { useBroadcastClient } from '../context/BroadcastContext';
interface StreamControlsProps {
  ingestEndpoint: string;
  streamKey: string;
  broadcastClient: AmazonIVSBroadcastClient; // Updated type
}
async function handlePermissions() {
    let permissions = {
        audio: false,
        video: false,
    };
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        for (const track of stream.getTracks()) {
            track.stop();
        }
        permissions = { video: true, audio: true };
    } catch (err:any) {
        permissions = { video: false, audio: false };
        console.error(err.message);
    }
    // If we still don't have permissions after requesting them display the error message
    if (!permissions.video) {
        console.error('Failed to get video permissions.');
    } else if (!permissions.audio) {
        console.error('Failed to get audio permissions.');
    }
 }
const StreamControls: React.FC<StreamControlsProps> = ({ ingestEndpoint, streamKey }) => {
//   const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const {isBroadcasting,setIsBroadcasting,broadcastClient,setBroadcastClient} = useBroadcastClient(); 
  const startBroadcast = async () => {
    setIsStarting(true);
    handlePermissions()
    try {
      await broadcastClient?.startBroadcast(streamKey);
      setIsBroadcasting(true);
    } catch (error) {
      console.error('Error starting broadcast:', error);
    } finally {
      setIsStarting(false);
    }
  };

  const stopBroadcast = async () => {
    try {
      await broadcastClient?.stopBroadcast();
      setIsBroadcasting(false);
    } catch (error) {
      console.error('Error stopping broadcast:', error);
    }
  };

  const handleBroadcastClick = () => {
    if (isBroadcasting) {
      stopBroadcast();
    } else {
      startBroadcast();
    }
  };

  return (
    <div>
      <button onClick={handleBroadcastClick} disabled={isStarting}>
        {isBroadcasting ? 'Stop' : 'Start'} Broadcast
      </button>
    </div>
  );
};

export default StreamControls;
