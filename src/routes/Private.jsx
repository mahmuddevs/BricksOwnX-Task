import Spinner from "../components/Spinner"
import useAuth from "../hooks/useAuth"
import { Navigate, useLocation } from "react-router-dom"

const Private = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <Spinner />
    }
    if (user) {
        return children
    }

    return <Navigate state={location.pathname} to='/auth/login' />
}

export default Private