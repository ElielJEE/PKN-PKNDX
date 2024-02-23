import {useState, useEffect} from 'react'

export default function GetPokemon(params) {
  const [pokemon, setPokemon] = useState([])
  const [image, setImage] = useState('')
  const [types, setTypes] = useState([])
  const [typesUrl, setTypesUrl] = useState([])
  const [stats, setStats] = useState([])
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [abilities, setAbilities] = useState([])
  const [cry, setCry] = useState()

  useEffect(() => {
    const getPokemon = async() => {
      const url = params
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setPokemon(data);
        setImage(data.sprites.other['official-artwork'].front_default != null ? data.sprites.other['official-artwork'].front_default : data.sprites.other.dream_world.front_default)
        setHeight(data.height)
        setWeight(data.weight)
        setTypesUrl(data.types[0].type.url)
        setCry(data.cries.legacy === null ? data.cries.latest : data.cries.legacy)
        const pokemonTypes = []
        const pokemonStats = []
        const pokemonAbilities = []
        data.types.map((item) => {
          pokemonTypes.push(item.type.name)
        })
        data.stats.map((item) => {
          pokemonStats.push(item.base_stat)
        })
        data.abilities.map((item) => {
          pokemonAbilities.push(item.ability.name)
        })
        setTypes(pokemonTypes)
        setStats(pokemonStats)
        setAbilities(pokemonAbilities)
      }
    }
    getPokemon();
  }, [params]);

  return {
    pokemon,
    image,
    types,
    stats,
    abilities,
    height,
    weight,
    cry,
    typesUrl
  }
}
