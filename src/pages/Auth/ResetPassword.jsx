import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../api/authApi";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const initialValues = {
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),

        confirmPassword: Yup.string()
            .oneOf(
                [Yup.ref("password")],
                "Passwords do not match"
            )
            .required("Confirm password is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await resetPassword(
                token,
                values.password
            );

            toast.success(response.data.message);

            navigate("/login");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to reset password"
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="login-section py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-8 lg:px-16 wrapper">

                <h2 className="text-4xl font-bold pb-4">
                    Reset Your Password
                </h2>

                <p className="text-lg text-light pb-8">
                    Enter your new password below.
                </p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-5">

                            <div>
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="New Password"
                                    className="w-full border border-gray-300 rounded-full px-5 py-4 focus:outline-none bg-white"
                                />

                                <ErrorMessage
                                    name="password"
                                    component="p"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <div>
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm New Password"
                                    className="w-full border border-gray-300 rounded-full px-5 py-4 focus:outline-none bg-white"
                                />

                                <ErrorMessage
                                    name="confirmPassword"
                                    component="p"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-full bg-[#32106f] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#45158d] disabled:opacity-50"
                            >
                                {isSubmitting
                                    ? "Resetting..."
                                    : "Reset Password"}
                            </button>

                            <p className="text-center">
                                <Link
                                    to="/login"
                                    className="font-bold text-light"
                                >
                                    Back to login?
                                </Link>
                            </p>

                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
};

export default ResetPassword;