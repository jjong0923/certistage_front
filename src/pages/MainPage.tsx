import Calendar from "../Calendar/Calendar";
import CertificationCard from "../Certification/CertificationCard";
import CertificationTitle from "../Certification/CertificationTitle";
import Header from "../Shared/Hedaer";
import { useEffect, useState } from "react";
import ChatBot from "../ChatBot/ChatBot";
import BookReccomend from "../Book/BookReccomend";
import FloatingButton from "../Shared/FloatingButton";
import { getCertificates, getExams, getMajor } from "../apis";

interface MajorOption {
  id: number;
  name: string;
}

interface ExamItem {
  category: "major" | "pro" | "tech";
  subject?: string;
  name?: string;
  id?: number;
  nextExamDate?: string;
}

interface DailyExams {
  date: string;
  items: ExamItem[];
}

function MainPage() {
  const [toggle, setToggle] = useState(true);
  const [options, setOptions] = useState<MajorOption[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [majorExams, setMajorExams] = useState<DailyExams[]>([]);
  const [generalExams, setGeneralExams] = useState<DailyExams[]>([]);
  const mockExams: DailyExams[] = [
    {
      date: "11.15(토)",
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
      date: "11.16(일)",
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
      date: "11.18(화)",
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

  const formatDateWithDay = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekDay = weekDays[date.getDay()];
    return `${month}.${day}(${weekDay})`;
  };

  const getDateWeight = (dateStr: string) => {
    const match = dateStr.match(/(\d+)\.(\d+)/);
    if (!match) return 0;
    // 월 * 100 + 일 (예: 11.3 -> 1103, 11.18 -> 1118)
    return Number(match[1]) * 100 + Number(match[2]);
  };

  const filterByMonth = (dataList: DailyExams[]) => {
    const currentMonth = currentDate.getMonth() + 1;
    return dataList.filter((item) => {
      const itemMonth = parseInt(item.date.split(".")[0], 10);
      return itemMonth === currentMonth;
    });
  };

  const transformExamData = (
    rawData: any[],
    defaultCategory?: "major" | "pro" | "tech",
  ) => {
    if (!rawData || rawData.length === 0) return [];

    // 1. 원본 데이터 날짜순 정렬 (API 데이터 내 날짜 기준)
    const sortedData = [...rawData].sort(
      (a: any, b: any) =>
        new Date(a.nextExamDate).getTime() - new Date(b.nextExamDate).getTime(),
    );

    // 2. 날짜별 그룹화
    const groupedMap = new Map<string, ExamItem[]>();

    sortedData.forEach((item: any) => {
      if (!item.nextExamDate) return;

      const dateKey = formatDateWithDay(item.nextExamDate);
      // 카테고리가 없으면 defaultCategory 사용 (전공은 'major', 일반은 데이터 내 'category' 등)
      const category = item.category || defaultCategory || "tech";

      const newItem: ExamItem = {
        ...item,
        category: category,
      };

      if (!groupedMap.has(dateKey)) {
        groupedMap.set(dateKey, []);
      }
      groupedMap.get(dateKey)?.push(newItem);
    });

    // 3. Map을 배열로 변환
    return Array.from(groupedMap.entries()).map(([date, items]) => ({
      date,
      items,
    }));
  };

  // const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const majorId = Number(e.target.value);

  //   try {
  //     // API 호출
  //     const rawData = await getCertificates({ majorId });

  //     rawData.sort(
  //       (a: any, b: any) =>
  //         new Date(a.nextExamDate).getTime() -
  //         new Date(b.nextExamDate).getTime(),
  //     );

  //     // 데이터 변환: 날짜별로 그룹화 (Grouping)
  //     const groupedMap = new Map<string, ExamItem[]>();

  //     rawData.forEach((item: any) => {
  //       // 날짜 문자열 변환 (예: "2025-09-18" -> "9.18(목)")
  //       const dateKey = formatDateWithDay(item.nextExamDate);

  //       // category: "major" 강제 주입
  //       const newItem: ExamItem = {
  //         ...item,
  //         category: "major",
  //       };

  //       // Map에 같은 날짜끼리 배열로 묶기
  //       if (!groupedMap.has(dateKey)) {
  //         groupedMap.set(dateKey, []);
  //       }
  //       groupedMap.get(dateKey)?.push(newItem);
  //     });

  //     // Map을 배열 형태로 변환하여 State 업데이트
  //     // 결과 예시: [{ date: "9.18(목)", items: [...] }, ...]
  //     const transformedData: DailyExams[] = Array.from(groupedMap.entries())
  //       .map(([date, items]) => ({ date, items }))
  //       .sort((a, b) => a.date.localeCompare(b.date)); // 날짜순 정렬 (선택)

  //     setMajors(transformedData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const majorId = Number(e.target.value);

    try {
      const rawData = await getCertificates({ majorId });
      // 전공 데이터는 category='major'로 강제 지정
      const transformedData = transformExamData(rawData, "major");
      setMajorExams(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const majorOptions = await getMajor();
        setOptions(majorOptions);

        const examData = await getExams();
        const processedExams = transformExamData(examData);
        setGeneralExams(processedExams);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filteredMajorExams = filterByMonth(majorExams);
  const filteredGeneralExams = filterByMonth(generalExams);

  const allExams = [...filteredMajorExams, ...filteredGeneralExams].sort(
    (a, b) => getDateWeight(a.date) - getDateWeight(b.date),
  );

  return (
    <div>
      <Header />
      <div className="relative mt-10 flex justify-center">
        <select
          name="major"
          defaultValue=""
          className="h-10 w-[650px] rounded border border-[#023685] pl-[30px]"
          onChange={handleChange}
        >
          <option value="" disabled>
            전공을 선택해주세요
          </option>

          {options.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {/* 콘텐츠 */}
      <div className="mt-8 flex items-center justify-center">
        {toggle ? (
          <Calendar onDateChange={(date) => setCurrentDate(date)} />
        ) : (
          <div className="p-8">
            <ChatBot onClose={() => setToggle(true)} />
          </div>
        )}
        {/* 자격증 리스트 */}
        <div className="max-w[584px] flex flex-col gap-6 p-8">
          <div className="flex gap-6">
            <CertificationTitle type="major" />
            <CertificationTitle type="pro" />
            <CertificationTitle type="tech" />
          </div>
          <div className="scroll-hide scroll-fade flex h-[570px] flex-col gap-6 overflow-y-scroll py-4">
            {allExams.length > 0 ? (
              allExams.map((item, index) => (
                // 데이터 소스에 따라 key가 겹칠 수 있으므로 index 활용
                <CertificationCard key={`${item.date}-${index}`} data={item} />
              ))
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                해당 월에 예정된 시험이 없습니다.
              </div>
            )}
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
