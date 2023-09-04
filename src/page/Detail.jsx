/* eslint-disable react-hooks/rules-of-hooks */
import { IconButton, Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { useQuery } from "@tanstack/react-query";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getDetailPokemon } from "../utils/service/api";
import { useParams } from "react-router";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Tag } from "@chakra-ui/tag";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFavoriteThunk,
  saveFavoriteThunk,
} from "../redux/Favorite/action";
import URL_IMAGE from "../utils/helpers/urlImage";
import useGetTagColor from "../utils/hooks/useGetTagColor";
import ProgressLabel from "../components/Progress/ProgressLabel";
import Loader from "../components/Loader/Loader";

export default function Detail() {
  const { pokemonId } = useParams();
  const dispatch = useDispatch();

  const { favorites } = useSelector((state) => state);

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon-detail", pokemonId],
    queryFn: () =>
      getDetailPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`),
  });

  const { data: dataSpecies, isLoading: isLoadingSpecies } = useQuery({
    queryKey: ["pokemon-species", pokemonId],
    queryFn: () =>
      getDetailPokemon(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
      ),
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

  const isFavorite = favorites?.find((favorite) => favorite.id === +pokemonId);

  if (isLoading || isLoadingSpecies) {
    return <Loader />;
  }

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
        {isFavorite ? (
          <IconButton
            icon={<AiFillHeart color="red" size={24} />}
            aria-label="Favorite"
            onClick={() => dispatch(removeFavoriteThunk(data))}
          />
        ) : (
          <IconButton
            aria-label="Favorite"
            onClick={() => dispatch(saveFavoriteThunk(data))}
            icon={<AiOutlineHeart size={24} />}
          />
        )}
      </div>
      <div className="flex gap-4 h-44 w-44">
        <Image
          src={URL_IMAGE(pokemonId)}
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
              colorScheme={useGetTagColor(type?.type?.name)}
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
                <span className="text-sm font-bold">Description</span>
                <span className="text-sm">
                  {dataSpecies?.flavor_text_entries[0].flavor_text}
                </span>
              </div>
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
                <ProgressLabel stat={stat} key={stat.stat.name} />
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
