import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();  // Creates the Context

const PlayerContextProvider = (props) => {

    const audioRef = useRef(); // useRef creates a reference (like a pointer) to directly control HTML elements (like audio, input, etc.)
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0])
    const [playStatus, setPlayStatus] = useState(false)
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })


    // This function plays the audio and updates the play status
    // audioRef.current refers to the actual <audio> element and .play() starts the song
    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const previous = async () => {
        if(track.id>0) {
            await setTrack(songsData[track.id-1])
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const next = async () => {
        if(track.id < songsData.length-1) {
            await setTrack(songsData[track.id+1])
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    // Calculates clicked position on seek bar and updates the song to that time
    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX/seekBg.current.offsetWidth)*audioRef.current.duration)
    }

    // Runs after component mounts - updates progress bar and time every second while audio plays
    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => { // Runs every time audio's currentTime changes – updates UI like seek bar and timer
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%"
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime%60),
                        minute: Math.floor(audioRef.current.currentTime/60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration%60),
                        minute: Math.floor(audioRef.current.duration/60)
                    }
                })
            }
        }, 1000);
    }, [audioRef])

    // All values and functions shared through context
    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children} {/* Provides the player context (like track info, play/pause functions, etc.) to all the components wrapped inside <PlayerContextProvider>. props.children will be replaced by whatever is passed inside it (like <App /> */}
        </PlayerContext.Provider>
    )

}

export default PlayerContextProvider;