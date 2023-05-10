import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://172.17.80.1:3333/",
});

export const axiosClientWeather = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});
