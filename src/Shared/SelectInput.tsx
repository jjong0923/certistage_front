import type { MajorOption } from "../types";

interface SelectInputProps {
  options: MajorOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectInput({ options, onChange }: SelectInputProps) {
  return (
    <div className="relative mt-10 flex justify-center">
      <select
        name="major"
        defaultValue=""
        className="h-12 w-[650px] appearance-none rounded-xl border border-[#023685] bg-white pr-10 pl-4 text-[15px] text-gray-700 shadow-sm transition-all outline-none hover:border-[#0450d4] focus:border-[#0450d4]"
        onChange={onChange}
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
  );
}

export default SelectInput;
