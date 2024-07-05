import React from "react";
import {
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Card } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const MovieCard = ({ movie, handleClick }) => {
  if (!movie || !movie.poster_path) {
    return (
      <View
        style={[
          styles.placeholder,
          {
            width: width * 0.8,
            height: height * 0.25,
          },
        ]}
      >
        <Text>No Image Available</Text>
      </View>
    );
  }

  return (
    <Card>
      <TouchableWithoutFeedback onPress={() => handleClick(movie)}>
        <Card.Cover
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          }}
          style={styles.movieImage}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    </Card>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 15,
  },
  movieImage: {
    width: width * 0.3,
    height: 200,
    borderRadius: 15,
  },
});

export default MovieCard;
