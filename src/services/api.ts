import Axios from "axios";

export const api = Axios.create({
  baseURL: "https://skynet-api.drenapps.com.br",
});
