// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header";
import RoundsPage from "./pages/RoundsPage";
import MatchDetailPage from "./pages/MatchDetailPage";

function App() {
  return (
    <BrowserRouter>
      {/* ✅ 공통 헤더 */}
      <Header />

      <Routes>
        {/* 초기 진입 → 라운드 페이지 */}
        <Route path="/" element={<Navigate to="/rounds" replace />} />

        {/* 라운드 목록 */}
        <Route path="/rounds" element={<RoundsPage />} />

        {/* 경기 상세 */}
        <Route path="/matches/:matchId" element={<MatchDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;