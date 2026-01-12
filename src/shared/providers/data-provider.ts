import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";
import { API_URL } from "../config/constants";

export const { dataProvider, kyInstance } = createSimpleRestDataProvider({
  apiURL: API_URL,
});
