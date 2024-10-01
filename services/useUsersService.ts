import { useQuery } from "@tanstack/react-query";
import { pageRoutes, apiRoutes } from "./apiRoutes";

export interface User {
  username: string;
  avatarUrl: string;
}

export const getSearchUser = async (searchValue: string): Promise<User[]> => {
  const prepredUrl = `${pageRoutes.main}/${apiRoutes.getSearchUser}?${new URLSearchParams(
    {
      q: searchValue,
    },
  )}`;
  return fetch(prepredUrl, { method: "GET" })
    .then((res) => {
      if (res.status <= 299) return res.json();
      else throw new Error(`API exception with status code: ${res.status}`);
    })
    .then((data) => data.items)
    .then((items) =>
      items.map((item: { login: string; avatar_url: string }) => ({
        username: item.login,
        avatarUrl: item.avatar_url,
      })),
    )
    .catch((err) => {
      if (err) throw err;
    });
};

export const useUsersServices = (searchValue: string) => {
  return useQuery({
    queryKey: ["searchUser"],
    queryFn: () => getSearchUser(searchValue),
    enabled: false,
    retryDelay: 2000,
    throwOnError: false,
  });
};
