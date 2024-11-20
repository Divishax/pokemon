import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../molecules/Navbar";
import Image from "../atoms/Image";

function PokemonDetailsPage() {
  const location = useLocation();
  const pokemon = location.state?.pokemon;
  const [showGallery, setShowGallery] = useState(false);

  if (!pokemon) {
    return (
      <p className="text-center text-gray-700 text-lg">No Pokémon selected</p>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Pokémon Image */}
            {/* <div className="flex-shrink-0">
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                className="w-64 h-64 object-contain"
              />
            </div> */}
            <Image />

            {/* Pokémon Information */}
            <div>
              <h1 className="text-4xl font-bold capitalize text-gray-800 mb-4">
                {pokemon.name}
              </h1>
              <p className="text-gray-700 text-lg">
                <strong>Height:</strong> {pokemon.height / 10} m
              </p>
              <p className="text-gray-700 text-lg">
                <strong>Weight:</strong> {pokemon.weight / 10} kg
              </p>
              <p className="text-gray-700 text-lg">
                <strong>Type:</strong>{" "}
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </p>

              {/* Abilities */}
              <div className="mt-6">
                <h3 className="text-xl font-bold text-blue-500 border-b border-gray-300 pb-2">
                  Abilities
                </h3>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  {pokemon.abilities.map((ability) => (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>

              {/* Base Stats */}
              <div className="mt-6">
                <h3 className="text-xl font-bold text-blue-500 border-b border-gray-300 pb-2">
                  Base Stats
                </h3>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  {pokemon.stats.map((stat) => (
                    <li key={stat.stat.name}>
                      {stat.stat.name.toUpperCase()}: {stat.base_stat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Moves */}
              <div className="mt-6">
                <h3 className="text-xl font-bold text-blue-500 border-b border-gray-300 pb-2">
                  Moves
                </h3>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  {pokemon.moves.slice(0, 5).map((move) => (
                    <li key={move.move.name}>{move.move.name}</li>
                  ))}
                </ul>
              </div>

              {/* Gallery Toggle Button */}
              <button
                onClick={() => setShowGallery(!showGallery)}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                {showGallery ? "Hide Gallery" : "View Gallery"}
              </button>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {showGallery && (
          <div className="bg-white p-6 mt-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-blue-500 mb-4">Gallery</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <img
                src={pokemon.sprites.front_default}
                alt="Front view"
                className="w-32 h-32 object-contain rounded-lg shadow-md"
              />
              <img
                src={pokemon.sprites.back_default}
                alt="Back view"
                className="w-32 h-32 object-contain rounded-lg shadow-md"
              />
              <img
                src={pokemon.sprites.front_shiny}
                alt="Shiny front view"
                className="w-32 h-32 object-contain rounded-lg shadow-md"
              />
              <img
                src={pokemon.sprites.back_shiny}
                alt="Shiny back view"
                className="w-32 h-32 object-contain rounded-lg shadow-md"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonDetailsPage;
