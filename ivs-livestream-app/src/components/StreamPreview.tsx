import React, { useRef, useState, useEffect } from 'react';
import { useBroadcastClient } from '../context/BroadcastClientContext';

const StreamPreview: React.FC<{ isPreviewOn: boolean }> = ({ isPreviewOn })=> {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { client } = useBroadcastClient();
  
    useEffect(() => {
      if (client && canvasRef.current) {
        if (isPreviewOn) {
          client.attachPreview(canvasRef.current);
        } else {
          const tracks = canvasRef.current.captureStream().getTracks();
          tracks.forEach(track => track.stop());          
          client.detachPreview();
        }
      }
    }, [client, isPreviewOn]);
  
    return (
      <div>
        {isPreviewOn && <canvas ref={canvasRef} />}
      </div>
    );
  };
  
  
  export default StreamPreview