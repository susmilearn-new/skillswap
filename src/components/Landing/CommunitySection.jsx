import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCommunityUsers } from "../../api/userApi";
import CommunityCard from "./CommunityCard";

const CommunitySection = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunityUsers = async () => {
      try {
        const response = await getCommunityUsers();
        setMembers(response.data.users || []);
      } catch (error) {
        console.error("Failed to load community members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityUsers();
  }, []);

  return (
    <section
      className="bg-[#f8f7f3] px-6 py-16 md:py-20"
      id="community"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#6b5aa6]">
            People exchanging skills right now
          </p>
        </div>

        {loading ? (
          <p className="text-center text-[#6b5aa6]">
            Loading community members...
          </p>
        ) : members.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {members.map((person, index) => (
              <CommunityCard
                key={person._id}
                person={person}
                index={index}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-[#6b5aa6]">
            Be the first to join our community!
          </p>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 font-semibold text-[#32106f] transition hover:gap-3"
          >
            Join the community
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;