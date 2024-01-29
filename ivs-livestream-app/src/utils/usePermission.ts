// usePermissions.ts
import { useState, useEffect } from 'react';

interface PermissionsState {
  audio: boolean;
  video: boolean;
  videoDevices: MediaDeviceInfo[];
  audioDevices: MediaDeviceInfo[];
  selectedVideoDevice: string;
  selectedAudioDevice: string;
  selectVideoDevice: (deviceId: string) => void;
  selectAudioDevice: (deviceId: string) => void;
}

const usePermissions = (): PermissionsState => {
  const [permissions, setPermissions] = useState<PermissionsState>({
    audio: false,
    video: false,
    videoDevices: [],
    audioDevices: [],
    selectedVideoDevice: '',
    selectedAudioDevice: '',
    selectVideoDevice: () => {},
    selectAudioDevice: () => {}
  });

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        stream.getTracks().forEach(track => track.stop());

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        const audioDevices = devices.filter(device => device.kind === 'audioinput');

        setPermissions(prev => ({
          ...prev,
          audio: true,
          video: true,
          videoDevices,
          audioDevices,
          selectedVideoDevice: videoDevices[0]?.deviceId || '',
          selectedAudioDevice: audioDevices[0]?.deviceId || '',
          selectVideoDevice: (deviceId: string) => {
            setPermissions(prev => ({ ...prev, selectedVideoDevice: deviceId }));
          },
          selectAudioDevice: (deviceId: string) => {
            setPermissions(prev => ({ ...prev, selectedAudioDevice: deviceId }));
          }
        }));
      } catch (error) {
        console.error('Error requesting media permissions:', error);
        setPermissions(prev => ({
          ...prev,
          audio: false,
          video: false
        }));
      }
    };

    requestPermissions();
  }, []);

  return permissions;
};

export default usePermissions;
