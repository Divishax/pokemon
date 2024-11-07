import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function PokemonPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 6;
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Pokémon based on the current offset
    const fetchPokemon = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const data = await response.json();

        // Fetch details for each Pokémon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            return response.json();
          })
        );

        // Append new Pokémon to the list
        setPokemonList((prevList) => [...prevList, ...pokemonDetails]);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [offset]);

  const handleViewDetails = (pokemon) => {
    navigate(`/pokemon/${pokemon.id}`, { state: { pokemon } });
    // setSelectedPokemon(pokemon);
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="nav-link">
          Login
        </Link>
        <Link to="/pokemon" className="nav-link">
          Pokemon
        </Link>
      </nav>
      <h2 className="pokemon-title">Pokemon List</h2>
      <div className="pokemon-container">
        {pokemonList.map((pokemon, index) => (
          <div key={`${pokemon.id}-${index}`} className="pokemon-card">
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <button onClick={() => handleViewDetails(pokemon)}>
              View Full Details
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleLoadMore}
        className="load-more-button"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Load More"}
      </button>

      {selectedPokemon && (
        <div className="pokemon-details">
          <h2>{selectedPokemon.name}</h2>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
          <p>
            Type:{" "}
            {selectedPokemon.types.map((type) => type.type.name).join(", ")}
          </p>
          <button onClick={() => setSelectedPokemon(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default PokemonPage;
