import React from "react"
import HLSVideoPlayer from "./HLSPlayer"
import { VideoCapture } from "aws-sdk/clients/devicefarm";
import CameraStream from '../components/VideoCapture'
import { BroadcastProvider } from '../context/BroadcastContext';
import BroadcastLayout from '../components/BroadcastLayout'
const Dashboard:React.FC=()=>{
    const ingestEndpoint = process.env.REACT_APP_INGEST_ENDPOINT;
    const streamKey = process.env.REACT_APP_STREAM_KEY;
    return <>
    <div>
    <h1>Video Player</h1>
    {/* <HLSVideoPlayer url={videoUrl} /> */}
    <BroadcastProvider>
      {ingestEndpoint&&streamKey&&<BroadcastLayout ingestEndpoint={ingestEndpoint} streamKey={streamKey} />}
    </BroadcastProvider>
  </div>
  </>
}

export default Dashboard