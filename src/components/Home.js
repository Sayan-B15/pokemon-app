import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [pokemonOfTheDay, setPokemonOfTheDay] = useState(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon-form/?limit=1')
      .then(response => {
        const randomPokemon = response.data.results[0].name;
        return axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`);
      })
      .then(response => {
        setPokemonOfTheDay(response.data);
      })
      .catch(error => console.error('Error fetching Pokemon:', error));
  }, []);

  return (
    <div>
      <h1>Pokemon of the Day</h1>
      {pokemonOfTheDay && (
        <div>
          <img src={pokemonOfTheDay.sprites.front_default} alt={pokemonOfTheDay.name} />
          <h2>{pokemonOfTheDay.name}</h2>
          <p>Type: {pokemonOfTheDay.types[0].type.name}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
