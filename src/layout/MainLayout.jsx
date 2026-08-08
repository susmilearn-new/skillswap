import { Outlet } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';


const MainLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
export default MainLayout