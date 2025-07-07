export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    profile: () => [...queryKeys.auth.all, "profile"] as const,
  },
  users: {
    all: ["users"] as const,
    lists: () => [...queryKeys.users.all, "list"] as const,
    list: (filters: string) =>
      [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, "details"] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  department: {
    all: ["departments"] as const,
    lists: () => [...queryKeys.department.all, "list"] as const,
  },
} as const;
