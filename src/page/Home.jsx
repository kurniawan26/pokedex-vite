import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import useOnScrollFetch from "../utils/hooks/useOnScrollFetch";
import { getDetailPokemon, getAllPokemon } from "../utils/service/api";
import Pokecard from "../components/Pokecard";
import Loader from "../components/Loader/Loader";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const cardContainerRef = useRef(null);

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["pokemon"],
      queryFn: ({ pageParam }) =>
        getAllPokemon({
          limit: 20,
          offset: pageParam,
        }),
      cacheTime: false,
      getNextPageParam: (lastPage) => {
        if (lastPage?.next) {
          const offset = lastPage.next
            .split("?")[1]
            .split("&")
            .find((param) => param.includes("offset"))
            .split("=")[1];
          return offset;
        }
        return undefined;
      },
    });

  const getEachData = useCallback(async () => {
    const response = data?.pages.map((page) =>
      page?.results.map((pokemon) => pokemon)
    );

    const payload = await Promise.all(
      response?.flat().map(async (pokemon) => {
        const response = await getDetailPokemon(pokemon.url);
        return response;
      })
    );

    setPokemon(payload);
  }, [data]);

  useEffect(() => {
    getEachData();
  }, [getEachData]);

  useOnScrollFetch(
    cardContainerRef,
    pokemon,
    isFetching,
    fetchNextPage,
    hasNextPage
  );

  return (
    <main className="p-5 m-auto max-w-7xl">
      <h1 className="text-3xl font-bold">Home</h1>
      <div
        className="grid gap-4 mt-5 sm:grid-cols-3 md:grid-cols-4"
        ref={cardContainerRef}
      >
        {pokemon?.map((pokemon) => (
          <Pokecard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
      {isLoading || isFetching ? <Loader /> : null}
    </main>
  );
}
