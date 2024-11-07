import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import "../App.css";

function PokemonDetailsPage() {
  const location = useLocation();
  const pokemon = location.state?.pokemon; // Get the passed Pokémon data
  const [showGallery, setShowGallery] = useState(false);

  if (!pokemon) {
    return <p>No Pokemon selected</p>;
  }

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
      <h2>{pokemon.name} Details</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Type: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
      <div className="pokemon-abilities p">
        <h3>Abilities</h3>
        <ul>
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>

      <h3>Base Stats</h3>
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name.toUpperCase()}: {stat.base_stat}
          </li>
        ))}
      </ul>

      <h3>Moves</h3>
      <ul>
        {pokemon.moves.slice(0, 5).map(
          (
            move // Displaying only a few moves
          ) => (
            <li key={move.move.name}>{move.move.name}</li>
          )
        )}
      </ul>

      <button onClick={() => setShowGallery(!showGallery)}>Gallery</button>

      {showGallery && (
        <div className="pokemon-gallery">
          <img src={pokemon.sprites.front_default} alt="Front view" />
          <img src={pokemon.sprites.back_default} alt="Back view" />
          <img src={pokemon.sprites.front_shiny} alt="Shiny front view" />
          <img src={pokemon.sprites.back_shiny} alt="Shiny back view" />
        </div>
      )}
    </div>
  );
}

export default PokemonDetailsPage;
