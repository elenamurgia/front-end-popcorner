import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Button, Divider } from "react-native-paper";
import TopRatedMovies from "../components/Movies/TopRatedMovies";
import { getTopRatedMovies } from "../utils/api";

export default function HomeScreen({ navigation }) {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const topRatedResponse = await getTopRatedMovies();

        setTopRatedMovies(topRatedResponse.results);
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

  const handleClick = () => {
    navigation.navigate("AllMoviesScreen", {
      topRatedMovies: topRatedMovies,
    });
  };

  return (
    <View style={styles.container}>
      <Button
        icon="movie-open-star"
        mode="contained"
        onPress={handleClick}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        All Movies
      </Button>
      <TopRatedMovies data={topRatedMovies} />
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
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#333",
    borderWidth: 1.5,
    borderColor: "#F2055C",
    borderRadius: 25,
  },
  buttonLabel: {
    color: "#F2055C",
    fontWeight: "bold",
    fontSize: 16,
  },
});
