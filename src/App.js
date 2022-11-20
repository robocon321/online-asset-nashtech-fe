import { Routes, Route } from "react-router-dom";

import "./App.css";
import MainLayout from "./components/common/MainLayout";
// import ListUser from "./components/list-user/ListUser";
import CreateUserPage from "./pages/CreateUserPage";
import HomePage from "./pages/HomePage";
<<<<<<< HEAD
// import ListUserPage from "./pages/ListUserPage";
import NewListUserPage from "./pages/NewListUserPage";
=======
import ListUserPage from "./pages/ListUserPage";
import LoginPage from "./pages/LoginPage";
>>>>>>> main

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="/users/create" element={<CreateUserPage />} />
        <Route path="/users" element={<NewListUserPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
