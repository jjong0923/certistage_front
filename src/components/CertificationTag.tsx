import type { ReactNode } from "react";


interface CertificationTagProps {
  children: ReactNode;
  color: string;
}

function CertificationTag({ children, color }: CertificationTagProps) {
  return (
    <div
      className="text-xm inline-block rounded-2xl px-3 py-2 font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
}

export default CertificationTag;
