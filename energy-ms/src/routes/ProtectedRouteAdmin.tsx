import { Navigate } from "react-router-dom"
import { AuthenticationUtils } from "../utils/auth/AuthenticationUtils"

export const ProtectedRouteAdmin = ({
    redirectPath = "/login",
    children
}) => {
    if (!AuthenticationUtils.isAdminLoggedIn()) {
        return <Navigate to={redirectPath} replace />
    }
    return children
}