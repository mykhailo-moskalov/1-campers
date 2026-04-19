import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://campers-api.goit.study",
});
