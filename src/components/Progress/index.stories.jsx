import ProgressLabel from "./ProgressLabel";

export default {
  title: "Components/Progress",
  component: ProgressLabel,
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
    stat: {
      stat: {
        name: "hp",
      },
      base_stat: 45,
    },
  },
};
