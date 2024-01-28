import React from "react"
import HLSVideoPlayer from "./HLSPlayer"
import { VideoCapture } from "aws-sdk/clients/devicefarm";
import CameraStream from '../components/VideoCapture'
import { BroadcastProvider } from '../context/BroadcastContext';
import BroadcastLayout from '../components/BroadcastLayout'
const Dashboard:React.FC=()=>{
    const ingestEndpoint = 'd948407a7e1a.global-contribute.live-video.net';
    const streamKey = 'sk_us-east-1_rFTuzPgG7W7H_CRWJAREMmeatTTZJvGVRLteReNh4G9';
    return <>
    <div>
    <h1>Video Player</h1>
    {/* <HLSVideoPlayer url={videoUrl} /> */}
    <BroadcastProvider>
      <BroadcastLayout ingestEndpoint={ingestEndpoint} streamKey={streamKey} />
    </BroadcastProvider>
  </div>
  </>
}

export default Dashboard