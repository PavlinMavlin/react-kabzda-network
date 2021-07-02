import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "b5f63428-88b9-4342-8c9b-16d46fb30269"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
})


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)

    },

    unfollow(id: number) {
        return instance.delete(`follow/${id}`
        )
    },
    follow(id: number) {
        return instance.post(`follow/${id}`
        )
    },
    getProfile(userId: string) {
        return profileAPI.getProfile(userId)
    }

}
export const profileAPI = {

    getProfile(userId: string) {
        return instance.get(`profile/` + userId)
        console.log()
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status})
    }

}


export const authApi = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post(`/auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`/auth/login`,)
    },
}

