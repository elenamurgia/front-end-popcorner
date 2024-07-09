import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { SegmentedButtons } from "react-native-paper";
import { getMoviesByGenre } from "../utils/api";
import AllMovieCard from "../components/Movies/AllMovieCard";
import PopularMovies from "../components/Movies/PopularMovies";
import NowPlayingMovies from "../components/Movies/NowPlayingMovies";
import UpComingMovies from "../components/Movies/UpComingMovies";
import TrendingMovies from "../components/Movies/TrendingMovies";

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const sortOptions = [
  { label: "Trending", value: "trending" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Now Playing", value: "nowPlaying" },
  { label: "Popular", value: "popular" },
];

export default function AllMoviesScreen() {
  const [filterMode, setFilterMode] = useState("trending");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let data = [];
        if (selectedGenre) {
          data = await getMoviesByGenre(selectedGenre);
        }
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  useEffect(() => {
    if (
      ["trending", "upcoming", "nowPlaying", "popular"].includes(filterMode)
    ) {
      setSelectedGenre(null);
      setMovies([]);
    }
  }, [filterMode]);

  const renderMovies = () => {
    if (selectedGenre && movies.length > 0) {
      return (
        <ScrollView>
          {movies.map((movie) => (
            <AllMovieCard key={movie.id} movie={movie} />
          ))}
        </ScrollView>
      );
    }

    switch (filterMode) {
      case "trending":
        return <TrendingMovies />;
      case "upcoming":
        return <UpComingMovies />;
      case "nowPlaying":
        return <NowPlayingMovies />;
      case "popular":
        return <PopularMovies />;
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#ffffff" />;
  }

  const openMenu = () => setModalVisible(true);
  const closeMenu = () => setModalVisible(false);

  const handleMenuPress = (mode) => {
    setFilterMode(mode);
    closeMenu();
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <TouchableOpacity style={styles.dropdown} onPress={toggleModal}>
          <Text style={styles.threeDots}>...</Text>
        </TouchableOpacity>
        <Modal isVisible={modalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleMenuPress(option.value)}
                  style={styles.modalOption}
                >
                  <Text style={styles.modalOptionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>

      <ScrollView horizontal contentContainerStyle={styles.genreScrollView}>
        <SegmentedButtons
          value={selectedGenre ? selectedGenre.toString() : ""}
          onValueChange={(value) => handleGenreChange(parseInt(value))}
          buttons={genres.map((genre) => ({
            value: genre.id.toString(),
            label: genre.name,
            showSelectedCheck: true,
          }))}
          style={styles.segmentedButtons}
        />
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {renderMovies()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  stickyHeader: {
    backgroundColor: "white",
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  dropdownText: {
    marginRight: 8,
    color: "black",
  },
  threeDots: {
    fontSize: 30,
  },
  genreScrollView: {
    paddingHorizontal: 16,
  },
  segmentedButtons: {
    backgroundColor: "white",
    borderColor: "#ffffff",
  },
  scrollViewContent: {
    padding: 16,
  },
  modalContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flex: 1,
  },
  modalContent: {
    backgroundColor: "white",
    width: 200,
    padding: 20,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 50,
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 16,
    color: "black",
  },
});
