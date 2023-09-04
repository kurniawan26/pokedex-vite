const useGetPokeId = (id) => {
  const formattedId = id.toString().padStart(3, "0");

  return `#${formattedId}`;
};

export default useGetPokeId;
