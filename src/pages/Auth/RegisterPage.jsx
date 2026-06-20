import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";


const skillsList = [
    "React",
    "Node.js",
    "Python",
    "Java",
    "UI/UX",
    "Data Science",
    "Digital Marketing",
];

const RegisterPage = () => {

    const initialValues = {
        fullName: "",
        location: "",
        email: "",
        password: "",
        role: "Learner",
        skillsToTeach: [],
        skillsToLearn: [],
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Fullname is required"),
        location: Yup.string().required("Location is required"),
        email: Yup.string()
            .email("Invalid Email")
            .required("Email is required"),
        password: Yup.string().
            min(8, "Minimum 8 characters")
            .required("Password is required"),
        skillsToLearn: Yup.array().min(1, "Select at least one skill"),
        skillsToTeach: Yup.array().when("role", {
            is: "Mentor",
            then: (schema) => schema.min(1, "Select at least one skill"),
        }),

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

    const handleSubmit = (values, { resetForm }) => {
        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const existingUser = users.find(
            (user) => user.email === values.email
        );

        if (existingUser) {
            toast.error('Email already registerd')
            return;
        }

        users.push(values);

        localStorage.setItem("users", JSON.stringify(users));

        toast.success('Registration Successfull');

        console.log(values);

        resetForm();
    };

    return (
        <>
            <section className="login-section section-bg py-16 md:py-24">
                <div className='container mx-auto px-4 md:px-8 lg:px-16 wrapper'>
                    {/* logo */}
                    <div className="pb-8">
                        <Link to='/' className='flex'><img src='../logo.svg' alt='skillwap' width='200px' className='mr-1' /></Link>
                    </div>
                    <h2 className="text-4xl font-bold pb-4">Create your account</h2>
                    <p className='text-lg text-light pb-10'>Join thousands learning and teaching on SkillSwap.</p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue }) => (
                            <Form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-semibold text-sm block mb-2">
                                            Full Name
                                        </label>

                                        <Field
                                            name="fullName"
                                            placeholder="Alex Rivers"
                                            className="w-full border border-gray-300 border-solid rounded-full p-3"
                                        />

                                        <ErrorMessage
                                            name="fullName"
                                            component="p"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="font-semibold text-sm block mb-2">
                                            Location
                                        </label>

                                        <Field
                                            name="location"
                                            placeholder="Berlin, DE"
                                            className="w-full border border-gray-300 border-solid rounded-full p-3"
                                        />

                                        <ErrorMessage
                                            name="location"
                                            component="p"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="font-semibold text-sm block mb-2">
                                        Email
                                    </label>

                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="you@company.com"
                                        className="w-full border border-gray-300 border-solid rounded-full p-3"
                                    />

                                    <ErrorMessage
                                        name="email"
                                        component="p"
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold text-sm block mb-2">
                                        Password
                                    </label>

                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="At least 8 characters"
                                        className="w-full border border-gray-300 border-solid rounded-full p-3"
                                    />

                                    <ErrorMessage
                                        name="password"
                                        component="p"
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3 text-sm">
                                        I want to join as a...
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFieldValue("role", "Learner")
                                            }
                                            className={`border border-gray-300 border-solid rounded-full p-3 font-semibold ${values.role === "Learner"
                                                ? "dark-border blue-bg  text-white"
                                                : ""
                                                }`}
                                        >
                                            Learner
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFieldValue("role", "Mentor")
                                            }
                                            className={`border border-gray-300 border-solid rounded-full p-3 font-semibold ${values.role === "Mentor"
                                                ? "dark-border blue-bg text-white"
                                                : ""
                                                }`}
                                        >
                                            Mentor
                                        </button>
                                    </div>
                                </div>

                                {values.role === "Mentor" && (
                                    <div>
                                        <h3 className="font-semibold mb-3 text-sm">
                                            Skills I can teach
                                        </h3>

                                        <div className="flex flex-wrap gap-3">
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
                                                    className={`px-4 py-2 border border-gray-300 border-solid rounded-full text-sm ${values.skillsToTeach.includes(skill)
                                                        ? "light-bg text-white"
                                                        : ""
                                                        }`}
                                                >
                                                    {skill}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <h3 className="font-semibold mb-3 text-sm">
                                        Skills I want to learn
                                    </h3>

                                    <div className="flex flex-wrap gap-3">
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
                                                className={`px-4 py-2 border border-gray-300 border-solid rounded-full text-sm  ${values.skillsToLearn.includes(skill)
                                                    ? "light-bg text-white"
                                                    : ""
                                                    }`}
                                            >
                                                {skill}
                                            </button>
                                        ))}
                                    </div>

                                    <ErrorMessage
                                        name="skillsToLearn"
                                        component="p"
                                        className="text-red-500 text-sm mt-2"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full blue-bg text-white py-4 rounded-full p-3"
                                >
                                    Create Account
                                </button>
                                <p className="text-center">Already have an account? <Link to="/login" className="font-bold text-light">Sign in</Link></p>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        </>
    )
};

export default RegisterPage 