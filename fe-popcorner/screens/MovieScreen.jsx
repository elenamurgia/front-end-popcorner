import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { Avatar, Card, Text, Divider } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import { getMovieById, getMovieProvider, getMovieCast } from "../utils/api";
import MovieReviews from "../components/Movies/MovieReviews";

const { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const {
    params: { movie_id },
  } = useRoute();

  const [movie, setMovie] = useState([]);
  const [rentProviders, setRentProviders] = useState([]);
  const [buyProviders, setBuyProviders] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async (movie_id) => {
      setLoading(true);

      try {
        const movieData = await getMovieById(movie_id);
        const movieProvider = await getMovieProvider(movie_id);
        const castData = await getMovieCast(movie_id);

        setMovie(movieData);
        setCast(castData.cast);

        if (
          movieProvider &&
          movieProvider.results &&
          movieProvider.results.GB
        ) {
          setRentProviders(movieProvider.results.GB.rent || []);
          setBuyProviders(movieProvider.results.GB.buy || []);
        } else {
          setRentProviders([]);
          setBuyProviders([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError("Something went wrong, please try again");
        setLoading(false);
      }
    };
    if (movie_id) {
      fetchMovie(movie_id);
    }
  }, [movie_id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="pink" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const LeftContent = (props) => <Avatar.Icon {...props} icon="movie-open" />;

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <Card>
          <Card.Title
            title={movie.title}
            left={LeftContent}
            titleStyle={{ fontSize: 25, fontWeight: "bold" }}
          />
          <Divider />
          <Card.Content>
            <Text variant="labelLarge">
              {movie.genres?.map((genre) => genre.name).join(", ")}
            </Text>
          </Card.Content>

          <Card.Cover
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            }}
            style={styles.movieImage}
            resizeMode="cover"
          />
          <Divider />
          <Text variant="bodyMedium">{movie.overview}</Text>
          <Divider />
          <Card.Content>
            {rentProviders.length > 0 ? (
              <>
                <Text variant="titleMedium">
                  You can rent {movie.title} on{" "}
                </Text>
                <Text variant="labelMedium">
                  {rentProviders
                    .map((provider) => provider.provider_name)
                    .join(", ")}
                </Text>
              </>
            ) : (
              <Text>Not available for rent</Text>
            )}
            {buyProviders.length > 0 ? (
              <>
                <Text variant="titleMedium">You can buy {movie.title} on </Text>
                <Text variant="labelMedium">
                  {buyProviders
                    .map((provider) => provider.provider_name)
                    .join(", ")}
                </Text>
              </>
            ) : (
              <Text>Not available for purchase</Text>
            )}
            <Divider />
          </Card.Content>

          <Text variant="titleMedium">Cast</Text>
          <Carousel
            loop
            autoPlay={false}
            width={width}
            height={250}
            data={cast}
            scrollAnimationDuration={1000} // this is still here in case we want to be animated, but the autoPlay is set to false
            mode="parallax"
            renderItem={({ item }) => (
              <View style={styles.castContainer}>
                <Image
                  style={styles.castImage}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
                  }}
                />
                <Text>{item.name}</Text>
                <Text>{item.character}</Text>
              </View>
            )}
          />
          <Divider />
          <MovieReviews movie_id={movie_id} />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  castContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  castImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  movieImage: {
    width: width * 1,
    height: height * 0.8,
    borderRadius: 15,
  },
});
