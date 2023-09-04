import { IconButton, Image, Link } from "@chakra-ui/react";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import URL_IMAGE from "../../utils/helpers/urlImage";

export default function Pokecard({ pokemon }) {
  return (
    <div className="p-5 bg-white rounded-lg shadow-lg">
      <Image
        src={URL_IMAGE(pokemon?.id)}
        alt={pokemon?.name}
        className="w-32 h-32 m-auto"
      />

      <Link to={`/detail/${pokemon?.id}`}>
        <h1 className="text-2xl font-bold text-center capitalize">
          {pokemon?.name}
        </h1>
      </Link>
      <div className="flex justify-between mt-5">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-sm font-bold">Weight</span>
            <span className="text-sm">{pokemon?.weight}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Height</span>
            <span className="text-sm">{pokemon?.height}</span>
          </div>
        </div>
        <IconButton aria-label="Favorite" icon={<AiOutlineHeart size={24} />} />
      </div>
    </div>
  );
}
