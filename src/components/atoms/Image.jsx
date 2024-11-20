import { useLocation } from "react-router-dom";

function Image() {
  const location = useLocation();
  const pokemon = location.state?.pokemon;
  return (
    <div className="flex-shrink-0">
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="w-64 h-64 object-contain"
      />
    </div>
  );
}
export default Image;
