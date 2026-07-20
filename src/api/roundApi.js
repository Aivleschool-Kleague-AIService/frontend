import apiClient from "./client";

export const getRounds = async () => {
  const response = await apiClient.get("/rounds");
  return response.data;
};
