import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../reduxToolkit/slices/IsAuth";
import Loading from "../components/Loading";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/");
      } else {
        setError(
          resultAction.payload ||
            resultAction.error?.message ||
            "Login failed. Please try again."
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-dvh flex flex-col justify-center items-center bg-black/40 !py-10 !px-4">
      {loading && <Loading message="Logging in...!" />}

      <div className="w-full max-w-md bg-[#111] bg-opacity-90 rounded-2xl !p-8 shadow-xl">
        {/* Header */}
        <div className="text-center !mb-8">
          <h1 className="text-4xl font-bold text-white !mb-2">Welcome Back</h1>
          <p className="text-white/60">Login to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="!mb-4 !p-3 bg-red-600/20 border border-red-500 text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="!mb-4 !p-3 bg-green-600/20 border border-green-500 text-green-400 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email */}
          <label className="relative">
            <span className="sr-only">Email</span>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500">
              <FaEnvelope size={20} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full !pl-14 !pr-4 !py-3 rounded-lg bg-[#222] border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-red-500 transition"
              required
            />
          </label>

          {/* Password */}
          <label className="relative">
            <span className="sr-only">Password</span>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500">
              <FaLock size={20} />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full !pl-14 !pr-4 !py-3 rounded-lg bg-[#222] border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-red-500 transition"
              required
            />
          </label>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded bg-[#222] border border-white/30 cursor-pointer"
              />
              <span className="text-white/70">Remember me</span>
            </label>
            <a href="#" className="text-red-500 hover:text-red-400 transition">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold !py-3 rounded-lg transition !mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-white/50 text-sm">or</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Register Link */}
        <p className="text-center text-white/70">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-red-500 hover:text-red-400 font-semibold transition"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
