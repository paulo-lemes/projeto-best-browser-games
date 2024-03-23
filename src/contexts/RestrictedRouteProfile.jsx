import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RestrictedRouteProfile = ({children}) => {
    const {user} = useAuth()

    if(!user){
        return <Navigate to="/login" replace />
    }

    return children
}

export default RestrictedRouteProfile