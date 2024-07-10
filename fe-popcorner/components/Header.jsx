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
  Searchbar,
  Portal,
  Modal,
  List,
  Icon,
  Chip,
  SegmentedButtons,
  Appbar,
} from "react-native-paper";
import {
  getCinemasNearLocation,
  getLocation,
  googleApiKey,
  listCommunities,
  searchMovies,
  searchPeople,
} from "../utils/api";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerComponent } from "./DrawerComponent";

export const Header = ({
  avatar,
  isOnline,
  username,
  title,
  navigator,
  userInfo,
}) => {
  const [searchText, setSearchText] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [movies, setMovies] = useState();
  const [people, setPeople] = useState();
  const [cinemas, setCinemas] = useState();
  const [filterMode, setFilterMode] = useState();
  const [communities, setCommunities] = useState();
  const [filteredCommunities, setFilteredCommunities] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigation = useNavigation();

  const navigateToUserProfile = () => {
    if (userInfo) {
      navigation.navigate("UserInfo", { userInfo });
    } else {
      console.log("User info is not available");
    }
  };

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
        )
      );

      searchPeople(searchText).then((peopleList) =>
        setPeople(
          peopleList
            .filter(({ popularity }) => popularity > 1)
            .sort((a, b) => b.popularity - a.popularity)
        )
      );

      setFilteredCommunities(
        communities.filter(({ title }) =>
          title.toLowerCase().includes(searchText.toLowerCase())
        )
      );

      getLocation(searchText)
        .then(({ lat, lng }) => getCinemasNearLocation(lat, lng))
        .then((data) => setCinemas(data));
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [communities, searchText]);

  const avatarComponent = avatar ? (
    <Avatar.Image size={40} source={{ uri: avatar }} />
  ) : username ? (
    <Avatar.Text size={40} label={username.slice(0, 2)} />
  ) : null;

  const clearSearch = () => {
    setSearchText("");
    setIsSearchModalOpen(false);
  };

  return (
    <View className="w-full">
      <Appbar.Header className="" mode="center-aligned" elevated>
        <Appbar.Action icon="menu" onPress={() => setIsDrawerOpen(true)} />
        <Appbar.Content title="PopCorner" />
        <Appbar.Action
          icon="magnify"
          onPress={() => setIsSearchModalOpen(true)}
        />
        <TouchableOpacity className="relative" onPress={navigateToUserProfile}>
          {avatarComponent}
          <Badge
            size={14}
            className={`absolute -right-0.5 -top-0.5 ${
              isOnline ? "bg-green-600" : "bg-red-600"
            }`}
          />
        </TouchableOpacity>
      </Appbar.Header>
      <Portal>
        <Modal
          contentContainerStyle={{
            backgroundColor: "white",
            width: "70%",
            height: "100%",
          }}
          className="h-full w-full"
          visible={isDrawerOpen}
          onDismiss={() => setIsDrawerOpen(false)}
        >
          <DrawerComponent onClose={() => setIsDrawerOpen(false)} />
        </Modal>
        <Modal
          visible={isSearchModalOpen}
          onDismiss={clearSearch}
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
          contentContainerStyle={{ flex: 1, marginTop: 0 }}
        >
          <View className="flex-initial bg-white">
            <Searchbar
              mode="view"
              placeholder="Search"
              value={searchText}
              onChangeText={(newText) => setSearchText(newText)}
              icon="arrow-left"
              onIconPress={clearSearch}
              autoFocus
            />
            <ScrollView className="flex-initial">
              {searchText.length > 0 &&
                !!(movies || people || filteredCommunities) && (
                  <SegmentedButtons
                    className="p-2"
                    value={filterMode}
                    onValueChange={setFilterMode}
                    buttons={[
                      {
                        value: undefined,
                        label: "All",
                        showSelectedCheck: true,
                      },
                      {
                        value: "movies",
                        label: "Movies",
                        disabled: !movies?.length,
                        showSelectedCheck: true,
                      },
                      {
                        value: "people",
                        label: "People",
                        disabled: !people?.length,
                        showSelectedCheck: true,
                      },
                      {
                        value: "cinemas",
                        label: "Cinemas",
                        disabled: !cinemas?.length,
                        showSelectedCheck: true,
                      },
                      {
                        value: "communities",
                        label: "Communities",
                        disabled: !filteredCommunities?.length,
                        showSelectedCheck: true,
                      },
                    ]}
                  />
                )}
              {movies?.length > 0 && (filterMode ?? "movies") === "movies" && (
                <List.Section>
                  <List.Subheader>Movies</List.Subheader>
                  {(filterMode ? movies : movies.slice(0, 5)).map(
                    ({
                      title,
                      id,
                      release_date,
                      backdrop_path,
                      vote_average,
                    }) => {
                      const [releaseYear] = release_date.split("-");
                      return (
                        <TouchableOpacity
                          className="relative"
                          onPress={() =>
                            navigation.navigate("MovieScreen", {
                              movie_id: id,
                            })
                          }
                        >
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
                        </TouchableOpacity>
                      );
                    }
                  )}
                </List.Section>
              )}
              {people?.length > 0 && (filterMode ?? "people") === "people" && (
                <List.Section>
                  <List.Subheader>People</List.Subheader>
                  <View className="flex-row flex-wrap justify-center gap-2">
                    {(filterMode ? people : people.slice(0, 5)).map(
                      ({ name, id, known_for_department, profile_path }) => (
                        <ImageBackground
                          key={id}
                          className="w-48 h-48 items-start"
                          source={
                            profile_path
                              ? {
                                  uri: `https://image.tmdb.org/t/p/w500${profile_path}`,
                                }
                              : {
                                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9UdkG68P9AHESMfKJ-2Ybi9pfnqX1tqx3wQ&s",
                                }
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
              {cinemas?.length > 0 &&
                (filterMode ?? "cinemas") === "cinemas" && (
                  <List.Section>
                    <List.Subheader>Cinemas</List.Subheader>
                    <View className="flex-row flex-wrap justify-center gap-2">
                      {(filterMode ? cinemas : cinemas.slice(0, 5)).map(
                        ({ name, id, icon, photos, rating }) => (
                          <ImageBackground
                            key={id}
                            className="w-48 h-48 items-start"
                            source={
                              photos && photos[0]
                                ? {
                                    uri: `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photos[0].photo_reference}&maxwidth=480&key=${googleApiKey}`,
                                  }
                                : {
                                    uri: icon,
                                  }
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
                              Rating: {rating}/5
                            </Text>
                          </ImageBackground>
                        )
                      )}
                    </View>
                  </List.Section>
                )}
              {filteredCommunities?.length > 0 &&
                (filterMode ?? "communities") === "communities" && (
                  <List.Section>
                    <List.Subheader>Communities</List.Subheader>
                    <View className="flex-row flex-wrap justify-center gap-2">
                      {(filterMode
                        ? filteredCommunities
                        : filteredCommunities.slice(0, 5)
                      ).map(({ id, title }) => (
                        <Chip key={id}>{title}</Chip>
                      ))}
                    </View>
                  </List.Section>
                )}
            </ScrollView>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};
