import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Card, Text, Divider } from "react-native-paper";
import TopRatedMovies from "../components/Movies/TopRatedMovies";
import PopularMovies from "../components/Movies/PopularMovies";
import NowPlayingMovies from "../components/Movies/NowPlayingMovies";
import UpComingMovies from "../components/Movies/UpComingMovies";
import TrendingMovies from "../components/Movies/TrendingMovies";

export default function AllMoviesScreen({ route }) {
  const { popularMovies, topRatedMovies } = route.params || {};

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="labelLarge" style={styles.title}>
              Trending Movies
            </Text>
            <TrendingMovies />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="labelLarge" style={styles.title}>
              Upcoming Movies
            </Text>
            <UpComingMovies />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="labelLarge" style={styles.title}>
              Now Playing Movies
            </Text>
            <NowPlayingMovies />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="labelLarge" style={styles.title}>
              Popular Movies
            </Text>
            <PopularMovies data={popularMovies} />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="labelLarge" style={styles.title}>
              Top Rated Movies
            </Text>
            <TopRatedMovies data={topRatedMovies} />
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C1844",
    padding: 16,
  },
  card: {
    backgroundColor: "#1C2851",
  },
  title: {
    color: "white",
    marginBottom: 10,
  },
});
