import React, { useContext, useState } from 'react';
import { updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebase/firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toast as hotToast } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../context/Context';

const Signup = () => {


     const {createUser, googleUser} = useContext(AuthContext);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (value) => {
        if (value.length < 6) {
            return "Password must be at least 6 characters long";
        }
        if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/[a-z]/.test(value)) {
            return "Password must contain at least one lowercase letter";
        }
        return "";
    };

    const handleBlur = () => {
        const err = validatePassword(password);
        setError(err);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const name = e.target.name.value;
        const photoURL = e.target.photoURL.value;

        if (error) {
            toast.error("Please fix the password issue first!");
            return;
        }

        createUser(email, password)
            .then((result) => {
                const loggedUser = result.user;

                updateProfile(loggedUser, {
                    displayName: name,
                    photoURL: photoURL,
                })
                    .then(() => {
                       
                        toast.success("Registration successful!");
                        hotToast.success("Registration successful!");
                        auth.signOut().then(() => {
                            navigate("/login", { replace: true });
                            toast.info("Please login with your new account");
                        });
                    })
                    .catch((err) => toast.error(err.message));
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const handleGoogleSignIn = () => {
   
       googleUser()
         .then(() => {
           toast.success("Google sign-in successful!");
           navigate("/", { replace: true });
         })
         .catch((err) => {
           toast.error(err.message);
         });
     };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col w-full">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">Sign Up Now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-full sm:max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <fieldset className="fieldset">
                                    <label className="label text-base-content">Name</label>
                                    <input type="text" className="input dark:bg-base-200 dark:text-base-content dark:border-base-300" name="name" placeholder="Your name" required />

                                    <label className="label text-base-content">Photo URL</label>
                                    <input type="text" className="input dark:bg-base-200 dark:text-base-content dark:border-base-300" name="photoURL" placeholder="Photo URL" />

                                    <label className="label text-base-content">Email</label>
                                    <input type="email" className="input dark:bg-base-200 dark:text-base-content dark:border-base-300" name="email" placeholder="Email" required />

                                    <label className="label text-base-content">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className={`input w-full dark:bg-base-200 dark:text-base-content dark:border-base-300 ${error ? "border-red-500" : ""}`}
                                            name="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onBlur={handleBlur}
                                            required
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                        >
                                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                        </button>
                                    </div>
                                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                                    <button
                                        className="btn-primary-custom w-full mt-4"
                                        type="submit"
                                        disabled={!!error}
                                    >
                                        Sign Up
                                    </button>
                                </fieldset>
                            </form>

                            <button
                                onClick={handleGoogleSignIn}
                                className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white dark:bg-base-200 text-gray-800 dark:text-base-content border border-gray-300 dark:border-base-300 rounded-lg px-4 py-2 hover:bg-gray-50 dark:hover:bg-base-300 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
                            >
                                <FcGoogle size={22} />
                                <span className="font-medium">Sign up with Google</span>
                            </button>

                            <p className="text-center mt-3 text-base-content">
                                Already Registered?{" "}
                                <Link to="/login">
                                    <span className="text-blue-700 dark:text-blue-400">Login Now</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
