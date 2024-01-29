
import React,{useState} from 'react';
import { BroadcastClientProvider } from '../context/BroadcastClientContext';
import StreamPreview from './StreamPreview';
import StreamManager from './StreamManager';
import StartStopButton from './StartStopButton';
import DeviceSelector from './DeviceSelectior';

const Dashboard:React.FC=()=>{    
    const streamKey = process.env.REACT_APP_STREAM_KEY;
    const [isPreviewOn, setIsPreviewOn] = useState(false);

    const togglePreview = () => {
      setIsPreviewOn(!isPreviewOn);
    };

    return (
        <BroadcastClientProvider>
          <StreamPreview isPreviewOn={isPreviewOn} />
          <DeviceSelector type="video" />
          <DeviceSelector type="audio" />
          <StreamManager isPreviewOn={isPreviewOn} />
          {streamKey&&<StartStopButton streamKey={streamKey} />}
          <button onClick={togglePreview}>
            {isPreviewOn ? 'Turn off' : 'Turn on'} camera
          </button>          
        </BroadcastClientProvider>
      );
}

export default Dashboard