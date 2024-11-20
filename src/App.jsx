import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/organisms/Login";
import PokemonPage from "./components/organisms/PokemonPage";
import PokemonDetailsPage from "./components/organisms/PokemonDetailsPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/pokemon" element={<PokemonPage />} />
          <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
