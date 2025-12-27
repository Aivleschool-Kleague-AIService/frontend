import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 주소
});

export const getRounds = async () => {
  const response = await api.get("/rounds");
  return response.data;
};