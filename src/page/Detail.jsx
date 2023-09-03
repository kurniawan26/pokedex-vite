import { IconButton, Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineHeart } from "react-icons/ai";
import { fetchPokemonData } from "../utils/service/api";
import { useParams } from "react-router";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Tag } from "@chakra-ui/tag";
import { Progress } from "@chakra-ui/progress";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { saveFavoriteThunk } from "../redux/Favorite/action";

export default function Detail() {
  const { pokemonId } = useParams();
  const dispatch = useDispatch();

  const selector = useSelector((state) => state);

  console.log(selector);

  const { data } = useQuery({
    queryKey: ["pokemon-detail", pokemonId],
    queryFn: () =>
      fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`),
  });

  const onNextPokemon = () => {
    if (pokemonId) {
      window.location.href = `/detail/${Number(pokemonId) + 1}`;
    }
  };

  const onPreviousPokemon = () => {
    if (pokemonId > 1) {
      window.location.href = `/detail/${Number(pokemonId) - 1}`;
    }
  };

  const variants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -100,
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center gap-4 p-4"
    >
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold capitalize">{data?.name}</h1>
        <IconButton
          aria-label="Favorite"
          icon={
            <AiOutlineHeart
              size={24}
              onClick={() =>
                dispatch(
                  saveFavoriteThunk({
                    id: data?.id,
                    name: data?.name,
                    weight: data?.weight,
                    height: data?.height,
                    types: data?.types,
                  })
                )
              }
            />
          }
        />
      </div>
      <div className="flex gap-4 h-44 w-44">
        <Image
          src={`
        https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
          alt="pokemon"
          className="w-full h-full"
        />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-wrap gap-4">
          {data?.types.map((type) => (
            <Tag
              key={type.type.name}
              size="lg"
              variant="solid"
              colorScheme={
                type.type.name === "grass"
                  ? "green"
                  : type.type.name === "fire"
                  ? "red"
                  : type.type.name === "water"
                  ? "blue"
                  : type.type.name === "bug"
                  ? "yellow"
                  : type.type.name === "normal"
                  ? "gray"
                  : type.type.name === "poison"
                  ? "purple"
                  : type.type.name === "electric"
                  ? "yellow"
                  : type.type.name === "ground"
                  ? "yellow"
                  : "gray"
              }
              className="capitalize"
            >
              {type.type.name}
            </Tag>
          ))}
        </div>
      </div>
      <Tabs className="w-full">
        <TabList>
          <Tab>Info</Tab>
          <Tab>Stats</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Weight</span>
                  <span className="text-sm">{data?.weight}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Height</span>
                  <span className="text-sm">{data?.height}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Abilities</span>
                  <div className="flex flex-col gap-2 my-2">
                    {data?.abilities.map((ability) => (
                      <Tag key={ability.ability.name} size="md" variant="solid">
                        {ability.ability.name}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <span className="text-sm font-bold">Stats</span>
            <div className="flex flex-col gap-4 my-2">
              {data?.stats.map((stat) => (
                <div className="flex flex-col gap-1" key={stat.stat.name}>
                  <span className="text-sm capitalize">
                    {stat.stat.name} ({stat.base_stat})
                  </span>
                  <Progress
                    size="lg"
                    value={stat.base_stat}
                    colorScheme="green"
                    rounded={10}
                  />
                </div>
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <div className="flex gap-4">
        <Button onClick={onPreviousPokemon}>Previous Pokemon</Button>
        <Button onClick={onNextPokemon}>Next Pokemon</Button>
      </div>
    </motion.div>
  );
}
