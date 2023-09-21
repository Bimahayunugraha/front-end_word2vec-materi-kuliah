import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CourseMaterialAPI from "../../apis/courseMaterial.api";

const initialState = {
  data: [],
  meta: {},
  status: "idie",
  error: null,
  loading: false,
};

export const fetchListsFileCourseMaterials = createAsyncThunk(
  "fetch/files/courseMaterial",
  async () => {
    try {
      const response = await CourseMaterialAPI.getListsCourseMaterial();
      return response.data.payload;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const editInformationCourseMaterial = createAsyncThunk(
  "edit/information/courseMaterial",
  async (data) => {
    try {
      const response = await CourseMaterialAPI.editInformationCourseMaterial(data);
      return response.data.payload;
    } catch (error) {
      throw Error(error);
    }
  }
);

const courseMaterialSlice = createSlice({
  name: "courseMaterials",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchListsFileCourseMaterials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchListsFileCourseMaterials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchListsFileCourseMaterials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editInformationCourseMaterial.fulfilled, (state) => {
        state.loading = !state.loading;
      });
  },
});

export default courseMaterialSlice.reducer;
