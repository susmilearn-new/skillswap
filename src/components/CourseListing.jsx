import { Link } from "react-router-dom";
import { courses } from "../data/courses";

const CourseListing = () => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {courses.map((course, index) => {
                    return (
                        <div className="course-card p-4 border rounded-2xl border-solid border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all" key={index}>
                            <img src={course.image} alt={course.name} className="rounded-2xl" />
                            <h4 className="font-mono uppercase tracking-wider text-extralight text-xs pt-3 pb-2">{course.category}</h4>
                            <h3><Link to="#" className="font-bold text-lg text-dark">{course.name}</Link></h3>
                            <div className="course-bottom flex items-end justify-between pt-3 mt-4 border-t border-gray-200 border-solid">
                                <p className="rating flex gap-2 font-semibold text-sm items-end"> <img src="../star.svg" alt="star" />{course.rating}</p>
                                <p className="price text-dark font-bold">{course.price}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default CourseListing 