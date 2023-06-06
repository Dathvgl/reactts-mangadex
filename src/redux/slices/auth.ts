import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import AuthService from "~/models/AuthService";
import { UserMongo, UserState } from "~/types";

type AuthState = {
  user?: UserMongo;
  isUser?: boolean;
  error?: string;
};

const initialState: AuthState = { isUser: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isUser = true;
      state.error = undefined;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload?.error;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = undefined;
      state.isUser = false;
      state.error = undefined;
    });
  },
});

export const login = createAsyncThunk<
  AuthState,
  UserState,
  { rejectValue: AuthState }
>("isUser/login", async (props: UserState, { rejectWithValue }) => {
  try {
    const res = await AuthService.login(props);
    toast.success("User login");
    return { user: res.data as UserMongo };
  } catch (err) {
    const error = err as AxiosError;
    const message = (error.response?.data as string) ?? error.message;
    toast.error(message);
    return rejectWithValue({ error: message });
  }
});

export const logout = createAsyncThunk("isUser/logout", async () => {
  await AuthService.logout();
  toast.success("User logout");
});

export const authReducer = authSlice.reducer;
