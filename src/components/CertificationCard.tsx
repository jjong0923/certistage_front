import CertificationTag from "./CertificationTag";
import SubjectTag from "./SubjectTag";

function CertificationCard() {
  return (
    <div>
      <h3>11.15(토)</h3>
      <div>
        <CertificationTag color="#FF8FB8">전문 자격</CertificationTag>
        <SubjectTag>국내여행안내사 필기</SubjectTag>
        <SubjectTag>호텔서비스사 필기</SubjectTag>
        <SubjectTag>호텔관리사 필기</SubjectTag>
      </div>
      <div></div>
    </div>
  );
}

export default CertificationCard;
