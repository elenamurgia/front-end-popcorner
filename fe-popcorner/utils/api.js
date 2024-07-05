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

const moviesApiKey = "fc774c3845ae6ffdefec17c7db1f7fec";

const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const getPopularMovies = () => {
  return moviesApi.get(`/movie/popular?api_key=${moviesApiKey}`).then((res) => {
    return res.data;
  });
};

export const getTopRatedMovies = () => {
  return moviesApi
    .get(`/movie/top_rated?api_key=${moviesApiKey}`)
    .then((res) => {
      return res.data;
    });
};

export const getMovieById = (movie_id) => {
  return moviesApi
    .get(`/movie/${movie_id}?api_key=${moviesApiKey}`)
    .then((res) => {
      return res.data;
    });
};

export const getMovieProvider = (movie_id) => {
  return moviesApi
    .get(`/movie/${movie_id}/watch/providers?api_key=${moviesApiKey}`)
    .then((res) => {
      return res.data;
    });
};

export const getMovieCast = (movie_id) => {
  return moviesApi
    .get(`/movie/${movie_id}/credits?api_key=${moviesApiKey}`)
    .then((res) => {
      return res.data;
    });
};

export const getMovieReviews = (movie_id) => {
  return moviesApi
    .get(`/movie/${movie_id}/reviews?api_key=${moviesApiKey}`)
    .then((res) => {
      return res.data;
    });
};

export const getNowPlayingMovies = () => {
  return moviesApi
    .get(`/movie/now_playing?api_key=${moviesApiKey}`)
    .then((res) => {
      return res.data;
    });
};

export const getUpComingMovies = () => {
  return moviesApi
    .get(`/movie/upcoming?api_key=${moviesApiKey}`)
    .then((res) => {
      return res.data;
    });
};

export const getTrendingMovies = () => {
  return moviesApi
    .get(`/trending/movie/day?api_key=${moviesApiKey}`)
    .then((res) => {
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

 export const listCinemas = () => {
  return popcornerApi.get("/cinemas").then(({ data }) => {
    return data
  })
 }

