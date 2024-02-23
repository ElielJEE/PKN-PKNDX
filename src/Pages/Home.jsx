import { useState, useMemo, useEffect } from "react";
import { GetPokemons } from "../Components/services";
import { PokeCard } from "../Components/atoms";
import { Pagination } from "../Components/molecules";
import { usePlaying } from "../Components/hooks";
import useSound from "use-sound";
import pokemonMusic from "../../public/Sounds/pokemonMusicB.mp3";
import { useParams, useNavigate } from "react-router-dom";

export default function Home() {
  const { page } = useParams();
  const { pokemons, filtro, setFiltro, pokemonList, setPokemonList } =
    GetPokemons();
  const [currentPageHome, setCurrentPageHome] = useState(page === undefined ? 1 : +page);
  let pageSize = 12;
  const { onPress, togglePlaying } = usePlaying();
  const [play, { stop }] = useSound(pokemonMusic, { volume: 0.2, loop: true });

  const buscar = async (e) => {
    if (e.keyCode === 13) {
      if (filtro.trim() != "") {
        setPokemonList([]);
        setCurrentPageHome(1);
        if (!isNaN(filtro.trim())) {
          const num = Number(filtro.trim());
          setPokemonList(
            pokemons.filter((p) => p.url.includes(num.toString()))
          );
        } else {
          setPokemonList(pokemons.filter((p) => p.name.includes(filtro)));
        }
      } else if (filtro.trim() == "") {
        setPokemonList([]);
        setPokemonList(pokemons);
      }
    }
  };

  const currentPokemonData = useMemo(() => {
    const firstPageIndex = (currentPageHome - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return pokemonList.slice(firstPageIndex, lastPageIndex);
  }, [currentPageHome, pageSize, pokemonList]);

  return (
    <div className="home-container">
      <div className="playbutton-container">
        <button
          className="playbutton"
          type="checkbox"
          onClick={() => togglePlaying()}
          onMouseUp={() => {
            onPress ? stop() : play();
          }}
        >
          Play Music!
        </button>
      </div>
      <header className="home-header">
        <h1 className="page-title">PokeLook</h1>
        <div className="searcher-container">
          <div className="icon-searcher__container">
            <i className="fa-solid fa-search"></i>
          </div>
          <input
            type="search"
            name="search-pokemon"
            className="search-pokemon__input"
            id="search-pokemon"
            placeholder="Buscar Pokemon"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            onKeyUpCapture={buscar}
          />
        </div>
      </header>
      <div className="pokemons-container">
        {currentPokemonData.map((pokeData, i) => (
          <PokeCard pokeData={pokeData} key={i} onPress={onPress} />
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          currentPage={currentPageHome}
          totalCount={pokemonList.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPageHome(page)}
        />
      </div>
    </div>
  );
}
