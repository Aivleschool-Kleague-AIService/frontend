import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom"; // ✅ [추가]
import MatchMetaBar from "../components/match/MatchMetaBar";
import MatchSummary from "../components/match/MatchSummary";
import TimeController from "../components/match/TimeController";
import { probabilityTimeline } from "../data/mockProbability";



function MatchDetailPage() {
  const { matchId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ [추가] rounds에서 전달된 match
  const match = location.state?.match;

  console.log("match from state:", match);

  const [minute, setMinute] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || minute >= 90) return;

    const timer = setInterval(() => {
      setMinute((prev) => prev + 1);
    }, 500);

    return () => clearInterval(timer);
  }, [playing, minute]);

  const currentProb = probabilityTimeline[minute];

  const handleTogglePlay = () => {
    if (minute >= 90) setMinute(0);
    setPlaying((p) => !p);
  };

  const handleReset = () => {
    setPlaying(false);
    setMinute(0);
  };

  const handleChangeMinute = (value) => {
    setPlaying(false);
    setMinute(value);
  };

  // ✅ [추가] 새로고침 등으로 state가 없을 때 방어
  if (!match) {
    return (
      <div style={{ minHeight: "100vh", background: "#1c1c1c", color: "#fff", padding: "16px" }}>
        <h2>경기 정보를 불러올 수 없어요.</h2>
        <p>라운드 페이지에서 경기를 다시 선택해 주세요.</p>
        <button onClick={() => navigate("/rounds")} style={{ padding: "8px 12px" }}>
          라운드로 돌아가기
        </button>
        <p style={{ opacity: 0.7, marginTop: "12px" }}>matchId: {matchId}</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#1c1c1c", color: "#fff" }}>
      <MatchMetaBar match={match} />
  
      <MatchSummary match={match} probability={currentProb} />
  
      <TimeController
        minute={minute}
        playing={playing}
        onToggle={handleTogglePlay}
        onReset={handleReset}
        onChangeMinute={handleChangeMinute}
      />
    </div>
  );
}

export default MatchDetailPage;