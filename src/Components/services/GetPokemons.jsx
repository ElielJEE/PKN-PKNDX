import { useState, useEffect } from "react";

export default function GetPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [filtro, setFiltro] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(1008);

  useEffect(() => {
    const getPokemons = async (o) => {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${o}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPokemons(data.results);
        setPokemonList(data.results);
      }
    };
    getPokemons(offset);
  }, [offset, limit]);

  return {
    pokemons,
    offset,
    limit,
    filtro,
    setFiltro,
    pokemonList,
    setPokemonList
  };
}