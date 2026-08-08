import { Link } from "react-router-dom";
import { homeCount } from "../../data/homeCount";

const HeroSection = () => {
  return (
    <section className="bg-[#32106f] px-6 py-20 text-white md:py-28">
      <div className="mx-auto max-w-5xl text-center">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
          <span>⚡</span>
          <span>4,800+ skills being exchanged right now</span>
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-4xl text-5xl font-fraunces font-bold leading-tight tracking-tight md:text-7xl">
          Trade skills.
          <br />
          Grow together.
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
          The community where what you know is your currency.
          Teach Python, learn Guitar. Teach French, learn Yoga.
          Zero cash. Pure exchange.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="rounded-full bg-[#f4a261] px-7 py-3.5 text-base font-semibold text-[#24105c] transition hover:-translate-y-0.5 hover:bg-[#f6b477]"
          >
            Start swapping free →
          </Link>

          <Link
            to="/login"
            className="rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            Explore the community
          </Link>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-white/15 pt-10 sm:grid-cols-3">
          {homeCount.map((count) => (
            <div key={count.title}>
              <h4 className="text-3xl font-bold md:text-4xl">
                {count.value}
              </h4>

              <p className="mt-1 text-sm text-white/60">
                {count.title}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection