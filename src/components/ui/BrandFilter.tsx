import React, { useState, useRef } from "react";
import arrowIcon from "../../assets/img/arrow-down_icon.svg";
import type BrandType from "../../models/Brands";

interface BrandFilterProps {
  options: BrandType[];
  onChange: (value: string[]) => void;
  onClick: (value: string) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({ options, onChange, onClick }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth < 768 ? false : true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const ref = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState("")

  const handleChange = (label: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions((prev) => [...prev, label]);
    } else {
      setSelectedOptions((prev) => prev.filter((item) => item !== label));
    }
  };

  const handleSubmit = (selectedOptions: string[]) => {
    onChange(selectedOptions);
  };

  return (
    <div ref={ref} className="relative w-full max-w-64 max-md:max-w-96 max-md:px-2 max-md:w-fit">
      <button
        type="button"
        className="w-full max-md:w-[344px] py-2 max-md:p-2 border-b-1 border-[#D4D4D4] cursor-pointer bg-white text-black flex justify-between items-center hover:bg-gray-100 focus:outline-none font-medium text-[18px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Brand</span>
        <img
          src={arrowIcon}
          alt="arrow"
          className={isOpen ? "rotate-180" : "rotate-0"}
        />
      </button>

      <div className="flex items-center rounded-lg px-4 py-4 w-full h-[40px] bg-gray-2 my-4 max-md:max-w-[344px]">
        <img
          src="/src/assets/img/search_icon.svg"
          alt="Search"
          className="w-6 h-6 mr-2 flex-shrink-0 cursor-pointer"
          onClick={() => onClick(searchValue)}
        />
        <input
          type="text"
          placeholder="Search"
          className="text-sm font-medium placeholder:opacity-50 bg-transparent outline-none flex-1 w-full"
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>

      {isOpen && (
        <ul className="absolute left-0 right-0 mt-2 flex flex-col gap-3 z-10 bg-white rounded py-2 max-md:px-4 font-medium text-[15px]">
          {options.map((option, index) => (
            <li key={index} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                id={`${index}`}
                onChange={(e) => handleChange(option.brand, e.target.checked)}
                className="w-5 h-5 shadow-none border-1 border-[#D3D3D3] appearance-none rounded
    checked:bg-black checked:border-black
    checked:before:content-['✔'] checked:before:text-white
    checked:before:flex checked:before:items-center checked:before:justify-center"

              />
              <label htmlFor={`${index}`}>{option.brand}</label>
              <span className="text-[#929292] text-xs">{option.total}</span>
            </li>
          ))}
          <button
            className="flex items-center justify-center bg-black hover:bg-gray-4 transition duration-300 text-white cursor-pointer rounded-[8px] h-[48px] w-[188px] max-md:w-[140px] max-md:text-sm"
            onClick={() => handleSubmit(selectedOptions)}
          >
            <span className="font-semibold">Apply</span>
          </button>
        </ul>
      )}
    </div>
  );
};

export default BrandFilter;
