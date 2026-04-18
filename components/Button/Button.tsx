import clsx from "clsx";
import css from "./Button.module.css";

interface BtnProps {
  variant?: "green" | "transparent";
  className: string;
  children: React.ReactNode;
}

const Btn = ({ variant = "green", className, children }: BtnProps) => {
  return (
    <button className={clsx(css.btn, css[variant], className)}>
      {children}
    </button>
  );
};

export default Btn;
