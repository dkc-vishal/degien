// export const BASE_URL = "http://gulab.local:8000/api/v1.0/auth";

export const BASE_URL = "http://gulab.local:8000/api/";

export const API_ENDPOINTS = {
  login: {
    url: `${BASE_URL}v1.0/auth/login/`,
    method: "POST",
  },
  departments: {
    url: `${BASE_URL}v1.0/auth/departments/`,
    method: "GET",
  },
  createUser: {
    url: `${BASE_URL}v1.0/auth/create-user/`,
    method: "POST",
  },
  resetPasswordAdmin: {
    url: `${BASE_URL}v1.0/auth/reset-password/admin/`,
    method: "POST",
  },
  resetPasswordSelfRequest: {
    url: `${BASE_URL}v1.0/auth/reset-password/self/request/`,
    method: "POST",
  },
  resetPasswordSelfChange: {
    url: `${BASE_URL}v1.0/auth/reset-password/self/change`,
    method: "POST",
  },
  userProfile: {
    url: `${BASE_URL}v1.0/auth/user-detail/`,
    method: "GET",
  },
  updateUsername: {
    url: `${BASE_URL}v1.0/auth/user-detail/`,
    method: "POST",
  },
  updateUserDetailsAdmin: (id: string) => ({
    url: `${BASE_URL}v1.0/auth/update-details/admin/${id}/`,
    method: "POST",
  }),
  changePasswordSelf: {
    url: `${BASE_URL}v1.0/auth/change-password/`,
    method: "POST",
  },
  changeSystemPassword: {
    url: `${BASE_URL}v1.0/auth/change-system-password/`,
    method: "POST",
  },
  imageUpload: {
    url: `${BASE_URL}v1.0/image/image/`, 
    method: "POST"
  }
};
