import { API_BASE_PATH, API_KEY } from "./constants";
import Api from "../classes/api";

export const api = new Api({
  apiKey: API_KEY,
  basePath: API_BASE_PATH,
});
