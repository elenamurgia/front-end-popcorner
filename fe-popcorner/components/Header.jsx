import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  FlatList,
  SectionList,
  ScrollView,
} from "react-native";
import {
  Text,
  Avatar,
  Badge,
  IconButton,
  Searchbar,
  Portal,
  Modal,
  List,
  Icon,
  Chip,
} from "react-native-paper";
import { listCommunities, searchMovies, searchPeople } from "../utils/api";

export const Header = ({ avatar, isOnline, username, title }) => {
  const [searchText, setSearchText] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [movies, setMovies] = useState();
  const [people, setPeople] = useState();
  const [communities, setCommunities] = useState();
  const [filteredCommunities, setFilteredCommunities] = useState();

  useEffect(() => {
    listCommunities().then((communityList) =>
      setCommunities(
        communityList.map((communityObject) => {
          const [id, properties] = Object.entries(communityObject)[0];
          return { id, ...properties };
        })
      )
    );
  }, []);

  useEffect(() => {
    if (!searchText) {
      setMovies(undefined);
      setPeople(undefined);
      setFilteredCommunities(undefined);
      return;
    }

    const timeout = setTimeout(() => {
      searchMovies(searchText).then((movieList) =>
        setMovies(
          movieList
            .filter(({ vote_count }) => vote_count > 5)
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 5)
        )
      );

      searchPeople(searchText).then((peopleList) =>
        setPeople(
          peopleList
            .filter(({ popularity }) => popularity > 1)
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 5)
        )
      );

      setFilteredCommunities(
        communities.filter(({ title }) =>
          title.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [communities, searchText]);

  const avatarComponent = avatar ? (
    <Avatar.Image size={40} source={avatar} />
  ) : username ? (
    <Avatar.Text size={40} label={username.slice(0, 2)} />
  ) : null;

  const clearSearch = () => {
    setSearchText("");
    setIsSearchModalOpen(false);
  };

  return (
    <View className="border-b gap-1 pb-1 px-2 mt-8">
      <View className="self-start w-full flex-row justify-between items-center px-3">
        <IconButton icon="menu">Profile</IconButton>
        <Text variant="headlineSmall">{title}</Text>
        <View className="relative">
          {avatarComponent}
          <Badge
            size={14}
            className={`absolute -right-0.5 -top-0.5 ${
              isOnline ? "bg-green-600" : "bg-red-600"
            }`}
          />
        </View>
      </View>
      <Searchbar
        placeholder="Search"
        onPress={() => setIsSearchModalOpen(true)}
      />
      {isSearchModalOpen && (
        <Portal>
          <Modal
            visible={isSearchModalOpen}
            onDismiss={clearSearch}
            style={{ marginTop: 0, height: "90%" }}
          >
            <View className="h-full">
              <Searchbar
                mode="view"
                placeholder="Search"
                value={searchText}
                onChangeText={(newText) => setSearchText(newText)}
                onClearIconPress={clearSearch}
                autoFocus
              />
              <View className="bg-white w-full">
                <ScrollView>
                  {movies && movies.length > 0 && (
                    <List.Section>
                      <List.Subheader>Movies</List.Subheader>
                      {movies.map(
                        ({
                          title,
                          id,
                          release_date,
                          backdrop_path,
                          vote_average,
                        }) => {
                          const [releaseYear] = release_date.split("-");
                          return (
                            <ImageBackground
                              key={id}
                              className="h-24 flex items-start"
                              source={{
                                uri: `https://image.tmdb.org/t/p/w500${backdrop_path}`,
                              }}
                            >
                              <Text
                                variant="labelMedium"
                                className="text-white p-2 bg-black/70 flex"
                              >
                                {title} ({releaseYear})
                              </Text>
                              <Text
                                variant="labelMedium"
                                className="text-white p-2 bg-black/70 flex"
                              >
                                <Icon
                                  source={
                                    vote_average > 1.5
                                      ? vote_average > 0.25
                                        ? "star"
                                        : "star-half-full"
                                      : "star-outline"
                                  }
                                  size={14}
                                  color="white"
                                />
                                <Icon
                                  source={
                                    vote_average > 3.5
                                      ? vote_average > 2.25
                                        ? "star"
                                        : "star-half-full"
                                      : "star-outline"
                                  }
                                  size={14}
                                  color="white"
                                />
                                <Icon
                                  source={
                                    vote_average > 5.5
                                      ? vote_average > 4.25
                                        ? "star"
                                        : "star-half-full"
                                      : "star-outline"
                                  }
                                  size={14}
                                  color="white"
                                />
                                <Icon
                                  source={
                                    vote_average > 7.5
                                      ? "star"
                                      : vote_average > 6.25
                                      ? "star-half-full"
                                      : "star-outline"
                                  }
                                  size={14}
                                  color="white"
                                />
                                <Icon
                                  source={
                                    vote_average > 9.5
                                      ? "star"
                                      : vote_average > 8.25
                                      ? "star-half-full"
                                      : "star-outline"
                                  }
                                  size={14}
                                  color="white"
                                />{" "}
                                ({vote_average})
                              </Text>
                            </ImageBackground>
                          );
                        }
                      )}
                    </List.Section>
                  )}
                  {people && people.length > 0 && (
                    <List.Section>
                      <List.Subheader>People</List.Subheader>
                      <View className="flex-row flex-wrap justify-center gap-2">
                        {people.map(
                          ({
                            name,
                            id,
                            known_for_department,
                            profile_path,
                          }) => (
                            <ImageBackground
                              key={id}
                              className="w-48 h-48 items-start"
                              source={
                                profile_path
                                  ? {
                                      uri: `https://image.tmdb.org/t/p/w500${profile_path}`,
                                    }
                                  : {}
                              }
                            >
                              <Text
                                variant="labelMedium"
                                className="text-white p-2 bg-black/70 flex"
                              >
                                {name}
                              </Text>
                              <Text
                                variant="labelSmall"
                                className="text-white px-2 py-1 bg-black/70 flex italic"
                              >
                                {known_for_department}
                              </Text>
                            </ImageBackground>
                          )
                        )}
                      </View>
                    </List.Section>
                  )}
                  {filteredCommunities && filteredCommunities.length > 0 && (
                    <List.Section>
                      <List.Subheader>Communities</List.Subheader>
                      <View className="flex-row flex-wrap justify-center gap-2">
                        {filteredCommunities.map(({ id, title }) => (
                          <Chip key={id}>{title}</Chip>
                        ))}
                      </View>
                    </List.Section>
                  )}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </Portal>
      )}
    </View>
  );
};
