import { Progress } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function ProgressLabel({ stat }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm capitalize">
        {stat?.stat.name} ({stat?.base_stat})
      </span>
      <Progress
        size="lg"
        value={stat?.base_stat}
        colorScheme="green"
        rounded={10}
      />
    </div>
  );
}

ProgressLabel.propTypes = {
  stat: PropTypes.object,
};

ProgressLabel.defaultProps = {
  stat: {
    stat: {
      name: "hp",
    },
    base_stat: 45,
  },
};
