import PathListing from "./PathListing"

const PathMastery = () => {
    return (
        <>
            <section className="path-mastery  section-bg py-16 md:py-24 text-center">
                <div className='container mx-auto px-4 md:px-8 lg:px-16'>
                    <h2 className="text-4xl font-bold pb-2">Your path to mastery</h2>
                    <p className='text-sm text-sm/6 text-light'>Five simple steps to level up your career.</p>
                        <div className="path-listing pt-10">
                            <PathListing/>
                        </div>
                    </div>
            </section>
        </>
    )
}
export default PathMastery