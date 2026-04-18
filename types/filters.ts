import {
  CamperEngine,
  CamperForm,
  CamperTransmission,
} from "./camperCharacteristics";

export interface CamperFilters {
  location?: string;
  forms?: CamperForm;
  transmissions?: CamperTransmission;
  engines?: CamperEngine;
}
