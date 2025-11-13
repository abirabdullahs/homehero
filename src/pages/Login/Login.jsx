import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from './../../context/Context';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {signInUser, googleUser} = useContext(AuthContext);

  // Handle Email/Password Login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // Handle Google Sign In
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

  // Forgot Password Navigation
  const handleReset = (e) => {
    const emailInput = e.currentTarget.closest('form')?.email?.value || '';
    navigate("/password-reset", {
      state: { email: emailInput },
    });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col w-full">
        <div className="text-center lg:text-left mb-6">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">Login Now</h1>
          <p className="py-2 text-gray-500 dark:text-gray-300">Welcome back! Please login to continue.</p>
        </div>

  <div className="card bg-base-100 w-full max-w-full sm:max-w-sm shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                {/* Email */}
                <label className="label">
                  <span className="label-text text-base-content">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full dark:bg-base-200 dark:text-base-content dark:border-base-300"
                  placeholder="Enter your email"
                  required
                />

                {/* Password */}
                <label className="label mt-3">
                  <span className="label-text text-base-content">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input input-bordered w-full dark:bg-base-200 dark:text-base-content dark:border-base-300"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>

                {/* Forgot Password */}
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="btn-primary-custom w-full mt-4"
                >
                  Login
                </button>
              </fieldset>
            </form>

            {/* Divider */}
            <div className="divider dark:divide-base-300">OR</div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 w-full bg-white dark:bg-base-200 text-gray-800 dark:text-base-content border border-gray-300 dark:border-base-300 rounded-lg px-4 py-2 hover:bg-gray-50 dark:hover:bg-base-300 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
            >
              <FcGoogle size={22} />
              <span className="font-medium">Sign in with Google</span>
            </button>

            {/* Signup Link */}
            <p className="mt-4 text-center text-sm text-base-content">
              Not Registered?{" "}
              <Link to="/signup" className="text-blue-700 dark:text-blue-400 font-semibold hover:underline">
                Sign Up Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
