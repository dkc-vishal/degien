export const BASE_URL = "http://shivam-mac.local:8000/api/v1.0/auth";

export const API_ENDPOINTS = {
    login: {
        url: `${BASE_URL}/login/`, 
        method: 'POST'
    },
    departments: {
        url: `${BASE_URL}/departments/`, 
        method: 'GET'
    },
    createUser: {
        url: `${BASE_URL}/create-user/`, 
        method: 'POST'
    },
    resetPasswordAdmin: {
        url: `${BASE_URL}/reset-password/admin/`, 
        method: 'POST'
    },
    resetPasswordSelfChange: {
        url: `${BASE_URL}/reset-password/self/change`, 
        method: 'POST'
    },
    userProfile: {
        url: `${BASE_URL}/user-detail/`, 
        method: 'GET'
    },
}