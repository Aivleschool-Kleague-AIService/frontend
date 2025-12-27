import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getMatchesByRound = async (roundId) => {
  const res = await api.get(`/rounds/${roundId}/matches`);
  return res.data;
};