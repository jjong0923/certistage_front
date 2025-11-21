import axios from "axios";

const BASE_URL = "/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json", // 데이터 형식
    "Access-Control-Allow-Origin": "*", // 모든 출처 허용
  },
});

// 전공 목록 조회
export const getMajor = async () => {
  const res = await api.get("/major");
  return res.data;
};

export const getCertificates = async ({ majorID }) => {
  const res = await api.get("/certificates", { params: majorID });
  return res.data;
};
