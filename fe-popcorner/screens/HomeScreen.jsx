import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Button, Divider } from "react-native-paper";
import TopRatedMovies from "../components/Movies/TopRatedMovies";
import UpComingMoviesHomepage from "../components/Movies/UpcomingMoviesHomePage";
import { getTopRatedMovies } from "../utils/api";
import { getUpComingMovies } from "../utils/api";

export default function HomeScreen({ navigation }) {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const topRatedResponse = await getTopRatedMovies();
        const upComingResponse = await getUpComingMovies();

        setTopRatedMovies(topRatedResponse.results);
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

  const handleClick = () => {
    navigation.navigate("AllMoviesScreen", {
      topRatedMovies: topRatedMovies,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TopRatedMovies data={topRatedMovies} />
      </ScrollView>
      <ScrollView>
        <UpComingMoviesHomepage data={upComingMovies} />
      </ScrollView>
      <Button
        icon="movie-open-star"
        mode="contained"
        onPress={handleClick}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        All Movies
      </Button>
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
    backgroundColor: "#474747",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2055C",
    borderWidth: 1.5,
    borderColor: "#C2044A",
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 60,
  },
  buttonLabel: {
    color: "#EEEEEE",
    fontWeight: "bold",
    fontSize: 16,
  },
});
