import { useAuth } from "@/hooks";
import { Navigate, Outlet } from "react-router-dom";



const CreatorMiddleware = () => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/auth/login" />
    }
    if (user.role !== "creator") {
        return <Navigate to="/" />
    }
    return <Outlet />
}

export default CreatorMiddleware