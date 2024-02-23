import { useState, useEffect } from "react";
import { GetPokemon } from "./index";

export default function GetPokemonDetails(params) {
  const urlData = `https://pokeapi.co/api/v2/pokemon/${params}`;
  const {
    pokemon,
    image,
    types,
    stats,
    abilities,
    height,
    weight,
    cry,
    typesUrl,
  } = GetPokemon(urlData);
  const [description, setDescription] = useState([]);
  const [weakness, setWeakness] = useState([]);
  const [advantage, setAdvantage] = useState([]);
  const [habitat, setHabitat] = useState("");
  const [evolutionUrl, setEvolutionUrl] = useState("");
  const [basePokemon, setBasePokemon] = useState("");
  const [evolvesTo, setEvolvesTo] = useState([]);

  useEffect(() => {
    const getPokemonDetails = async () => {
      if (pokemon && pokemon.species) {
        const url = pokemon.species.url;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setDescription(
            data.flavor_text_entries.length > 9
              ? data.flavor_text_entries[9].flavor_text
              : data.flavor_text_entries[0].flavor_text
          );
          setHabitat(data.habitat === null ? "Unknown" : data.habitat.name);
          setEvolutionUrl(data.evolution_chain.url);
        }
      }
    };
    getPokemonDetails();
  }, [pokemon]);

  useEffect(() => {
    const getPokemonDetailsTypes = async () => {
      if (typesUrl) {
        const url = typesUrl;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setWeakness(data.damage_relations.double_damage_from);
          setAdvantage(data.damage_relations.double_damage_to);
        }
      }
    };
    getPokemonDetailsTypes();
  }, [typesUrl]);

  useEffect(() => {
    const getPokemonDetailsEvolution = async () => {
      if (evolutionUrl) {
        const url = evolutionUrl;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setBasePokemon(data.chain.species.name);
          const evolvesToData = [basePokemon];

          data.chain.evolves_to.map((item) => {
            evolvesToData.push(item.species.name);
            if (item.evolves_to != []) {
              item.evolves_to.map((item) => {
                evolvesToData.push(item.species.name)
              })
            }
          });

          setEvolvesTo(evolvesToData);
        }
      }
    };
    getPokemonDetailsEvolution();
  }, [evolutionUrl, basePokemon]);

  return {
    description,
    image,
    types,
    stats,
    pokemon,
    habitat,
    abilities,
    height,
    weight,
    cry,
    weakness,
    advantage,
    evolvesTo,
  };
}
