import { Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pokecard from "../components/Pokecard/Pokecard";

export default function Favorite() {
  const favorites = useSelector((state) => state.favorites);

  return (
    <main className="p-5 m-auto max-w-7xl">
      <h1 className="text-3xl font-bold">Favorite</h1>
      <div className="grid gap-4 mt-5 sm:grid-cols-3 md:grid-cols-4">
        {favorites?.map((pokemon) => (
          <Pokecard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
      {favorites?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-5">
          <span className="mt-5 text-xl font-bold">Favorite is empty</span>
          <Link to="/">
            <span className="text-blue-500">Go to home</span>
          </Link>
        </div>
      )}
    </main>
  );
}
