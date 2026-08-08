import { skills } from "../../data/skills";

const SkillsSection = () => {
  return (
    <section className="bg-[#f5f2f6] px-6 py-20 md:py-24" id="community">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#ff6b14]">
            What you can exchange
          </p>

          <h2 className="mx-auto max-w-2xl font-fraunces text-4xl font-bold leading-tight text-[#17064f] md:text-5xl">
            Every kind of knowledge,
            <br />
            in one place.
          </h2>
        </div>

        {/* Skills */}
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-5">
          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <div
                key={skill.id}
                className="flex min-h-[145px] flex-col items-center justify-center rounded-2xl border border-[#e3dfe7] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Icon */}
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${skill.bg}`}
                >
                  <Icon className="h-7 w-7 text-white" strokeWidth={2} />
                </div>

                {/* Skill name */}
                <h3 className="font-semibold text-[#17064f]">
                  {skill.name}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection