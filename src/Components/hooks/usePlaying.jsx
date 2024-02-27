import { useEffect, useRef, useState } from "react";

export default function usePlaying() {
  const [onPress, setOnPress] = useState(false);
  const audioRef = useRef();
  
  const handlePlay = () => {
    audioRef.current.play();
    setOnPress(true);
    audioRef.current.volume = 0.2;
  }

  const handleStop = () => {
    audioRef.current.pause();
    setOnPress(false);
  }

  return { onPress, handlePlay, handleStop, audioRef };
}
