import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SentenceAPI from "../../apis/sentence.api";

const initialState = {
  data: [],
  status: "idie",
  error: null,
  loading: false,
};

export const fetchSentence = createAsyncThunk("fetch/sentence", async () => {
  try {
    const response = await SentenceAPI.getFilesListSentences();
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const deleteSentence = createAsyncThunk("delete/sentence", async (id) => {
  try {
    const response = await SentenceAPI.deleteSentence(id);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

const sentenceSlice = createSlice({
  name: "sentence",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSentence.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSentence.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSentence.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSentence.fulfilled, (state) => {
        state.loading = !state.loading;
      });
  },
});

export default sentenceSlice.reducer;
