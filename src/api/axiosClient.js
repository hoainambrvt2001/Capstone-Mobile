import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://dacn-backend.vercel.app/",
});

export const axiosClientWeather = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});
