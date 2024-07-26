import { useActive } from "../hooks";
import { usePlaying } from "../hooks";
import pokemonMusic1 from "/Sounds/pokemon-bg-music.mp3";
import pokemonMusic2 from "/Sounds/pokemon-music (1).mp3";
import pokemonMusic3 from "/Sounds/pokemon-music (2).mp3";

export default function Dropmenu() {
  const { handlePlay, handleStop, audioRef, playing } = usePlaying();
  const { active, toggleActive, dropdownRef } = useActive();

  const sounds = [pokemonMusic1, pokemonMusic2, pokemonMusic3];

  return (
    <div className="button-menu__container" ref={dropdownRef}>
      <button className="dropmenu-btn" onClick={toggleActive}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7l0 72 0 264c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L448 147 192 223.8 192 432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L128 200l0-72c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" />
        </svg>
      </button>
      <ul className={active ? "dropmenu-list active" : "dropmenu-list"}>
        {sounds.map((sound, index) => (
          <li key={index} className="dropmenu-list__item">
            <audio src={sound} ref={(el) => (audioRef.current[index] = el)} loop />
            {playing === index ? (
              <button className="playbutton-active" onClick={() => handleStop(index)}>
                Sound {index + 1}
              </button>
            ) : (
              <button className="playbutton" onClick={() => handlePlay(index)}>
                Sound {index + 1}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
