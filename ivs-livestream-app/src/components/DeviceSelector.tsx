import React, { useState, useEffect } from 'react';

interface DeviceSelectorProps {
  type: 'video' | 'audio';
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({ type }) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const filteredDevices = mediaDevices.filter(device => 
          (type === 'video' && device.kind === 'videoinput') ||
          (type === 'audio' && device.kind === 'audioinput')
        );
        setDevices(filteredDevices);
      } catch (error) {
        console.error('Error fetching media devices:', error);
      }
    };

    fetchDevices();
  }, [type]);

  return (
    <select>
      {devices.map(device => (
        <option key={device.deviceId} value={device.deviceId}>
          {device.label || `${type} device (${device.deviceId})`}
        </option>
      ))}
    </select>
  );
};

export default DeviceSelector;
