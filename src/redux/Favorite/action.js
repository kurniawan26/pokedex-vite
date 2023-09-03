const ActionTypes = {
  ADD_FAVORITE: "ADD_FAVORITE",
  REMOVE_FAVORITE: "REMOVE_FAVORITE",
  CLEAR_FAVORITE: "CLEAR_FAVORITE",
  GET_FAVORITE: "GET_FAVORITE",
};

const addFavorite = (payload) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload,
});

const removeFavorite = (payload) => ({
  type: ActionTypes.REMOVE_FAVORITE,
  payload,
});

const clearFavorite = () => ({
  type: ActionTypes.CLEAR_FAVORITE,
});

const getFavorite = (payload) => ({
  type: ActionTypes.GET_FAVORITE,
  payload,
});

const saveFavoriteThunk = (payload) => {
  return (dispatch) => {
    const favorite = JSON.parse(localStorage.getItem("favorite"));
    if (favorite) {
      localStorage.setItem(
        "favorite",
        JSON.stringify(favorite.concat(payload))
      );
    }

    if (!favorite) {
      localStorage.setItem("favorite", JSON.stringify([payload]));
    }

    dispatch(addFavorite(payload));
  };
};

const removeFavoriteThunk = (payload) => {
  return (dispatch) => {
    const favorite = JSON.parse(localStorage.getItem("favorite"));
    const newFavorite = favorite.filter((item) => item.id !== payload.id);
    localStorage.setItem("favorite", JSON.stringify(newFavorite));
    dispatch(removeFavorite(payload));
  };
};

const getFavoriteThunk = () => {
  return (dispatch) => {
    const favorite = JSON.parse(localStorage.getItem("favorite"));
    dispatch(getFavorite(favorite));
  };
};

export {
  ActionTypes,
  addFavorite,
  removeFavorite,
  clearFavorite,
  saveFavoriteThunk,
  getFavorite,
  removeFavoriteThunk,
  getFavoriteThunk,
};
