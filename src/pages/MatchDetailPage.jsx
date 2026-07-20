import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import TimelineController from "../components/match/TimelineController";
import MatchHeader from "../components/match/MatchHeader";
import MatchSummary from "../components/match/MatchSummary";
import ProbabilityChart from "../components/match/ProbabilityChart";
import TeamStatsTable from "../components/match/TeamStatsTable";
import {
  getMatchTeamSummary,
  getMatchGoalProbabilities,
  getMatchWinProbabilities,
} from "../api/matchApi";
import styles from "./MatchDetailPage.module.css";
import { normalizeWinTimeline } from "../features/matches/utils/normalizeWinTimeline";

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
  const normalizedWinTimeline = useMemo(
    () => normalizeWinTimeline(winTimeline),
    [winTimeline]
  );

  const maxMinute = Math.max(
    ...goalTimeline.map((point) => Number(point.minute) || 0),
    ...normalizedWinTimeline.map((point) => point.minute),
    0
  );

  useEffect(() => {
    if (!playing || minute >= maxMinute) return;

    const timer = setTimeout(() => {
      const nextMinute = Math.min(minute + 1, maxMinute);
      setMinute(nextMinute);

      if (nextMinute >= maxMinute) {
        setPlaying(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [playing, minute, maxMinute]);

  /* 현재 분 데이터 */
  const currentGoal =
    goalTimeline.find((p) => p.minute === minute) ?? null;

  const currentWin =
    normalizedWinTimeline.find((point) => point.minute === minute) ?? null;

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

          home: currentWin?.home ?? null,
          draw: currentWin?.draw ?? null,
          away: currentWin?.away ?? null,
        }
      : null;

  const handleTogglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }

    if (maxMinute <= 0) return;
    if (minute >= maxMinute) setMinute(0);
    setPlaying(true);
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
      <div className={styles.page}>
        <section className={styles.missingMatch}>
          <h1>경기 정보를 불러올 수 없습니다.</h1>
          <p>라운드 목록에서 경기를 다시 선택해 주세요.</p>
          <button type="button" onClick={() => navigate("/rounds")}>
            라운드로 이동
          </button>
          <p>matchId: {matchId}</p>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <button
        className={styles.backButton}
        type="button"
        onClick={() => navigate("/rounds")}
      >
        ← {match.round?.roundNumber ?? ""}R 경기 목록
      </button>

      <div className={styles.content}>
        <MatchHeader match={match} />

        <TimelineController
          minute={minute}
          maxMinute={maxMinute}
          playing={playing}
          onToggle={handleTogglePlay}
          onReset={handleReset}
          onChangeMinute={handleChangeMinute}
        />

        {currentProb && (
          <MatchSummary match={match} probability={currentProb} />
        )}

        {!currentProb && (
          <div className={styles.probabilityPlaceholder} role="status">
            선택한 시간의 확률 데이터가 없습니다.
          </div>
        )}

        <ProbabilityChart
          timeline={normalizedWinTimeline}
          minute={minute}
          maxMinute={maxMinute}
          onChangeMinute={handleChangeMinute}
        />

        {teamSummary && (
          <TeamStatsTable match={match} stats={teamSummary} />
        )}
      </div>
    </div>
  );
}

export default MatchDetailPage;
