import { useState, useEffect } from "react";
import "/src/board.css";
import { shuffle } from "./shuffle";
import { Audio } from "react-loader-spinner";

export function Board() {
  const [pokemons, setPokemons] = useState([]);
  const [points, setPoints] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const random = Math.floor(Math.random() * (600 - 20 + 1)) + 20;

    const getPokemons = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${random}&limit=12`
      );
      const listPokemons = await response.json();
      const { results } = listPokemons;

      const newPokemons = results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const poke = await response.json();

        return {
          name: poke.name,
          img: poke.sprites.other.dream_world.front_default,
        };
      });
      setPokemons(await Promise.all(newPokemons));
      setIsLoading(false);
    };
    getPokemons();
  }, []);

  function handleClick(pokemonName) {
    console.log(pokemonName);
    const changes = shuffle([...pokemons]);
    setPokemons(changes);

    if (list.includes(pokemonName)) {
      if (highScore < points) {
        setHighScore(points);
      }
      setPoints(0);
      setList([]);
      return;
    }

    setPoints(points + 1);
    console.log(list);
    setList([...list, pokemonName]);
  }

  function reload() {
    location.reload();
  }

  return (
    <>
      <div className="scores">
        <h4 className="score">Score: {points}</h4>
        <h4 className="high-score">High score: {highScore}</h4>
      </div>
      <div className="board">
        {isLoading ? <Audio /> : null}
        {pokemons.map((pokemon) => (
          <div
            className="card"
            key={pokemon.name}
            onClick={() => handleClick(pokemon.name)}
          >
            <img src={pokemon.img} alt={pokemon.name} />
            <p className="card-text">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </p>
          </div>
        ))}
      </div>
      <button onClick={reload}>Click here to change the pokemons!</button>
    </>
  );
}
