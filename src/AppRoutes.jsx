import { Route, Routes } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import LandingPage from "./pages/LandingPage"

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<LandingPage />} />
                </Route>
            </Routes>
        </>
    )
}
export default AppRoutes