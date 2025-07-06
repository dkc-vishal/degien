import { useQuery } from "@tanstack/react-query";
import { authEndpoints } from "../../endpoints/auth";
import { queryKeys } from "../../utils/query-keys";

export const userProfile = () => {
  return useQuery({
    querykey: queryKeys.auth.profile(),
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
