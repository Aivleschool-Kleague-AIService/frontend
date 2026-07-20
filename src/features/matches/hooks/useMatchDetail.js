import { useCallback, useEffect, useState } from "react";
import {
  getMatchDetail,
  getMatchGoalProbabilities,
  getMatchWinProbabilities,
} from "../../../api/matchApi";
import { normalizeGoalTimeline } from "../utils/normalizeGoalTimeline";
import { normalizeMatchDetail } from "../utils/normalizeMatchDetail";
import { normalizeWinTimeline } from "../utils/normalizeWinTimeline";

const initialData = {
  match: null,
  goalTimeline: [],
  winTimeline: [],
};

function useMatchDetail(matchId, initialMatch = null) {
  const [requestKey, setRequestKey] = useState(0);
  const [state, setState] = useState({
    matchId: null,
    ...initialData,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!matchId) return undefined;

    const controller = new AbortController();
    const fallbackMatch = normalizeMatchDetail(initialMatch);

    Promise.all([
      getMatchDetail(matchId, { signal: controller.signal }),
      getMatchGoalProbabilities(matchId, { signal: controller.signal }),
      getMatchWinProbabilities(matchId, { signal: controller.signal }),
    ])
      .then(([matchResponse, goalResponse, winResponse]) => {
        const match = normalizeMatchDetail(matchResponse);
        if (!match) throw new Error("Invalid match detail response");

        setState({
          matchId,
          match,
          goalTimeline: normalizeGoalTimeline(goalResponse?.timeline),
          winTimeline: normalizeWinTimeline(winResponse?.timeline),
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;

        console.error("경기 상세 데이터 조회 실패", error);
        setState({
          matchId,
          ...initialData,
          match: fallbackMatch,
          loading: false,
          error:
            error.response?.status === 404
              ? "존재하지 않는 경기입니다."
              : "경기 상세 데이터를 불러오지 못했습니다.",
        });
      });

    return () => controller.abort();
  }, [initialMatch, matchId, requestKey]);

  const retry = useCallback(() => {
    setState((current) => ({ ...current, loading: true, error: null }));
    setRequestKey((key) => key + 1);
  }, []);

  const isCurrentMatch = state.matchId === matchId;
  const data = isCurrentMatch
    ? state
    : {
        ...state,
        ...initialData,
        match: normalizeMatchDetail(initialMatch),
        loading: true,
        error: null,
      };
  const empty =
    !data.loading &&
    !data.error &&
    data.goalTimeline.length === 0 &&
    data.winTimeline.length === 0;

  return {
    match: data.match,
    goalTimeline: data.goalTimeline,
    winTimeline: data.winTimeline,
    loading: data.loading,
    error: data.error,
    empty,
    retry,
  };
}

export default useMatchDetail;
