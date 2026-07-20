// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import RoundsPage from "./pages/RoundsPage";
import MatchDetailPage from "./pages/MatchDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/rounds" replace />} />
          <Route path="/rounds" element={<RoundsPage />} />
          <Route path="/matches/:matchId" element={<MatchDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
