// DeviceSelector.tsx

import React from 'react';
import  usePermissions  from '../utils/usePermission';

interface DeviceSelectorProps {
  type: 'audio' | 'video';
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({ type }) => {
  const { videoDevices, audioDevices, selectVideoDevice, selectAudioDevice } = usePermissions();

  const devices = type === 'video' ? videoDevices : audioDevices;
  const selectDevice = type === 'video' ? selectVideoDevice : selectAudioDevice;

  return (
    <select onChange={(e) => selectDevice(e.target.value)}>
      {devices.map(device => (
        <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
      ))}
    </select>
  );
};

export default DeviceSelector;
