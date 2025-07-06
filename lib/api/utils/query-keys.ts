export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    profile: () => [...queryKeys.auth.all, "profile"] as const,
  },
  user:{
    all:['users'] as const
    lists:()=> [...queryKeys.user.all, 'list'] as const,
    list:(filter:string)=> [...queryKeys.user.lists(),{filters}] as const,
    details:(id:string)=>[...queryKeys.user.details(),id] as const,
  },
  department:{
    all: ['departments'] as const,
    lists: () => [...queryKeys.department.all, "list"] as const,
  },
} as const;
