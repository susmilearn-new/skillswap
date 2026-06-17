import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <>
            <footer className='section-bg py-8 md:py-16'>
                <div className='container mx-auto px-4 md:px-8 lg:px-16 '>
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 border-b-1 border-gray-200 pb-8 pb-md-12'>
                        <div className='pb-6 pb-md-0'>
                            <Link to='/' className='flex'><img src='../logo.svg' alt='skillwap' width='200px' className='mr-1 pb-4' /></Link>
                            <p className='text-gray-500 text-sm text-sm/6'>The global standard for AI-guided mentorship and technical education. Empowering learners and mentors worldwide.</p>
                        </div>
                        <div></div>
                        <div></div>
                        <div>
                            <h3 className='font-bold pb-4'>Account</h3>
                            <div className='grid gap-2'>
                                <Link to='/login' className='text-gray-500 text-sm'>Login</Link>
                                <Link to='/singup' className='text-gray-500 text-sm'>Create Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container mx-auto px-4 md:px-8 lg:px-16 pt-6'>
                    <p className='font-mono text-xs uppercase text-gray-500'>© 2026 SkillSwap Marketplace Inc.</p>
                </div>
            </footer>
        </>
    )
}
export default Footer