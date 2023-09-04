import Pokecard from ".";
import "../../index.css";

export default {
  title: "Components/Pokecard",
  component: Pokecard,
  decorators: [
    (Story) => (
      <div style={{ width: "800px" }}>
        <Story />
      </div>
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
      types: ["grass", "poison"],
      height: 7,
      weight: 69,
    },
  },
};
