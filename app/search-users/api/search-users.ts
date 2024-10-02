import { pageRoutes, apiRoutes } from "./routes";

export interface User {
  username: string;
  avatarUrl: string;
}

export interface SearchUsersData {
  totalItems: number;
  items: User[];
  page: number;
  perPage: number;
}

export const getSearchUser = async (
  page: string,
  search: string,
): Promise<SearchUsersData> => {
  let prepredUrl = `${pageRoutes.main}/${apiRoutes.getSearchUser}?${new URLSearchParams(
    {
      page: page,
      per_page: "10",
    },
  )}`;
  if (search) {
    prepredUrl += `&q=${search}`;
  }

  if (search)
    return fetch(prepredUrl)
      .then((res) => {
        if (res.status <= 299) return res.json();
        else throw new Error(`API exception with status code: ${res.status}`);
      })
      .then((data) => ({
        totalItems: data.total_count,
        items: data.items.map(
          (item: { login: string; avatar_url: string }) => ({
            username: item.login,
            avatarUrl: item.avatar_url,
          }),
        ),
        page: parseInt(page),
        perPage: 10,
      }));
  else
    return new Promise<SearchUsersData>((res) =>
      res({ totalItems: -1, items: [], page: -1, perPage: -1 }),
    );
};
