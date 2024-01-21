import React, { useState } from 'react';
import axios from 'axios';

const Info = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [foundPokemon, setFoundPokemon] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    setFoundPokemon(null);
    setError('');

    if (!searchTerm.trim()) {
      setError('Please enter a Pokemon name.');
      return;
    }

    axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
      .then(response => {
        setFoundPokemon(response.data);
      })
      .catch(error => {
        setError('Pokemon not found. Please enter a valid Pokemon name.');
        console.error('Error fetching Pokemon:', error);
      });
  };

  return (
    <div>
      <h1>Pokemon Info</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter Pokemon name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {foundPokemon && (
        <div>
          <img src={foundPokemon.sprites.front_default} alt={foundPokemon.name} />
          <h2>{foundPokemon.name}</h2>
          <p>Type: {foundPokemon.types[0].type.name}</p>
        </div>
      )}
    </div>
  );
};

export default Info;
