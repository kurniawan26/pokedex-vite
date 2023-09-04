import Pokecard from "./index";
import "../../index.css";
import { Provider } from "react-redux";
import store from "../../redux";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Components/Pokecard",
  component: Pokecard,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <div style={{ width: "800px" }}>
            <Story />
          </div>
        </BrowserRouter>
      </Provider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {
    pokemon: {
      name: "bulbasaur",
      id: 1,
      types: [
        {
          type: {
            name: "grass",
          },
        },
        {
          type: {
            name: "poison",
          },
        },
      ],
      height: 7,
      weight: 69,
    },
  },
};
