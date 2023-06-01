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
  return await axiosClient
    .post("auth/login", bodyData)
    .then((res) => res.data)
    .catch((e) => console.log(e.message));
};

export const fetchMe = async (params) => {
  const { token } = params;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axiosClient
    .get(`user/me/information`, config)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const updateMe = async (params) => {
  const { token, updateData } = params;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const updateFormData = new FormData();
  for (let key in updateData) {
    updateFormData.append(key, updateData[key]);
  }

  return await axiosClient
    .post(`user/me/information`, updateFormData, config)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const fetchOrganizationByName = async (params) => {
  const { token, s, page, limit } = params;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axiosClient
    .get(`organization/search?s=${s}&page=${page}&limit=${limit}`, config)
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
      return null;
    });
};

export const fetchListRequestByUID = async (params) => {
  const { token, uid } = params;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axiosClient
    .get(`request-access/user/${uid}`, config)
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
      return null;
    });
};

export const fetchListAccessHistory = async (params) => {
  const { token } = params;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axiosClient
    .get(`access-event/me/information`, config)
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
      return null;
    });
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

export const createRequestAccess = async (params) => {
  const {
    token,
    organization_id,
    note,
    requested_time,
    registered_face_images,
    user_name,
  } = params;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    user_name,
    organization_id,
    requested_time,
    note,
    registered_face_images,
  };
  return await axiosClient
    .post(`/request-access`, data, config)
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
      return null;
    });
};
