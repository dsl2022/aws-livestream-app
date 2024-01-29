import React, { useRef, useState, useEffect } from 'react';
import { useBroadcastClient } from '../context/BroadcastClientContext';

// StreamPreview.tsx

// StreamPreview.tsx

const StreamPreview: React.FC<{ isPreviewOn: boolean }> = ({ isPreviewOn })=> {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { client } = useBroadcastClient();
    // const [isPreviewOn, setIsPreviewOn] = useState(true);
  
    useEffect(() => {
      if (client && canvasRef.current) {
        if (isPreviewOn) {
          client.attachPreview(canvasRef.current);
        } else {
          const tracks = canvasRef.current.captureStream().getTracks();
          tracks.forEach(track => track.stop());
          // Optionally, detach the preview if there's a method in the SDK to do so
          client.detachPreview();
        }
      }
    }, [client, isPreviewOn]);
  
    // const togglePreview = () => {
    //   setIsPreviewOn(!isPreviewOn);
    // };
  
    return (
      <div>
        {isPreviewOn && <canvas ref={canvasRef} />}
        {/* <button onClick={togglePreview}>{isPreviewOn ? 'Hide' : 'Show'} Preview</button> */}
      </div>
    );
  };
  
  
  export default StreamPreview