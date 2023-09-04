import { useEffect } from "react";

export default function useOnScrollFetch(
  cardContainerRef,
  data,
  isFetching,
  fetchNextPage,
  hasNextPage
) {
  useEffect(() => {
    const onScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isFetching
      ) {
        return;
      }

      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [cardContainerRef, data, isFetching, fetchNextPage, hasNextPage]);
}
