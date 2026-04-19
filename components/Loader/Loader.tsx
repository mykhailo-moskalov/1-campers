import { RingLoader } from "react-spinners";

interface LoaderProps {
  className?: string;
  size?: number;
}

export const Loader = ({ className, size = 64 }: LoaderProps) => (
  <RingLoader size={size} color="var(--gray-green)" className={className} />
);

export default Loader;
