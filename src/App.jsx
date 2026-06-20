import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './AppRoutes'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position='top-right'
          autoClose={2000}
          newestOnTop
          closeOnClick
        />
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
