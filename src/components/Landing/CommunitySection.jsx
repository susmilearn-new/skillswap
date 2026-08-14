import { Link } from "react-router-dom";
import { users } from "../../data/users";
import CommunityCard from "./CommunityCard";

const CommunitySection = () => {
  const members = users.slice(0, 3);

  return (
    <section
      className="bg-[#f8f7f3] px-6 py-16 md:py-20"
      id="community"
    >
      <div className="mx-auto max-w-6xl">

        {/* Section heading */}
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#6b5aa6]">
            People exchanging skills right now
          </p>
        </div>

        {/* Member cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {members.map((person, index) => (
            <CommunityCard
              key={person.id}
              person={person}
              index={index}
            />
          ))}
        </div>

        {/* View all */}
        <div className="mt-12 text-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 font-semibold text-[#32106f] transition hover:gap-3"
          >
            See all 4,800+ members
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CommunitySection;