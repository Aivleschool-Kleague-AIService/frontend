import apiClient from "./client";

export const getMatchesByRound = async (roundId) => {
  const res = await apiClient.get(`/rounds/${roundId}/matches`);
  return res.data;
};

export const getMatchDetail = async (matchId, { signal } = {}) => {
  const res = await apiClient.get(`/matches/${matchId}`, { signal });
  return res.data;
};

export const getMatchGoalProbabilities = async (matchId, { signal } = {}) => {
  const res = await apiClient.get(`/matches/${matchId}/goal-probabilities`, {
    signal,
  });
  return res.data;
};

export const getMatchWinProbabilities = async (matchId, { signal } = {}) => {
  const res = await apiClient.get(`/matches/${matchId}/win-probabilities`, {
    signal,
  });
  return res.data;
};
