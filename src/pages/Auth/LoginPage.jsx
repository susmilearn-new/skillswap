import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { useAuthStore } from "../../store/authStore";

const LoginPage = () => {
    const navigate = useNavigate();

    const { registeredUsers, login } = useAuthStore();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid Email")
            .required("Email is required"),

        password: Yup.string()
            .required("Password is required"),
    });

    const handleSubmit = (values) => {
        const user = registeredUsers.find(
            (user) =>
                user.email === values.email &&
                user.password === values.password
        );

        if (!user) {
            toast.error("Invalid email or password");
            return;
        }

        login(user);

        toast.success("Login successful");

        navigate("/dashboard");
    };

    return (
        <section className="login-section py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-8 lg:px-16 wrapper">

                <h2 className="font-fraunces text-4xl font-bold pb-4 text-dark">
                    Log in to SkillSwap
                </h2>

                <p className="text-lg text-light pb-8">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-bold text-dark hover:underline"
                    >
                        Sign up free
                    </Link>
                </p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block font-semibold text-dark mb-2">
                                Email address
                            </label>

                            <Field
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                className="w-full border border-gray-300 rounded-full px-5 py-4 focus:outline-none bg-white"
                            />

                            <ErrorMessage
                                name="email"
                                component="p"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="font-semibold text-dark">
                                    Password
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="text-dark text-sm hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <Field
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className="w-full border border-gray-300 rounded-full px-5 py-4 focus:outline-none bg-white"
                            />

                            <ErrorMessage
                                name="password"
                                component="p"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {/* Login button */}
                        <button
                            type="submit"
                            className="w-full rounded-full bg-[#32106f] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#45158d]"
                        >
                            Log in
                        </button>

                        <p className="text-center text-sm text-light pt-4">
                            By continuing, you agree to our{" "}
                            <span className="underline">
                                Terms of Service
                            </span>{" "}
                            and{" "}
                            <span className="underline">
                                Privacy Policy
                            </span>.
                        </p>

                    </Form>
                </Formik>
            </div>
        </section>
    );
};

export default LoginPage;