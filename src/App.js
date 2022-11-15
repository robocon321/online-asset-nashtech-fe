import { Routes, Route } from "react-router-dom";

import "./App.css";
import MainLayout from "./components/common/MainLayout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
