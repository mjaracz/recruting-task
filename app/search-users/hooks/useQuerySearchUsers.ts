import { useQuery } from "@tanstack/react-query";

import { getSearchUser } from "../api/search-users";

export const useQuerySearchUsers = (page: string, search: string) => {
  return useQuery({
    queryKey: ["searchUser", { page, search }],
    queryFn: () => getSearchUser(page, search),
    throwOnError: false,
  });
};
