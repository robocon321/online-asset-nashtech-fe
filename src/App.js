import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import MainLayout from "./components/common/MainLayout";
import { AppContext } from "./contexts/providers/AppProvider";
import CreateUserPage from "./pages/CreateUserPage";
import HomePage from "./pages/HomePage";
// import ListUserPage from "./pages/ListUserPage";
import NewListUserPage from "./pages/NewListUserPage";
import EditUserPage from "./pages/EditUserPage";
import LoginPage from "./pages/LoginPage";
import UserLayout from "./components/users/UserLayout";
import Loading from "./components/common/loading/Loading";
import AssetLayout from "./components/assets/AssetLayout";
import CreateAssetPage from "./pages/CreateAssetPage";
import ListAssetPage from "./pages/ListAssetPage";

function App() {
  const { appState } = useContext(AppContext);
  if (appState.user != null) {
    if (appState.user.role == "ADMIN") {
      return (
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="users" element={<UserLayout />}>
              <Route path="" element={<NewListUserPage />} />
              <Route path="create" element={<CreateUserPage />} />
              <Route path="edit/:id" element={<EditUserPage />} />
            </Route>
            <Route path="assets" element={<AssetLayout />}>
<<<<<<< HEAD
<<<<<<< HEAD
              <Route path="" element={<ListAssetPage />}></Route>
              <Route path="create" element={<CreateAssetPage />} />
            </Route>
            {appState.user == null && (
              <Route path="/login" element={<LoginPage />} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
=======
=======
>>>>>>> 7b1069b5f9852eaaf7c052f9a808ecddac41c5d7
              <Route path="create" element={<CreateAssetPage />} />
            </Route>
            {
              appState.user == null && <Route path="/login" element={<LoginPage />} />
            }
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
>>>>>>> 7b1069b (T1161 Validate fields)
          </Route>
        </Routes>
      );
    } else if (appState.user.role == "STAFF") {
      return (
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<HomePage />} />
          </Route>
          {appState.user == null && (
            <Route path="/login" element={<LoginPage />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      );
    } else {
      return <LoginPage />;
    }
  } else {
    if (appState.status.isLoading) {
      return <Loading />;
    } else
      return (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      );
  }
}

export default App;
