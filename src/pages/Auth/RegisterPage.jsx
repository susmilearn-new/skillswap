import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { skillsList } from "../../data/skillsList"
import { registerUser } from "../../api/authApi";
// import { useAuthStore } from "../../store/authStore";

const RegisterPage = () => {

    const navigate = useNavigate();

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
            const userData = {
                name: `${values.firstName.trim()} ${values.lastName.trim()}`,
                email: values.email.trim().toLowerCase(),
                password: values.password,
                place: values.location.trim(),
                skillsToTeach: values.skillsToTeach,
                skillsToLearn: values.skillsToLearn,
            };

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
                                            First name
                                        </label>

                                        <Field
                                            name="firstName"
                                            placeholder="Emma"
                                            className="w-full rounded-full border border-gray-200 bg-white px-5 py-4 outline-none text-light focus:border-[#272757]"
                                        />

                                        <ErrorMessage
                                            name="firstName"
                                            component="p"
                                            className="mt-1 text-sm text-red-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-semibold text-dark">
                                            Last name
                                        </label>

                                        <Field
                                            name="lastName"
                                            placeholder="Johnson"
                                            className="w-full rounded-full border border-gray-200 bg-white px-5 py-4 outline-none text-light focus:border-[#272757]"
                                        />

                                        <ErrorMessage
                                            name="lastName"
                                            component="p"
                                            className="mt-1 text-sm text-red-500"
                                        />
                                    </div>

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

                                {/* Location */}
                                <div>
                                    <label className="block mb-2 font-semibold text-dark">
                                        Location
                                    </label>

                                    <Field
                                        name="location"
                                        placeholder="London, UK"
                                        className="w-full rounded-full border border-gray-200 bg-white px-5 py-4 outline-none text-light focus:border-[#272757]"
                                    />

                                    <ErrorMessage
                                        name="location"
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

                                            {skillsList.map((skill) => (
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
                                            ))}

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

                                            {skillsList.map((skill) => (
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
                                            ))}

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