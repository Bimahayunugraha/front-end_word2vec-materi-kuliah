import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RolesAPI from "../../apis/role.api";

const initialState = {
  data: [],
  status: "idie",
  error: null,
  loading: false,
};

export const fetchRoles = createAsyncThunk("fetch/roles", async () => {
  try {
    const response = await RolesAPI.getRole();
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const addRole = createAsyncThunk("add/role", async (data) => {
  try {
    const response = await RolesAPI.addRole(data);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const editRole = createAsyncThunk("edit/role", async (data) => {
  try {
    const response = await RolesAPI.editRole(data);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const deleteRole = createAsyncThunk("delete/role", async (id) => {
  try {
    const response = await RolesAPI.deleteRole(id);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addRole.fulfilled, (state) => {
        state.loading = !state.loading;
      })
      .addCase(editRole.fulfilled, (state) => {
        state.loading = !state.loading;
      })
      .addCase(deleteRole.fulfilled, (state) => {
        state.loading = !state.loading;
      });
  },
});

export default rolesSlice.reducer;
