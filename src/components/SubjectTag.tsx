import type { ReactNode } from "react";

interface SubjectTagProps {
  children: ReactNode;
}

function SubjectTag({ children }: SubjectTagProps) {
  return (
    <div className="mt-4 inline-block rounded-xl border-2 border-[#FF8FB8] bg-[rgba(255,143,184,0.1)] px-2 py-1 text-[rgba(15,23,42,0.4)]">
      {children}
    </div>
  );
}

export default SubjectTag;
