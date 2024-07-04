import axios from "axios";

const userAPI = axios.create({
  baseURL: "http://popcorner.vercel.app/",
});

export const getUser = (userID) => {
  // console.log(userID);
  return userAPI.get(`/users/${userID}`).then(({ data }) => {
    // console.log(data);
    return data.user;
  });
};

const apiKey = "fc774c3845ae6ffdefec17c7db1f7fec";

const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const getPopularMovies = () => {
  return moviesApi.get(`/movie/popular?api_key=${apiKey}`).then((res) => {
    // console.log(res.data);
    return res.data;
  });
};

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTA1OTljNGNlNWQwMzA0NzUxOGRhNGNiN2VjNDBjYSIsIm5iZiI6MTcxOTkyNDc3Ny40OTM1OCwic3ViIjoiNjY4M2Y3MjVlM2E2NjVlZDIwYmFkOTE5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.KV1h8OM3FPRTTJPLJ5vgcPWnJIVu1_9N2shC15vX7sU";

const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const popcornerApi = axios.create({
  baseURL: "https://popcorner.vercel.app",
});

export const searchMovies = (searchQuery) => {
  return movieApi
    .get("/search/movie", {
      params: { query: searchQuery },
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
    .then(({ data }) => {
      return data.results;
    });
};

export const searchPeople = (searchQuery) => {
  return movieApi
    .get("/search/person", {
      params: { query: searchQuery },
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
    .then(({ data }) => {
      return data.results;
    });
};

export const listCommunities = () => {
  return popcornerApi.get("/communities").then(({ data }) => {
    return data;
  });
};
