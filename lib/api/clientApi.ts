import type { Camper } from "@/types/camper";
import { apiClient } from "./api";
import { CamperFilters } from "@/types/filters";

export interface CamperListResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export const fetchCampers = async (
  filters: CamperFilters,
  page: number,
): Promise<CamperListResponse> => {
  const { data } = await apiClient.get<CamperListResponse>("/campers", {
    params: {
      ...filters,
      page,
      perPage: 4,
    },
  });
  return data;
};

export const fetchCamperById = async (id: string): Promise<Camper> => {
  const { data } = await apiClient.get<Camper>(`/campers/${id}`);
  return data;
};
