import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser, checkAuth } from "../reduxToolkit/slices/IsAuth";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth || {});
  const { user, isAuth, loading } = auth;

  const localUser = (() => {
    try {
      const raw = localStorage.getItem("auth_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const u = user ?? localUser;

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isAuth && !u) {
      navigate("/login");
    }
  }, [loading, isAuth, u, navigate]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  if (!u) {
    return (
      <div className="w-full min-h-dvh flex items-center justify-center">
        <p className="text-white">Loading profile...</p>
      </div>
    );
  }

  // read profile fields from possible shapes
  const profile = u.profile ?? u.user_metadata ?? {};
  const fullName = profile.full_name || profile.fullName || u.email || "User";
  const email = u.email || profile.email || "";
  const phone = profile.phone_number || profile.phone || "";
  const address = profile.default_address || profile.defaultAddress || "";

  return (
    <div className="w-full min-h-dvh !py-10 !px-4 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-[#0b0b0b] rounded-2xl !p-8 shadow-xl">
        <div className="flex items-center gap-6 max-md:flex-col">
          <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white text-3xl font-bold max-md:h-auto max-md:w-auto max-md:!p-3">
            {String(fullName || "U")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="flex-1">
            <h2 className="text-white text-2xl font-semibold">{fullName}</h2>
            <p className="text-white/70">{email}</p>
            {phone && <p className="text-white/70 !mt-1">Phone: {phone}</p>}
          </div>

          <div className="flex flex-col gap-3 max-md:flex-row">
            {/* <Link
              to="/profile/edit"
              className="bg-white/5 text-white !px-4 !py-2 rounded-lg hover:bg-white/10"
            >
              Edit
            </Link> */}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white !px-4 !py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="!mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl !p-6">
            <h4 className="text-white font-semibold mb-2">Contact</h4>
            <p className="text-white/70">Email: {email}</p>
            <p className="text-white/70">Phone: {phone || "—"}</p>
          </div>

          <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl !p-6">
            <h4 className="text-white font-semibold mb-2">Address</h4>
            <p className="text-white/70">
              {address || "No default address set."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
