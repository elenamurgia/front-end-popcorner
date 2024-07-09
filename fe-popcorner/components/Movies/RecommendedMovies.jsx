import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import { getMovieRecommendations } from "../../utils/api";
import MovieCardHomeScreen from "./MovieCardHomeScreen";

export default function RecommendedMovies({ movie_id }) {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();
  const windowDimensions = Dimensions.get("window");

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);

      try {
        const recommendationData = await getMovieRecommendations(movie_id);
        setRecommendations(recommendationData.results);
        setIsLoading(false);
      } catch (error) {
        setError("Something went wrong, please try again");
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, [movie_id]);

  if (isLoading) {
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

  const handleClick = (item) => {
    navigation.navigate("MovieScreen", { movie_id: item.id });
  };

  return (
    <View style={[styles.outerContainer, { width: windowDimensions.width }]}>
      <Carousel
        loop
        data={recommendations}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleClick(item)}>
            <View style={styles.movieContainer}>
              <MovieCardHomeScreen movie={item} handleClick={handleClick} />
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                }}
              />
              <Text style={styles.movieTitle}>
                {item.original_title.length > 18
                  ? `${item.original_title.slice(0, 14)}...`
                  : item.original_title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        width={windowDimensions.width}
        height={350}
        scrollAnimationDuration={1000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingOffset: 200,
          parallaxScrollingScale: 1,
          parallaxAdjacentItemScale: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#f5f5f5",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF5E1",
    marginBottom: 15,
  },
  movieContainer: {
    alignItems: "center",
  },

  movieTitle: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
    margin: 10,
  },
});
