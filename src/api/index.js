import { axiosClient, axiosClientWeather } from "./axiosClient";

export const createUserWithEmailAndPassword = async (user) => {
  const registeredUser = {
    name: user.name,
    email: user.email,
    password: user.password,
  };
  return await axiosClient
    .post("auth/signup", registeredUser)
    .then((res) => res.data)
    .then((data) => data.data);
};

export const signInWithEmailAndPassword = async (user) => {
  const signInUser = {
    email: user.email,
    password: user.password,
  };

  return await axiosClient
    .post("auth/signin", signInUser)
    .then((res) => res.data)
    .then((data) => data.data);
};

export const signInWithGoogle = async (user) => {
  return await axiosClient
    .post("auth/signin/google", user)
    .then((res) => res.data)
    .then((data) => data.data);
};

export const fetchUserWithEmail = async (email) => {
  return await axiosClient
    .get(`user/email/${email}`)
    .then((res) => res.data)
    .then((data) => data.data);
};

export const updateUserWithId = async (updateData, userId) => {
  return await axiosClient
    .patch(`user/${userId}`, updateData)
    .then((res) => res.data)
    .then((data) => data.data);
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
