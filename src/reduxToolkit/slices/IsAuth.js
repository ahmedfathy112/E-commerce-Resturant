import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../utils/supabase";

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

const stored = loadFromStorage();

const initialState = {
  isAuth: Boolean(stored.token),
  user: stored.user,
  loading: false,
  error: null,
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

const fetchProfileRow = async (id) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
};

// const upsertProfileRow = async (id, payload = {}) => {
//   try {
//     const row = { id, ...payload };
//     const { data, error } = await supabase
//       .from("profiles")
//       .upsert(row)
//       .select()
//       .single();
//     if (error) {
//       console.error("profiles upsert error:", error);
//       return null;
//     }
//     return data;
//   } catch (err) {
//     console.error("profiles upsert exception:", err);
//     return null;
//   }
// };

/*
  Simple auth thunks:
  - registerUser: signUp then, if session exists, create profile row
  - loginUser: signIn and ensure profile row exists (create if missing)
  - checkAuth: getSession and load profile
  - logoutUser: signOut and clear storage
*/

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { email, password, full_name, phone_number, default_address },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp(
        { email, password },
        { data: { full_name, phone_number, default_address } }
      );
      if (error) return rejectWithValue(error.message || error);

      const user = data?.user ?? null;
      const session = data?.session ?? null;

      let combined = user;
      // if a session exists we are authenticated and can write to profiles

      saveUserToStorage(session?.access_token ?? null, combined);
      return { user: combined, session: session ?? null };
    } catch (err) {
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
      if (error) return rejectWithValue(error.message || error);

      const user = data?.user ?? null;
      const session = data?.session ?? null;

      let combined = user;
      if (user?.id) {
        // ensure profile exists (create minimal row if missing)
        let profile = await fetchProfileRow(user.id);

        combined = profile ? { ...user, profile } : user;
      }

      saveUserToStorage(session?.access_token ?? null, combined);
      return { user: combined, session: session ?? null };
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
      if (error) return rejectWithValue(error.message || error);

      const session = data?.session ?? null;
      const rawUser = session?.user ?? null;

      if (!rawUser) {
        // fallback to local storage
        const local = loadFromStorage();
        if (local.user && local.token)
          return { user: local.user, session: null };
        return { user: null, session: null };
      }

      let combined = rawUser;
      if (rawUser?.id) {
        let profile = await fetchProfileRow(rawUser.id);

        combined = profile ? { ...rawUser, profile } : rawUser;
      }

      saveUserToStorage(session?.access_token ?? null, combined);
      return { user: combined, session };
    } catch (err) {
      return rejectWithValue(err.message || "Check auth failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return rejectWithValue(error.message || error);
      clearStorage();
      return true;
    } catch (err) {
      return rejectWithValue(err.message || "Logout failed");
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
      try {
        if (action.payload)
          localStorage.setItem(userKey, JSON.stringify(action.payload));
      } catch {}
    },
    forceLogout(state) {
      state.user = null;
      state.isAuth = false;
      state.loading = false;
      state.error = null;
      clearStorage();
    },
  },
  extraReducers: (builder) =>
    builder
      // register
      .addCase(registerUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload?.user ?? null;
        s.isAuth = Boolean(a.payload?.session || a.payload?.user);
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error?.message;
      })

      // login
      .addCase(loginUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload?.user ?? null;
        s.isAuth = Boolean(a.payload?.session || a.payload?.user);
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error?.message;
      })

      // check
      .addCase(checkAuth.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(checkAuth.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload?.user ?? null;
        s.isAuth = Boolean(a.payload?.user || a.payload?.session);
      })
      .addCase(checkAuth.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error?.message;
        s.user = null;
        s.isAuth = false;
      })

      // logout
      .addCase(logoutUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(logoutUser.fulfilled, (s) => {
        s.loading = false;
        s.user = null;
        s.isAuth = false;
        clearStorage();
      })
      .addCase(logoutUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error?.message;
      }),
});

export const { setUser, forceLogout } = authSlice.actions;
export default authSlice.reducer;
