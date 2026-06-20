import { Link } from "react-router-dom"
import { skill } from "../data/skills"

const HomeBanner = () => {
    return (
        <>
            <section className="home-banner section-bg py-16 md:py-24">
                <div className='container mx-auto px-4 md:px-8 lg:px-16 text-center wrapper'>
                    <h4 className='font-semibold text-blue bg-purple-100 w-fit py-2 px-4 uppercase text-center text-xs rounded-full'>AI-Powered Learning Marketplace</h4>
                    <h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold pt-3'>Learn, Teach, and <br></br><span className='text-gradient'>Grow Together.</span></h1>
                    <h6 className=' text-lg py-8 text-light'>Connect with world-class mentors and industry experts. Access curated learning paths designed by AI to accelerate your career growth.</h6>

                    <div className='flex gap-4 justify-center'>
                        <Link to='/registration' className='blue-bg text-white px-6 py-4 rounded-2xl shadow-md text-lg font-semibold hover:-translate-y-0.5 transition-all'>I'm a Learner</Link>
                        <Link to='/registration' className='px-6 py-4 rounded-2xl shadow-md text-lg font-semibold border border-gray-100 border-solid hover:-translate-y-0.5 transition-all'>I'm a Mentor</Link>
                    </div>

                    <div className='skill-set pt-16'>
                        <h4 className='font-mono text-xs uppercase text-extralight'>Popular Skills</h4>
                        <ul className='flex flex-wrap align-center justify-center pt-4 gap-4'>
                            {skill.map((skills, index) => {
                                return (
                                    <li key={index} className='border border-gray-300 border-solid py-1 px-4 rounded-full text-sm text-light'>{skills.Skillname}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
export default HomeBanner