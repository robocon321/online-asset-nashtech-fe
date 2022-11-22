import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import MainLayout from "./components/common/MainLayout";
import { AppContext } from "./contexts/providers/AppProvider";
import CreateUserPage from "./pages/CreateUserPage";
import HomePage from "./pages/HomePage";
// import ListUserPage from "./pages/ListUserPage";
import NewListUserPage from "./pages/NewListUserPage";
import EditUserPage from "./pages/EditUserPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const { appState } = useContext(AppContext);
  if (appState.user) {
    if (appState.user.role == "ADMIN") {
      return (
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="/users/create" element={<CreateUserPage />} />
            <Route path="/users/edit/:id" element={<EditUserPage />} />
            <Route path="/users" element={<NewListUserPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      );
    }
  } else {
    return <LoginPage />;
  }
}

export default App;
