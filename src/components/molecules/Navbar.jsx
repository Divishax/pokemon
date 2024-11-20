import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold hover:underline">
          Logout
        </Link>
        <Link to="/pokemon" className="text-white font-bold hover:underline">
          Pokemon
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
