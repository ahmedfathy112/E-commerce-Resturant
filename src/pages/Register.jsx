import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../reduxToolkit/slices/IsAuth";
import Loading from "../components/Loading";
import ShopHeroSection from "../components/HeroForSections";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhoneAlt,
  FaHome,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading: authLoading, error: authError } = useSelector(
    (state) => state.Auth
  );

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    default_address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.email || !form.password || !form.full_name) {
      setError("Full name, email and password are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const resultAction = await dispatch(registerUser(form));

    if (registerUser.fulfilled.match(resultAction)) {
      setSuccess(
        "Registration successful. Redirecting to login or check your email to confirm..."
      );
      setTimeout(() => navigate("/login"), 1600);
    } else {
      const errorMessage = resultAction.payload || "Registration failed.";
      setError(errorMessage);
    }
  };

  return (
    <div className="w-full min-h-dvh flex flex-col items-center bg-black/40 !py-10 !px-4">
      {(authLoading || (authLoading === undefined && false)) && (
        <Loading message="Creating account..." />
      )}
      <ShopHeroSection SecondLink={"register"} />

      <div className="w-full max-w-md bg-[#111] bg-opacity-90 rounded-2xl !p-8 shadow-xl !mt-8">
        <div className="text-center !mb-6">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-white/60">Sign up and start ordering</p>
        </div>

        {(error || authError) && (
          <div className="!mb-4 !p-3 bg-red-600/20 border border-red-500 text-red-400 rounded-lg text-sm">
            {error || authError}
          </div>
        )}
        {success && (
          <div className="!mb-4 !p-3 bg-green-600/20 border border-green-500 text-green-400 rounded-lg text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <label className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500">
              <FaUser />
            </div>
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full !pl-12 !pr-3 !py-3 rounded-lg bg-[#222] border-2 border-white/30 text-white placeholder-white/50 focus:outline-none"
              required
            />
          </label>

          <label className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500">
              <FaEnvelope />
            </div>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full !pl-12 !pr-3 !py-3 rounded-lg bg-[#222] border-2 border-white/30 text-white placeholder-white/50 focus:outline-none"
              required
            />
          </label>

          <label className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500">
              <FaLock />
            </div>

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full !pl-12 !pr-12 !py-3 rounded-lg bg-[#222] border-2 border-white/30 text-white placeholder-white/50 focus:outline-none"
              required
            />

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPassword((s) => !s);
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </label>

          <label className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500">
              <FaPhoneAlt />
            </div>
            <input
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              placeholder="Phone number"
              className="w-full !pl-12 !pr-3 !py-3 rounded-lg bg-[#222] border-2 border-white/30 text-white placeholder-white/50 focus:outline-none"
              inputMode="tel"
            />
          </label>

          <label className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500">
              <FaHome />
            </div>
            <input
              name="default_address"
              value={form.default_address}
              onChange={handleChange}
              placeholder="Default address"
              className="w-full !pl-12 !pr-3 !py-3 rounded-lg bg-[#222] border-2 border-white/30 text-white placeholder-white/50 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold !py-3 rounded-lg transition !mt-2"
          >
            {authLoading ? "Creating..." : "Register"}
          </button>
        </form>

        <div className="flex items-center gap-3 !my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-white/50 text-sm">or</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        <p className="text-center text-white/70">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-red-500 hover:text-red-400 font-semibold"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
