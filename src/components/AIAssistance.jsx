
const AIAssistance = () => {
    return (
        <>
            <section className="ai-assistance py-16 md:py-24">
                <div className='container mx-auto px-4 md:px-8 lg:px-16'>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        <div className="pr-0 lg:pr-40">
                            <h4 className="font-mono uppercase tracking-wider text-extralight text-xs pt-3 pb-2">AI Assistant</h4>
                            <h2 className="text-4xl font-bold pb-4">Hyper-personalized guidance with AI</h2>
                            <p className='text-lg text-light pb-6'>Our model analyzes your skill gaps and connects you with the exact content and person you need for your next promotion.</p>
                            <ul className="pb-8">
                                <li className="text-md text-light pb-3">Automated learning roadmaps</li>
                                <li className="text-md text-light pb-3">Mentor compatibility matching</li>
                                <li className="text-md text-light pb-3">Google Calendar session sync</li>
                                <li className="text-md text-light">Smart course recommendations</li>
                            </ul>
                        </div>
                        <div>
                            <img src="../ai.webp" alt="Ai Assitance" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default AIAssistance