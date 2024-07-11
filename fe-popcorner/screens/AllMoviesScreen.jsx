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
import { Provider as PaperProvider } from "react-native-paper";
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
    <PaperProvider>
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
        <View style={styles.genreContainer}>
          <ScrollView horizontal contentContainerStyle={styles.genreScrollView}>
            {genres.map((genre) => (
              <TouchableOpacity
                key={genre.id}
                onPress={() => handleGenreChange(genre.id)}
                style={[
                  styles.genreButton,
                  selectedGenre === genre.id && styles.genreButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.genreButtonText,
                    selectedGenre === genre.id &&
                      styles.genreButtonTextSelected,
                  ]}
                >
                  {genre.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {renderMovies()}
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    paddingTop: 40,
  },
  stickyHeader: {
    backgroundColor: "#333",
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
    backgroundColor: "#333",
    fontSize: 40,
    color: "#EEEEEE",
  },
  genreContainer: {
    alignItems: "flex-end",
  },
  genreScrollView: {
    paddingHorizontal: 16,
  },
  genreButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#F2055C",
    marginHorizontal: 5,
  },
  genreButtonSelected: {
    backgroundColor: "#EEEEEE",
  },
  genreButtonText: {
    color: "#EEEEEE",
  },
  genreButtonTextSelected: {
    color: "#F2055C",
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
    backgroundColor: "#F2055C",
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
    color: "#EEEEEE",
    fontWeight: "bold",
  },
});
