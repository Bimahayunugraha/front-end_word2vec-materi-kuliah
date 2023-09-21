import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Word2vecAPI from "../../apis/word2vec.api";

const initialState = {
  data: [],
  status: "idie",
  error: null,
  loading: false,
};

export const fetchWord2vec = createAsyncThunk("fetch/word2vec", async () => {
  try {
    const response = await Word2vecAPI.filesListWord2vec();
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const fetchAllWord2vec = createAsyncThunk("fetch/all/word2vec", async (limit, page) => {
  try {
    const response = await Word2vecAPI.getAllfilesListWord2vec(limit, page);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});
export const searchAllWord2vec = createAsyncThunk("search/all/word2vec", async (search, limit) => {
  try {
    const response = await Word2vecAPI.searchWord2vec(search, limit);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const fetchWord2vecByIdWithContentFile = createAsyncThunk(
  "fetch/word2vec/byId/withContentFile",
  async (id) => {
    try {
      const response = await Word2vecAPI.getFileWord2vecByIdWithContentFile(id);
      return response.data.payload;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const fetchWord2vecByIdWithoutContentFile = createAsyncThunk(
  "fetch/word2vec/byId/withoutContentFile",
  async (id) => {
    try {
      const response = await Word2vecAPI.getFileWord2vecByIdWithoutContentFile(id);
      return response.data.payload;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const convertWord2vec = createAsyncThunk("convert/word2vec", async (data) => {
  try {
    const response = await Word2vecAPI.word2vecConvert(data);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const editWord2vec = createAsyncThunk("edit/word2vec", async (data) => {
  try {
    const response = await Word2vecAPI.editWord2vec(data);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

export const deleteWord2vec = createAsyncThunk("delete/word2vec", async (id) => {
  try {
    const response = await Word2vecAPI.deleteVector(id);
    return response.data.payload;
  } catch (error) {
    throw Error(error);
  }
});

const word2vecSlice = createSlice({
  name: "word2vec",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchWord2vec.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWord2vec.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchWord2vec.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchWord2vecByIdWithContentFile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWord2vecByIdWithContentFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchWord2vecByIdWithContentFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchWord2vecByIdWithoutContentFile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWord2vecByIdWithoutContentFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchWord2vecByIdWithoutContentFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(convertWord2vec.fulfilled, (state) => {
        state.loading = !state.loading;
      })
      .addCase(searchAllWord2vec.fulfilled, (state) => {
        state.loading = !state.loading;
      })
      .addCase(editWord2vec.fulfilled, (state) => {
        state.loading = !state.loading;
      })
      .addCase(deleteWord2vec.fulfilled, (state) => {
        state.loading = !state.loading;
      });
  },
});

export default word2vecSlice.reducer;
