import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SimilarityAPI from "../../apis/similarity.api";

const initialState = {
  data: [],
  status: "idie",
  error: null,
  loading: false,
};

export const checkSimilarity = createAsyncThunk("check/similarity", async (data) => {
  try {
    const response = await SimilarityAPI.checkSimilarity(data);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const loadModelWord2vec = createAsyncThunk("load/modelWord2vec", async (data) => {
  try {
    const response = await SimilarityAPI.loadModelWord2vec(data);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

const similaritySlice = createSlice({
  name: "similarity",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(checkSimilarity.fulfilled, (state) => {
        state.loading = !state.loading;
      })
      .addCase(loadModelWord2vec.fulfilled, (state) => {
        state.loading = !state.loading;
      });
  },
});

export default similaritySlice.reducer;
