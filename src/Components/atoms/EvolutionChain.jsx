import { GetPokemon } from "../services";
import { Link } from "react-router-dom";

export default function EvolutionChain(params) {
  const urlData = `https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`;
  const { pokemon, image, types } = GetPokemon(urlData);

  return (
    <>
      <div className="detail-evolution__chain">
        <div className="detail-evolution__image-container">
          <img src={image} alt="" className="detail-evolution__image" width={"50px"}/>
        </div>
      </div>
    </>
  );
}
