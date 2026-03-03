import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ----------------- Validation Schema -----------------
const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);
    setApiError("");

    try {
      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if email already exists
      if (users.some((u) => u.email === data.email)) {
        throw new Error("Email already registered");
      }

      // Add new user
      users.push({
        id: Date.now(),
        name: data.fullName,
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration successful!");
      navigate("/login"); 
    } catch (err) {
      setApiError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {apiError && (
          <p className="text-red-500 mb-4 text-sm">{apiError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium mb-1 block">Full Name</label>
            <input
              type="text"
              {...register("fullName")}
              className="w-full border rounded-md px-3 py-2 focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full border rounded-md px-3 py-2 focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium mb-1 block">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full border rounded-md px-3 py-2 focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full border rounded-md px-3 py-2 focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}