import CertificationTag from "./CertificationTag";
import SubjectTag from "./SubjectTag";
import type { DailyExams, Category } from "../types/index";

interface CertificationCardProps {
  data: DailyExams;
}

function CertificationCard({ data }: CertificationCardProps) {
  const categoryName: Record<Category, string> = {
    major: "전공",
    pro: "전문 자격",
    tech: "기술 자격",
  };

  const categoryColors: Record<Category, string> = {
    major: "#26D48A",
    pro: "#FF8FB8",
    tech: "#4D9FFF",
  };
  return (
    <div className="flex flex-col gap-3 border-b-2 border-[#d9d9d9] pb-4">
      <h3 className="text-2xl font-semibold text-[#0F172A]">{data.date}</h3>
      {(["major", "pro", "tech"] as const).map((type) => {
        const safeItems = data.items || [];
        const filtered = safeItems.filter((i) => i.category === type);
        if (!filtered.length) return null;

        return (
          <div className="flex gap-4" key={type}>
            <CertificationTag color={categoryColors[type]}>
              {categoryName[type]}
            </CertificationTag>
            <div className="scroll-hide flex gap-4 overflow-x-scroll">
              {filtered.map((exam, index) => {
                const displayName = exam.name || exam.subject || "";
                const uniqueKey = exam.id
                  ? `exam-${exam.id}`
                  : `${displayName}-${index}`;

                return (
                  <SubjectTag key={uniqueKey} type={exam.category}>
                    {displayName}
                  </SubjectTag>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CertificationCard;
