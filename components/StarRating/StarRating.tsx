import { IoStar } from "react-icons/io5";
import css from "./StarRating.module.css";

const StarRating = ({ rating }: { rating: number }) => (
  <div className={css.stars}>
    {Array.from({ length: 5 }, (_, i) => (
      <IoStar key={i} className={i < rating ? css.filled : css.empty} />
    ))}
  </div>
);

export default StarRating;
