import { useColorModeValue } from "@chakra-ui/color-mode";
import { Icon } from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import PropTypes from "prop-types";

const NavItem = ({ icon, children, onClick }) => {
  const color = useColorModeValue("gray.600", "gray.300");

  return (
    <Flex
      onClick={onClick}
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue("inherit", "gray.400")}
      _hover={{
        bg: useColorModeValue("gray.100", "gray.900"),
        color: useColorModeValue("gray.900", "gray.200"),
      }}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{
            color: color,
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

NavItem.propTypes = {
  icon: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

NavItem.defaultProps = {
  icon: null,
  onClick: () => {},
};

export default NavItem;
