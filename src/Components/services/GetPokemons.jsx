import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function GetPokemons() {
  const { search } = useParams();
  const [pokemons, setPokemons] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [filtro, setFiltro] = useState(search === undefined ? "" : search);
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
    setPokemonList,
  };
}
