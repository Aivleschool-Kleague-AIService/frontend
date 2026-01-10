import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import MatchMetaBar from "../components/match/MatchMetaBar";
import MatchSummary from "../components/match/MatchSummary";
import TeamStatsTable from "../components/match/TeamStatsTable";
import {
  getMatchTeamSummary,
  getMatchGoalProbabilities,
  getMatchWinProbabilities,
} from "../api/matchApi";

function MatchDetailPage() {
  const { matchId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const match = location.state?.match;

  const [minute, setMinute] = useState(0);
  const [playing, setPlaying] = useState(false);

  const [teamSummary, setTeamSummary] = useState(null);
  const [goalTimeline, setGoalTimeline] = useState([]);
  const [winTimeline, setWinTimeline] = useState([]);

  /* 팀 요약 */
  useEffect(() => {
    if (!matchId) return;
    getMatchTeamSummary(matchId)
      .then(setTeamSummary)
      .catch(console.error);
  }, [matchId]);

  /* 골 확률 */
  useEffect(() => {
    if (!matchId) return;
    getMatchGoalProbabilities(matchId)
      .then((res) => {
        setGoalTimeline(res.timeline ?? []);
      })
      .catch(console.error);
  }, [matchId]);

  /* 승률 */
  useEffect(() => {
    if (!matchId) return;
    getMatchWinProbabilities(matchId)
      .then((res) => {
        setWinTimeline(res.timeline ?? []);
      })
      .catch(console.error);
  }, [matchId]);

  /* 최대 분 */
  const maxMinute = Math.max(
    goalTimeline.length > 0
      ? goalTimeline[goalTimeline.length - 1].minute
      : 0,
    winTimeline.length > 0
      ? winTimeline[winTimeline.length - 1].minute
      : 0
  );

  /* 재생 */
  useEffect(() => {
    if (!playing || minute >= maxMinute) return;

    const timer = setInterval(() => {
      setMinute((prev) => prev + 1);
    }, 500);

    return () => clearInterval(timer);
  }, [playing, minute, maxMinute]);

  /* 현재 분 데이터 */
  const currentGoal =
    goalTimeline.find((p) => p.minute === minute) ?? null;

  const currentWin =
    winTimeline.find((p) => p.minute === minute) ?? null;

  const currentProb =
    currentGoal || currentWin
      ? {
          minute,

          // 골 확률
          homeGoalProbability:
            currentGoal?.homeGoalProbability ??
            currentGoal?.home_goal_probability ??
            null,

          awayGoalProbability:
            currentGoal?.awayGoalProbability ??
            currentGoal?.away_goal_probability ??
            null,

          // ✅ 승률: 무조건 퍼센트로 변환
          home:
            currentWin?.homeWinProbability != null
              ? currentWin.homeWinProbability * 100
              : currentWin?.home != null
              ? currentWin.home * 100
              : currentWin?.home_win_probability != null
              ? currentWin.home_win_probability * 100
              : null,

          draw:
            currentWin?.drawWinProbability != null
              ? currentWin.drawWinProbability * 100
              : currentWin?.draw != null
              ? currentWin.draw * 100
              : currentWin?.draw_win_probability != null
              ? currentWin.draw_win_probability * 100
              : null,

          away:
            currentWin?.awayWinProbability != null
              ? currentWin.awayWinProbability * 100
              : currentWin?.away != null
              ? currentWin.away * 100
              : currentWin?.away_win_probability != null
              ? currentWin.away_win_probability * 100
              : null,
        }
      : null;

  const handleTogglePlay = () => {
    if (minute >= maxMinute) setMinute(0);
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
      <MatchMetaBar
        match={match}
        minute={minute}
        playing={playing}
        onToggle={handleTogglePlay}
        onReset={handleReset}
        onChangeMinute={handleChangeMinute}
        maxMinute={maxMinute}
      />

      {currentProb && (
        <MatchSummary match={match} probability={currentProb} />
      )}

      {teamSummary && (
        <TeamStatsTable match={match} stats={teamSummary} />
      )}
    </div>
  );
}

export default MatchDetailPage;