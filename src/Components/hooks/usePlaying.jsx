import { useEffect, useRef, useState } from "react";

export default function usePlaying() {
  const [onPress, setOnPress] = useState(false);
  const audioRef = useRef();

  const togglePlaying = () => {
    setOnPress(!onPress);
  }

  const handlePlay = () => {
    audioRef.current.play();
    audioRef.current.volume = 0.2;
  }

  return { onPress, togglePlaying, handlePlay, audioRef };
}
