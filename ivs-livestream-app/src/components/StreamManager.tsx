import React, {useState, useEffect } from 'react';
import { useBroadcastClient } from '../context/BroadcastClientContext';
import usePermissions  from '../utils/usePermission';

const StreamManager: React.FC<{ isPreviewOn: boolean }> = ({ isPreviewOn }) => {
  const { client } = useBroadcastClient();
  const { selectedVideoDevice, selectedAudioDevice } = usePermissions();
  const { videoDevices, audioDevices } = usePermissions();
  const [mediaStreams, setMediaStreams] = useState<MediaStream[]>([])
  const stopMediaStreams = ()=>{
      console.log("stop")
        mediaStreams.forEach(stream=>{
            stream.getTracks().forEach(track=> track.stop())
        })
        setMediaStreams([])
    }
  useEffect(() => {
    const setupStreams = async () => {
      if (client && videoDevices.length > 0 && audioDevices.length > 0) {
        try {
          // Generate unique names for devices
          const videoDeviceName = `videoDevice_${new Date().getTime()}`;
          const audioDeviceName = `audioDevice_${new Date().getTime() + 1}`; 

          const videoStream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: selectedVideoDevice || undefined },
          });
          const audioStream = await navigator.mediaDevices.getUserMedia({
            audio: { deviceId: selectedAudioDevice || undefined },
          });
          setMediaStreams([videoStream, audioStream]);
          // Add devices using unique names
          client.addVideoInputDevice(videoStream, videoDeviceName, { index: 0 });
          client.addAudioInputDevice(audioStream, audioDeviceName);
        } catch (error) {
          console.error('Error setting up streams:', error);
        }
      }
    };
    if (!isPreviewOn) {
        stopMediaStreams();
      } else {        
        setupStreams();
      }   
  }, [client,isPreviewOn, selectedVideoDevice, selectedAudioDevice]);
  return <div />;
};

export default StreamManager;
