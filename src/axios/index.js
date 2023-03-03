import axiosClient from "./axiosClient";

export const createUserInServer = async (name, email, password) => {
  return await axiosClient
    .post("user", {
      name: name,
      email: email,
      password: password,
    })
    .then((res) => res.data)
    .then((data) => data.data);
};

export const fetchUserByEmail = async (email) => {
  return await axiosClient
    .get(`user/email/${email}`)
    .then((res) => res.data)
    .then((data) => data.data);
};
