import { Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import URL_IMAGE from "../utils/helpers/urlImage";

export default function Favorite() {
  const { favorites } = useSelector((state) => state);

  return (
    <main className="p-5 m-auto max-w-7xl">
      <h1 className="text-3xl font-bold">Favorite</h1>
      <div className="grid gap-4 mt-5 sm:grid-cols-3 md:grid-cols-4">
        {favorites?.map((pokemon) => (
          <div key={pokemon.id} className="p-5 bg-white rounded-lg shadow-lg">
            <Image
              src={URL_IMAGE(pokemon.id)}
              alt={pokemon.name}
              className="w-32 h-32 m-auto"
            />

            <Link to={`/detail/${pokemon.id}`}>
              <h1 className="text-2xl font-bold text-center capitalize">
                {pokemon.name}
              </h1>
            </Link>
            <div className="flex justify-between mt-5">
              <div className="flex flex-col">
                <span className="text-sm font-bold">Weight</span>
                <span className="text-sm">{pokemon.weight}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">Height</span>
                <span className="text-sm">{pokemon.height}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
