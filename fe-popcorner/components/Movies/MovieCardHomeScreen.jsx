import React from "react";
import { TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const MovieCard = ({ movie, handleClick }) => {
  return (
    <Card>
      <TouchableOpacity onPress={() => handleClick(movie)}>
        <Card.Cover
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          }}
          style={styles.movieImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "333",
  },
  movieImage: {
    width: 200,
    height: 280,
    borderRadius: 8,
    borderWidth: 8,
    borderColor: "#F2E4E4",
  },
});

export default MovieCard;
