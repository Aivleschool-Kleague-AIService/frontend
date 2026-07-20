import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import TimelineController from "../components/match/TimelineController";
import MatchHeader from "../components/match/MatchHeader";
import MatchSummary from "../components/match/MatchSummary";
import ProbabilityChart from "../components/match/ProbabilityChart";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";
import styles from "./MatchDetailPage.module.css";
import useMatchDetail from "../features/matches/hooks/useMatchDetail";

function MatchDetailPage() {
  const { matchId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const initialMatch = location.state?.match ?? null;

  const [minute, setMinute] = useState(0);
  const [playing, setPlaying] = useState(false);

  const {
    match,
    goalTimeline,
    winTimeline,
    loading,
    error,
    empty,
    retry,
  } = useMatchDetail(matchId, initialMatch);

  const maxMinute = Math.max(
    ...goalTimeline.map((point) => Number(point.minute) || 0),
    ...winTimeline.map((point) => point.minute),
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
    winTimeline.find((point) => point.minute === minute) ?? null;

  const currentProb =
    currentGoal || currentWin
      ? {
          minute,
          homeGoalProbability: currentGoal?.homeGoalProbability ?? null,
          awayGoalProbability: currentGoal?.awayGoalProbability ?? null,
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

  return (
    <div className={styles.page}>
      <button
        className={styles.backButton}
        type="button"
        onClick={() => navigate("/rounds")}
      >
        ← {match?.round?.roundNumber ? `${match.round.roundNumber}R ` : ""}경기 목록
      </button>

      <div className={styles.content}>
        {match && <MatchHeader match={match} />}

        {loading && <LoadingState label="경기 분석 데이터를 불러오는 중입니다." />}

        {!loading && error && <ErrorState message={error} onRetry={retry} />}

        {!loading && !error && empty && (
          <EmptyState message="이 경기에 등록된 분석 데이터가 없습니다." />
        )}

        {!loading && !error && !empty && match && (
          <>
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
              timeline={winTimeline}
              minute={minute}
              maxMinute={maxMinute}
              onChangeMinute={handleChangeMinute}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default MatchDetailPage;
