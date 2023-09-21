import { combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import corpusSlice from "./corpusSlice";
import sentenceSlice from "./sentenceSlice";
import sent2vecSlice from "./sent2vecSlice";
import word2vecSlice from "./word2vecSlice";
import courseMaterialsSlice from "./courseMaterialSlice";
import loaderSubmitSlice from "./loaderSubmitSlice";
import rolesSlice from "./rolesSlice";
import similaritySlice from "./similaritySlice";
import authSlice from "./authSlice";

export const rootReducer = combineReducers({
  auth: authSlice,
  loaderSubmit: loaderSubmitSlice,
  courseMaterials: courseMaterialsSlice,
  users: usersSlice,
  corpus: corpusSlice,
  sentence: sentenceSlice,
  sent2vec: sent2vecSlice,
  word2vec: word2vecSlice,
  roles: rolesSlice,
  similarity: similaritySlice,
});
