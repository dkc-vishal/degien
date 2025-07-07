import { queryClient } from "../client/query-client";
import { queryKeys } from "./query-keys";

export const cacheUtils = {
  invalidateUserList: () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.users.lists(),
    });
  },
  invalidateUserDetail: (userId: string) => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.users.detail(userId),
    });
  },
  updateUserInCache: (userId: string, userData: any) => {
    queryClient.setQueryData(queryKeys.users.detail(userId), userData);
  },

  clearAuthCache: () => {
    queryClient.removeQueries({ queryKey: queryKeys.auth.all });
  },
};
