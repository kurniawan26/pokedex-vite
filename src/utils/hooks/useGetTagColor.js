const useGetTagColor = (tag) => {
  switch (tag) {
    case "grass":
      return "green";
    case "fire":
      return "red";
    case "water":
      return "blue";
    case "bug":
      return "green";
    case "normal":
      return "gray";
    case "poison":
      return "purple";
    case "electric":
      return "yellow";
    default:
      return "gray";
  }
};

export default useGetTagColor;
