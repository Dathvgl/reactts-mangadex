import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { mangadexUrl } from "~/main";
import { AuthErrorMangadex, AuthOkMangadex, ResultMangadex } from "~/types";
import { RootState } from "../store";

export type AuthState = AuthOkMangadex & {
  isAuthen?: boolean;
  error?: string | null;
};

const initialState: AuthState = {
  isAuthen: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthen = true;
        state.token = action.payload.token ?? undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message ?? "";
      });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthen = false;
      state.token = undefined;
    });
  },
});

type LoginProps = { username?: string; email?: string; password: string };

export const login = createAsyncThunk<
  AuthState,
  LoginProps,
  { rejectValue: AuthErrorMangadex }
>("auth/login", async (props: LoginProps, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${mangadexUrl}/auth/login`, props, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: ResultMangadex = res.data;
    if (data.result == "ok") {
      const { token } = res.data as AuthOkMangadex;
      return { token };
    } else {
      return {};
    }
  } catch (e) {
    type Result = ResultMangadex & AuthErrorMangadex;
    const error: AxiosError = e as AxiosError;
    const data: Result = error.response?.data as Result;
    return rejectWithValue(data);
  }
});

export const logout = createAsyncThunk<void, void, { state: RootState }>(
  "auth/logout",
  async (_, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      await axios.post(
        `${mangadexUrl}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token.refresh}`,
          },
        }
      );
    }
  }
);

export const authReducer = authSlice.reducer;
