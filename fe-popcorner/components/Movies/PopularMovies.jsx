import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import MovieCard from "./MovieCard";

function PopularMovies({ data }) {
  const windowDimensions = Dimensions.get("screen");
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("MovieScreen", { movie_id: item.id });
  };

  return (
    <View style={[styles.outerContainer, { width: windowDimensions.width }]}>
      <Carousel
        loop
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleClick(item)}>
            <View style={styles.movieContainer}>
              <MovieCard movie={item} handleClick={handleClick} />
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                }}
              />
              <Text style={styles.movieTitle}>
                {item.original_title.length > 18
                  ? `${item.original_title.slice(0, 18)}...`
                  : item.original_title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        width={windowDimensions.width}
        height={250}
        scrollAnimationDuration={1000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingOffset: 220,
          parallaxScrollingScale: 1,
          parallaxAdjacentItemScale: 1,
        }}
      />
    </View>
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
