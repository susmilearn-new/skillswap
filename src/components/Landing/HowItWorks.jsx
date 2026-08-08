const steps = [
  {
    id: "01",
    title: "List your skills",
    description:
      "Tell us what you can teach and what you want to learn. Takes two minutes.",
  },
  {
    id: "02",
    title: "Find your match",
    description:
      "Our algorithm surfaces people with complementary skills — mutual benefit, zero cost.",
  },
  {
    id: "03",
    title: "Start exchanging",
    description:
      "Schedule sessions, exchange knowledge, and grow together as a community.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#f8f7f3] px-6 py-20 md:py-24" id="how">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-20 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#ff6b14]">
            Simple by design
          </p>

          <h2 className="font-fraunces text-4xl font-bold text-[#17064f] md:text-5xl">
            How SkillSwap works
          </h2>
        </div>

        {/* Steps */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-0">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative px-0 md:px-8"
            >
              {/* Number */}
              <div className="relative z-10 mb-6 flex h-[100px] w-[100px] items-center justify-center rounded-2xl border-2 border-[#c9bdf0] bg-[#eee9ff]">
                <span className="font-fraunces text-3xl font-bold text-[#32106f]">
                  {step.id}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-fraunces mb-3 text-2xl font-bold  font-fraunces text-[#17064f]">
                {step.title}
              </h3>

              <p className="max-w-sm text-base leading-7 text-[#6b5aa6]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks