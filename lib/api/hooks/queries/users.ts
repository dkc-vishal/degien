import { useQuery } from "@tanstack/react-query";
import { userEndPoints } from "../../endpoints/index";
import { queryKeys } from "../../utils/query-keys";
import type { UserFilter } from "../../types/index";

export const useUsers = (filters?: UserFilter) => {
  return useQuery({
    queryKey: queryKeys.users.list(JSON.stringify(filters || {})),
    queryFn: () => userEndPoints.getUsers(filters),
    staleTime: 2 * 60 * 1000,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => userEndPoints.getUserById(id),
    enabled: !!id,
  });
};
