import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getMatchesByRound = async (roundId) => {
  const res = await api.get(`/rounds/${roundId}/matches`);
  return res.data;
};

export const getMatchTeamSummary = async (matchId) => {
  const res = await api.get(`/matches/${matchId}/team-summary`);
  return res.data;
};

export const getMatchGoalProbabilities = async (matchId) => {
  const res = await api.get(`/matches/${matchId}/goal-probabilities`);
  return res.data;
};

// ✅ 승률 타임라인 API 추가
export const getMatchWinProbabilities = async (matchId) => {
  const res = await api.get(`/matches/${matchId}/win-probabilities`);
  return res.data;
};