import {useState, useEffect} from 'react'

export default function GetPokemon(params) {
  const [pokemon, setPokemon] = useState([])
  const [image, setImage] = useState('')
  const [types, setTypes] = useState([])
  const [stats, setStats] = useState([])

  useEffect(() => {
    const getPokemon = async() => {
      const url = params
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setPokemon(data);
        setImage(data.sprites.other['official-artwork'].front_default != null ? data.sprites.other['official-artwork'].front_default : data.sprites.other.dream_world.front_default)
        const pokemonTypes = []
        const pokemonStats = []
        data.types.map((item) => {
          pokemonTypes.push(item.type.name)
        })
        data.stats.map((item) => {
          pokemonStats.push(item.base_stat)
        })
        setTypes(pokemonTypes)
        setStats(pokemonStats)
      }
    }
    getPokemon();
  }, [params]);

  return {
    pokemon,
    image,
    types,
    stats
  }
}
