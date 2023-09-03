import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./Favorite/reducer";

const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
  },
});

export default store;
