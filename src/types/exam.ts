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
