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

const mapCategory = (qualgbCd: string): "tech" | "pro" | null => {
  switch (qualgbCd) {
    case "T":
      return "tech"; // 국가기술자격
    case "S":
      return "pro"; // 국가전문자격
    default:
      return null; // 과정평가형(C), 일학습병행(W) 제외
  }
};

const normalizeExams = (rawData: any[]) => {
  if (!rawData) return [];

  return rawData
    .map((item) => {
      const category = mapCategory(item.qualgbCd);
      if (!category) return null; // tech/pro만 유지

      const examDate = item.pracExamStartDt || item.docExamStartDt;
      if (!examDate) return null;

      return {
        category,
        name: item.description,
        nextExamDate: examDate,
      };
    })
    .filter(Boolean) as ExamItem[];
};

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

  const parseDateString = (dateStr: string) => {
    if (!dateStr || dateStr.length !== 8) return "";
    return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
  };

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

  const adaptGeneralExamData = (apiResponse: any): ExamItem[] => {
    // body.items 배열에 안전하게 접근
    const items = apiResponse?.body?.items;
    if (!items || !Array.isArray(items)) return [];

    const adaptedList: ExamItem[] = [];

    items.forEach((item: any, index: number) => {
      // 카테고리 결정 (T: tech, S: pro 등)
      const category = item.qualgbCd === "T" ? "tech" : "pro";

      const fullDesc = item.description || "";

      // 1) 필기 시험(doc) 정보가 있고 날짜가 존재하면 추가
      if (item.docExamStartDt) {
        const dateStr = parseDateString(item.docExamStartDt);
        if (dateStr) {
          adaptedList.push({
            id: Number(item.implSeq) * 1000 + index * 10 + 1, // 고유 ID 생성
            category: category,
            // 제목 예: "정보처리기사 [필기]"
            name: `${fullDesc} [필기]`,
            subject: item.qualgbNm,
            nextExamDate: dateStr,
          });
        }
      }

      // 2) 실기 시험(prac) 정보가 있고 날짜가 존재하면 추가
      if (item.pracExamStartDt) {
        const dateStr = parseDateString(item.pracExamStartDt);
        if (dateStr) {
          adaptedList.push({
            id: Number(item.implSeq) * 1000 + index * 10 + 2,
            category: category,
            name: `${fullDesc} [실기]`,
            subject: item.qualgbNm,
            nextExamDate: dateStr,
          });
        }
      }
    });

    return adaptedList;
  };

  const transformExamData = (
    rawData: ExamItem[],
    defaultCategory?: "major" | "pro" | "tech",
  ) => {
    if (!rawData || rawData.length === 0) return [];

    const sortedData = [...rawData].sort(
      (a: any, b: any) =>
        new Date(a.nextExamDate).getTime() - new Date(b.nextExamDate).getTime(),
    );

    const groupedMap = new Map<string, ExamItem[]>();

    sortedData.forEach((item) => {
      if (!item.nextExamDate) return;
      const dateKey = formatDateWithDay(item.nextExamDate);

      const category = item.category || defaultCategory || "tech";

      const newItem: ExamItem = {
        ...item,
        category: category,
        // 화면에는 subject나 name 중 있는 것을 표시
        subject: item.subject || item.name,
      };

      if (!groupedMap.has(dateKey)) {
        groupedMap.set(dateKey, []);
      }
      groupedMap.get(dateKey)!.push(newItem);
    });

    return Array.from(groupedMap.entries()).map(([date, items]) => ({
      date,
      items,
    }));
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const majorId = Number(e.target.value);

    try {
      const rawData = await getCertificates({ majorId });
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

        const apiResponse = await getExams({ size: 10 });
        const flatList = adaptGeneralExamData(apiResponse);
        const processedExams = transformExamData(flatList);
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

  const calendarEvents = [...majorExams, ...generalExams].flatMap(
    (group) => group.items,
  );
  return (
    <div>
      <Header />
      <div className="relative mt-10 flex justify-center">
        <select
          name="major"
          defaultValue=""
          className="h-12 w-[650px] appearance-none rounded-xl border border-[#023685] bg-white pr-10 pl-4 text-[15px] text-gray-700 shadow-sm transition-all outline-none hover:border-[#0450d4] focus:border-[#0450d4]"
          onChange={handleChange}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23023685' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
          }}
        >
          <option value="" disabled className="text-gray-400">
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
          <Calendar
            onDateChange={(date) => setCurrentDate(date)}
            events={calendarEvents}
          />
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
          <div className="scroll-hide scroll-fade flex h-[570px] w-[400px] flex-col gap-6 overflow-y-scroll py-4">
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
