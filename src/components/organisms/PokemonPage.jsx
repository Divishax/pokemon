import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../molecules/Navbar";

import { Box, Button } from "@mui/material";

function PokemonPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 6;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchPokemon = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            return response.json();
          })
        );

        if (isMounted) {
          setPokemonList((prevList) => [...prevList, ...pokemonDetails]);
        }
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPokemon();
    return () => {
      isMounted = false;
    };
  }, [offset]);

  const handleViewDetails = (pokemon) => {
    navigate(`/pokemon/${pokemon.id}`, { state: { pokemon } });
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Pokemon List
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-h-screen">
        {pokemonList.map((pokemon, index) => (
          <div
            key={`${pokemon.id}-${index}`}
            className="bg-white rounded-lg shadow-md p-4 text-center"
          >
            <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-24 h-24 mx-auto my-4"
            />
            <Button
              variant="outlined"
              onClick={() => handleViewDetails(pokemon)}
            >
              View full details
            </Button>
          </div>
        ))}
      </div>

      <Box textAlign="center" mt={8}>
        <Button
          onClick={handleLoadMore}
          variant="contained"
          color={isLoading ? "grey" : "primary"}
          disabled={isLoading}
          sx={{
            px: 3,
            py: 1.5,
            fontWeight: "bold",
            borderRadius: 1,
            "&:hover": {
              backgroundColor: !isLoading && "primary.dark",
            },
          }}
        >
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      </Box>

      {selectedPokemon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl">
            <h2 className="text-2xl font-bold capitalize text-center mb-4">
              {selectedPokemon.name}
            </h2>
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
              className="w-40 h-40 mx-auto mb-4"
            />
            <p className="text-gray-700 text-lg">
              Height: {selectedPokemon.height}
            </p>
            <p className="text-gray-700 text-lg">
              Weight: {selectedPokemon.weight}
            </p>
            <p className="text-gray-700 text-lg">
              Type:{" "}
              {selectedPokemon.types.map((type) => type.type.name).join(", ")}
            </p>
            <button
              onClick={() => setSelectedPokemon(null)}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonPage;
