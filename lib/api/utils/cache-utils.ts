import { queryClient } from "../client/query-client";
import { User } from "../types";
import { queryKeys } from "./query-keys";

export const cacheUtils = {
  //auth cache management
  auth: {
    setUser: (user: User) => {
      queryClient.setQueryData(queryKeys.auth.profile(), user);
    },

    clearUser: () => {
      // queryClient.removeQueries({ queryKey: queryKeys.auth.all });
      queryClient.removeQueries({ queryKey: queryKeys.auth.profile() });
    },

    invalidateProfile: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile() });
    },
  },

  users: {
    invalidateList: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },

    addUserToList: (newUser: User) => {
      queryClient.setQueriesData(
        { queryKey: queryKeys.users.lists() },
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: [newUser, ...oldData.data],
            total: oldData.total + 1,
          };
        }
      );
    },

    updateUserInList: (userId: string, userData: User) => {
      queryClient.setQueriesData(
        { queryKey: queryKeys.users.lists() },
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.map((user: User) =>
              user.user_id === userId ? { ...user, ...userData } : user
            ),
          };
        }
      );

      queryClient.setQueryData(
        queryKeys.users.detail(userId),
        (oldData: User | undefined) =>
          oldData ? { ...oldData, ...userData } : undefined
      );
    },

    removeUserFromList: (userId: string) => {
      queryClient.setQueriesData(
        { queryKey: queryKeys.users.lists() },
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.filter((user: User) => user.user_id !== userId),
            total: oldData.total - 1,
          };
        }
      );

      queryClient.removeQueries({ queryKey: queryKeys.users.detail(userId) });
    },
  },

  //global cache management
  global: {
    clearAll: () => {
      queryClient.clear();
    },

    invalidateAll: () => {
      queryClient.invalidateQueries();
    },

    refetchAll: () => {
      queryClient.refetchQueries();
    },
  },
};
