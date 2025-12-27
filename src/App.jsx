import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoundsPage from "./pages/RoundsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ 기본 경로 → rounds로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/rounds" replace />} />

        {/* ✅ rounds 페이지 */}
        <Route path="/rounds" element={<RoundsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;