import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import MovieCard from "./MovieCard";
import { getUpComingMovies } from "../../utils/api";

const windowDimensions = Dimensions.get("screen");

function UpComingMovies({ data }) {
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const upComingResponse = await getUpComingMovies();

        setUpComingMovies(upComingResponse.results);
        setLoading(false);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError("Something went wrong, please try again");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

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
        <Text>{error}</Text>
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
        data={upComingMovies}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleClick(item)}>
            <View style={styles.movieContainer}>
              <MovieCard movie={item} handleClick={handleClick} />
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                }}
              />
              <Text style={styles.movieTitle}>
                {item.original_title.length > 18
                  ? `${item.original_title.slice(0, 18)}...`
                  : item.original_title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        width={windowDimensions.width}
        height={250}
        scrollAnimationDuration={1000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingOffset: 220,
          parallaxScrollingScale: 1,
          parallaxAdjacentItemScale: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#0C1844",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 80,
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
    color: "white",
    textAlign: "center",
    margin: 10,
  },
});

export default UpComingMovies;
