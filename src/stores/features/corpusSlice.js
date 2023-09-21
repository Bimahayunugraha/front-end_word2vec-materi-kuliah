import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CorpusAPI from "../../apis/corpus.api";

const initialState = {
  data: [],
  meta: {},
  status: "idie",
  error: null,
  loading: false,
};

export const fetchCorpus = createAsyncThunk("fetch/corpus", async () => {
  try {
    const response = await CorpusAPI.filesListCorpus();
    const data = response.data.payload;
    const meta = response.data.meta;
    return { data, meta };
  } catch (error) {
    throw Error(error);
  }
});

export const fetchCorpusByIdWithContent = createAsyncThunk(
  "fetch/corpus/withcontent/byid",
  async (id) => {
    try {
      const response = await CorpusAPI.getFileCorpusByIdWithContent(id);
      return response.data.payload;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const fetchCorpusByIdWithoutContent = createAsyncThunk(
  "fetch/corpus/withoutcontent/byid",
  async (id) => {
    try {
      const response = await CorpusAPI.getFileCorpusByIdWithoutContent(id);
      return response.data.payload;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const convertCorpus = createAsyncThunk("convert/corpus", async (data) => {
  try {
    const response = await CorpusAPI.corpusConvert(data);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const editCorpusFileContent = createAsyncThunk("edit/corpus/fileContent", async (data) => {
  try {
    const response = await CorpusAPI.editCorpusFileContent(data);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const editCorpus = createAsyncThunk("edit/corpus", async (data) => {
  try {
    const response = await CorpusAPI.editCorpus(data);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const deleteCorpus = createAsyncThunk("delete/corpus", async (id) => {
  try {
    const response = await CorpusAPI.deleteCorpus(id);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

const corpusSlice = createSlice({
  name: "corpus",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCorpus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCorpus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.meta = action.payload;
      })
      .addCase(fetchCorpus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCorpusByIdWithContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCorpusByIdWithContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCorpusByIdWithContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCorpusByIdWithoutContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCorpusByIdWithoutContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCorpusByIdWithoutContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(convertCorpus.fulfilled, (state) => {
        state.loading = !state.loading;
      })
      .addCase(editCorpus.fulfilled, (state) => {
        state.loading = !state.loading;
      })
      .addCase(editCorpusFileContent.fulfilled, (state) => {
        state.loading = !state.loading;
      })
      .addCase(deleteCorpus.fulfilled, (state) => {
        state.loading = !state.loading;
      });
  },
});

export default corpusSlice.reducer;
