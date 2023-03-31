import { axiosClient, axiosClientWeather } from "./axiosClient";

export const createUserWithEmailAndPassword = async (params) => {
  const bodyData = {
    name: params.name,
    email: params.email,
    password: params.password,
  };
  return await axiosClient
    .post("auth/signup", bodyData)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const signInWithEmailAndPassword = async (params) => {
  const bodyData = {
    email: params.email,
    password: params.password,
  };
  console.log(bodyData);
  return await axiosClient
    .post("auth/login", bodyData)
    .then((res) => res.data)
    .catch((e) => console.log(e.message));
};

export const fetchUserWithId = async (params) => {
  const { id } = params;
  return await axiosClient
    .get(`user/${id}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const updateUserWithId = async (params) => {
  const { id, token, updateData } = params;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axiosClient
    .patch(`user/${id}`, updateData, config)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const fetchWeatherData = async (location) => {
  const { latitude = 10.7721, longitude = 106.6579 } = location;
  const weatherData = await axiosClientWeather
    .get(
      `weather?lat=${latitude}&lon=${longitude}&appid=22434084a9b1bcd57327b25dcfb28e93`
    )
    .then((res) => res.data)
    .then((data) => {
      return {
        temp: Math.round(data.main.temp - 273.15),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        locationName: data.name,
        country: data.sys.country,
        iconUri: {
          uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        },
        cloudiness: data.clouds.all,
      };
    })
    .catch((err) => console.log(err));
  return weatherData;
};
