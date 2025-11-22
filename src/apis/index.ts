import axios from "axios";

const BASE_URL = "https://certistage-production.up.railway.app/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // 모든 출처 허용
  },
});

// 전공 목록 조회
export const getMajor = async () => {
  const res = await api.get("/majors");

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

// 국가 시험 일정 조회
export const getExams = async () =>
  //   {
  //   year,
  //   qualgbCd,
  //   jmCd,
  //   page,
  //   size,
  // }: {
  //   year: number;
  //   qualgbCd: string;
  //   jmCd: string;
  //   page: number;
  //   size: number;
  // }
  {
    const res = await api.get(
      "/exams",
      //   {
      //   year,
      //   qualgbCd,
      //   jmCd,
      //   page,
      //   size,
      //
    );
    return res.data;
  };

// 자격증 월별 일정 조회
export const getCalendarMonth = async ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => {
  const res = await api.get(`/calendar/month/${year}/${month}`);
  return res.data;
};
