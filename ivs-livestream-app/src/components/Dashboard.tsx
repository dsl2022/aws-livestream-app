
import React,{ChangeEvent, useEffect, useState} from 'react';
import { BroadcastClientProvider } from '../context/BroadcastClientContext';
import StreamPreview from './StreamPreview';
import StreamManager from './StreamManager';
import StartStopButton from './StartStopButton';
import DeviceSelector from './DeviceSelectior';
import { useBroadcastClient } from '../context/BroadcastClientContext';
const Dashboard:React.FC=()=>{    
    // const streamKey = process.env.REACT_APP_STREAM_KEY;
    const [isPreviewOn, setIsPreviewOn] = useState(false);
    const {streamKey,setStreamKey} = useBroadcastClient()
    const [streamKeyInput, setStreamKeyInput]=useState<string>("")
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    useEffect(()=>{
      if (streamKey) {
        setIsEnabled(true);
        // Additional logic to handle a valid streamKey can go here
        console.log('Stream key is set, enabling button');
      } else {
        setIsEnabled(false);
        // Handle case when streamKey is not set
        console.log('Stream key is not set, disabling button');
      }
    },[streamKey])
    const togglePreview = () => {
      setIsPreviewOn(!isPreviewOn);
    };
    const handleChangeStreamKey=(e:ChangeEvent<HTMLInputElement>)=>{
      setStreamKeyInput(e.target.value)
    }
    const handleSetKey=()=>{
      console.log({streamKeyInput})
      setStreamKey(streamKeyInput)
      setIsEnabled(true)
    }
    console.log("test",streamKey)
    return (
      <BroadcastClientProvider>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <StreamPreview isPreviewOn={isPreviewOn} />
        <div className="flex flex-col items-center space-y-4">
          <DeviceSelector type="video"  />
          <DeviceSelector type="audio"/>
          <StreamManager isPreviewOn={isPreviewOn} />
          {isEnabled && <StartStopButton streamKey={streamKey} />}
          <button
            onClick={togglePreview}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            {isPreviewOn ? 'Turn off' : 'Turn on'} camera
          </button>
          <div>
            <input
              type="text"
              onChange={handleChangeStreamKey}
              placeholder="Provide stream key"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={handleSetKey}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Set stream key
            </button>
          </div>
        </div>
      </div>
    </BroadcastClientProvider>
      );
}

export default Dashboard