import { Route, Routes } from "react-router";
import Home from "./page/Home";
import Favorite from "./page/Favorite";
import Detail from "./page/Detail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/:pokemonId" element={<Detail />} />
    </Routes>
  );
}

export default App;
