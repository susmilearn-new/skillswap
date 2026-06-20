import { Link } from "react-router-dom"
import CourseListing from "./CourseListing"

const FeaturedCourse = () => {
    return (
        <>
            <section className="featured-course py-16 md:py-24">
                <div className='container mx-auto px-4 md:px-8 lg:px-16'>
                    <div className='grid grid-cols-1 md:grid-cols-2 items-end'>
                        <div>
                            <h2 className="text-4xl font-bold pb-2">Featured Courses</h2>
                            <p className='text-sm text-light'>Top-rated learning paths updated weekly.</p>
                        </div>
                        <div className=" md:text-right pt-2">
                            <Link to='/courses' className="text-light font-bold text-sm">View all courses →</Link>
                        </div>
                    </div>
                    <div className="course-listing pt-10">
                        <CourseListing/>
                    </div>

                </div>
            </section>
        </>
    )
}
export default FeaturedCourse