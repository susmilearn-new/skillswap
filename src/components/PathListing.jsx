import { path } from "../data/path";

const PathListing = () => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10'>
                {path.map((paths, index) => {
                    return (
                        <div className="path-set" key={index}>
                            <span className="dark-bg text-white rounded-full py-3 px-4 font-semibold">{paths.number}</span>
                            <h4 className="font-bold text-lg text-dark pt-6 pb-2">{paths.title}</h4>
                            <p className="text-sm text-sm/6 text-light">{paths.description}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default PathListing 