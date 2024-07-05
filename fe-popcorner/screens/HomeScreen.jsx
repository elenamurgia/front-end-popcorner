import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { SegmentedButtons, Button } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import PopularMovies from "../components/Movies/PopularMovies";
import TopRatedMovies from "../components/Movies/TopRatedMovies";
import { getPopularMovies, getTopRatedMovies } from "../utils/api";

export default function HomeScreen({ navigation }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState("popular");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const popularResponse = await getPopularMovies();
        const topRatedResponse = await getTopRatedMovies();

        setPopularMovies(popularResponse.results);
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
      popularMovies: popularMovies,
      topRatedMovies: topRatedMovies,
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ marginBottom: 15 }}>
        <View style={styles.eventsContainer}>
          <Button
            title="Events near you"
            onPress={() => navigation.navigate("Events")}
          />
        </View>

        <StatusBar style="light" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 16,
          }}
        ></View>
      </SafeAreaView>
      <Button icon="movie-open" mode="contained" onPress={handleClick}>
        All Movies
      </Button>
      <View
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            { value: "popular", label: "Popular Movies" },
            { value: "top rated", label: "Top Rated" },
          ]}
        />
        {value === "popular" ? (
          <PopularMovies data={popularMovies} />
        ) : (
          <TopRatedMovies data={topRatedMovies} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C1844",
    alignItems: "center",
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
});
