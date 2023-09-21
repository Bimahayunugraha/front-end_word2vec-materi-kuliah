import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthAPI from "../../apis/auth.api";

const initialState = {
  data: [],
  status: "idie",
  error: null,
  loading: false,
};

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await AuthAPI.login(data);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const logout = createAsyncThunk("auth/logout", async (data) => {
  try {
    const response = await AuthAPI.logout(data);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const verifyResetPasswordToken = createAsyncThunk(
  "verify/reset/password/token",
  async (data) => {
    try {
      const response = await AuthAPI.verifyResetPasswordToken(data);
      return response.data.payload;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const sendResetPasswordLink = createAsyncThunk(
  "auth/sendResetPasswordLink",
  async (data) => {
    try {
      const response = await AuthAPI.sendResetPasswordLink(data);
      return response.data.payload;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const resetPassword = createAsyncThunk("auth/resetPassword", async (data) => {
  try {
    const response = await AuthAPI.resetPassword(data);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(verifyResetPasswordToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyResetPasswordToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(verifyResetPasswordToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = !state.loading;
      })
      .addCase(logout.fulfilled, () => {})
      .addCase(sendResetPasswordLink.fulfilled, (state) => {
        state.loading = !state.loading;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = !state.loading;
      });
  },
});

export default authSlice.reducer;
