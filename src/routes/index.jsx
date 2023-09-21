import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import AdminOnlyRoute from "./AdminOnlyRoute";
import DosenOnlyRoute from "./DosenOnlyRoute";
import { DashboardPage, ManageDosenPage, ManageRolePage, ProfileAdminPage } from "../pages/Admin";
import {
  AllEmbeddingFileListPage,
  DetailAllEmbeddingFilePage,
  FilterAllEmbeddingFilePage,
  HomePage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  ResetPasswordPage,
  ResetPasswordTokenExpiredPage,
  SearchAllEmbeddingFilePage,
  SendResetPasswordLinkPage,
} from "../pages";
import {
  CheckSimilarityPage,
  ConvertCorpusPage,
  ConvertSentencePage,
  ConvertWord2vecPage,
  CorpusListByCoursePage,
  CorpusListPage,
  CourseMaterialListByCoursePage,
  CourseMaterialListPage,
  DetailCorpusPage,
  DetailSimilarityResultByClassPage,
  DetailSimilarityResultByExamPage,
  DetailSimilarityResultByStudentPage,
  DetailWord2vecPage,
  DownloadCorpusPage,
  DownloadSentencePage,
  DownloadWord2vecPage,
  EditCorpusFileContentPage,
  ProfileDosenPage,
  Sent2vecListPage,
  SentenceListPage,
  SimilarityResultListPage,
  Word2vecListByCoursePage,
  Word2vecListPage,
} from "../pages/Dosen";
import AllEmbeddingFileLayout from "../layouts/AllEmbeddingFileLayout";

const Router = () => {
  return (
    <>
      <BrowserRouter basename="/w2v-materi-kuliah">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<AdminOnlyRoute />}>
              <Route path="/" element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="manage-dosen" element={<ManageDosenPage />} />
                <Route path="manage-role" element={<ManageRolePage />} />
                <Route path="admin-profile" element={<ProfileAdminPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<DosenOnlyRoute />}>
              <Route path="/" element={<MainLayout />}>
                <Route path="corpus" element={<ConvertCorpusPage />} />
                <Route path="filelist/corpus/file" element={<CorpusListPage />} />
                <Route path="filelist/corpus/file/:course" element={<CorpusListByCoursePage />} />
                <Route path="download/corpus/file/:course/:id" element={<DownloadCorpusPage />} />
                <Route path="filelist/corpus/file/:course/:id" element={<DetailCorpusPage />} />
                <Route path="filelist/corpus/file/edit" element={<EditCorpusFileContentPage />} />
                <Route path="vector" element={<ConvertWord2vecPage />} />
                <Route path="filelist/word2vec/file" element={<Word2vecListPage />} />
                <Route
                  path="filelist/word2vec/file/:course"
                  element={<Word2vecListByCoursePage />}
                />
                <Route path="filelist/word2vec/file/:course/:id" element={<DetailWord2vecPage />} />
                <Route path="download/vector/file/:course/:id" element={<DownloadWord2vecPage />} />
                <Route path="check-similarity" element={<CheckSimilarityPage />} />
                <Route path="similarity-result" element={<SimilarityResultListPage />} />
                <Route
                  path="similarity-result/detail/:exam_name"
                  element={<DetailSimilarityResultByExamPage />}
                />
                <Route
                  path="similarity-result/detail/:exam_name/:student_class"
                  element={<DetailSimilarityResultByClassPage />}
                />
                <Route
                  path="similarity-result/detail/:exam_name/:student_class/:student_nim"
                  element={<DetailSimilarityResultByStudentPage />}
                />
                <Route path="filelist/course-material/file" element={<CourseMaterialListPage />} />
                <Route
                  path="filelist/course-material/file/:course"
                  element={<CourseMaterialListByCoursePage />}
                />
                <Route path="dosen-profile/:username" element={<ProfileDosenPage />} />

                <Route path="filelist/sent2vec" element={<Sent2vecListPage />} />
                <Route path="sentence" element={<ConvertSentencePage />} />
                <Route path="filelist/sentence" element={<SentenceListPage />} />
                <Route path="download/sentence/:id" element={<DownloadSentencePage />} />
              </Route>
            </Route>
          </Route>
          <Route path="/" element={<AllEmbeddingFileLayout />}>
            <Route path="w2v/all" element={<AllEmbeddingFileListPage />} />
            <Route path="w2v/all/results" element={<SearchAllEmbeddingFilePage />} />
            <Route path="w2v/all/filters" element={<FilterAllEmbeddingFilePage />} />
            <Route path="w2v/all/detail" element={<DetailAllEmbeddingFilePage />} />
          </Route>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="reset-password-link" element={<SendResetPasswordLinkPage />} />
            <Route path="resetPassword" element={<ResetPasswordPage />} />
            <Route path="resetPassword/status" element={<ResetPasswordTokenExpiredPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
