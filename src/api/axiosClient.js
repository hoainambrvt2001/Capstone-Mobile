import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://192.168.1.9:3333/",
});

export const axiosClientWeather = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});
