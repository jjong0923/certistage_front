import Calendar from "../Calendar/Calendar";
import CertificationCard from "../Certification/CertificationCard";
import CertificationTitle from "../Certification/CertificationTitle";
import Header from "../Shared/Hedaer";
import { useEffect, useState } from "react";
import ChatBot from "../ChatBot/ChatBot";
import BookReccomend from "../Book/BookReccomend";
import FloatingButton from "../Shared/FloatingButton";
import { getExams } from "../apis";

interface ExamItem {
  category: "pro" | "tech";
  subject: string;
}

interface DailyExams {
  date: string;
  items: ExamItem[];
}

function MainPage() {
  const [toggle, setToggle] = useState(true);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExams();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="relative mt-10 flex justify-center">
        <select
          name="major"
          defaultValue=""
          className="h-10 w-[650px] rounded border border-[#023685] pl-[30px]"
        >
          <option value="" disabled>
            전공을 선택해주세요
          </option>
          <option value="컴퓨터공학과">컴퓨터공학과</option>
          <option value="경영학과">경영학과</option>
        </select>
      </div>
      {/* 콘텐츠 */}
      <div className="mt-8 flex items-center justify-center">
        {toggle ? (
          <Calendar />
        ) : (
          <div className="p-8">
            <ChatBot onClose={() => setToggle(true)} />
          </div>
        )}
        {/* 자격증 리스트 */}
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
      {/* 챗봇 토글 */}
      <FloatingButton
        onClick={() => {
          setToggle(!toggle);
        }}
      />
      {/* 교재 추천 */}
      <BookReccomend />
    </div>
  );
}

export default MainPage;
