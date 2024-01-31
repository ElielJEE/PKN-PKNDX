import { useState } from "react";

export default function usePlaying() {
  const [onPress, setOnPress] = useState(false);

  const togglePlaying = () => {
    setOnPress(!onPress);
  }

  return { onPress, togglePlaying };
}
