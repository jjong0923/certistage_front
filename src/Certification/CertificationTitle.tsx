// type label = "pro" | "tech";

interface CertificationTitleProps {
  type: "pro" | "tech";
}

function CertificationTitle({ type }: CertificationTitleProps) {
  const labels = {
    pro: "전문 자격",
    tech: "기술 자격",
  };
  const styles = {
    pro: "border-[#FF8FB8] bg-[rgba(255,143,184,0.1)]",
    tech: "border-[#4D9FFF] bg-[rgba(77,159,255,0.1)]",
  };
  return (
    <div className="flex flex-col">
      <p className="text-xm text-center font-semibold text-[#adadad]">
        {labels[type]}
      </p>
      <div
        className={`${styles[type]} h-[20px] w-[84px] rounded-lg border-2`}
      ></div>
    </div>
  );
}

export default CertificationTitle;
