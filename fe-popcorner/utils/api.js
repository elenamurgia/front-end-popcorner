import axios from "axios";

const userAPI = axios.create({
  baseURL: "http://popcorner.vercel.app/",
});

export const getUser = (userID) => {
  return userAPI.get(`/users/${userID}`).then(({ data }) => {
    return data.user;
  });
};

export const getUsers = () => {
  return userAPI.get(`/users`).then(({ data }) => {
    return data;
  });
};

export const postUser = (postBody) => {
  return userAPI.post(`/users/`, postBody).then(({ data }) => {
    return data.user;
  });
};

const apiKey = "fc774c3845ae6ffdefec17c7db1f7fec";

const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const getPopularMovies = () => {
  return moviesApi.get(`/movie/popular?api_key=${apiKey}`).then((res) => {
    return res.data;
  });
};
