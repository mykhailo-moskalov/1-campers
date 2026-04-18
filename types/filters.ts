import {
  CamperEngine,
  CamperForm,
  CamperTransmission,
} from "./camperCharacteristics";

export interface Filter {
  forms: CamperForm;
  transmissions: CamperTransmission;
  engines: CamperEngine;
}
