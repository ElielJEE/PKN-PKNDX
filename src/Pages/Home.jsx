import { useState, useMemo, useRef } from "react";
import { GetPokemons } from "../Components/services/index";
import { PokeCard } from "../Components/atoms/index";
import { Pagination } from "../Components/molecules";

export default function Home() {
  const { pokemons, filtro, setFiltro, pokemonList, setPokemonList } =
    GetPokemons();
  const [currentPage, setCurrentPage] = useState(1);
  let pageSize = 12;

  const currentPokemonData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return pokemonList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, pokemonList]);

  const audioRef = useRef();
  audioRef.volume = 0.5;

  const buscar = async (e) => {
    if (e.keyCode === 13) {
      if (filtro.trim() != "") {
        setPokemonList([]);
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

  return (
    <div className="home-container">
      <audio
        src="public\Sounds\PokemonMusicB.mp3"
        autoPlay
        loop
        ref={audioRef}
      ></audio>
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
          <PokeCard pokeData={pokeData} key={i} />
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          currentPage={currentPage}
          totalCount={pokemonList.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
