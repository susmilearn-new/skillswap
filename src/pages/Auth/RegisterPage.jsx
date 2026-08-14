import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { skillsList } from "../../data/skillsList"
import { useAuthStore } from "../../store/authStore";

const RegisterPage = () => {

    const navigate = useNavigate();

    const initialValues = {
        firstName: "",
        lastName: "",
        location: "",
        email: "",
        password: "",
        skillsToTeach: [],
        skillsToLearn: [],
    };

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .trim()
            .min(3, "First name must be at least 3 characters")
            .max(50, "First name cannot exceed 50 characters")
            .matches(
                /^[a-zA-Z\s]+$/,
                "First name can only contain letters and spaces"
            )
            .required("First name is required"),

        lastName: Yup.string()
            .trim()
            .min(3, "Last name must be at least 3 characters")
            .max(50, "Last name cannot exceed 50 characters")
            .matches(
                /^[a-zA-Z\s]+$/,
                "Last name can only contain letters and spaces"
            )
            .required("Last name is required"),

        location: Yup.string()
            .trim()
            .min(2, "Location must be at least 2 characters")
            .max(100, "Location cannot exceed 100 characters")
            .required("Location is required"),

        email: Yup.string()
            .trim()
            .lowercase()
            .email("Enter a valid email address")
            .required("Email is required"),

        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .max(32, "Password cannot exceed 32 characters")
            .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
            )
            .matches(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
            )
            .matches(
                /[0-9]/,
                "Password must contain at least one number"
            )
            .matches(
                /[@$!%*?&]/,
                "Password must contain at least one special character (@$!%*?&)"
            )
            .required("Password is required"),

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

    const { register } = useAuthStore();

    const handleSubmit = (values, { resetForm }) => {
        const success = register(values);

        if (!success) {
            toast.error("Email already registered");
            return;
        }

        resetForm();

        toast.success("Registration Successful");

        navigate("/login");
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
                        {({ values, setFieldValue }) => (
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
                                    className="w-full rounded-full bg-[#32106f] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#45158d]"
                                >
                                    Create free account
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