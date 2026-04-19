import clsx from "clsx";
import css from "./Button.module.css";
import Link from "next/link";

interface BtnProps {
  variant?: "green" | "transparent" | "link";
  href?: string;
  target?: "_blank" | "_parent" | "_top" | "_self";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Btn = ({
  variant = "green",
  href,
  target,
  className,
  children,
  onClick,
}: BtnProps) => {
  if (variant === "link") {
    return (
      <Link
        href={href || ""}
        target={target}
        className={clsx(css.btn, css[variant], className)}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={clsx(css.btn, css[variant], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Btn;
