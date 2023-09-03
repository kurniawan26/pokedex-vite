import { Route, Routes } from "react-router";
import Home from "./page/Home";
import Favorite from "./page/Favorite";
import Detail from "./page/Detail";
import Sidebar from "./components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFavoriteThunk } from "./redux/Favorite/action";

function App() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  console.log(selector);

  useEffect(() => {
    dispatch(getFavoriteThunk());
  }, [dispatch]);
  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/detail/:pokemonId" element={<Detail />} />
      </Routes>
    </Sidebar>
  );
}

export default App;
