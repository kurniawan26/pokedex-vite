import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import useOnScrollFetch from "../utils/hooks/useOnScrollFetch";
import { getDetailPokemon, getAllPokemon } from "../utils/service/api";
import Pokecard from "../components/Pokecard";
import Loader from "../components/Loader/Loader";

export default function Home() {
  const [page, setPage] = useState(1);
  const [initialData, setInitialData] = useState([]);
  const cardContainerRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", page],
    queryFn: () => getAllPokemon({ offset: 20 * (page - 1), limit: 20 }),
    cacheTime: false,
  });

  const getEachData = useCallback(async () => {
    if (data) {
      const response = await Promise.all(
        data.map((pokemon) => getDetailPokemon(pokemon?.url))
      );

      setInitialData((prev) => [...prev, ...response]);
    }
  }, [data]);

  useEffect(() => {
    getEachData();
  }, [getEachData, page]);

  useOnScrollFetch(cardContainerRef, data, isLoading, setPage);

  return (
    <main className="p-5 m-auto max-w-7xl">
      <h1 className="text-3xl font-bold">Home</h1>
      <div
        className="grid gap-4 mt-5 sm:grid-cols-3 md:grid-cols-4"
        ref={cardContainerRef}
      >
        {initialData?.map((pokemon) => (
          <Pokecard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
      {isLoading && <Loader />}
    </main>
  );
}
