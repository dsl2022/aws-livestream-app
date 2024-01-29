
import React,{useState} from 'react';
import { BroadcastClientProvider } from '../context/BroadcastClientContext';
import StreamPreview from './StreamPreview';
import StreamManager from './StreamManager';
import StartStopButton from './StartStopButton';
import DeviceSelector from './DeviceSelectior';
import RealTimePlayBack from './RealtimePlayback'
const Dashboard:React.FC=()=>{    
    const streamKey = process.env.REACT_APP_STREAM_KEY;
    const [isPreviewOn, setIsPreviewOn] = useState(true);

    const togglePreview = () => {
      setIsPreviewOn(!isPreviewOn);
    };
    return (
        <BroadcastClientProvider>
          <StreamPreview isPreviewOn={isPreviewOn} />
          <StreamManager isPreviewOn={isPreviewOn} />
          <DeviceSelector type="video" />
          <DeviceSelector type="audio" />
          {streamKey&&<StartStopButton streamKey={streamKey} />}
          <button onClick={togglePreview}>
            {isPreviewOn ? 'Hide' : 'Show'} Preview
          </button>
          <RealTimePlayBack/>
        </BroadcastClientProvider>
      );
}

export default Dashboard