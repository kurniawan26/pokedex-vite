import { useEffect } from "react";

export default function useOnScrollFetch(
  cardContainerRef,
  data,
  isLoading,
  setPage
) {
  useEffect(() => {
    const onScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isLoading
      ) {
        return;
      }

      setPage((prev) => prev + 1);
    };

    window.addEventListener("scroll", onScroll);
  }, [cardContainerRef, data, isLoading, setPage]);
}
