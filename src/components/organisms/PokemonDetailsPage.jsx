import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../molecules/Navbar";
import Image from "../atoms/Image";
import Details from "../molecules/Details";
import Gallery from "../molecules/Gallery";
import Info from "../molecules/Info";

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

  const types = pokemon.types.map((type) => type.type.name);
  const sprites = [
    { url: pokemon.sprites.front_default, alt: "Front view" },
    { url: pokemon.sprites.back_default, alt: "Back view" },
    { url: pokemon.sprites.front_shiny, alt: "Shiny front view" },
    { url: pokemon.sprites.back_shiny, alt: "Shiny back view" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Image />
            <div>
              <Info
                name={pokemon.name}
                height={pokemon.height}
                weight={pokemon.weight}
                types={types}
              />

              <div className="container mx-auto py-8">
                <Details title="Abilities" items={abilities} />
                <Details title="Base Stats" items={baseStats} />
                <Details title="Moves" items={moves} />
              </div>

              <button
                onClick={() => setShowGallery(!showGallery)}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                {showGallery ? "Hide Gallery" : "View Gallery"}
              </button>
            </div>
          </div>
        </div>

        {showGallery && <Gallery sprites={sprites} />}
      </div>
    </div>
  );
}

export default PokemonDetailsPage;
