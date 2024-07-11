import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, Text, Divider } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import { getMovieById, getMovieProvider, getMovieCast } from "../utils/api";
import MovieReviews from "../components/Movies/MovieReviews";
import RecommendedMovies from "../components/Movies/RecommendedMovies";

const { width, height } = Dimensions.get("window");

const MovieScreen = () => {
  const {
    params: { movie_id },
  } = useRoute();

  const [movie, setMovie] = useState({});
  const [rentProviders, setRentProviders] = useState([]);
  const [buyProviders, setBuyProviders] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovie = async (movie_id) => {
      setLoading(true);
      setError(null);

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
      } catch (error) {
        setError("Something went wrong, please try again");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie(movie_id);
  }, [movie_id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EEEEEE" />
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

  const LeftContent = (props) => (
    <Avatar.Icon
      {...props}
      icon="movie-open"
      size={50}
      color="#EEEEEE"
      style={styles.headerIcon}
    />
  );

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "";
  const totalHours = Math.floor(movie.runtime / 60);
  const totalMinutes = movie.runtime % 60;

  const handleClick = (item) => {
    navigation.navigate("CastScreen", { person_id: item.id });
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView scrollIndicatorInsets={{ right: 1 }}>
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Card.Title
              title={`${movie.title} ${releaseYear ? `(${releaseYear})` : ""}`}
              left={LeftContent}
              titleStyle={styles.title}
            />
            <Card.Content>
              <Text variant="labelLarge" style={styles.genreText}>
                {movie.genres?.map((genre) => genre.name).join(", ")} |{" "}
                {totalHours}h{totalMinutes}m
              </Text>
            </Card.Content>
            <Card.Cover
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
              }}
              style={styles.movieImage}
              resizeMode="cover"
            />
            <Divider style={styles.divider} />
            <Card.Content>
              <Text variant="bodyLarge" style={styles.overview}>
                {movie.overview}
              </Text>
              <Divider style={styles.divider} />
              <View style={styles.castHeader}>
                <Avatar.Icon
                  size={40}
                  icon="account-group"
                  color="#EEEEEE"
                  style={styles.castIcon}
                />
                <Text style={styles.castTitle}>Cast</Text>
              </View>
              <Carousel
                loop
                autoPlay={false}
                width={width}
                height={250}
                data={cast}
                scrollAnimationDuration={1000}
                mode="parallax"
                modeConfig={{
                  parallaxScrollingOffset: 250,
                  parallaxScrollingScale: 1,
                  parallaxAdjacentItemScale: 0.5,
                }}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleClick(item)}>
                    <View style={styles.castContainer}>
                      <Image
                        style={styles.castImage}
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
                        }}
                      />
                      <Text variant="titleMedium" style={styles.castName}>
                        {item.name}
                      </Text>
                      <Text variant="bodyMedium" style={styles.castCharacter}>
                        {item.character}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
              <Divider style={styles.divider} />
              {rentProviders.length > 0 ? (
                <>
                  <Text style={styles.rentBuy}>RENT</Text>
                  <View style={styles.providersContainer}>
                    {rentProviders.map((provider) => (
                      <View key={provider.provider_id} style={styles.provider}>
                        <Image
                          source={{
                            uri: `https://image.tmdb.org/t/p/w500/${provider.logo_path}`,
                          }}
                          style={styles.providerLogo}
                          resizeMode="contain"
                        />
                      </View>
                    ))}
                  </View>
                </>
              ) : (
                <Text style={styles.notRent}>Not available for rent</Text>
              )}
              {buyProviders.length > 0 ? (
                <>
                  <Text style={styles.rentBuy}>BUY</Text>
                  <View style={styles.providersContainer}>
                    {buyProviders.map((provider) => (
                      <View key={provider.provider_id} style={styles.provider}>
                        <Image
                          source={{
                            uri: `https://image.tmdb.org/t/p/w500/${provider.logo_path}`,
                          }}
                          style={styles.providerLogo}
                          resizeMode="contain"
                        />
                      </View>
                    ))}
                  </View>
                </>
              ) : (
                <View>
                  <Text style={styles.notBuy}>Not available for purchase</Text>
                </View>
              )}
              <Divider style={styles.divider} />
              <View style={styles.reviewHeader}>
                <Avatar.Icon
                  size={40}
                  icon="comment"
                  style={styles.reviewIcon}
                  color="#EEEEEE"
                />
                <Text style={styles.reviewTitle}>Reviews</Text>
              </View>
              <MovieReviews movie_id={movie_id} />
              <Divider style={styles.divider} />
              <View style={styles.recommendationHeader}>
                <Avatar.Icon
                  size={40}
                  icon="movie-open-star"
                  color="#EEEEEE"
                  style={styles.recommendationIcon}
                />
                <Text style={styles.recommendationTitle}>Recommendations</Text>
              </View>
              <RecommendedMovies movie_id={movie_id} />
            </Card.Content>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#333",
  },
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
    color: "#EEEEEE",
    fontSize: 18,
  },
  card: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#333",
  },
  cardContent: {
    overflow: "hidden",
  },
  headerIcon: {
    backgroundColor: "#F2055C",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#F2055C",
    paddingTop: 10,
    flexShrink: 1,
  },
  genreText: {
    color: "#EEEEEE",
  },
  overview: {
    marginVertical: 10,
    color: "#EEEEEE",
  },
  divider: {
    marginVertical: 10,
    backgroundColor: "#EEEEEE",
  },
  castHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  castTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#F2055C",
  },
  castContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  castIcon: {
    backgroundColor: "#F2055C",
  },
  castImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "#474747",
  },
  castName: {
    color: "#EEEEEE",
  },
  castCharacter: {
    color: "#EEEEEE",
  },
  movieImage: {
    width: width * 0.9,
    height: height * 0.6,
    alignSelf: "center",
  },
  providersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  provider: {
    alignItems: "center",
    margin: 5,
  },
  providerLogo: {
    width: 35,
    height: 35,
    marginBottom: 3,
  },
  rentBuy: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#F2055C",
  },
  notRent: {
    color: "#EEEEEE",
    marginLeft: 5,
  },
  notBuy: {
    color: "#EEEEEE",
    marginLeft: 5,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#F2055C",
  },
  reviewIcon: {
    backgroundColor: "#F2055C",
  },
  recommendationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  recommendationTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#F2055C",
  },
  recommendationIcon: {
    backgroundColor: "#F2055C",
  },
});

export default MovieScreen;
