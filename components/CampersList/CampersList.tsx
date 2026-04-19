import { Camper } from "@/types/camper";
import css from "./CampersList.module.css";
import CampersListItem from "../CampersListItem/CampersListItem";

interface CampersListProps {
  campers: Camper[];
}

const CampersList = ({ campers }: CampersListProps) => {
  return (
    <ul className={css.list}>
      {campers.map((c) => (
        <li key={c.id} className={css.listItem}>
          <CampersListItem c={c} />
        </li>
      ))}
    </ul>
  );
};

export default CampersList;
