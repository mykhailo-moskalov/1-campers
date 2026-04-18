"use client";

import { useState } from "react";
import css from "./Catalog.module.css";
import { CamperFilters } from "@/types/filters";
import { CatalogFilters } from "@/components/CatalogFilters/CatalogFilters";
import Container from "@/components/Container/Container";

const Catalog = () => {
  const [filters, setFilters] = useState<CamperFilters>({});

  return (
    <div className={css.page}>
      <Container>
        <CatalogFilters onSearch={setFilters} />
      </Container>
    </div>
  );
};

export default Catalog;
