import type { Camper } from "@/types/camper";
import { apiClient } from "./api";
import { CamperFilters } from "@/types/filters";
import { Review } from "@/types/review";
import { Booking, BookingResponse } from "@/types/booking";

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

export const fetchCamperReviews = async (id: string): Promise<Review[]> => {
  const { data } = await apiClient.get<Review[]>(`/campers/${id}/reviews`);
  return data;
};

export const sendBookingRequest = async (
  id: string,
  body: Booking,
): Promise<BookingResponse> => {
  const { data } = await apiClient.post<BookingResponse>(
    `/campers/${id}/booking-requests`,
    body,
  );
  return data;
};
