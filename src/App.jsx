import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoundsPage from "./pages/RoundsPage";
import MatchDetailPage from "./pages/MatchDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/rounds" replace />} />
        <Route path="/rounds" element={<RoundsPage />} />
        <Route path="/matches/:matchId" element={<MatchDetailPage />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;