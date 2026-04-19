import clsx from "clsx";
import {
  TbAutomaticGearbox,
  TbGasStationFilled,
  TbManualGearbox,
} from "react-icons/tb";
import { BsFuelPumpDieselFill } from "react-icons/bs";
import { GiElectric } from "react-icons/gi";
import { PiVanFill } from "react-icons/pi";
import css from "./BadgesList.module.css";

interface BadgesListProps {
  engine: string;
  transmission: string;
  form: string;
  amenities?: string[];
  className?: string;
}

const ENGINE_ICONS: Record<string, React.ReactNode> = {
  diesel: <BsFuelPumpDieselFill className={clsx(css.icon, css.engineIcon)} />,
  petrol: <TbGasStationFilled className={clsx(css.icon, css.engineIcon)} />,
  hybrid: <TbGasStationFilled className={clsx(css.icon, css.engineIcon)} />,
  electric: <GiElectric className={clsx(css.icon, css.engineIcon)} />,
};

const TRANSMISSION_ICONS: Record<string, React.ReactNode> = {
  automatic: <TbAutomaticGearbox className={clsx(css.icon, css.gearboxIcon)} />,
  manual: <TbManualGearbox className={clsx(css.icon, css.gearboxIcon)} />,
};

const BadgesList = ({
  engine,
  transmission,
  form,
  amenities,
  className,
}: BadgesListProps) => {
  const formatLabel = (value: string) =>
    value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <ul className={clsx(css.badgesList, className)}>
      <li className={css.badgesItem}>
        {ENGINE_ICONS[engine]}
        {engine}
      </li>
      <li className={css.badgesItem}>
        {TRANSMISSION_ICONS[transmission]}
        {transmission}
      </li>
      <li className={css.badgesItem}>
        <PiVanFill className={clsx(css.icon, css.carIcon)} />
        {formatLabel(form)}
      </li>
      {amenities &&
        amenities.map((a) => (
          <li key={a} className={css.badgesItem}>
            {a}
          </li>
        ))}
    </ul>
  );
};

export default BadgesList;
