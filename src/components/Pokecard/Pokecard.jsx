import { IconButton, Image, Tag } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import URL_IMAGE from "../../utils/helpers/urlImage";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFavoriteThunk,
  saveFavoriteThunk,
} from "../../redux/Favorite/action";
import { Link } from "react-router-dom";
import useGetTagColor from "../../utils/hooks/useGetTagColor";

import PropTypes from "prop-types";

export default function Pokecard({ pokemon }) {
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = favorites?.find(
    (favorite) => favorite.id === +pokemon?.id
  );

  const dispatch = useDispatch();

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

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          {pokemon?.types.map((type) => (
            <Tag
              key={type.type.name}
              size="sm"
              variant="solid"
              colorScheme={useGetTagColor(type?.type?.name)}
              className="capitalize"
            >
              {type?.type?.name}
            </Tag>
          ))}
        </div>
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
          {isFavorite ? (
            <IconButton
              aria-label="Favorite"
              onClick={() => dispatch(removeFavoriteThunk(pokemon))}
              icon={<AiFillHeart color="red" size={24} />}
            />
          ) : (
            <IconButton
              aria-label="Favorite"
              onClick={() => dispatch(saveFavoriteThunk(pokemon))}
              icon={<AiOutlineHeart size={24} />}
            />
          )}
        </div>
      </div>
    </div>
  );
}

Pokecard.propTypes = {
  pokemon: PropTypes.object,
};

Pokecard.defaultProps = {
  pokemon: {},
};
