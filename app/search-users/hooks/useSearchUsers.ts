import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { User } from "../api/search-users";
import { useDebounce } from "./useDebounce";
import { useQuerySearchUsers } from "./useQuerySearchUsers";
import useInfiniteScroll from "react-infinite-scroll-hook";

export const useSearchUsers = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debounceSearch = useDebounce(searchValue, 2000);

  const [currentPage, setCurrentPage] = useState<string>("1");
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const { data, isLoading, refetch, error } = useQuerySearchUsers(
    currentPage,
    debounceSearch,
  );
  const [users, setUsers] = useState<User[]>([]);

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: async () => {
      let nextPage = parseInt(currentPage);
      ++nextPage;
      setCurrentPage(nextPage.toString());
      await refetch();
    },
    disabled: !!error,
    rootMargin: "10px",
  });

  useEffect(() => {
    console.log(error);
    if (error) setIsErrorOpen(true);
  }, [error]);

  useEffect(() => {
    if (data?.items.length) {
      const updatedUsers = Array.from(new Set([...users, ...data?.items]));
      setUsers(updatedUsers);
    }

    setHasNextPage(data?.totalItems / data?.perPage > data?.page);
  }, [data, users]);

  const onChangeSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.currentTarget.value);
      if (searchValue) refetch();
    },
    [searchValue, refetch],
  );

  return {
    onChangeSearch,
    sentryRef,
    users,
    isErrorOpen,
    data,
    isLoading,
    refetch,
    error,
    hasNextPage,
  };
};
