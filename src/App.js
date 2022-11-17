import { Routes, Route } from "react-router-dom";

import "./App.css";
import MainLayout from "./components/common/MainLayout";
import HomePage from "./pages/HomePage";
import ListUserPage from "./pages/ListUserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="/users" element={<ListUserPage />} />
      </Route>
    </Routes>
  );
}

export default App;
