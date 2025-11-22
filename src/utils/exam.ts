import { parseDateString, formatDateWithDay } from "./date";

export type Category = "major" | "pro" | "tech";

export interface ExamItem {
  category: Category;
  subject?: string;
  name?: string;
  id?: number;
  nextExamDate?: string;
}

export interface DailyExams {
  date: string;
  items: ExamItem[];
}

export interface RawMajorExam {
  qualgbCd: string;
  description: string;
  docExamStartDt?: string;
  pracExamStartDt?: string;
}

export interface RawGeneralExam {
  implSeq: string;
  qualgbCd: "T" | "S";
  qualgbNm?: string;
  description?: string;
  docExamStartDt?: string;
  pracExamStartDt?: string;
}

export interface GeneralExamApiResponse {
  body?: {
    items?: RawGeneralExam[];
  };
}

/** API에서 받은 item.qualgbCd를 category로 변환 */
export const mapCategory = (qualgbCd: string): Category | null => {
  switch (qualgbCd) {
    case "T":
      return "tech"; // 국가기술자격
    case "S":
      return "pro"; // 국가전문자격
    default:
      return null;
  }
};

/** 공통 시험 데이터 기본 normalize */
export const normalizeExams = (rawData: RawMajorExam[]): ExamItem[] => {
  if (!rawData) return [];

  return rawData
    .map((item) => {
      const category = mapCategory(item.qualgbCd);
      if (!category) return null;

      const examDate = item.pracExamStartDt || item.docExamStartDt;
      if (!examDate) return null;

      return {
        category,
        name: item.description,
        nextExamDate: parseDateString(examDate),
      };
    })
    .filter(Boolean) as ExamItem[];
};

/**
 * 국가기술/전문자격 API 데이터 전용 변환기
 * (필기/실기 각각 separate exam item으로 생성)
 */
export const adaptGeneralExamData = (
  apiResponse: GeneralExamApiResponse,
): ExamItem[] => {
  const items = apiResponse?.body?.items;
  if (!items || !Array.isArray(items)) return [];

  const list: ExamItem[] = [];

  items.forEach((item, index) => {
    const category = item.qualgbCd === "T" ? "tech" : "pro";
    const desc = item.description || "";

    if (item.docExamStartDt) {
      const date = parseDateString(item.docExamStartDt);
      if (date) {
        list.push({
          id: Number(item.implSeq) * 1000 + index * 10 + 1,
          category,
          name: `${desc} [필기]`,
          subject: item.qualgbNm,
          nextExamDate: date,
        });
      }
    }

    if (item.pracExamStartDt) {
      const date = parseDateString(item.pracExamStartDt);
      if (date) {
        list.push({
          id: Number(item.implSeq) * 1000 + index * 10 + 2,
          category,
          name: `${desc} [실기]`,
          subject: item.qualgbNm,
          nextExamDate: date,
        });
      }
    }
  });

  return list;
};

/** grouped DailyExams 형태로 변환 */
export const transformExamData = (
  rawList: ExamItem[],
  defaultCategory?: Category,
): DailyExams[] => {
  if (!rawList || rawList.length === 0) return [];

  // 날짜순 정렬
  const sorted = [...rawList].sort(
    (a, b) =>
      new Date(a.nextExamDate || "").getTime() -
      new Date(b.nextExamDate || "").getTime(),
  );

  const grouped = new Map<string, ExamItem[]>();

  sorted.forEach((item) => {
    if (!item.nextExamDate) return;

    const dateKey = formatDateWithDay(item.nextExamDate);
    const category = item.category || defaultCategory || "tech";

    const newItem: ExamItem = {
      ...item,
      category,
      subject: item.subject || item.name,
    };

    if (!grouped.has(dateKey)) grouped.set(dateKey, []);
    grouped.get(dateKey)!.push(newItem);
  });

  return Array.from(grouped.entries()).map(([date, items]) => ({
    date,
    items,
  }));
};
