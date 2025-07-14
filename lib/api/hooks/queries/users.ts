import { useQuery } from "@tanstack/react-query";
import { userEndPoints } from "../../endpoints/index";
import { queryKeys } from "../../utils/query-keys";
import type { UserFilter } from "../../types/index";

export const useUsers = (
  endpoint?: string,
  filters?: UserFilter,
  activeTab?: string
) => {
  return useQuery({
    // queryKey: queryKeys.users.list(JSON.stringify(filters || {})),
    queryKey: ["users", activeTab],
    queryFn: () => userEndPoints.getUsers(endpoint, filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => userEndPoints.getUserById(id),
    enabled: !!id,
  });
};

export const useDepartments = () => {
  return useQuery({
    queryKey: queryKeys.department.lists(),
    queryFn: () => userEndPoints.getDepartments(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
