import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import MatchMetaBar from "../components/match/MatchMetaBar";
import MatchSummary from "../components/match/MatchSummary";
import TeamStatsTable from "../components/match/TeamStatsTable";
import { probabilityTimeline } from "../data/mockProbability";
import { getMatchTeamSummary } from "../api/matchApi";

function MatchDetailPage() {
  const { matchId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const match = location.state?.match;

  const [minute, setMinute] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [teamSummary, setTeamSummary] = useState(null);

  // ▶ 재생 로직
  useEffect(() => {
    if (!playing || minute >= 90) return;

    const timer = setInterval(() => {
      setMinute((prev) => prev + 1);
    }, 500);

    return () => clearInterval(timer);
  }, [playing, minute]);

  // ▶ 팀 요약 백엔드 연동
  useEffect(() => {
    if (!matchId) return;

    getMatchTeamSummary(matchId)
      .then(setTeamSummary)
      .catch(console.error);
  }, [matchId]);

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

  if (!match) {
    return (
      <div style={{ background: "#1c1c1c", color: "#fff", padding: "16px" }}>
        <h2>경기 정보를 불러올 수 없습니다.</h2>
        <button onClick={() => navigate("/rounds")}>라운드로 이동</button>
        <p>matchId: {matchId}</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#1c1c1c", color: "#fff" }}>
      {/* 상단 경기 정보 + 컨트롤 */}
      <MatchMetaBar
        match={match}
        minute={minute}
        playing={playing}
        onToggle={handleTogglePlay}
        onReset={handleReset}
        onChangeMinute={handleChangeMinute}
      />

      {/* 확률 요약 */}
      <MatchSummary match={match} probability={currentProb} />

      {/* 팀 비교 분석 (백엔드 데이터) */}
      {teamSummary && (
        <TeamStatsTable match={match} stats={teamSummary} />
      )}
    </div>
  );
}

export default MatchDetailPage;