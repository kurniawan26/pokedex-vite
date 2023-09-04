export default {
  title: "Components/Loader",
  argTypes: {
    color: { control: "color" },
  },
};

const Template = (args) => <Loader {...args} />;
export const Default = Template.bind({});
