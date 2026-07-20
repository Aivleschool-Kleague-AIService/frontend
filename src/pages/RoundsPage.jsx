import { useEffect, useState } from "react";
import RoundSection from "../components/rounds/RoundSection";
import RoundSelector from "../components/RoundSelector";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";
import { getRounds } from "../api/roundApi";
import { getMatchesByRound } from "../api/matchApi";
import styles from "./RoundsPage.module.css";

function RoundsPage() {
  const [rounds, setRounds] = useState([]);
  const [selectedRoundId, setSelectedRoundId] = useState(null);
  const [matches, setMatches] = useState([]);
  const [roundsLoading, setRoundsLoading] = useState(true);
  const [matchesLoading, setMatchesLoading] = useState(false);
  const [roundsError, setRoundsError] = useState(null);
  const [matchesError, setMatchesError] = useState(null);
  const [roundsRequest, setRoundsRequest] = useState(0);
  const [matchesRequest, setMatchesRequest] = useState(0);

  useEffect(() => {
    let active = true;

    const fetchRounds = async () => {
      setRoundsLoading(true);
      setRoundsError(null);

      try {
        const data = await getRounds();
        if (!active) return;

        setRounds(data);
        setSelectedRoundId(data.length > 0 ? data[0].roundId : null);
      } catch (error) {
        if (!active) return;
        console.error("라운드 목록 조회 실패", error);
        setRoundsError("라운드 정보를 확인할 수 없습니다.");
      } finally {
        if (active) setRoundsLoading(false);
      }
    };

    fetchRounds();

    return () => {
      active = false;
    };
  }, [roundsRequest]);

  useEffect(() => {
    if (!selectedRoundId) return;

    let active = true;

    const fetchMatches = async () => {
      setMatchesLoading(true);
      setMatchesError(null);
      setMatches([]);

      try {
        const data = await getMatchesByRound(selectedRoundId);
        if (active) setMatches(data);
      } catch (error) {
        if (!active) return;
        console.error("경기 목록 조회 실패", error);
        setMatchesError("선택한 라운드의 경기 정보를 확인할 수 없습니다.");
      } finally {
        if (active) setMatchesLoading(false);
      }
    };

    fetchMatches();

    return () => {
      active = false;
    };
  }, [selectedRoundId, matchesRequest]);

  const currentRound = rounds.find(
    (r) => r.roundId === selectedRoundId
  );

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>2024 K LEAGUE 1</p>
          <h1 className={styles.title}>경기 일정</h1>
        </div>
        <p className={styles.description}>
          라운드를 선택하고 경기별 승부 예측 흐름을 확인하세요.
        </p>
      </div>

      {roundsLoading && <LoadingState label="라운드 목록을 불러오는 중입니다." />}

      {!roundsLoading && roundsError && (
        <ErrorState
          message={roundsError}
          onRetry={() => setRoundsRequest((request) => request + 1)}
        />
      )}

      {!roundsLoading && !roundsError && rounds.length === 0 && (
        <EmptyState message="등록된 라운드가 생기면 이곳에 표시됩니다." />
      )}

      {!roundsLoading && !roundsError && currentRound && (
        <>
          <RoundSelector
            rounds={rounds}
            selectedRoundId={selectedRoundId}
            onChangeRound={setSelectedRoundId}
          />

          <div className={styles.content}>
            {matchesLoading && (
              <LoadingState label="경기 목록을 불러오는 중입니다." />
            )}

            {!matchesLoading && matchesError && (
              <ErrorState
                message={matchesError}
                onRetry={() => setMatchesRequest((request) => request + 1)}
              />
            )}

            {!matchesLoading && !matchesError && matches.length === 0 && (
              <EmptyState message="선택한 라운드에 등록된 경기가 없습니다." />
            )}

            {!matchesLoading && !matchesError && matches.length > 0 && (
              <RoundSection
                round={currentRound}
                matches={matches.map((match) => ({
                  ...match,
                  round: currentRound,
                }))}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default RoundsPage;
