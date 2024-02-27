import { useParams, useNavigate } from "react-router-dom";
import { GetPokemonDetails } from "../Components/services";
import loadingPokeball from "../../public/img/LoadingPokeballWhite.gif";
import { usePlaying } from "../Components/hooks/index";
import { EvolutionChain } from "../Components/atoms/index";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    description,
    image,
    types,
    pokemon,
    stats,
    abilities,
    height,
    weight,
    habitat,
    cry,
    weakness,
    advantage,
    evolvesTo,
    basePokemon,
  } = GetPokemonDetails(id);
  const { audioRef, handlePlay } = usePlaying();

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
      <div className="detail-back__container">
        <button className="detail-back__btn" onClick={() => navigate('/')}>
          <i className="fa-solid fa-angle-left"></i>
          <span className="detail-back__btn-text">Back</span>
        </button>
      </div>
      <div className="details-container">
        {!pokemon ||
        (pokemon.length === 0 && !types) ||
        (types.length === 0 && !stats) ||
        !cry ||
        stats.length === 0 ? (
          <div className="loading-details">
            <img src={loadingPokeball} alt="" className="loading-img" />
          </div>
        ) : (
          <>
            <div className="pokemon-details__header">
              <h1 className="detail-name">
                {pokemon.name.replace(/\b\w/g, (ch) => ch.toUpperCase())}
              </h1>
              <h1 className="detail-number">N.° {pokemon.id}</h1>
            </div>
            <div className="pokemon-details__left">
              <div className="detail-left__pokemon">
                <div className="detail-left__image-container">
                  <img
                    src={image}
                    alt="pokemon"
                    className="detail-left__image"
                  />
                </div>
                <div className="detail-left__pokemon-footer">
                  <div className="detail-left__types">
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
                  <audio src={cry} ref={audioRef} />
                  <button className="hear-pokemon__btn" onClick={handlePlay}>
                    <i className="fa-solid fa-circle-play"></i>
                  </button>
                </div>
              </div>
              <div className="details-left__stats-container">
                <div className="pokecard-stats__name">HP: {stats[0]}</div>
                <div
                  className="pokecard-stats__bar"
                  style={{
                    background: `linear-gradient(to right, ${
                      colors[types[0]]
                    } ${stats[0]}%, ${colors[types[0]]}71 ${stats[0]}%)`,
                  }}
                ></div>
                <div className="pokecard-stats__name">Attack: {stats[1]}</div>
                <div
                  className="pokecard-stats__bar"
                  style={{
                    background: `linear-gradient(to right, ${
                      colors[types[0]]
                    } ${stats[1]}%, ${colors[types[0]]}71 ${stats[1]}%)`,
                  }}
                ></div>
                <div className="pokecard-stats__name">Defense: {stats[2]}</div>
                <div
                  className="pokecard-stats__bar"
                  style={{
                    background: `linear-gradient(to right, ${
                      colors[types[0]]
                    } ${stats[2]}%, ${colors[types[0]]}71 ${stats[2]}%)`,
                  }}
                ></div>
                <div className="pokecard-stats__name">
                  Special-Attack: {stats[3]}
                </div>
                <div
                  className="pokecard-stats__bar"
                  style={{
                    background: `linear-gradient(to right, ${
                      colors[types[0]]
                    } ${stats[3]}%, ${colors[types[0]]}71 ${stats[3]}%)`,
                  }}
                ></div>
                <div className="pokecard-stats__name">
                  Special-Defense: {stats[4]}
                </div>
                <div
                  className="pokecard-stats__bar"
                  style={{
                    background: `linear-gradient(to right, ${
                      colors[types[0]]
                    } ${stats[4]}%, ${colors[types[0]]}71 ${stats[4]}%)`,
                  }}
                ></div>
                <div className="pokecard-stats__name">Speed: {stats[5]}</div>
                <div
                  className="pokecard-stats__bar"
                  style={{
                    background: `linear-gradient(to right, ${
                      colors[types[0]]
                    } ${stats[5]}%, ${colors[types[0]]}71 ${stats[5]}%)`,
                  }}
                ></div>
              </div>
            </div>
            <div className="pokemon-details__right">
              <div className="detail-bio__container">
                <p className="detail-bio">{description}</p>
              </div>
              <div className="detail-habitat__container">
                <h4 className="detail-habitat">Habitat:</h4>
                <span className="detail-habitat__value">
                  {habitat.replace(/\b\w/g, (ch) => ch.toUpperCase())}
                </span>
              </div>
              <div className="detail-info__container">
                <div className="detail-info__left">
                  <div className="detail-info__height">
                    <h4 className="detail-height">Height:</h4>
                    <span className="detail-height__value">
                      {height / 10} m
                    </span>
                  </div>
                  <div className="detail-info__weight">
                    <h4 className="detail-weight">Weight:</h4>
                    <span className="detail-weight__value">
                      {weight / 10} kg
                    </span>
                  </div>
                </div>
                <div className="detail-info__right">
                  <div className="detail-abilities__container">
                    <h4 className="detail-abilities__title">Abilities:</h4>
                    <ul className="detail-abilities__list">
                      {abilities.map((item, i) => (
                        <li className="detail-ability" key={i}>
                          {item.replace(/\b\w/g, (ch) => ch.toUpperCase())}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="detail-damage__container">
                <div className="detail-damage__againts">
                  <h4 className="detail-damage__title">Weakness</h4>
                  <ul className="detail-damage__againts-list">
                    {weakness === "Unkwon" ? (
                      <li className="detail-damage__advantage-item detail-damage__unkwon">
                        No Data
                      </li>
                    ) : (
                      weakness.map((item, i) => (
                        <li
                          className="detail-damage__againts-item detail-damage__type"
                          key={i}
                          style={{ backgroundColor: colors[item.name] }}
                        >
                          {item.name.replace(/\b\w/g, (ch) => ch.toUpperCase())}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
                <div className="detail-damage__advantage">
                  <h4 className="detail-damage__title">Advantage over</h4>
                  <ul className="detail-damage__advantage-list">
                    {advantage === "Unkwon" ? (
                      <li className="detail-damage__advantage-item detail-damage__unkwon">
                        No Data
                      </li>
                    ) : (
                      advantage.map((item, i) => (
                        <li
                          className="detail-damage__advantage-item detail-damage__type"
                          key={i}
                          style={{ backgroundColor: colors[item.name] }}
                        >
                          {item.name.replace(/\b\w/g, (ch) => ch.toUpperCase())}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="detail-evolution__container">
              {evolvesTo.map((item, i) => (
                <EvolutionChain key={i} pokemonName={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
