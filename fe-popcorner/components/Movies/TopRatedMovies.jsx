import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import MovieCardHomeScreen from "./MovieCardHomeScreen";

function TopRatedMovies({ data }) {
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
              <MovieCardHomeScreen movie={item} handleClick={handleClick} />
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                }}
              />
            </View>
          </TouchableOpacity>
        )}
        width={windowDimensions.width}
        height={350}
        scrollAnimationDuration={1000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingOffset: 300,
          parallaxScrollingScale: 1,
          parallaxAdjacentItemScale: 0.5,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#333",
    padding: 5,
  },
  movieContainer: {
    alignItems: "center",
    margin: 3,
    paddingBottom: 4,
  },
});

export default TopRatedMovies;
