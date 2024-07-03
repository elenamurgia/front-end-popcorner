import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";

function PopularMovies({ data = [] }) {
  const windowDimensions = Dimensions.get("screen");
  const baseOptions = {
    parallaxScrollingOffset: 220,
    parallaxScrollingScale: 1,
    parallaxAdjacentItemScale: 1,
  };

  return (
    <View style={[styles.outerContainer, { width: windowDimensions.width }]}>
      <Text style={styles.header}>Popular Movies</Text>
      <Carousel
        loop
        autoPlay={false}
        width={windowDimensions.width}
        height={250}
        data={data}
        scrollAnimationDuration={1000} //this is still here in case we want to be animated, but the autoPlay is set to false
        mode="parallax"
        modeConfig={baseOptions}
        renderItem={({ item }) => (
          <View style={styles.movieContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w300/${item.poster_path}`,
              }}
              style={[
                styles.movieImage,
                { width: windowDimensions.width * 0.3, height: 200 },
              ]}
            />
            <Text style={styles.movieTitle}>
              {item.original_title.length > 18
                ? `${item.original_title.slice(0, 18)}...`
                : item.original_title}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#FF6969",
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
  movieImage: {
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    margin: 10,
  },
});

export default PopularMovies;
