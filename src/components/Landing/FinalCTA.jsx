import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="bg-[#f8f7f3] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-4xl text-center">

        {/* Heading */}
        <h2 className="font-fraunces text-5xl font-bold leading-[1.05] text-[#17064f] md:text-6xl">
          Ready to start
          <br />
          <span className="text-[#ff6b14]">
            your first swap?
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-[#6b5aa6] md:text-lg">
          Join thousands of learners who are growing without spending a cent.
          Create your profile in 2 minutes.
        </p>

        {/* CTA */}
        <Link
          to="/register"
          className="mt-10 inline-flex items-center gap-4 rounded-2xl bg-[#32106f] px-10 py-5 text-base font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-1 hover:bg-[#24105c]"
        >
          Create free account
          <span className="text-xl">→</span>
        </Link>

        {/* Small text */}
        <p className="mt-5 text-sm text-[#6b5aa6]">
          No credit card · No hidden fees · Just skills
        </p>

      </div>
    </section>
  );
};

export default FinalCTA