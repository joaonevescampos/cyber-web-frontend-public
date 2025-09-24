import { forwardRef, memo, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "../../utils/cn";

type Color = "auto" | "light" | "dark";
type Size = "md" | "lg";

export type ShopNowButtonProps = {
  to?: LinkProps["to"];
  label?: string;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  color?: Color;
  size?: Size;
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium focus:outline-none transition-colors";

const sizes: Record<Size, string> = {
  md: "py-3 px-10 text-sm",
  lg: "py-4 px-14 text-sm md:text-base",
};

const variants: Record<Color, string> = {
  auto: "text-current border border-current hover:bg-current/10 focus-visible:ring-2 focus-visible:ring-current/40",
  light:
    "text-white border border-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40",
  dark:
    "text-[var(--color-black1)] border border-[var(--color-black1)] hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-black/30",
};

const hoverEffect = "hover:bg-white hover:text-[#211C24] transition-colors";
const ShopNowButton = memo(
  forwardRef<HTMLAnchorElement, ShopNowButtonProps>(function ShopNowButton(
    {
      to = "/products/all",
      label = "Shop Now",
      className,
      leftIcon,
      rightIcon,
      color = "auto",
      size = "lg",
      ariaLabel,
    },
    ref
  ) {
    const resolvedAria = ariaLabel ?? label;

    return (
      <Link
        ref={ref}
        to={to}
        aria-label={resolvedAria}
        className={cn(base, sizes[size], variants[color], hoverEffect, className)}
      >
        {leftIcon}
        {label}
        {rightIcon}
      </Link>
    );
  })
);

export default ShopNowButton;
