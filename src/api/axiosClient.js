import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://bkaccess-api-v2-24a5yyphpq-as.a.run.app/",
});

export const axiosClientWeather = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});
