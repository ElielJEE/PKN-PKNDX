import { GetPokemon } from "../services";
import { Link } from "react-router-dom";

export default function EvolutionChain(params) {
  const urlData = `https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`;
  const { pokemon, image, types } = GetPokemon(urlData);

  const colors = {
    grass: "#d2f2c2",
    poison: "#f7cdf7",
    fire: "#ffd1b5",
    flying: "#eae3ff",
    water: "#c2f3ff",
    bug: "#e0e8a2",
    normal: "#e6e6c3",
    electric: "#fff1ba",
    ground: "#e0ccb1",
    fighting: "#fcada9",
    psychic: "#ffc9da",
    rock: "#f0e09c",
    fairy: "#ffdee5",
    steel: "#e6eaf0",
    ice: "#e8feff",
    ghost: "#dbbaff",
    dragon: "#c4bdff",
    dark: "#a9abb0",
  };

  return (
    <>
      {!pokemon || (pokemon.length === 0 && !types) || types.length === 0 ? (
        <div className="detail-evolution__loading">
          <span className="detail-evolution__loading-text">Loading...</span>
        </div>
      ) : (
        <>
          <div className="detail-evolution__chain">
            <Link
              to={`/pokemon/${pokemon.name}`}
              className="detail-evolution__goto"
            ></Link>
            <div
              className="detail-evolution__image-container"
              style={
                types[1]
                  ? {
                      background: `linear-gradient(150deg, ${
                        colors[types[0]]
                      } 50%, ${colors[types[1]]} 50%)`,
                    }
                  : { background: colors[types[0]] }
              }
            >
              <img
                src={image}
                alt=""
                className="detail-evolution__image"
                width={"50px"}
              />
            </div>
            <div className="detail-evolution__info-container">
              <h5 className="detail-evolution__name">
                {pokemon.name.replace(/\b\w/g, (ch) => ch.toUpperCase())}
              </h5>
              <span className="detail-evolution__number">#{pokemon.id}</span>
            </div>
            <div className="detail-evolution__types-container">
              {types.map((item, i) => (
                <span
                  className="detail-types"
                  style={{ backgroundColor: colors[types[i]] }}
                  key={i}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="detail-evolution__icon">
            <i className="fa-solid fa-angles-right"></i>
          </div>
        </>
      )}
    </>
  );
}
