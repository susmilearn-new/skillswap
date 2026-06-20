import { Route, Routes } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/Auth/LoginPage"
import RegisterPage from "./pages/Auth/RegisterPage"
import Dashboard from "./pages/dashboard"

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<LandingPage />} />
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </>
    )
}
export default AppRoutes