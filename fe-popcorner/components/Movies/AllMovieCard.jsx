import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";

const AllMovieCard = ({ movie }) => {
  const navigation = useNavigation();
  const { title, release_date, overview, vote_average, poster_path } = movie;

  const truncateOverview = (text, limit) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  const releaseYear = release_date ? release_date.split("-")[0] : "";

  const voteAverage = vote_average ? vote_average.toFixed(1) : "";

  const handleClick = () => {
    navigation.navigate("MovieScreen", { movie_id: movie.id });
  };

  return (
    <TouchableOpacity onPress={handleClick}>
      <Card style={styles.card}>
        <View style={styles.container}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
            style={styles.poster}
          />
          <View style={styles.details}>
            <Text style={styles.title}>
              {title} {releaseYear ? `(${releaseYear})` : ""}
            </Text>
            <Text style={styles.overview}>
              {truncateOverview(overview, 100)}
            </Text>
            <Text style={styles.voteAverage}>Rating: {voteAverage}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: "#9B86BD",
  },
  container: {
    flexDirection: "row",
    padding: 16,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  details: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  releaseDate: {
    fontSize: 14,
    color: "#b0b0b0",
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
    color: "#d0d0d0",
    marginBottom: 8,
  },
  voteAverage: {
    fontSize: 14,
    color: "#ffcc00",
  },
});

export default AllMovieCard;
