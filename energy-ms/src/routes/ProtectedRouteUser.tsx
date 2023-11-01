import { Navigate } from "react-router-dom"
import { AuthenticationUtils } from "../utils/auth/AuthenticationUtils"

export const ProtectedRouteUser = ({
    redirectPath = "/login",
    children
}) => {
    if (!AuthenticationUtils.isUserLoggedIn() && !AuthenticationUtils.isAdminLoggedIn()) {
        return <Navigate to={redirectPath} replace />
    }
    return children
}