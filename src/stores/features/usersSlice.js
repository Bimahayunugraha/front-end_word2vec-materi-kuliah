import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UsersAPI from "../../apis/users.api";

const initialState = {
  data: [],
  status: "idie",
  error: null,
  loading: false,
};

export const fetchUsersByRoleDosen = createAsyncThunk("fetch/users/dosen", async (take) => {
  try {
    const response = await UsersAPI.getUsersByRoleDosen(take);
    const data = response.data.payload;
    const meta = response.data.meta;
    return { data, meta };
  } catch (error) {
    throw Error(error);
  }
});

export const addNewUsaer = createAsyncThunk("add/newUser", async (data) => {
  try {
    const response = await UsersAPI.addNewUser(data);
    return response.data.data;
  } catch (error) {
    throw Error(error);
  }
});

export const fetchUserById = createAsyncThunk("fetch/userById", async () => {
  try {
    const response = await UsersAPI.getUserById();
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const editInformationProfileUserRoleDosen = createAsyncThunk(
  "edit/informationProfile/user/dosen/",
  async (data) => {
    try {
      const response = await UsersAPI.editUserRoleDosen(data);
      return response.data.payload;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const editPassword = createAsyncThunk("edit/password", async (data) => {
  try {
    const response = await UsersAPI.editPassword(data);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const editPhotoProfileUserRoleDosen = createAsyncThunk(
  "edit/photoProfile/user/dosen",
  async (data) => {
    try {
      const response = await UsersAPI.editUserProfileRoleDosen(data);
      return response.data.payload;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const deleteUserByIdForRoleDosen = createAsyncThunk("delete/user/dosen", async (id) => {
  try {
    const response = await UsersAPI.deleteUserByIdForRoleDosen(id);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersByRoleDosen.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsersByRoleDosen.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.meta = action.payload;
      })
      .addCase(fetchUsersByRoleDosen.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewUsaer.fulfilled, (state) => {
        state.loading = !state.loading;
      })
      .addCase(editInformationProfileUserRoleDosen.fulfilled, (state) => {
        state.loading = !state.loading;
      })
      .addCase(editPassword.fulfilled, (state) => {
        state.loading = !state.loading;
      })
      .addCase(editPhotoProfileUserRoleDosen.fulfilled, (state) => {
        state.loading = !state.loading;
      })
      .addCase(deleteUserByIdForRoleDosen.fulfilled, (state) => {
        state.loading = !state.loading;
      });
  },
});

export default usersSlice.reducer;
