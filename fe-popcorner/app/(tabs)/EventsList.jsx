import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export function EventsList({ navigation }) {
  const [communities, setCommunities] = useState([]);
  const [communityEvents, setCommunityEvents] = useState([]);

  const fetchCommunities = () => {
    axios
      .get("https://popcorner.vercel.app/communities")
      .then((data) => {
        const retrievedCommunities = data.data;
        const parsedData = retrievedCommunities.map((comm) => {
          const key = Object.keys(comm)[0];
          const community = comm[key];
          return { ...community, id: key };
        });
        setCommunities(parsedData);
      })
      .catch((err) => {
        console.error("Error fetching communities:", err);
      });
  };

  const fetchEvents = () => {
    axios
      .get("https://popcorner.vercel.app/communities")
      .then((data) => {
        const communities = data.data;
        const events = communities.map((community) => {
          const value = Object.values(community)[0];
          const rawEvents = value.events;
          if (rawEvents) {
            const events = Object.values(rawEvents).map((event) => {
              return {
                ...event,
                communityName: value.title,
                communityLogo: value.logo
              }
            })

            return {
              name: value.title,
              logo: value.logo,
              events
            };
          }
        });
        const filteredEvents = events.filter((community) => community !== undefined);
        setCommunityEvents(filteredEvents);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchCommunities();
      fetchEvents();
    }, [])
  );

  const renderEvent = (event) => {
    const community = communities.find((community) => community.title === event.communityName);

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate("EventDetail", { event: event.title, community })
        }
      >
        <View style={styles.itemContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.description}>{event.description}</Text>
            <Text style={styles.description}>
              {event.venue} at {event.time} on {event.date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    communityEvents ?
      <ScrollView style={styles.container}>
        {
          communityEvents.map((community) => (
            <>
              <View style={styles.communityHeadingContainer}>
                <Image source={{ uri: community.logo }} style={styles.logo} />
                <Text style={styles.communityHeadingText}>
                  { community.name }
                </Text>
              </View>
              <View style={styles.eventsContainer}>
                {
                  community.events.map((event) => renderEvent(event))
                }
              </View>
            </>
          ))
        }
      </ScrollView> :
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#D41F2D" />
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2D0B9",
    padding: 16,
  },
  communityHeadingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomColor: "#71685d",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 12
  },
  communityHeadingText: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold"
  },
  eventsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 4,
    gap: 12,
    marginBottom: 24
  },
  item: {
    backgroundColor: "#D41F2D",
    padding: 20,
    borderRadius: 8,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 16,
    color: "#fff",
    marginTop: 8,
  },
});
