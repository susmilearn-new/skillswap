import { Bars3Icon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>

      <header className='relative'>
        <div className='container mx-auto px-4 md:px-8 lg:px-16'>
          <nav className='ms-auto items-center justify-between flex'>
            {/* logo */}
            <div>
              <Link to='/' className='flex'><img src='../logo.svg' alt='skillwap' width='200px' className='mr-1' /></Link>
            </div>

            {/* Desktop menu */}
            <div className='hidden lg:flex gap-4 items-center'>
              <Link to='/login' className='text-sm'>Login</Link>
              <Link to='/register' className='blue-bg text-white px-4 py-2 rounded-full shadow-md text-sm'>Join Free</Link>
            </div>

            {/* Mobile button */}
            <div className='lg:hidden'>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Bars3Icon className='h-4 w-4' />
              </button>
            </div>

             {/* Mobile menu */}
            {mobileMenuOpen && (
              <div className='lg:hidden absolute grid content-start gap-2 top-17 w-full left-0 h-screen bg-white p-8' >
                <Link to='/login'>Login</Link>
                <Link to='/singup' className='blue-bg text-white px-4 py-1 rounded-full shadow-md h-fit w-fit'>Join Free</Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}
export default Header