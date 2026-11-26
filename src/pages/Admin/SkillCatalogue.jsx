
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    Plus,
    Pencil,
    Trash2,
    Search,
    BookOpen,
    X,
} from "lucide-react";

import {
    getCatalogueSkills,
    createCatalogueSkill,
    updateCatalogueSkill,
    deleteCatalogueSkill,
} from "../../api/skillCatalogueApi";

const categories = [
    "Coding",
    "Languages",
    "Music",
    "Cooking",
    "Design",
    "Business",
    "Marketing",
    "Other",
];

const SkillCatalogue = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");

    // Fetch catalogue skills
    const fetchSkills = async () => {
        try {
            setLoading(true);

            const response = await getCatalogueSkills();

            setSkills(response.data.skills || []);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load skills"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    // Reset form
    const resetForm = () => {
        setTitle("");
        setCategory("");
        setEditingId(null);
    };

    // Add or Update skill
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !category) {
            toast.error("Please enter skill name and category");
            return;
        }

        try {
            setSubmitting(true);

            const skillData = {
                title: title.trim(),
                category,
            };

            if (editingId) {
                await updateCatalogueSkill(
                    editingId,
                    skillData
                );

                toast.success("Skill updated successfully!");
            } else {
                await createCatalogueSkill(skillData);

                toast.success("Skill added successfully!");
            }

            resetForm();
            await fetchSkills();

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setSubmitting(false);
        }
    };

    // Edit skill
    const handleEdit = (skill) => {
        setEditingId(skill._id);
        setTitle(skill.title);
        setCategory(skill.category);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Delete skill
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this skill?"
        );

        if (!confirmed) return;

        try {
            await deleteCatalogueSkill(id);

            setSkills((prev) =>
                prev.filter((skill) => skill._id !== id)
            );

            if (editingId === id) {
                resetForm();
            }

            toast.success("Skill deleted successfully!");

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to delete skill"
            );
        }
    };

    // Search skills
    const filteredSkills = skills.filter((skill) => {
        const query = search.toLowerCase();

        return (
            skill.title.toLowerCase().includes(query) ||
            skill.category.toLowerCase().includes(query)
        );
    });

    return (
        <div className="mx-auto max-w-[1400px] px-6 py-8">

            {/* Page Header */}
            <div className="mb-8 flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#32106f] text-white">
                    <BookOpen size={23} />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-[#32106f]">
                        Skill Catalogue
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage the skills available on SkillSwap.
                    </p>
                </div>

            </div>

            {/* Add / Edit Form */}
            <div className="mb-8 rounded-2xl border border-[#e5e1dc] bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center justify-between">

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {editingId ? "Edit Skill" : "Add New Skill"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Add skills for users to select in their profiles.
                        </p>
                    </div>

                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500"
                        >
                            <X size={17} />
                            Cancel
                        </button>
                    )}

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-5 md:grid-cols-3"
                >

                    {/* Skill Name */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Skill Name
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. React.js"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#32106f] focus:ring-2 focus:ring-purple-100"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#32106f] focus:ring-2 focus:ring-purple-100"
                        >
                            <option value="">
                                Select category
                            </option>

                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit */}
                    <div className="flex items-end">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#32106f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26105f] disabled:opacity-60"
                        >
                            <Plus size={18} />

                            {submitting
                                ? "Saving..."
                                : editingId
                                    ? "Update Skill"
                                    : "Add Skill"}
                        </button>
                    </div>

                </form>
            </div>

            {/* Skills List */}
            <div className="overflow-hidden rounded-2xl border border-[#e5e1dc] bg-white shadow-sm">

                {/* List Header */}
                <div className="flex flex-col gap-4 border-b border-gray-100 p-6 md:flex-row md:items-center md:justify-between">

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Available Skills
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {skills.length} skills in catalogue
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-72">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search skills..."
                            className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#32106f]"
                        />

                    </div>

                </div>

                {/* Loading */}
                {loading ? (

                    <div className="py-16 text-center text-sm text-gray-500">
                        Loading skills...
                    </div>

                ) : filteredSkills.length === 0 ? (

                    <div className="py-16 text-center">

                        <BookOpen
                            size={35}
                            className="mx-auto mb-3 text-gray-300"
                        />

                        <p className="font-medium text-gray-600">
                            No skills found
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            Add a new skill or try another search.
                        </p>

                    </div>

                ) : (

                    <div className="divide-y divide-gray-100">

                        {filteredSkills.map((skill) => (

                            <div
                                key={skill._id}
                                className="flex flex-col gap-4 px-6 py-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                            >

                                {/* Skill Details */}
                                <div className="flex items-center gap-4">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 font-bold text-[#32106f]">
                                        {skill.title.charAt(0).toUpperCase()}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {skill.title}
                                        </h3>

                                        <span className="mt-1 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                                            {skill.category}
                                        </span>
                                    </div>

                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">

                                    <button
                                        type="button"
                                        onClick={() => handleEdit(skill)}
                                        className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-[#32106f] hover:text-[#32106f]"
                                    >
                                        <Pencil size={15} />
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(skill._id)}
                                        className="flex items-center gap-2 rounded-lg border border-red-100 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                                    >
                                        <Trash2 size={15} />
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default SkillCatalogue;
