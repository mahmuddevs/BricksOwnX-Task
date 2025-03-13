import { useContext, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../../contexts/AuthProvider";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const { loginUser, loginWithGoogle, setLoading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleShowPass = () => {
        setShowPass(!showPass);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formValues = Object.fromEntries(formData);

        const { email, password } = formValues;
        loginUser(email, password)
            .then(() => {
                e.target.reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log In Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state ? location.state : "/");
            })
            .catch(() => {
                setLoading(false);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Invalid Credentials",
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
                navigate(location?.state ? location.state : "/");
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
                <title>Login - Test Website</title>
            </Helmet>
            <div className="flex justify-center items-center mt-28 md:mt-36 mb-14 md:mb-24">
                <div className="w-full md:w-3/12 p-8 flex flex-col justify-center shadow-2xl">
                    <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
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
                        </div>
                        <div className="form-control">
                            <button className="btn bg-primary hover:bg-primary/90 text-white w-full">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account?{" "}
                        <Link
                            to="/auth/register"
                            className="text-blue-500 hover:underline"
                        >
                            Register
                        </Link>
                    </div>
                    <div className="divider">OR</div>
                    <div className="text-center text-sm mt-4">Or Sign In With</div>
                    <div className="form-control mt-2">
                        <button
                            onClick={handleGoogleLogin}
                            className="btn btn-ghost border border-gray-400 w-full"
                        >
                            <FcGoogle className="w-8 h-8" />
                            Google
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;