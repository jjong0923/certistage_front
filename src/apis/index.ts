import axios from "axios";

const BASE_URL = "https://certistage-production.up.railway.app/";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // 모든 출처 허용
  },
});

// 전공 목록 조회
export const getMajor = async () => {
  const res = await api.get("api/majors");
  return res.data;
};

// 자격증 조회
export const getCertificates = async ({ majorId }: { majorId: number }) => {
  const res = await api.get("/certificates", {
    params: {
      majorId,
    },
  });
  return res.data;
};
