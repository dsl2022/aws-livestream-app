import React,{useRef,useEffect,useState} from 'react'
import {getStream,listStreams} from '../utils/ivs'
import {createPlayer} from '../utils/player'
import {Player} from '../types'
const RealTimePlayBack:React.FC=()=>{
    const [tempUrl, setTempUrl] = useState<string>("")
    const containerRef = useRef<HTMLDivElement>(null)
    const [player, setPlayer] = useState(createPlayer())
    const [state,setState] = useState<string>("")
    const [health,setHealth] = useState<string>("")
    const [viewerCount,setViewCount] = useState<number>(0)
    const [isPlaying,setIsPlaying] = useState<boolean>(false)
    const [isMounted, setIsMounted]=useState<boolean>(false)
    useEffect(()=>{        
        const getStreams=async ()=>{
            const data = await listStreams()            
            if(data[0]){
                const streamData = await getStream(data[0].id)            
                setTempUrl(streamData.playbackUrl)
                player?.load(streamData.playbackUrl)
                setHealth(streamData.health)
                setState(streamData.state)
                setViewCount(streamData.viewerCount)
            }
            if(containerRef.current && !isMounted && player){
                containerRef.current?.appendChild(player.getHTMLVideoElement())
                setIsMounted(true)
            }
        }        
        getStreams()
    
    },[])

    const handlePlayer = ()=>{
        if(isPlaying){
            player?.pause() 
        }else{                        
            player?.play()
        }
        setIsPlaying(!isPlaying)        
    }
    return <>
        <div ref={containerRef} className='video-container'>
        </div>
        {`state ${state}: viewCounter: ${viewerCount} health: ${health}`}
        <button onClick={handlePlayer}>{isPlaying?"Pause":"Play"}</button>
    </>
}

export default RealTimePlayBack