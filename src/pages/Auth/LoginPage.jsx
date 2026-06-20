import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {

    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid Email")
            .required("Email is required"),

        password: Yup.string().required(
            "Password is required"
        ),
    });

    const handleSubmit = (values) => {
        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            (user) =>
                user.email === values.email &&
                user.password === values.password
        );

        if (!user) {
           toast.error('Invalid username or password')
            return;
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        toast.success('Login successful');

        navigate("/dashboard");
    };

    return (
        <>
            <section className="login-section section-bg py-16 md:py-24">
                <div className='container mx-auto px-4 md:px-8 lg:px-16 wrapper'>
                    {/* logo */}
                    <div className="pb-10">
                        <Link to='/' className='flex'><img src='../logo.svg' alt='skillwap' width='200px' className='mr-1' /></Link>
                    </div>
                    <h2 className="text-4xl font-bold pb-4">Welcome back</h2>
                    <p className='text-lg text-light pb-8'>Sign in to continue learning.</p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="space-y-5">
                            <div>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border border-gray-300 border-solid rounded-full p-3"
                                />

                                <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <div>
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className="w-full border border-gray-300 border-solid rounded-full p-3"
                                />

                                <ErrorMessage
                                    name="password"
                                    component="p"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <div className="text-right">
                                <Link to="#" className="font-bold text-light">Forgot Password?</Link>
                            </div>
                            <button
                                type="submit"
                                className="w-full blue-bg text-white py-4 rounded-full p-3">
                                Login
                            </button>

                            <p className="text-center">New here? <Link to="/register" className="font-bold text-light">Create an account</Link></p>
                        </Form>
                    </Formik>
                </div>
            </section>
        </>
    )
};

export default LoginPage 