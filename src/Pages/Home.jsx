import { GetPokemons } from "../Components/services/index";
import { PokeCard } from "../Components/atoms/index";
import {usePagination} from '../Components/hooks/index'

export default function Home() {
  const { pokemons, filtro, setFiltro, setPokemons, pokemonList, setPokemonList } = GetPokemons();

  const buscar = async(e) => {
    if (e.keyCode === 13) {
      if (filtro.trim() != '') {
        setPokemonList([]);
        if (!isNaN(filtro.trim())) {
          const num = Number(filtro.trim())
          setPokemonList(pokemons.filter(p => p.url.includes(num.toString())))
        } else {
          setPokemonList(pokemons.filter(p => p.name.includes(filtro)));
        }
      } else if (filtro.trim() == '') {
        setPokemonList([]);
        setPokemonList(pokemons);
      }
    }
  }

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
            onChange={e => setFiltro(e.target.value)}
            onKeyUpCapture={buscar}
          />
        </div>
      </header>
      <div className="pokemons-container">
        {pokemonList.map((pokeData, i) => (
          <PokeCard pokeData={pokeData} key={i} />
        ))}
        
      </div>
    </div>
  );
}
