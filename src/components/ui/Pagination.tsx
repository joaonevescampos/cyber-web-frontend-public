import React from "react";
import arrowIcon from "../../assets/img/arrow_pagination.svg";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
  className?: string;
  order?: string;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onChange,
  className = "",
}) => {
  const clampedTotal = Math.max(1, totalPages);
  const page = Math.min(Math.max(1, currentPage), clampedTotal);

  const items = React.useMemo<(number | string)[]>(() => {
    if (clampedTotal < 6) {
      return Array.from({ length: clampedTotal }, (_, i) => i + 1);
    }
    return [1, 2, 3, "…", clampedTotal];
  }, [clampedTotal]);

  const goTo = (p: number) => {
    if (p >= 1 && p <= clampedTotal && p !== page) onChange(p);
  };

  const baseBtn =
    "inline-flex items-center justify-center w-8 h-8 rounded-md transition cursor-pointer";
  const inactive = "bg-gray-1 text-black hover:bg-gray-200";
  const active = "bg-black text-white";
  const arrowBtn =
    "inline-flex items-center justify-center w-6 h-9 text-black disabled:opacity-40 disabled:cursor-not-allowed ";

  if (totalPages <= 1) return null;

  return (
    <nav
      className={`flex items-center gap-2 select-none ${className}`}
      aria-label="Pagination"
    >
      <button
        type="button"
        className={arrowBtn}
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        aria-label="prev page"
      >
        <img src={arrowIcon} alt="arrow-icon" className="rotate-180 mr-2" />
      </button>

      {items.map((item, index) => {
        if (typeof item === "string") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-[#737373]"
              aria-hidden="true"
            >
              {item}
            </span>
          );
        }
        const isActive = item === page;
        return (
          <button
            key={item}
            type="button"
            onClick={() => goTo(item)}
            className={`${baseBtn} ${isActive ? active : inactive}`}
            aria-current={isActive ? "page" : undefined}
            aria-label={`Go to page ${item}`}
          >
            {item}
          </button>
        );
      })}

      <button
        type="button"
        className={arrowBtn}
        onClick={() => goTo(page + 1)}
        disabled={page === clampedTotal}
        aria-label="Next page"
      >
        <img src={arrowIcon} alt="arrow-icon" className="ml-2" />
      </button>
    </nav>
  );
};

export default Pagination;
