import {
  CamperEngine,
  CamperForm,
  CamperTransmission,
} from "./camperCharacteristics";

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
  amenities: string[];
  coverImage?: string; // ? ListItem
  gallery?: CamperImageGallery[];
  createdAt?: string; // ? Details
  updatedAt?: string; // ? Details
}

export interface CamperImageGallery {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}
