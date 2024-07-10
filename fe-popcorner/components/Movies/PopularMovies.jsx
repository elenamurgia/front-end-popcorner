import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AllMovieCard from "./AllMovieCard";
import { getPopularMovies } from "../../utils/api";

function PopularMovies({ data }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const popularMovieResponse = await getPopularMovies();

        setPopularMovies(popularMovieResponse.results);
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
    <ScrollView contentContainerStyle={styles.container}>
      {popularMovies.map((item) => (
        <AllMovieCard key={item.id} movie={item} />
      ))}
    </ScrollView>
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

export default PopularMovies;
