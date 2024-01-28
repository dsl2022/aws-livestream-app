// HLSVideoPlayer.tsx
import React from 'react';
// Add this at the top of your HLSVideoPlayer.tsx
const ReactPlayer: any = require('react-player').default;


interface HLSVideoPlayerProps {
  url: string;
}

const HLSVideoPlayer: React.FC<HLSVideoPlayerProps> = ({ url }) => {
  return (
    <div className='player-wrapper'>
      <ReactPlayer
        url={url}
        className='react-player'
        width='100%'
        height='100%'
        controls={true}
      />
    </div>
  );
};

export default HLSVideoPlayer;
