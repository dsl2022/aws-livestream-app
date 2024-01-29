import React, { useRef, useEffect, useState } from 'react';
import { getStream, listStreams } from '../utils/ivs';
import { createPlayer } from '../utils/player';
import { Player, PlayerEvents } from '../types';

const RealTimePlayBack: React.FC = () => {
    const [tempUrl, setTempUrl] = useState<string>("");
    const containerRef = useRef<HTMLDivElement>(null);
    const [player, setPlayer] = useState<Player | null>(null);
    const [state, setState] = useState<string>("");
    const [health, setHealth] = useState<string>("");
    const [viewerCount, setViewCount] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        const newPlayer = createPlayer() || null; 
        setPlayer(newPlayer);

        const getStreams = async () => {
            try {
                const data = await listStreams();
                if (data[0]) {
                    const streamData = await getStream(data[0].id);
                    setTempUrl(streamData.playbackUrl);
                    newPlayer?.load(streamData.playbackUrl);
                    setHealth(streamData.health);
                    setState(streamData.state);
                    setViewCount(streamData.viewerCount);
                }
            } catch (error) {
                console.error('Error fetching streams:', error);
            }
        };
        getStreams();

        // return () => {
        //     newPlayer.remove(); // Assuming you have a method to properly remove/clean-up the player
        // };
    }, []);

    useEffect(() => {
        if (containerRef.current && player) {
            containerRef.current.appendChild(player.getHTMLVideoElement());
            setIsMounted(true);
        }

        const onPlaying = () => setIsPlaying(true);
        const onIdle = () => setIsPlaying(false);
        const onError = (error: any) => {
            console.error('Player error:', error);
            // Handle player error as necessary
        };

        player?.addEventListener(PlayerEvents.PLAYING, onPlaying);
        player?.addEventListener(PlayerEvents.IDLE, onIdle);
        player?.addEventListener(PlayerEvents.ERROR, onError);

        // return () => {
        //     player?.removeEventListener(PlayerEvents.PLAYING, onPlaying);
        //     player?.removeEventListener(PlayerEvents.IDLE, onIdle);
        //     player?.removeEventListener(PlayerEvents.ERROR, onError);
        // };
    }, [player]);

    const handlePlayer = () => {
        if (player) {
            if (player.isPaused()) {
                player.play();
            } else {
                player.pause();
            }
        }
    };

    return (
        <>
            <div ref={containerRef} className='video-container' />
            <div>{`state ${state}: viewCounter: ${viewerCount} health: ${health}`}</div>
            <button onClick={handlePlayer}>{isPlaying ? "Pause" : "Play"}</button>
        </>
    );
};

export default RealTimePlayBack;
