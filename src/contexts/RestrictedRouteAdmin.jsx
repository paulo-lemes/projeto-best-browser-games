import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RestrictedRouteAdmin = ({children}) => {
    const {user} = useAuth()

    if(!user || user.roles !== "admin"){
        return <Navigate to="/" replace />
    }

    return children
}

export default RestrictedRouteAdmin