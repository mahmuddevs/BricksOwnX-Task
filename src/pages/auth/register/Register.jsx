import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
    const { registerUser, updateDetails, setLoading, loginWithGoogle } = useAuth();
    const [error, setError] = useState({});
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleShowPass = () => {
        setShowPass(!showPass);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData);
        const { name, email, photoUrl, password } = formValues;

        let validationErrors = {};

        if (!name) validationErrors.name = "Name Is Required";
        if (!email) validationErrors.email = "Email Is Required";
        if (!photoUrl) validationErrors.photoUrl = "Photo Url Is Required";
        if (!password) validationErrors.password = "Password Is Required";

        const passRegEx = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if (password && !password.match(passRegEx)) {
            validationErrors.password = "Password Must Be 6 Characters, Contain 1 Uppercase and 1 Lowercase Letter";
        }

        if (Object.keys(validationErrors).length) {
            setError(validationErrors);
            return;
        }


        registerUser(email, password)
            .then(() => {
                updateDetails(name, photoUrl)
                    .then(() => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Registration Successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate("/");
                    })
                    .catch(() => {
                        setLoading(false);
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "Something Went Wrong",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
            })
            .catch(() => {
                setLoading(false);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Registration Failed",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Sign In Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state?.from || "/");
            })
            .catch(() => {
                setLoading(false);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Sign In Failed",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    return (
        <>
            <Helmet>
                <title>Register - Test Website</title>
            </Helmet>
            <div className="flex justify-center items-center mt-28 md:mt-36 mb-14 md:mb-24">
                <div className="w-full md:w-3/12 px-8 py-10 shadow-2xl">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Register
                    </h2>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Name</span>
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Name"
                                className="input input-bordered w-full"
                                required
                            />
                            {error.name && (
                                <span className="text-red-600 text-xs mt-1">{error.name}</span>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Email</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                className="input input-bordered w-full"
                                required
                            />
                            {error.email && (
                                <span className="text-red-600 text-xs mt-1">{error.email}</span>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Photo URL</span>
                            </label>
                            <input
                                name="photoUrl"
                                type="url"
                                placeholder="Photo URL"
                                className="input input-bordered w-full"
                                required
                            />
                            {error.photoUrl && (
                                <span className="text-red-600 text-xs mt-1">{error.photoUrl}</span>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPass ? "text" : "password"}
                                    placeholder="Password"
                                    className="input input-bordered w-full"
                                    required
                                />
                                <div
                                    onClick={handleShowPass}
                                    className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer text-gray-700"
                                >
                                    {showPass ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            {error.password && (
                                <span className="text-red-600 text-xs mt-1">{error.password}</span>
                            )}
                        </div>
                        <div className="form-control">
                            <button className="btn bg-primary hover:bg-primary/90 w-full text-white">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link
                            to="/auth/login"
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </Link>
                    </div>
                    <div className="divider">OR</div>
                    <button
                        onClick={handleGoogleLogin}
                        className="btn btn-ghost border border-gray-300 flex items-center justify-center gap-2 mx-auto"
                    >
                        <FcGoogle className="w-6 h-6" />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </>
    );
};

export default Register;
