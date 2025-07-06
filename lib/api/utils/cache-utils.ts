import { queryClient } from "../client/query-client";
import { QueryKey } from "@tanstack/react-query";

export const cacheUtils = {
  invalidateUserList: () => {
    queryClient.invalidateQueries({
      QueryKey: QueryKey.users.list(),
    });
  },

  updateUserInCache: (userId: string, userData: any) => {
    queryClient.setQueryData(QueryKey.user.detail(userId), userData);
  },

  clearAuthCache: () => {
    queryClient.removeQueries({ queryKey: QueryKey.auth.all });
  },
};
