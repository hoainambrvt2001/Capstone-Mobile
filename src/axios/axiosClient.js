import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://192.168.1.12:3333/",
});

export default axiosClient;
