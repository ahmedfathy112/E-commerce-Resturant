import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../utils/supabase";
import Swal from "sweetalert2";

const tokenKey = "access_token";
const userKey = "auth_user";

const loadFromStorage = () => {
  try {
    const token = localStorage.getItem(tokenKey);
    const raw = localStorage.getItem(userKey);
    return { token, user: raw ? JSON.parse(raw) : null };
  } catch {
    return { token: null, user: null };
  }
};

const saveUserToStorage = (token, user) => {
  try {
    if (token) localStorage.setItem(tokenKey, token);
    if (user) localStorage.setItem(userKey, JSON.stringify(user));
  } catch {}
};

const clearStorage = () => {
  try {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
  } catch {}
};

const fetchProfile = async (userId, options = {}) => {
  const { maxRetries = 5, delay = 1000 } = options;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (!error && data) {
        return { success: true, data };
      }

      if (error?.code === "PGRST116") {
        if (attempt === maxRetries) {
          return { success: false, data: null };
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      return { success: false, error };
    } catch (err) {
      if (attempt === maxRetries) {
        return { success: false, error: err };
      }
    }
  }

  return { success: false, data: null };
};

const mergeUserData = (user, profileResult) => {
  if (!user) return null;

  const metadata = user.user_metadata || {};

  if (profileResult.success && profileResult.data) {
    const profile = profileResult.data;
    return {
      ...user,
      profile: {
        id: profile.id,
        email: profile.email || user.email,
        full_name: profile.full_name || metadata.full_name || "",
        phone_number: profile.phone_number || metadata.phone_number || "",
        default_address:
          profile.default_address || metadata.default_address || "",
        created_at: profile.created_at,
        is_admin: profile.is_admin || false,
      },
    };
  }

  return {
    ...user,
    profile: {
      id: user.id,
      email: user.email,
      full_name: metadata.full_name || "",
      phone_number: metadata.phone_number || "",
      default_address: metadata.default_address || "",
      created_at: user.created_at,
      is_admin: false,
    },
  };
};

const stored = loadFromStorage();

const initialState = {
  isAuth: Boolean(stored.token),
  user: stored.user,
  loading: false,
  error: null,
  message: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { email, password, full_name, phone_number, default_address },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
            phone_number,
            default_address,
          },
        },
      });

      if (error) {
        Swal.fire({
          title: "Registration Failed",
          text: error.message,
          icon: "error",
          draggable: true,
        });
        return rejectWithValue(error.message);
      }

      const user = data?.user ?? null;
      const session = data?.session ?? null;

      if (!user) {
        Swal.fire({
          title: "Registration Failed",
          text: "Failed to create user",
          icon: "error",
          draggable: true,
        });
        return rejectWithValue("Failed to create user");
      }

      Swal.fire({
        title: "Creating Account...",
        text: "Please wait while we create your profile",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false,
        draggable: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 3000));

      const profileResult = await fetchProfile(user.id, {
        maxRetries: 8,
        delay: 1000,
      });

      const combined = mergeUserData(user, profileResult);

      saveUserToStorage(session?.access_token ?? null, combined);

      // إغلاق رسالة الانتظار
      Swal.close();

      if (profileResult.success) {
        Swal.fire({
          title: "Success!",
          text: "Account created successfully!",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Continue",
          draggable: true,
        }).then((result) => {
          if (result.isConfirmed) {
            // إعادة تحميل الصفحة بعد النقر على Continue
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          title: "Account Created",
          text: "Your account has been created. Your profile will be available shortly.",
          icon: "info",
          showConfirmButton: true,
          confirmButtonText: "OK",
          draggable: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }

      return {
        user: combined,
        session,
        message: profileResult.success
          ? "Account created successfully!"
          : "Account created, creating profile...",
        profileCreated: profileResult.success,
      };
    } catch (err) {
      Swal.fire({
        title: "Registration Error",
        text: err.message || "Registration failed",
        icon: "error",
        draggable: true,
      });
      return rejectWithValue(err.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return rejectWithValue(error.message);

      const user = data?.user ?? null;
      const session = data?.session ?? null;

      const profileResult = await fetchProfile(user.id, {
        maxRetries: 3,
        delay: 500,
      });

      const combined = mergeUserData(user, profileResult);

      Swal.fire({
        title: "Login successfully!",
        icon: "success",
        draggable: true,
      });

      saveUserToStorage(session?.access_token ?? null, combined);

      // إعادة تحميل الصفحة بعد 1.5 ثانية
      setTimeout(() => {
        window.location.reload();
      }, 1500);

      return { user: combined, session };
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) return rejectWithValue(error.message);

      const session = data?.session ?? null;
      const rawUser = session?.user ?? null;

      if (!rawUser) {
        const local = loadFromStorage();
        if (local.user && local.token)
          return { user: local.user, session: null };
        return { user: null, session: null };
      }

      const profileResult = await fetchProfile(rawUser.id, {
        maxRetries: 2,
        delay: 500,
      });

      const combined = mergeUserData(rawUser, profileResult);

      saveUserToStorage(session?.access_token ?? null, combined);
      return { user: combined, session };
    } catch (err) {
      return rejectWithValue(err.message || "An error occurred");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return rejectWithValue(error.message);
      clearStorage();
      return true;
    } catch (err) {
      return rejectWithValue(err.message || "Logout failed");
    }
  }
);

export const createProfileManually = createAsyncThunk(
  "auth/createProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) return rejectWithValue(userError.message);

      const user = userData.user;

      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: userId,
          email: user.email,
          full_name: user.user_metadata?.full_name || "",
          phone_number: user.user_metadata?.phone_number || "",
          default_address: user.user_metadata?.default_address || "",
          created_at: new Date().toISOString(),
          is_admin: false,
        },
        {
          onConflict: "id",
        }
      );

      if (profileError) return rejectWithValue(profileError.message);

      return { success: true };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create profile");
    }
  }
);

export const updateAdminStatus = createAsyncThunk(
  "auth/updateAdminStatus",
  async ({ userId, isAdmin }, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_admin: isAdmin })
        .eq("id", userId);

      if (error) return rejectWithValue(error.message);

      return { userId, is_admin: isAdmin };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update admin status");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload ?? null;
      state.isAuth = Boolean(action.payload);
      state.error = null;
      if (action.payload) {
        try {
          localStorage.setItem(userKey, JSON.stringify(action.payload));
        } catch {}
      }
    },
    forceLogout(state) {
      state.user = null;
      state.isAuth = false;
      state.loading = false;
      state.error = null;
      clearStorage();
    },
    clearError(state) {
      state.error = null;
      state.message = null;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    setAdminStatus(state, action) {
      if (state.user && state.user.profile) {
        state.user.profile.is_admin = action.payload;
        try {
          localStorage.setItem(userKey, JSON.stringify(state.user));
        } catch {}
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.message = null;
      })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.isAuth = Boolean(a.payload.user);
        s.message = a.payload.message;
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(loginUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.isAuth = true;
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(checkAuth.pending, (s) => {
        s.loading = true;
      })
      .addCase(checkAuth.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.isAuth = Boolean(a.payload.user);
      })
      .addCase(checkAuth.rejected, (s) => {
        s.loading = false;
        s.user = null;
        s.isAuth = false;
      })
      .addCase(logoutUser.fulfilled, (s) => {
        s.user = null;
        s.isAuth = false;
        s.loading = false;
        s.message = null;
      })
      .addCase(createProfileManually.fulfilled, (s, a) => {
        s.message = "Profile created successfully";
      })
      .addCase(createProfileManually.rejected, (s, a) => {
        s.error = a.payload;
      })
      .addCase(updateAdminStatus.fulfilled, (s, a) => {
        if (s.user && s.user.id === a.payload.userId) {
          s.user.profile.is_admin = a.payload.is_admin;
          try {
            localStorage.setItem(userKey, JSON.stringify(s.user));
          } catch {}
        }
        s.message = "Admin permissions updated";
      })
      .addCase(updateAdminStatus.rejected, (s, a) => {
        s.error = a.payload;
      });
  },
});

export const { setUser, forceLogout, clearError, setMessage, setAdminStatus } =
  authSlice.actions;

export default authSlice.reducer;
