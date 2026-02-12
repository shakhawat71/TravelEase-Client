import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least 1 uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must contain at least 1 lowercase letter.";
    return null;
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  const form = e.target;

  const name = form.name.value.trim();
  const photo = form.photo.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;

  const errorMsg = validatePassword(password);
  if (errorMsg) return toast.error(errorMsg);

  try {
    await createUser(email, password);
    await updateUserProfile(name, photo);

    toast.success("Registration Successful");
    navigate("/", { replace: true });
  } catch (error) {
    toast.error(error.message);
  }
};

  const handleGoogle = () => {
    googleLogin()
      .then(() => {
        toast.success("Registration Successful");
        navigate(from, { replace: true });
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white border border-blue-100 shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Photo URL
            </label>
            <input
              type="url"
              name="photo"
              required
              placeholder="Enter photo URL"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <span
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-10.5 cursor-pointer"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>

            <p className="mt-2 text-xs text-blue-500">
              Password must have 6+ chars, 1 uppercase, 1 lowercase.
            </p>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="grow border-t border-blue-200"></div>
          <span className="mx-3 text-blue-400 text-sm">OR</span>
          <div className="grow border-t border-blue-200"></div>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          className="w-full border border-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
        >
          Continue with Google
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
