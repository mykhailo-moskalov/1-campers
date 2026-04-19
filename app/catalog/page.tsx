"use client";

import { useState } from "react";
import css from "./Catalog.module.css";
import { CamperFilters } from "@/types/filters";
import { CatalogFilters } from "@/components/CatalogFilters/CatalogFilters";
import Container from "@/components/Container/Container";
import CampersList from "@/components/CampersList/CampersList";
import Btn from "@/components/Button/Button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCampers } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";

const Catalog = () => {
  const [filters, setFilters] = useState<CamperFilters>({});

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["campers", filters],
      queryFn: ({ pageParam = 1 }) => fetchCampers(filters, pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
      initialPageParam: 1,
    });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  return (
    <Container>
      <div className={css.catalogLayout}>
        <CatalogFilters onSearch={setFilters} />
        <div className={css.content}>
          {isLoading ? (
            <Loader className={css.loader} />
          ) : (
            <CampersList campers={campers} />
          )}
          {hasNextPage && (
            <Btn
              variant="transparent"
              onClick={fetchNextPage}
              className={css.loadMore}
            >
              {isFetchingNextPage ? (
                <Loader size={24} className={css.loader} />
              ) : (
                "Load more"
              )}
            </Btn>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Catalog;
