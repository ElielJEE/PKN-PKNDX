import { GetPokemon } from "../services";
import { Link } from "react-router-dom";
import loadingPokeball from "../../../public/img/LoadingPokeballWhite.gif";

export default function PokeCard(params) {
  const { pokemon, image, types, stats } = GetPokemon(params.pokeData.url);

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
    <div className={!params.classname ? "pokecard-container" : params.classname}>
      {!pokemon ||
      (pokemon.length === 0 && !types) ||
      (types.length === 0 && !stats) ||
      stats.length === 0 ? (
        <div className="loading-pokecard">
          <img src={loadingPokeball} alt="" className="loading-img" />
        </div>
      ) : (
        <>
          <div
            className="pokecard-front"
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
              alt="pokemon"
              className={
                params.onPress === true ? "pokecard-img pokecard-img__anim" : " pokecard-img"
              }
            />
            <div className="pokecard-circle"></div>
            <div className="pokecard-body">
              <h5 className="pokecard-pokemon__number">#{pokemon.id}</h5>
              <span className="pokecard-pokemon__name">
                {pokemon.name.replace(/\b\w/g, (ch) => ch.toUpperCase())}
              </span>
              <span className="pokecard-pokemon__types">
                {types.join(" / ").replace(/\b\w/g, (ch) => ch.toUpperCase())}
              </span>
            </div>
          </div>
          <div className="pokecard-back">
            <Link to={`/pokemon/${pokemon.name}`} className="pokecard-details__goto"></Link>
            <div className="pokecard-stats__name">HP: {stats[0]}</div>
            <div
              className="pokecard-stats__bar"
              style={{
                background: `linear-gradient(to right, ${colors[types[0]]} ${
                  stats[0]
                }%, ${colors[types[0]]}71 ${stats[0]}%)`,
              }}
            ></div>
            <div className="pokecard-stats__name">Attack: {stats[1]}</div>
            <div
              className="pokecard-stats__bar"
              style={{
                background: `linear-gradient(to right, ${colors[types[0]]} ${
                  stats[1]
                }%, ${colors[types[0]]}71 ${stats[1]}%)`,
              }}
            ></div>
            <div className="pokecard-stats__name">Defense: {stats[2]}</div>
            <div
              className="pokecard-stats__bar"
              style={{
                background: `linear-gradient(to right, ${colors[types[0]]} ${
                  stats[2]
                }%, ${colors[types[0]]}71 ${stats[2]}%)`,
              }}
            ></div>
            <div className="pokecard-stats__name">
              Special-Attack: {stats[3]}
            </div>
            <div
              className="pokecard-stats__bar"
              style={{
                background: `linear-gradient(to right, ${colors[types[0]]} ${
                  stats[3]
                }%, ${colors[types[0]]}71 ${stats[3]}%)`,
              }}
            ></div>
            <div className="pokecard-stats__name">
              Special-Defense: {stats[4]}
            </div>
            <div
              className="pokecard-stats__bar"
              style={{
                background: `linear-gradient(to right, ${colors[types[0]]} ${
                  stats[4]
                }%, ${colors[types[0]]}71 ${stats[4]}%)`,
              }}
            ></div>
            <div className="pokecard-stats__name">Speed: {stats[5]}</div>
            <div
              className="pokecard-stats__bar"
              style={{
                background: `linear-gradient(to right, ${colors[types[0]]} ${
                  stats[5]
                }%, ${colors[types[0]]}71 ${stats[5]}%)`,
              }}
            ></div>
            <span className="pokecard-back__details">Click to see more!</span>
          </div>
        </>
      )}
    </div>
  );
}
