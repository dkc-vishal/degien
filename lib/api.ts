// export const BASE_URL = "http://shivam-mac.local:8000/api/v1.0/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_ENDPOINTS = {
  login: {
    url: `${BASE_URL}/auth/login/`,
    method: "POST",
  },
  departments: {
    url: `${BASE_URL}/auth/departments/`,
    method: "GET",
  },
  createUser: {
    url: `${BASE_URL}/auth/create-user/`,
    method: "POST",
  },
  resetPasswordAdmin: {
    url: `${BASE_URL}/auth/reset-password/admin/`,
    method: "POST",
  },
  resetPasswordSelfRequest: {
    url: `${BASE_URL}/auth/reset-password/self/request/`,
    method: "POST",
  },
  resetPasswordSelfChange: {
    url: `${BASE_URL}/auth/reset-password/self/change`,
    method: "POST",
  },
  userProfile: {
    url: `${BASE_URL}/auth/user-detail/`,
    method: "GET",
  },
  updateUsername: {
    url: `${BASE_URL}/auth/user-detail/`,
    method: "POST",
  },
  updateUserDetailsAdmin: (id: string) => ({
    url: `${BASE_URL}/auth/update-details/admin/${id}/`,
    method: "POST",
  }),
  changePasswordSelf: {
    url: `${BASE_URL}/auth/change-password/`,
    method: "POST",
  },
  changeSystemPassword: {
    url: `${BASE_URL}/auth/change-system-password/`,
    method: "POST",
  },
  cellHistory: (cellid: string) => ({
    url: `${BASE_URL}/spreadsheet/cell-history/${cellid}`,
    method: "GET",
  }),
  imageUpload: {
    url: `http://gulab.local:8000/api/v1.0/image/image/`,
    method: "POST"
  },
  activeUsers: {
    url: `${BASE_URL}/auth/list-users/active`,
    method: "GET",
  },
  inActiveUsers: {
    url: `${BASE_URL}/auth/list-users/inactive`,
    method: "GET",
  },
};
