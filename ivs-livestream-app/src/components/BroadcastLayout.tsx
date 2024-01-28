import React from 'react';
import DeviceSelector from './DeviceSelector';
import StreamControls from './StreamControl';
import { useBroadcastClient } from '../context/BroadcastContext'; // Import the hook
import CameraStream from './VideoCapture';
interface BroadcastLayoutProps {
  ingestEndpoint: string;
  streamKey: string;
}

const BroadcastLayout: React.FC<BroadcastLayoutProps> = ({ ingestEndpoint, streamKey }) => {
  const {broadcastClient,setBroadcastClient} = useBroadcastClient(); // Use the context hook to get the client

  return (
    <div className="broadcast-layout">
      {broadcastClient && <CameraStream/>}
      {/* <canvas id="broadcast-preview"></canvas> */}
      <DeviceSelector type="video" />
      <DeviceSelector type="audio" />
      {broadcastClient && (
        <StreamControls
          ingestEndpoint={ingestEndpoint}
          streamKey={streamKey}
          broadcastClient={broadcastClient} // Pass the client as a prop
        />
      )}
    </div>
  );
};

export default BroadcastLayout;
