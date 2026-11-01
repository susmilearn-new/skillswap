import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getCatalogueSkills } from "../../api/skillCatalogueApi";
import { registerUser } from "../../api/authApi";

const RegisterPage = () => {

    const navigate = useNavigate();

    const [skillsList, setSkillsList] = useState([]);
    const [loadingSkills, setLoadingSkills] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCatalogueSkills = async () => {
            try {
                const response = await getCatalogueSkills();

                const skills = response.data.skills.map(
                    (skill) => skill.title

                );

                setSkillsList(skills);

                // Get unique categories for the Category dropdown
                setCategories([
                    ...new Set(
                        response.data.skills.map((skill) => skill.category)
                    )
                ]);
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Unable to load available skills"
                );
            } finally {
                setLoadingSkills(false);
            }
        };

        fetchCatalogueSkills();
    }, []);

    const initialValues = {
        name: "",
        email: "",
        password: "",
        place: "",
        description: "",
        category: "",
        skillsToTeach: [],
        skillsToLearn: [],
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .trim()
            .min(3, "Name must be at least 3 characters")
            .max(100, "Name cannot exceed 100 characters")
            .required("Name is required"),

        email: Yup.string()
            .email("Enter a valid email address")
            .required("Email is required"),

        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),

        place: Yup.string()
            .trim()
            .required("Location is required"),

        description: Yup.string().max(500),

        category: Yup.string().required("Category is required"),

        skillsToTeach: Yup.array()
            .min(1, "Select at least one skill to teach"),

        skillsToLearn: Yup.array()
            .min(1, "Select at least one skill to learn"),
    });

    const toggleSkill = (
        skill,
        fieldName,
        values,
        setFieldValue
    ) => {
        const currentSkills = values[fieldName];

        const updatedSkills = currentSkills.includes(skill)
            ? currentSkills.filter((item) => item !== skill)
            : [...currentSkills, skill];

        setFieldValue(fieldName, updatedSkills);
    };

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            await registerUser({
                ...values,
                name: values.name.trim(),
                email: values.email.trim().toLowerCase(),
                place: values.place.trim(),
            });

            resetForm();

            toast.success("Registration successful! Please log in.");

            navigate("/login");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>

            <section className="min-h-screen bg-[#f8f7f4] py-12 md:py-16">
                <div className="wrapper mx-auto px-4">

                    {/* Heading */}
                    <div className="mb-8">
                        <h2 className="font-mono text-4xl font-bold text-dark">
                            Create your account
                        </h2>

                        <p className="mt-2 text-base text-light">
                            Free forever. No credit card required.
                        </p>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue, isSubmitting }) => (
                            <Form className="space-y-6">

                                {/* First + Last Name */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div>
                                        <label className="block mb-2 font-semibold text-dark">
                                            Full name
                                        </label>

                                        <Field
                                            name="name"
                                            placeholder="Emma Johnson"
                                            className="w-full rounded-full border border-gray-200 bg-white px-5 py-4 outline-none text-light focus:border-[#272757]"
                                        />

                                        <ErrorMessage
                                            name="name"
                                            component="p"
                                            className="mt-1 text-sm text-red-500"
                                        />
                                    </div>
                                     {/* Email */}
                                <div>
                                    <label className="block mb-2 font-semibold text-dark">
                                        Email address
                                    </label>

                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full rounded-full border border-gray-200 bg-white px-5 py-4 outline-none text-light focus:border-[#272757]"
                                    />

                                    <ErrorMessage
                                        name="email"
                                        component="p"
                                        className="mt-1 text-sm text-red-500"
                                    />
                                </div>

                                </div>

                               

                                {/* place */}
                                <div>
                                    <label className="block mb-2 font-semibold text-dark">
                                        Place
                                    </label>

                                    <Field
                                        name="place"
                                        placeholder="London, UK"
                                        className="w-full rounded-full border border-gray-200 bg-white px-5 py-4 outline-none text-light focus:border-[#272757]"
                                    />

                                    <ErrorMessage
                                        name="place"
                                        component="p"
                                        className="mt-1 text-sm text-red-500"
                                    />
                                </div>
                                {/* Category */}
                                <div>
                                    <label className="block mb-2 font-semibold text-dark">
                                        Category
                                    </label>

                                    <Field
                                        as="select"
                                        name="category"
                                        className="w-full rounded-full border border-gray-200 bg-white px-5 py-4 outline-none text-light focus:border-[#272757]"
                                    >
                                        <option value="">Select a category</option>

                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </Field>

                                    <ErrorMessage
                                        name="category"
                                        component="p"
                                        className="mt-1 text-sm text-red-500"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block mb-2 font-semibold text-dark">
                                        Password
                                    </label>

                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="Min. 8 characters"
                                        className="w-full rounded-full border border-gray-200 bg-white px-5 py-4 outline-none text-light focus:border-[#272757]"
                                    />

                                    <ErrorMessage
                                        name="password"
                                        component="p"
                                        className="mt-1 text-sm text-red-500"
                                    />
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-200 pt-7">
                                </div>

                                {/* Skills I Can Teach */}
                                <div>
                                    <label className="block mb-3 font-semibold text-dark">
                                        I can teach (pick any)
                                    </label>

                                    <div className="max-h-52 overflow-y-auto pr-2">
                                        <div className="flex flex-wrap gap-2">

                                            {loadingSkills ? (
                                                <p className="text-sm text-gray-500">
                                                    Loading available skills...
                                                </p>
                                            ) : skillsList.length === 0 ? (
                                                <p className="text-sm text-red-500">
                                                    No skills available. Please try again later.
                                                </p>
                                            ) : (
                                                skillsList.map((skill) => (
                                                    <button
                                                        key={skill}
                                                        type="button"
                                                        onClick={() =>
                                                            toggleSkill(
                                                                skill,
                                                                "skillsToTeach",
                                                                values,
                                                                setFieldValue
                                                            )
                                                        }
                                                        className={`rounded-full border px-4 py-2 text-sm transition ${values.skillsToTeach.includes(skill)
                                                            ? "border-[#272757] bg-[#272757] text-white"
                                                            : "border-gray-200 bg-white text-light hover:border-[#272757]"
                                                            }`}
                                                    >
                                                        {skill}
                                                    </button>
                                                ))
                                            )}

                                        </div>
                                    </div>

                                    <ErrorMessage
                                        name="skillsToTeach"
                                        component="p"
                                        className="mt-2 text-sm text-red-500"
                                    />
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-200 pt-7">
                                </div>

                                {/* Skills I Want To Learn */}
                                <div>
                                    <label className="block mb-3 font-semibold text-dark">
                                        I want to learn (pick any)
                                    </label>

                                    <div className="max-h-52 overflow-y-auto pr-2">
                                        <div className="flex flex-wrap gap-2">

                                            {loadingSkills ? (
                                                <p className="text-sm text-gray-500">
                                                    Loading available skills...
                                                </p>
                                            ) : skillsList.length === 0 ? (
                                                <p className="text-sm text-red-500">
                                                    No skills available. Please try again later.
                                                </p>
                                            ) : (
                                                skillsList.map((skill) => (
                                                    <button
                                                        key={skill}
                                                        type="button"
                                                        onClick={() =>
                                                            toggleSkill(
                                                                skill,
                                                                "skillsToLearn",
                                                                values,
                                                                setFieldValue
                                                            )
                                                        }
                                                        className={`rounded-full border px-4 py-2 text-sm transition ${values.skillsToLearn.includes(skill)
                                                            ? "border-[#272757] bg-[#272757] text-white"
                                                            : "border-gray-200 bg-white text-light hover:border-[#272757]"
                                                            }`}
                                                    >
                                                        {skill}
                                                    </button>
                                                ))
                                            )}

                                        </div>
                                    </div>

                                    <ErrorMessage
                                        name="skillsToLearn"
                                        component="p"
                                        className="mt-2 text-sm text-red-500"
                                    />
                                </div>

                                {/* Submit */}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-full bg-[#32106f] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#45158d] disabled:opacity-60"
                                >
                                    {isSubmitting ? "Creating account..." : "Create free account"}
                                </button>


                                {/* Login */}
                                <p className="text-center text-sm text-light">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="font-semibold text-dark hover:underline"
                                    >
                                        Sign in
                                    </Link>
                                </p>

                            </Form>
                        )}
                    </Formik>

                </div>
            </section>
        </>
    )
};

export default RegisterPage 