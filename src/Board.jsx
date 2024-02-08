import { useState, useEffect } from "react";
import "/src/board.css";
import { shuffle } from "./shuffle";

export function Board() {
  const [pokemons, setPokemons] = useState([]);
  const [points, setPoints] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    const random = Math.floor(Math.random() * (600 - 20 + 1)) + 20;

    const getPokemons = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${random}&limit=10`
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
    };
    getPokemons();
  }, []);

  function handleClick(pokemonName) {
    const changes = shuffle([...pokemons]);
    setPokemons(changes);
    setPoints(points + 1);
    console.log(pokemonName);

    if (list.includes(pokemonName)) {
      setHighScore(points);
      location.reload();
      console.log("HELLO");
    }

    setList(pokemonName);
    console.log(list);
  }

  return (
    <>
      <div className="scores">
        <h4>Score: {points}</h4>
        <h4>High score: 0</h4>
      </div>
      <div className="board">
        {pokemons.map((pokemon) => (
          <div
            className="card"
            key={pokemon.name}
            onClick={() => handleClick(pokemon.name)}
          >
            <img src={pokemon.img} alt={pokemon.name} />
            <p className="card-text">{pokemon.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
