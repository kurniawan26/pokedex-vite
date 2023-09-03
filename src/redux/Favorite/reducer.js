import { ActionTypes } from "./action";

function favoriteReducer(state = null, action) {
  console.log(state, action);
  switch (action.type) {
    case ActionTypes.ADD_FAVORITE:
      return state.concat(action.payload);
    case ActionTypes.REMOVE_FAVORITE:
      return state.filter((item) => item.id !== action.payload.id);
    case ActionTypes.CLEAR_FAVORITE:
      return action.payload;
    case ActionTypes.GET_FAVORITE:
      return action.payload;
    default:
      return state;
  }
}

export default favoriteReducer;
