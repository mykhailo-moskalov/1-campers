import clsx from "clsx";
import css from "./Button.module.css";

interface BtnProps {
  variant?: "green" | "transparent";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Btn = ({ variant = "green", className, children, onClick }: BtnProps) => {
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
