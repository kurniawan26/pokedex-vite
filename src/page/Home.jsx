import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import useOnScrollFetch from "../utils/hooks/useOnScrollFetch";
import { Image } from "@chakra-ui/image";
import { Link } from "react-router-dom";
import { fetchPokemonData, getPokemon } from "../utils/service/api";
import URL_IMAGE from "../utils/helpers/urlImage";
import { IconButton, Spinner } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import Pokecard from "../components/Pokecard";

export default function Home() {
  const [page, setPage] = useState(1);
  const [initialData, setInitialData] = useState([]);
  const cardContainerRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", page],
    queryFn: () => getPokemon({ offset: 20 * (page - 1), limit: 20 }),
    cacheTime: false,
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
  }, [getEachData, page]);

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
          <Pokecard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
      {isLoading && (
        <div className="flex justify-center mt-5">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      )}
    </main>
  );
}
