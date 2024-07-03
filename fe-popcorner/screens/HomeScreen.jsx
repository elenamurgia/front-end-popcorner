import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PopularMovies from "../components/PopularMovies";
import { getPopularMovies } from "../utils/api";

export default function HomeScreen({ navigation }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPopularMovies()
      .then((response) => {
        setPopularMovies(response.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setError("Something went wrong, please try again");
        setLoading(false);
      });
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

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ marginBottom: 15 }}>
        <StatusBar style="light" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 16,
          }}
        >
          <Text style={{ color: "#C80036", fontSize: 70, fontWeight: "bold" }}>
            PopCorner
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <View style={styles.eventsContainer}>
          <Button
            title="Events near you"
            onPress={() => navigation.navigate("Events")}
          />
        </View>
        <PopularMovies data={popularMovies} />
      </ScrollView>
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
  eventsContainer: {
    backgroundColor: "#BB2525",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
