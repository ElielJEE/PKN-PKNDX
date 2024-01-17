import React from "react";
import { GetPokemons } from "../Components/services/index";

export default function Home() {
  const {pokemons} = GetPokemons();
  console.log(pokemons)

  return (
    <>
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

      </div>
    </>
  );
}
