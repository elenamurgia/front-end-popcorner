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
    marginBottom: 16,
    backgroundColor: "333",
  },
  movieImage: {
    width: width * 0.5,
    height: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EEEEEE",
  },
});

export default MovieCard;
