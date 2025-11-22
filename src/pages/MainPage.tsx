import { useEffect, useState } from "react";
import Calendar from "../Calendar/Calendar";
import CertificationCard from "../Certification/CertificationCard";
import CertificationTitle from "../Certification/CertificationTitle";
import Header from "../Shared/Hedaer";
import ChatBot from "../ChatBot/ChatBot";
import BookReccomend from "../Book/BookReccomend";
import FloatingButton from "../Shared/FloatingButton";
import { getCertificates, getExams, getMajor } from "../apis";
import SelectInput from "../Shared/SelectInput";
import { adaptGeneralExamData, transformExamData } from "../utils/exam";
import {
  // parseDateString,
  // formatDateWithDay,
  getDateWeight,
  filterByMonth,
} from "../utils/date";
import type { DailyExams, MajorOption } from "../types/index";

function MainPage() {
  const [toggle, setToggle] = useState(true);
  const [options, setOptions] = useState<MajorOption[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [majorExams, setMajorExams] = useState<DailyExams[]>([]);
  const [generalExams, setGeneralExams] = useState<DailyExams[]>([]);

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

  const filteredMajorExams = filterByMonth(majorExams, currentDate);
  const filteredGeneralExams = filterByMonth(generalExams, currentDate);

  const allExams = [...filteredMajorExams, ...filteredGeneralExams].sort(
    (a, b) => getDateWeight(a.date) - getDateWeight(b.date),
  );

  const calendarEvents = [...majorExams, ...generalExams].flatMap(
    (group) => group.items,
  );
  return (
    <div>
      <Header />
      <SelectInput options={options} onChange={handleChange} />
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
