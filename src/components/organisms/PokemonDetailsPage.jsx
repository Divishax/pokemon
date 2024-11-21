import { useLocation } from "react-router-dom";
import { useState } from "react";

import Image from "../atoms/Image";

import Navbar from "../molecules/Navbar";
import Details from "../molecules/Details";
import Gallery from "../molecules/Gallery";
import Info from "../molecules/Info";

import { Button } from "@mui/material";

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
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-white p-6 rounded-lg shadow-md max-w-4xl w-full flex-col md:flex-row gap-8">
        <Image />
        <div className="flex-1">
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

          <Button onClick={() => setShowGallery(!showGallery)}>
            {showGallery ? "Hide Gallery" : "View Gallery"}
          </Button>
        </div>
      </div>

      {showGallery && <Gallery sprites={sprites} />}
    </div>
  );
}

export default PokemonDetailsPage;
