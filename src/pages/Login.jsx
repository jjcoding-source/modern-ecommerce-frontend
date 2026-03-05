import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; 

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useUser(); 

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }

    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    loginUser(user);

    console.log("Login successful:", user);

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Left banner */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <h2 className="text-3xl font-bold leading-tight">
            Welcome back to Shoply
          </h2>

          <p className="mt-4 text-blue-100 text-sm">
            Sign in to manage your orders, wishlist and discover exclusive deals.
          </p>

          <div className="mt-10">
            <img
              src="https://images.unsplash.com/photo-1605902711622-cfb43c44367f?q=80&w=900"
              className="rounded-xl shadow-lg"
              alt="login visual"
            />
          </div>
        </div>

        {/* Right form */}
        <div className="p-8 md:p-12">

          <h3 className="text-2xl font-bold text-gray-800">
            Sign in
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Enter your credentials to continue
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            {/* Forgot */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-medium hover:bg-blue-700 transition shadow"
            >
              Sign in
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-200 py-2.5 hover:bg-gray-50 transition"
            >
              <FaGoogle />
              <span className="text-sm font-medium">Continue with Google</span>
            </button>

          </form>

          {/* Register */}
          <p className="text-sm text-gray-600 mt-6 text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Create account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}