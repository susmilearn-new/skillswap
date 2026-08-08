import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const initialValues = {
        email: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid Email")
            .required("Email is required"),

    });

    const handleSubmit = (values) => {

        navigate("/login");
    };

    return (
        <>
            <section className="login-section py-16 md:py-24">
                <div className='container mx-auto px-4 md:px-8 lg:px-16 wrapper'>
                    <h2 className="text-4xl font-bold pb-4">Forget Your Password</h2>
                    <p className='text-lg text-light pb-8'>Please enter your email address you'd like your password reset information send to</p>
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
                                    className="w-full border border-gray-300 rounded-full px-5 py-4 focus:outline-none bg-white"
                                />

                                <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-full bg-[#32106f] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#45158d]">
                                Request reset link
                            </button>

                            <p className="text-center"> <Link to="/login" className="font-bold text-light">Back to login?</Link></p>
                        </Form>
                    </Formik>
                </div>
            </section>
        </>
    )
};

export default ForgotPassword 