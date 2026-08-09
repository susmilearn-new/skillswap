import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MapPin, Sparkles, Star, Bookmark, X, CheckCircle2, Flame } from "lucide-react";
import { users } from "../../data/users";
import { useAuthStore } from "../../store/authStore";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const showSavedOnly = searchParams.get("saved") === "true";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  
  const { savedUserIds, toggleSaveUser } = useAuthStore();
  const [selectedUserForSwap, setSelectedUserForSwap] = useState(null);
  const [swapSuccess, setSwapSuccess] = useState(false);

  const categories = ["All", "Development", "Languages", "Design", "Music", "Creative", "Cooking", "Fitness"];

  const handleToggleSavedOnly = () => {
    if (showSavedOnly) {
      searchParams.delete("saved");
    } else {
      searchParams.set("saved", "true");
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setShowPopularOnly(false);
    searchParams.delete("saved");
    setSearchParams(searchParams);
  };

  // Filter users based on search query, category, popular flag, and saved status
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    const matchesName = user.name.toLowerCase().includes(query);
    const matchesPlace = user.place.toLowerCase().includes(query);
    const matchesSkills = [
      ...user.skillsToTeach,
      ...user.skillsToLearn,
    ].some((skill) => skill.toLowerCase().includes(query));

    const matchesSearch = matchesName || matchesPlace || matchesSkills;
    const matchesCategory = selectedCategory === "All" || user.category === selectedCategory;
    const matchesPopular = !showPopularOnly || user.popular;
    const matchesSaved = !showSavedOnly || savedUserIds.includes(user.id);

    return matchesSearch && matchesCategory && matchesPopular && matchesSaved;
  });

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleSendRequest = (e) => {
    e.preventDefault();
    setSwapSuccess(true);
    setTimeout(() => {
      setSwapSuccess(false);
      setSelectedUserForSwap(null);
    }, 2000);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-7 relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[24px] bg-[#32106f] px-8 py-10 md:px-12 md:py-12 shadow-md">
        <div className="absolute -top-24 -right-10 w-64 h-64 rounded-full bg-[#442078] opacity-70 pointer-events-none" />
        <div className="absolute -bottom-28 left-[32%] w-44 h-44 rounded-full bg-[#29105c] pointer-events-none" />
        <div className="absolute right-[28%] top-28 w-20 h-20 rotate-45 bg-[#442078] pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <p className="text-orange-400 uppercase tracking-widest text-sm font-semibold mb-4">
            Community learning exchange
          </p>

          <h1 className="font-fraunces text-white text-5xl md:text-6xl font-bold leading-tight">
            Trade skills,
            <br />
            <span className="text-orange-400">grow together.</span>
          </h1>

          <div className="mt-6 flex items-center bg-[#4b2b82] rounded-xl p-1.5 max-w-[500px] border border-[#5d3b98]">
            <div className="pl-3 text-[#c2b6dc]">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, people, locations..."
              className="flex-1 bg-transparent border-0 outline-none text-white placeholder:text-[#c2b6dc] px-3 py-2 text-sm"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Community Members Section */}
      <div className="py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#26105f]">
                {showSavedOnly ? "Saved Community Members" : "Explore Community Members"}
              </h2>
              {showSavedOnly && (
                <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Bookmark size={12} className="fill-orange-600" /> Saved Only
                </span>
              )}
            </div>
            <span className="text-sm text-[#6b6290] font-medium">
              Showing {filteredUsers.length} available peers
            </span>
          </div>

          {/* Category, Popular & Saved Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-[#26105f] text-white shadow-sm"
                    : "bg-white border border-[#e5e1dc] text-[#6b6290] hover:border-[#26105f]"
                }`}
              >
                {cat}
              </button>
            ))}

            {/* Popular Filter Toggle */}
            <button
              onClick={() => setShowPopularOnly(!showPopularOnly)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition ${
                showPopularOnly
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-white border border-[#e5e1dc] text-[#6b6290] hover:border-orange-500"
              }`}
            >
              <Flame size={14} className={showPopularOnly ? "fill-white" : "text-orange-500"} />
              <span>Popular</span>
            </button>

            {/* Saved Filter Toggle */}
            <button
              onClick={handleToggleSavedOnly}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition ${
                showSavedOnly
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-white border border-[#e5e1dc] text-[#6b6290] hover:border-orange-500"
              }`}
            >
              <Bookmark size={14} className={showSavedOnly ? "fill-white" : "text-orange-500"} />
              <span>Saved ({savedUserIds.length})</span>
            </button>
          </div>
        </div>

        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredUsers.map((user) => {
              const isSaved = savedUserIds.includes(user.id);

              return (
                <div
                  key={user.id}
                  className="bg-white border border-[#e5e1dc] rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative"
                >
                  {/* Top Right Save/Bookmark Icon Button */}
                  <button
                    onClick={() => toggleSaveUser(user.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full border transition z-10 ${
                      isSaved
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "bg-white border-[#e5e1dc] text-[#6b6290] hover:border-[#26105f]"
                    }`}
                    title={isSaved ? "Saved" : "Save profile"}
                  >
                    <Bookmark size={14} className={isSaved ? "fill-white" : ""} />
                  </button>

                  <div>
                    {/* Card Header: Avatar & Rating */}
                    <div className="flex items-center justify-between mb-4 pr-10">
                      <div className="w-12 h-12 rounded-full bg-[#eee9f8] text-[#26105f] font-bold flex items-center justify-center text-base">
                        {getInitials(user.name)}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-[#26105f] bg-[#f8f7f4] px-2.5 py-1 rounded-full">
                        <Star size={12} className="text-amber-500 fill-amber-500" />
                        <span>{user.rating}</span>
                        <span className="text-[#6b6290] font-normal">({user.sessions})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-[#26105f]">{user.name}</h3>
                      {user.popular && (
                        <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Popular
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-[#6b6290] mb-2 mt-0.5">
                      <MapPin size={12} />
                      <span>{user.place}</span>
                    </div>

                    <p className="text-xs text-[#6b6290] line-clamp-2 mb-4">
                      {user.description}
                    </p>

                    {/* Skills to Teach */}
                    <div className="mb-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9b93be] block mb-1.5">
                        Teaches
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {user.skillsToTeach.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-[#eee9f8] text-[#26105f] text-xs px-2.5 py-1 rounded-md font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skills to Learn */}
                    <div className="mb-6">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9b93be] block mb-1.5">
                        Wants to learn
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {user.skillsToLearn.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-[#fef3c7] text-[#92400e] text-xs px-2.5 py-1 rounded-md font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Trigger Popup Button */}
                  <button
                    onClick={() => setSelectedUserForSwap(user)}
                    className="w-full mt-2 border border-[#26105f] text-[#26105f] hover:bg-[#26105f] hover:text-white font-medium py-2 rounded-xl text-xs transition flex items-center justify-center gap-2 group"
                  >
                    <Sparkles size={14} className="text-orange-500 group-hover:text-white transition" />
                    <span>Request Swap</span>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-[#e5e1dc] rounded-2xl p-12 text-center">
            <p className="text-[#6b6290] mb-2 font-medium">
              {showSavedOnly && savedUserIds.length === 0
                ? "You haven't saved any profiles yet."
                : "No members found matching your filters."}
            </p>
            <button
              onClick={handleResetFilters}
              className="text-sm text-[#7839ed] font-semibold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* --- POPUP MODAL --- */}
      {selectedUserForSwap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedUserForSwap(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1 rounded-full bg-gray-50 transition"
            >
              <X size={18} />
            </button>

            {swapSuccess ? (
              <div className="py-10 text-center flex flex-col items-center">
                <CheckCircle2 size={50} className="text-emerald-500 mb-3 animate-bounce" />
                <h3 className="text-xl font-bold text-[#26105f]">Request Sent!</h3>
                <p className="text-sm text-[#6b6290] mt-1">
                  Your skill swap invitation has been sent to {selectedUserForSwap.name}.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#eee9f8] text-[#26105f] font-bold flex items-center justify-center text-base">
                    {getInitials(selectedUserForSwap.name)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#26105f]">
                      Request Swap with {selectedUserForSwap.name}
                    </h3>
                    <p className="text-xs text-[#6b6290]">{selectedUserForSwap.place}</p>
                  </div>
                </div>

                <form onSubmit={handleSendRequest} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b6290] mb-1.5">
                      Choose skill to offer in return:
                    </label>
                    <select className="w-full border border-[#e5e1dc] rounded-xl p-2.5 text-sm bg-[#f8f7f4] text-[#26105f] outline-none focus:border-[#7839ed]">
                      {selectedUserForSwap.skillsToLearn.map((skill, i) => (
                        <option key={i} value={skill}>
                          Teach them {skill}
                        </option>
                      ))}
                      <option value="other">Another skill from my profile</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b6290] mb-1.5">
                      Introductory Message:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Hi! I saw you want to learn... Let's connect!"
                      className="w-full border border-[#e5e1dc] rounded-xl p-3 text-sm bg-[#f8f7f4] text-[#26105f] outline-none focus:border-[#7839ed] resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#26105f] hover:bg-[#32106f] text-white font-semibold py-3 rounded-xl text-sm transition shadow-md"
                  >
                    Send Swap Request
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;