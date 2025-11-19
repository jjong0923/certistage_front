import CertificationTag from "./CertificationTag";
import SubjectTag from "./SubjectTag";

type categoryType = "pro" | "tech";

interface ExamItem {
  category: "pro" | "tech";
  subject: string;
}

interface DailyExams {
  date: string;
  items: ExamItem[];
}

interface CertificationCardProps {
  data: DailyExams;
}

function CertificationCard({ data }: CertificationCardProps) {
  const caterogries = ["pro", "tech"];
  const categoryName: Record<categoryType, string> = {
    pro: "전문 자격",
    tech: "기술 자격",
  };
  return (
    <div className="flex flex-col gap-3 border-b-2 border-[#d9d9d9] pb-4">
      <h3 className="text-2xl font-semibold text-[#0F172A]">{data.date}</h3>
      {["pro", "tech"].map((type) => {
        const filtered = data.items.filter((i) => i.category === type);
        if (!filtered.length) return null;

        return (
          <div className="flex gap-4" key={type}>
            <CertificationTag color={type === "pro" ? "#FF8FB8" : "#4D9FFF"}>
              {categoryName[type]}
            </CertificationTag>
            <div className="scroll-hide flex gap-4 overflow-x-scroll">
              {filtered.map((exam) => (
                <SubjectTag key={exam.subject} type={exam.category}>
                  {exam.subject}
                </SubjectTag>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CertificationCard;
