import React, { useRef, useEffect } from 'react';
import { AmazonIVSBroadcastClient } from 'amazon-ivs-web-broadcast';
import { useBroadcastClient } from '../context/BroadcastContext';
interface CameraStreamProps {
    client: AmazonIVSBroadcastClient
    setBroadcastClient: (client: AmazonIVSBroadcastClient)=>void
}

const CameraStream: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {isBroadcasting,broadcastClient,setBroadcastClient} = useBroadcastClient(); // Use the context hook to get the client
  useEffect(() => {
    if (isBroadcasting) {
      const getMedia = async () => {
        // Define your audio parameters here
        const audioParams = { /* Your audio constraints */ };

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: audioParams });
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }

            if (canvasRef.current) {
              canvasRef.current.width = 300;
              canvasRef.current.height = 300;

              window.cameraStream = canvasRef.current.captureStream(30);
              if (window.microphoneStream) {
                broadcastClient?.attachPreview(canvasRef.current);
                broadcastClient?.addVideoInputDevice(window.cameraStream, 'camera1', { index: 0 });
                broadcastClient?.addAudioInputDevice(window.microphoneStream, 'mic1');
              }
              setBroadcastClient(broadcastClient);
            }
          } catch (error) {
            console.error(error);
          }
        }
      };

      getMedia();
    }
  }, [isBroadcasting, broadcastClient, setBroadcastClient]);

  useEffect(() => {
    if (!isBroadcasting) {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    }
  }, [isBroadcasting]);
  console.log({isBroadcasting})
  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraStream;
