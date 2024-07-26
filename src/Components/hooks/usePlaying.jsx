import { useEffect, useRef, useState } from "react";

export default function usePlaying() {
  const [playing, setPlaying] = useState(null);
  const audioRef = useRef([]);
  const audioEffectRef = useRef();
  
  const handlePlay = (index) => {
    if (playing !== null && playing !== index) {
      audioRef.current[playing].pause();
      audioRef.current[playing].currentTime = 0;
    }
    audioRef.current[index].play();
    audioRef.current.volume = 0.2;
    setPlaying(index);
  }
  
  const handleStop = (index) => {
    audioRef.current[index].pause();
    audioRef.current[index].currentTime = 0;
    setPlaying(null);
  }

  const handlePlayEffects = () => {
    audioEffectRef.current.play();
    setPlaying(true);
  }

  useEffect(() => {
    const audios = audioRef.current;
    return () => {
      audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0
      })
    }
  }, [])

  return { playing, handlePlay, handleStop, audioRef, audioEffectRef, handlePlayEffects };
}
