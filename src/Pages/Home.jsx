import { useState, useMemo, useEffect } from "react";
import { GetPokemons } from "../Components/services";
import { PokeCard } from "../Components/atoms";
import { Pagination } from "../Components/molecules";
import { useParams } from "react-router-dom";

export default function Home() {
  const { search, page } = useParams();
  const { pokemons, filtro, setFiltro, pokemonList, setPokemonList } =
    GetPokemons();
  const [currentPageHome, setCurrentPageHome] = useState(
    page === undefined ? 1 : +page
  );
  let pageSize = 12;

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
          const filter = filtro.toLowerCase();
          setPokemonList(pokemons.filter((p) => p.name.includes(filter)));
        }
      } else if (filtro.trim() == "") {
        setPokemonList([]);
        setPokemonList(pokemons);
      }
    }
  };

  useEffect(() => {
    if (search !== undefined) {
      setPokemonList([]);
      if (!isNaN(search)) {
        const num = Number(search);
        setPokemonList(pokemons.filter((p) => p.url.includes(num.toString())));
      } else {
        const filter = search.toLowerCase();
        setPokemonList(pokemons.filter((p) => p.name.includes(filter)));
      }
    } else if (search === "") {
      setPokemonList([]);
      setPokemonList(pokemons);
    }
  }, [pokemons, setPokemonList]);

  const currentPokemonData = useMemo(() => {
    const firstPageIndex = (currentPageHome - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return pokemonList.slice(firstPageIndex, lastPageIndex);
  }, [currentPageHome, pageSize, pokemonList]);

  return (
    <div className="home-container">
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
          <PokeCard pokeData={pokeData} key={i} classname={currentPokemonData.length === 2 ? "two-cards" : "" || currentPokemonData.length === 1 ? "one-card" : ""}/>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          currentPage={currentPageHome}
          totalCount={pokemonList.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPageHome(page)}
          urlFilter={filtro}
        />
      </div>
    </div>
  );
}
