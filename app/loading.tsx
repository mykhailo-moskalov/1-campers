import { RingLoader } from "react-spinners";
import css from "./Home.module.css";
import clsx from "clsx";

interface LoaderProps {
  className?: string;
  size?: number;
}

const Loader = ({ className, size = 64 }: LoaderProps) => (
  <RingLoader
    size={size}
    color="var(--gray-green)"
    className={clsx(css.loader, className)}
  />
);

export default Loader;
