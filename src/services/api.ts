import Axios from "axios";

export const api = Axios.create({
  baseURL: process.env.API_BASE_URL,
});