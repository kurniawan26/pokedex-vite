import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import useOnScrollFetch from "../utils/hooks/useOnScrollFetch";
import { Image } from "@chakra-ui/image";
import { Link } from "react-router-dom";
import { fetchPokemonData, getPokemon } from "../utils/service/api";

export default function Home() {
  const [page, setPage] = useState(1);
  const [initialData, setInitialData] = useState([]);
  const cardContainerRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", page],
    queryFn: () => getPokemon({ offset: 20 * (page - 1), limit: 20 }),
  });

  const getEachData = useCallback(async () => {
    if (data) {
      const response = await Promise.all(
        data.map((pokemon) => fetchPokemonData(pokemon?.url))
      );

      setInitialData((prev) => [...prev, ...response]);
    }
  }, [data]);

  useEffect(() => {
    getEachData();
  }, [getEachData]);

  useOnScrollFetch(cardContainerRef, data, isLoading, setPage);

  return (
    <main className="p-5 m-auto max-w-7xl">
      <h1 className="text-3xl font-bold">Pokedex</h1>
      <p className="text-lg">Hello, world!</p>
      <div
        className="grid gap-4 mt-5 sm:grid-cols-3 md:grid-cols-4"
        ref={cardContainerRef}
      >
        {initialData?.map((pokemon) => (
          <div key={pokemon.id} className="p-5 bg-white rounded-lg shadow-lg">
            <Image
              src={pokemon.sprites.front_default}
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
