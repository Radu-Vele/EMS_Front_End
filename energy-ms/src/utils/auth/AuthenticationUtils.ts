import { JwtPayload } from "../../types/Authentication"

export class AuthenticationUtils {
    static setLoggedInUserData(username: string, role: string, id: string): void {
        sessionStorage.setItem("authUser", username)
        sessionStorage.setItem("role", role)
        sessionStorage.setItem("userId", id)
    }

    static logOut(): void {
        localStorage.clear()
        sessionStorage.clear()
    }

    static setToken(token: string) {
        localStorage.setItem("token", token) // this is not cleared until the user logs out
    }

    static extractJwtPayload(jwtToken: string): JwtPayload {
        const payload = jwtToken.split('.')[1]
        return JSON.parse(atob(payload))
    }

    static isUserLoggedIn(): boolean {
        let role = sessionStorage.getItem("role")
        return role === "user" || role === "USER"
    }

    static isAdminLoggedIn(): boolean {
        let role = sessionStorage.getItem("role")
        return role === "admin" || role === "ADMIN"
    }
}