import { BrowserRouter } from "react-router-dom";
import Sidebar from "./index";

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ width: "800px" }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {},
};
