import Calendar from "../components/Calendar";
import CertificationCard from "../components/CertificationCard";
import CertificationTitle from "../components/CertificationTitle";

interface ExamItem {
  category: "pro" | "tech";
  subject: string;
}

interface DailyExams {
  date: string;
  items: ExamItem[];
}

function MainPage() {
  const mockExams: DailyExams[] = [
    {
      date: "11.16(토)",
      items: [
        {
          category: "pro",
          subject: "국내여행안내사 필기",
        },
        {
          category: "pro",
          subject: "호텔서비스사 필기",
        },
        {
          category: "pro",
          subject: "호텔서비스사 필기",
        },
        {
          category: "pro",
          subject: "호텔관리사 필기",
        },
        {
          category: "tech",
          subject: "호텔관리사 필기",
        },
        {
          category: "tech",
          subject: "호텔관리사 필기",
        },
      ],
    },
    {
      date: "11.17(일)",
      items: [
        {
          category: "tech",
          subject: "정보처리기사 필기",
        },
        {
          category: "tech",
          subject: "전기기능사 실기",
        },
      ],
    },
    {
      date: "11.18(월)",
      items: [
        {
          category: "pro",
          subject: "조주기능사 필기",
        },
        {
          category: "tech",
          subject: "용접기능사 필기",
        },
        {
          category: "tech",
          subject: "미용사(일반) 실기",
        },
      ],
    },
  ];

  return (
    <div className="mt-40 flex items-center justify-center">
      <Calendar />
      <div className="max-w[584px] flex flex-col gap-6 p-8">
        <div className="flex gap-6">
          <CertificationTitle type="pro" />
          <CertificationTitle type="tech" />
        </div>
        <div className="flex min-h-[420px] flex-col gap-6">
          {mockExams.map((item) => (
            <CertificationCard data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
