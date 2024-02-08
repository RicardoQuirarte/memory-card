import { useState, useEffect } from "react";
import "/src/card.css";

export function Card() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?offset=20&limit=10"
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

  // function shuffle(array) {
  //   array.sort(() => Math.random() - 0.5);
  // }

  // function shuffle(array) {
  //   let currentIndex = array.length,
  //     randomIndex;

  //   // While there remain elements to shuffle.
  //   while (currentIndex > 0) {
  //     // Pick a remaining element.
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     // And swap it with the current element.
  //     [array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex],
  //       array[currentIndex],
  //     ];
  //   }

  //   return array;
  // }

  function shuffle(arra1) {
    var ctr = arra1.length,
      temp,
      index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }

  function handleShuffle() {
    const changes = shuffle([...pokemons]);
    setPokemons(changes);
    console.log("Shuffle", myArray);
  }

  function hello() {
    const newArray = shuffle([...pokemons]);
    setPokemons(newArray);
  }

  return (
    <>
      <div className="board">
        {pokemons.map((pokemon) => (
          <div className="card" key={pokemon.name} onClick={handleShuffle}>
            <img src={pokemon.img} alt={pokemon.name} />
            <p className="card-text">{pokemon.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
