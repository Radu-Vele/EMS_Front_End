import { JwtPayload } from "../../types/Authentication"

export class AuthenticationUtils {
    static setLoggedInUserData(username: string, role: string): void {
        sessionStorage.setItem("authUser", username)
        sessionStorage.setItem("role", role)
    }

    static logOut(): void {
        localStorage.clear()
        sessionStorage.clear()
        window.location.reload()
    }

    static setToken(token: string) {
        localStorage.setItem("token", token) // this is not cleared until the user logs out
    }

    static extractJwtPayload(jwtToken: string): JwtPayload {
        const payload = jwtToken.split('.')[1]
        return JSON.parse(atob(payload))
    }
}