import React from 'react';
import usePermissions from '../utils/usePermission';

interface DeviceSelectorProps {
  type: 'audio' | 'video';
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({ type }) => {
  const { videoDevices, audioDevices, selectVideoDevice, selectAudioDevice } = usePermissions();
  const devices = type === 'video' ? videoDevices : audioDevices;
  const selectDevice = type === 'video' ? selectVideoDevice : selectAudioDevice;

  return (
    <select
      onChange={(e) => selectDevice(e.target.value)}
      className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    >
      {devices.map(device => (
        <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
      ))}
    </select>
  );
};

export default DeviceSelector;
