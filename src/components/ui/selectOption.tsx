import React, { useState, useRef, useEffect } from "react";
import arrowIcon from "../../assets/img/arrow-down-light_icon.svg"
interface SelectOptionProps {
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  options,
  onChange,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    
    setSelected(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full max-w-64 max-md:max-w-[344px] ">
      <button
        type="button"
        className="w-full p-2 border-1 border-[#D4D4D4] rounded-md bg-white text-black flex justify-between items-center hover:bg-gray-100 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected || placeholder}</span>
        <img src={arrowIcon} alt="arrow" className={isOpen ? "rotate-180" : "rotate-0"}/>
      </button>

      {isOpen && (
        <ul className="absolute left-0 right-0 mt-2 border-1 border-[#D4D4D4] rounded-md bg-white shadow-lg z-50">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectOption;
