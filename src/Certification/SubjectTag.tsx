import type { ReactNode } from "react";

type subjectType = "pro" | "tech";

interface SubjectTagProps {
  children: ReactNode;
  type: subjectType;
}

function SubjectTag({ children, type }: SubjectTagProps) {
  const colorStyles: Record<subjectType, string> = {
    pro: "border-[#FF8FB8] bg-[rgba(255,143,184,0.1)]",
    tech: "border-[#4D9FFF] bg-[rgba(77,159,255,0.1)]",
  };

  return (
    <div
      className={`flex items-center rounded-xl border-2 px-2 py-1 text-xs font-bold text-[#848484] ${colorStyles[type]}`}
    >
      {children}
    </div>
  );
}

export default SubjectTag;
