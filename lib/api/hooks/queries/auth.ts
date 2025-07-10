import { useQuery } from "@tanstack/react-query";
import { authEndpoints } from "../../endpoints/index";
import { queryKeys } from "../../utils/query-keys";

export const useProfile = () => {
  return useQuery({
    queryKey: queryKeys.auth.profile(),
    queryFn: authEndpoints.getProfile,
    enabled: !!localStorage.getItem("auth_token"),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useAuth = () => {
  const profileQuery = useProfile();

  return {
    user: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isAuthenticated: !!profileQuery.data,
    refresh: profileQuery.refetch,
  };
};
