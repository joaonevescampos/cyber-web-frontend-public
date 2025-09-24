import React, { useState, useRef } from "react";
import arrowIcon from "../../assets/img/arrow-down_icon.svg";
import type CategoryType from "../../models/Categories";
import { Link } from "react-router-dom";
interface CategoryFilterProps {
  options: CategoryType[];
  onChange: (value: string) => void;
  placeholder?: string;
  openInitionState?: boolean
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  options,
  onChange,
  placeholder = "Select a category",
  openInitionState
}) => {
  const [isOpen, setIsOpen] = useState(openInitionState);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div
      ref={ref}
      className="relative w-full max-w-64 max-md:max-w-96 max-md:px-2 max-md:w-fit"
    >
      <button
        type="button"
        className="w-full max-md:w-[344px] py-2 max-md:px-2 border-b-1 border-[#D4D4D4] cursor-pointer bg-white text-black flex justify-between items-center hover:bg-gray-100 focus:outline-none font-medium text-[18px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected || placeholder}</span>
        <img
          src={arrowIcon}
          alt="arrow"
          className={isOpen ? "rotate-180" : "rotate-0"}
        />
      </button>

      {isOpen && (
        <ul className="absolute left-0 right-0 mt-2 flex flex-col gap-3 z-20 font-medium bg-white p-2">
          <li
            onClick={() => handleSelect("all")}
            className={`flex gap-2 cursor-pointer ${
              selected === "All categories"
                ? "text-black"
                : "text-[#6c6c6c] hover:text-black"
            }`}
          >
            <Link to="/products/all" className="w-full">All categories</Link>
          </li>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option.name)}
              className={`flex gap-2 cursor-pointer ${
                selected === option.name
                  ? "text-black"
                  : "text-[#6c6c6c] hover:text-black"
              }`}
            >
              <Link to={`/products/${option.name}`} className="w-full">{option.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryFilter;
