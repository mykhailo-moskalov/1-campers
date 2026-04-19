import clsx from "clsx";
import Image from "next/image";
import { IoMapOutline, IoStar } from "react-icons/io5";
import css from "./CampersListItem.module.css";
import { Camper } from "@/types/camper";
import BadgesList from "../BadgesList/BadgesList";
import Btn from "../Button/Button";

interface CampersListItemProps {
  c: Camper;
}

const CampersListItem = ({ c }: CampersListItemProps) => {
  return (
    <div className={css.card}>
      <Image
        src={c.coverImage || c.gallery?.[0]?.thumb || "/placeholder.png"}
        alt={c.name}
        width={219}
        height={240}
        loading="lazy"
        className={css.img}
      />
      <div className={css.info}>
        <div className={css.mainStats}>
          <h2 className={css.name}>{c.name}</h2>
          <p className={`${css.price} h2`}>&euro;{c.price}</p>
        </div>
        <div className={css.stats}>
          <p className={css.stat}>
            <IoStar className={clsx(css.icon, css.star)} />
            {c.rating}({c.totalReviews}
            {c.totalReviews === 1 ? " Review" : " Reviews"})
          </p>
          <p className={css.stat}>
            <IoMapOutline className={clsx(css.icon, css.map)} />
            {c.location}
          </p>
        </div>
        <p className={css.descr}>{c.description?.slice(0)}</p>
        <BadgesList
          engine={c.engine}
          transmission={c.transmission}
          form={c.form}
          className={css.badges}
        />
        <Btn variant="link" href={`/catalog/${c.id}`} target="_blank">
          Show more
        </Btn>
      </div>
    </div>
  );
};

export default CampersListItem;
