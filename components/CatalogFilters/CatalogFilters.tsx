"use client";

import { useState } from "react";
import { IoCloseOutline, IoMapOutline } from "react-icons/io5";
import css from "./CatalogFilters.module.css";
import { CamperFilters } from "@/types/filters";
import {
  CamperForm,
  CamperTransmission,
  CamperEngine,
} from "@/types/camperCharacteristics";
import Btn from "../Button/Button";

interface CatalogFiltersProps {
  onSearch: (filters: CamperFilters) => void;
}

const FORMS: { label: string; value: CamperForm }[] = [
  { label: "Alcove", value: CamperForm.Alcove },
  { label: "Panel Van", value: CamperForm.PanelVan },
  { label: "Integrated", value: CamperForm.Integrated },
  { label: "Semi Integrated", value: CamperForm.SemiIntegrated },
];

const ENGINES: { label: string; value: CamperEngine }[] = [
  { label: "Diesel", value: CamperEngine.Diesel },
  { label: "Petrol", value: CamperEngine.Petrol },
  { label: "Hybrid", value: CamperEngine.Hybrid },
  { label: "Electric", value: CamperEngine.Electric },
];

const TRANSMISSIONS: { label: string; value: CamperTransmission }[] = [
  { label: "Automatic", value: CamperTransmission.Automatic },
  { label: "Manual", value: CamperTransmission.Manual },
];

export const CatalogFilters = ({ onSearch }: CatalogFiltersProps) => {
  const [location, setLocation] = useState("");
  const [form, setForm] = useState<CamperForm | undefined>();
  const [engine, setEngine] = useState<CamperEngine | undefined>();
  const [transmission, setTransmission] = useState<
    CamperTransmission | undefined
  >();

  const handleSearch = () => {
    console.log("filters:", {
      ...(location && { location }),
      form,
      engine,
      transmission,
    });
    onSearch({ ...(location && { location }), form, engine, transmission });
  };

  const handleClear = () => {
    setLocation("");
    setForm(undefined);
    setEngine(undefined);
    setTransmission(undefined);
    onSearch({});
  };

  return (
    <aside className={css.sidebar}>
      <div className={css.locationGroup}>
        <label className={css.label}>
          Location
          <input
            id="locationInput"
            className={css.input}
            type="text"
            placeholder="City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <IoMapOutline className={css.map} />
        </label>
      </div>

      <h3 className={css.filtersTitle}>Filters</h3>

      <fieldset className={css.fieldset}>
        <legend className={css.fieldsetLegend}>Camper form</legend>
        {FORMS.map(({ label, value }) => (
          <label key={value} className={css.radioLabel}>
            <input
              type="radio"
              name="form"
              checked={form === value}
              onChange={() => setForm(value)}
              className={css.radio}
            />
            {label}
          </label>
        ))}
      </fieldset>

      <fieldset className={css.fieldset}>
        <legend className={css.fieldsetLegend}>Engine</legend>
        {ENGINES.map(({ label, value }) => (
          <label key={value} className={css.radioLabel}>
            <input
              type="radio"
              name="engine"
              checked={engine === value}
              onChange={() => setEngine(value)}
              className={css.radio}
            />
            {label}
          </label>
        ))}
      </fieldset>

      <fieldset className={css.fieldset}>
        <legend className={css.fieldsetLegend}>Transmission</legend>
        {TRANSMISSIONS.map(({ label, value }) => (
          <label key={value} className={css.radioLabel}>
            <input
              type="radio"
              name="transmission"
              checked={transmission === value}
              onChange={() => setTransmission(value)}
              className={css.radio}
            />
            {label}
          </label>
        ))}
      </fieldset>

      <div className={css.btns}>
        <Btn onClick={handleSearch}>Search</Btn>
        <Btn
          onClick={handleClear}
          variant="transparent"
          className={css.btnClear}
        >
          <IoCloseOutline />
          Clear Filters
        </Btn>
      </div>
    </aside>
  );
};
