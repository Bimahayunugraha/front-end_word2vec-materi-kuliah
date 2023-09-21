import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import VectorAPI from "../../apis/vector.api";

const initialState = {
  data: [],
  status: "idie",
  error: null,
  loading: false,
};

export const fetchSent2vec = createAsyncThunk("fetch/sent2vec", async () => {
  try {
    const response = await VectorAPI.getListFilesSent2vec();
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const deleteSent2vec = createAsyncThunk("delete/sent2vec", async (id) => {
  try {
    const response = await VectorAPI.deleteVector(id);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

const sent2vecSlice = createSlice({
  name: "sent2vec",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSent2vec.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSent2vec.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSent2vec.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSent2vec.fulfilled, (state) => {
        state.loading = !state.loading;
      });
  },
});

export default sent2vecSlice.reducer;
