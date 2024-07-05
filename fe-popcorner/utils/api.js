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

//endpoint that should bring all the genre, according to the genre_id, database doesn't seem very helpful so not sure if we should do this one
// export const getMovieByGenre = (genre_id) => {
//   return moviesApi
//     .get(`discover/movie?api_key=${moviesApiKey}&with_genres=${genre_id}`)
//     .then((res) => {
//       return res.data;
//     });
// };
