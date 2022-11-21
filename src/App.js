import { Routes, Route } from "react-router-dom";

import "./App.css";
import MainLayout from "./components/common/MainLayout";
import CreateUserPage from "./pages/CreateUserPage";
import HomePage from "./pages/HomePage";
import ListUserPage from "./pages/ListUserPage";
import LoginPage from "./pages/LoginPage";
import EditUserPage from "./pages/EditUserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="/users/create" element={<CreateUserPage />} />
        <Route path="/users/edit" element={<EditUserPage />} />
        <Route path="/users" element={<ListUserPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
