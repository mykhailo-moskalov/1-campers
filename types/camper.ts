import {
  CamperAmenities,
  CamperEngine,
  CamperForm,
  CamperTransmission,
} from "./camperCharacteristics";

export interface CamperList {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description?: string; // ? Details
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: CamperTransmission;
  engine: CamperEngine;
  amenities: CamperAmenities;
  coverImage?: string; // ? ListItem
  gallery?: CamperImage;
  createdAt?: string; // ? Details
  updatedAt?: string; // ? Details
}

export interface CamperImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}
