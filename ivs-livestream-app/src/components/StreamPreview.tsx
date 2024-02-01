import React, { useRef, useState, useEffect } from 'react';
import { useBroadcastClient } from '../context/BroadcastClientContext';

const StreamPreview: React.FC<{ isPreviewOn: boolean }> = ({ isPreviewOn })=> {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { client } = useBroadcastClient();
  
    useEffect(() => {
      const canvas = canvasRef.current
      if (client && canvas) {
        if (isPreviewOn) {
          client.attachPreview(canvasRef.current);
        } else {
          
          const tracks = canvasRef.current.captureStream().getTracks();
          tracks.forEach(track => track.stop());          
          client.detachPreview();
           // Clear the canvas
           const context = canvas.getContext('2d');
           if (context) {
             context.clearRect(0, 0, canvas.width, canvas.height);
 
             // Optionally fill with black color
             context.fillStyle = 'black';
             context.fillRect(0, 0, canvas.width, canvas.height);
           }
          
        }
      }
    }, [client, isPreviewOn]);
  
    return (
      <div>
         <canvas ref={canvasRef} width="640" height="480" />
      </div>
    );
  };
  
  
  export default StreamPreview