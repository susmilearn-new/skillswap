import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore"; 
import { skillsList } from "../../data/skillsList"

const Profile = () => {
    const navigate = useNavigate();

    // 1. Get currentUser state & update function directly from Zustand
    const { currentUser, updateUserProfile } = useAuthStore();

    // Profile Details State
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [location, setLocation] = useState("");

    // Skills State
    const [skillsToTeach, setSkillsToTeach] = useState([]);
    const [skillsToLearn, setSkillsToLearn] = useState([]);

    // Skill Inputs State
    const [teachInput, setTeachInput] = useState("");
    const [learnInput, setLearnInput] = useState("");

    // 2. Load currentUser data into form state on component mount
    useEffect(() => {
        if (currentUser) {
            setFirstName(currentUser.firstName || "");
            setLastName(currentUser.lastName || "");
            setLocation(currentUser.location || "");
            setSkillsToTeach(currentUser.skillsToTeach || []);
            setSkillsToLearn(currentUser.skillsToLearn || []);
        } else {
            // Redirect if not logged in
            navigate("/login");
        }
    }, [currentUser, navigate]);

    // Handlers to Add Skills
    const handleAddSkill = (skill, type) => {
        const trimmedSkill = skill.trim();
        if (!trimmedSkill) return;

        if (type === "teach") {
            if (skillsToTeach.some((s) => s.toLowerCase() === trimmedSkill.toLowerCase())) {
                toast.info("Skill already added to 'Teach' list");
                return;
            }
            setSkillsToTeach([...skillsToTeach, trimmedSkill]);
            setTeachInput("");
        } else {
            if (skillsToLearn.some((s) => s.toLowerCase() === trimmedSkill.toLowerCase())) {
                toast.info("Skill already added to 'Learn' list");
                return;
            }
            setSkillsToLearn([...skillsToLearn, trimmedSkill]);
            setLearnInput("");
        }
    };

    // Handlers to Remove Skills
    const handleRemoveSkill = (skillToRemove, type) => {
        if (type === "teach") {
            setSkillsToTeach(skillsToTeach.filter((s) => s !== skillToRemove));
        } else {
            setSkillsToLearn(skillsToLearn.filter((s) => s !== skillToRemove));
        }
    };

    // 3. Save Changes: Update Zustand, Show Toast, and Redirect
    const handleSaveChanges = (e) => {
        e.preventDefault();

        // Pass updated values to Zustand action
        updateUserProfile({
            firstName,
            lastName,
            location,
            skillsToTeach,
            skillsToLearn,
        });

        // Trigger Toast & Redirect
        toast.success("Profile saved successfully");
        navigate("/dashboard");
    };

    if (!currentUser) return null;

    return (
        <section className="min-h-screen bg-[#f8f7f4] py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4">
                
                <h2 className="font-mono text-3xl font-bold text-[#1a064f] mb-8">
                    Edit Profile
                </h2>

                <form onSubmit={handleSaveChanges} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-8">
                    
                    {/* ----------------- PERSONAL INFORMATION ----------------- */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-[#1a064f]">Personal Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-semibold text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full rounded-2xl border border-gray-200 bg-[#f9f9f9] px-5 py-3.5 outline-none focus:border-[#200b52] focus:bg-white transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full rounded-2xl border border-gray-200 bg-[#f9f9f9] px-5 py-3.5 outline-none focus:border-[#200b52] focus:bg-white transition"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-semibold text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    value={currentUser.email || ""}
                                    disabled
                                    className="w-full rounded-2xl border border-gray-200 bg-gray-100 px-5 py-3.5 text-gray-500 cursor-not-allowed outline-none"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-gray-700">Location</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full rounded-2xl border border-gray-200 bg-[#f9f9f9] px-5 py-3.5 outline-none focus:border-[#200b52] focus:bg-white transition"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* ----------------- SKILLS TO TEACH ----------------- */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-[#1a064f]">Skills You Can Teach</h3>

                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={teachInput}
                                onChange={(e) => setTeachInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill(teachInput, "teach"))}
                                placeholder="Type a skill and press Add or Enter..."
                                list="teach-suggestions"
                                className="flex-1 rounded-2xl border border-gray-200 bg-[#f9f9f9] px-5 py-3.5 outline-none focus:border-[#009a60] focus:bg-white transition"
                            />
                            <datalist id="teach-suggestions">
                                {skillsList.map((skill) => (
                                    <option key={skill} value={skill} />
                                ))}
                            </datalist>

                            <button
                                type="button"
                                onClick={() => handleAddSkill(teachInput, "teach")}
                                className="rounded-2xl bg-[#009a60] px-6 py-3.5 font-semibold text-white hover:bg-[#008251] transition"
                            >
                                + Add
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                            {skillsToTeach.map((skill) => (
                                <span key={skill} className="inline-flex items-center gap-2 rounded-full border border-[#b2e5d0] bg-[#e6f7f0] px-4 py-1.5 text-sm font-medium text-[#007046]">
                                    {skill}
                                    <button type="button" onClick={() => handleRemoveSkill(skill, "teach")} className="font-bold ml-1 hover:text-red-500 transition">✕</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* ----------------- SKILLS TO LEARN ----------------- */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-[#1a064f]">Skills You Want to Learn</h3>

                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={learnInput}
                                onChange={(e) => setLearnInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill(learnInput, "learn"))}
                                placeholder="Type a skill and press Add or Enter..."
                                list="learn-suggestions"
                                className="flex-1 rounded-2xl border border-gray-200 bg-[#f9f9f9] px-5 py-3.5 outline-none focus:border-[#ff5500] focus:bg-white transition"
                            />
                            <datalist id="learn-suggestions">
                                {skillsList.map((skill) => (
                                    <option key={skill} value={skill} />
                                ))}
                            </datalist>

                            <button
                                type="button"
                                onClick={() => handleAddSkill(learnInput, "learn")}
                                className="rounded-2xl bg-[#ff5500] px-6 py-3.5 font-semibold text-white hover:bg-[#e04b00] transition"
                            >
                                + Add
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                            {skillsToLearn.map((skill) => (
                                <span key={skill} className="inline-flex items-center gap-2 rounded-full border border-[#ffd5cc] bg-[#fff0ed] px-4 py-1.5 text-sm font-medium text-[#c43d00]">
                                    {skill}
                                    <button type="button" onClick={() => handleRemoveSkill(skill, "learn")} className="font-bold ml-1 hover:text-red-500 transition">✕</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* ----------------- ACTION BUTTONS ----------------- */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-full bg-[#200b52] px-6 py-3 text-sm font-medium text-white hover:bg-[#32127a] transition"
                        >
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default Profile;