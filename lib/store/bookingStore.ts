import { Booking } from "@/types/booking";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type BookingDraftStore = {
  draft: Booking;
  setDraft: (book: Booking) => void;
  clearDraft: () => void;
};

const initialDraft: Booking = {
  name: "",
  email: "",
};

export const useBookingDraftStore = create<BookingDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (book) => set(() => ({ draft: book })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "booking-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
