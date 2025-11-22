import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getCalendarMonth } from "../apis";
import { useEffect, useState } from "react";

interface CalendarEvent {
  category: string;
  subject?: string;
  name?: string;
  nextExamDate?: string; // YYYY-MM-DD
}

// interface ScheduleItem {
//   date: string;
//   title: string;
//   examType: string;
//   description: string;
// }

interface MyCalendarProps {
  onDateChange?: (date: Date) => void;
  events?: CalendarEvent[];
}

function MyCalendar({ onDateChange, events = [] }: MyCalendarProps) {
  const [activeDate, setActiveDate] = useState<Date>(new Date());

  // const [scheduleData, setScheduleData] = useState<ScheduleItem[] | null>(null);

  const formatDateToYMD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    // 월 달력 보기일 때만 내용 표시
    if (view !== "month") return null;

    const dateStr = formatDateToYMD(date);

    // 부모로부터 받은 events 중에서 해당 날짜와 일치하는 일정 찾기
    const schedules = events.filter((item) => item.nextExamDate === dateStr);

    if (schedules.length === 0) return null;

    return (
      <div className="mt-1 flex w-full flex-col items-start gap-1">
        {schedules.map((schedule, idx) => {
          const title = schedule.subject || schedule.name || "";

          return (
            <div
              key={idx}
              className={`w-full truncate rounded px-1 text-left text-[8px] leading-tight ${
                schedule.category === "major"
                  ? "bg-green-100 text-green-700" // 전공
                  : schedule.category === "pro"
                    ? "bg-pink-100 text-pink-700" // 전문
                    : "bg-blue-100 text-blue-700" // 기술
              }`}
              title={title}
            >
              {title}
            </div>
          );
        })}
      </div>
    );
  };

  // useEffect(() => {
  //   const fetchMonthData = async () => {
  //     try {
  //       const year = activeDate.getFullYear();
  //       const month = activeDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1

  //       console.log(`API 호출: ${year}년 ${month}월 데이터 요청`);

  //       const data = await getCalendarMonth({ year, month });
  //       // setScheduleData(data);
  //     } catch (error) {
  //       console.error("데이터 로드 실패", error);
  //     }
  //   };

  //   fetchMonthData();
  // }, [activeDate]);

  return (
    <div className="flex justify-center p-8">
      <Calendar
        locale="en-US"
        formatMonthYear={(_, date) =>
          `${date.getFullYear()}.${date.getMonth() + 1}`
        }
        nextLabel=">"
        prevLabel="<"
        next2Label={null}
        prev2Label={null}
        formatShortWeekday={(_, date) =>
          ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][date.getDay()]
        }
        // 3. 달력의 '보여지는 날짜'가 바뀔 때 상태 업데이트
        // action: 'prev' | 'next' | 'drillUp' 등
        // activeStartDate: 변경된 기준 날짜 (해당 월의 1일)
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) {
            setActiveDate(activeStartDate);
            // 부모(MainPage)에게 변경된 날짜 전달
            if (onDateChange) {
              onDateChange(activeStartDate);
            }
          }
        }}
        // (선택) 현재 보고 있는 날짜를 캘린더에 동기화하려면 아래 속성 추가

        activeStartDate={activeDate}
        tileContent={tileContent}
        tileClassName="h-24 align-top border-b border-r border-gray-100 text-sm"
      />
    </div>
  );
}

export default MyCalendar;
