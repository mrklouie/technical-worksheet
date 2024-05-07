import React from "react";
import styles from "./CardsContainer.module.scss";
import { Card } from "../../components";
import { TPokemonType } from "../../../types";

const getPokemonData = async ({
  count,
}: {
  count: number;
}): Promise<TPokemonType> => {
  // Initial values for the pokemon variable
  // Initial values should be empty for now
  const pokemon: TPokemonType = {
    pokemon_id: null,
    pokemon_name: "",
    pokemon_avatar: "",
    pokemon_desc: "",
  };

  // Try and catch block for fetching the data from the PokeAPI endpoint
  // By using a try catch block below we avoided Type errors
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${count}`);
    const data = await res.json();

    // After fetching a pokemon based on its pokemon ID (count)-
    // I have to do a fetch again for getting the description of the pokemon
    const species = await fetch(data.species.url);
    const description = await species.json();

    // We appended all the fetched data to our pokemon variable which was initially empty at first
    pokemon.pokemon_id = data.id;
    pokemon.pokemon_name = data.name;
    pokemon.pokemon_avatar = data.sprites.other.dream_world.front_default;
    pokemon.pokemon_desc =
      description.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, "");

    // I returned the pending promise to perform a Promise.all
    return pokemon;
  } catch (error: any) {
    console.log(error.message || error);
    throw new Error(error.message || error);
  }
};

const CardsContaainer = async () => {
  // Offset is the limit of pokemons that we are going to fetch
  const offset = 24;

  // This promises variable will contain a collection of pending promises
  const promises: Promise<TPokemonType>[] = Array.from(
    { length: offset },
    (_, y): Promise<TPokemonType> => {
      const count = y + 1;
      return getPokemonData({ count });
    }
  );

  // After getting all the pending promises, I used the Promise.all to concurrently fetch all the pending promises
  const pokeData: TPokemonType[] = await Promise.all(promises);

  return (
    <div className={styles["cards-container"]}>
      {pokeData.length !== 0 &&
        pokeData?.map((pokemon, index) => {
          return (
            <Card
              key={index}
              pokemon_name={pokemon.pokemon_name}
              pokemon_id={pokemon.pokemon_id}
              pokemon_desc={pokemon.pokemon_desc}
              pokemon_avatar={pokemon.pokemon_avatar}
            />
          );
        })}
    </div>
  );
};

export default CardsContaainer;
