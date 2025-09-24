import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:3333/api",
  headers: {
    "Content-type": "application/json",
  },
});