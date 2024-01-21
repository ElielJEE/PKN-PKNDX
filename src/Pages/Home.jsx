import { GetPokemons } from "../Components/services/index";
import {PokeCard} from '../Components/atoms/index';

export default function Home() {
  const {pokemons} = GetPokemons();
  console.log(pokemons)

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
          />
        </div>
      </header>
      <div className="pokemons-container">
        {
          pokemons.map((pokeData, i) => (
            <PokeCard 
              pokeData={pokeData}
              key={i}
            />
          ))
        }
      </div>
    </div>
  );
}
