import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../molecules/Navbar";
import Image from "../atoms/Image";
import Details from "../molecules/Details";

function PokemonDetailsPage() {
  const location = useLocation();
  const pokemon = location.state?.pokemon;
  const [showGallery, setShowGallery] = useState(false);

  if (!pokemon) {
    return (
      <p className="text-center text-gray-700 text-lg">No Pokémon selected</p>
    );
  }

  const abilities = pokemon.abilities.map((ability) => ability.ability.name);
  const baseStats = pokemon.stats.map(
    (stat) => `${stat.stat.name}: ${stat.base_stat}`
  );
  const moves = pokemon.moves.slice(0, 5).map((move) => move.move.name);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
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

              <div className="container mx-auto py-8">
                <Details title="Abilities" items={abilities} />
                <Details title="Base Stats" items={baseStats} />
                <Details title="Moves" items={moves} />
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
