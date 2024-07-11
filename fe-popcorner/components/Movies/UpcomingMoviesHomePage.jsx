import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, Text, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import MovieCardHomeScreen from "./MovieCardHomeScreen";

function UpComingMoviesHomepage({ data }) {
  const windowDimensions = Dimensions.get("screen");

  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("MovieScreen", { movie_id: item.id });
  };

  return (
    <View style={[styles.outerContainer, { width: windowDimensions.width }]}>
      <View style={styles.card}>
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
          height={280}
          scrollAnimationDuration={1000}
          mode="parallax"
          modeConfig={{
            parallaxScrollingOffset: 270,
            parallaxScrollingScale: 1,
            parallaxAdjacentItemScale: 0.5,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#474747",
    padding: 1,
  },
  movieContainer: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "#474747",
  },
});

export default UpComingMoviesHomepage;
