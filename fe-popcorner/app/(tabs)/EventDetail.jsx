import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

export default function EventDetail({ route, navigation }) {
  const { community, event } = route.params;
  const [currentEvent, setCurrentEvent] = useState();
  const [showAttendees, setShowAttendees] = useState(false);
  // TODO: Update when endpoint is complete
  const [attending, setAttending] = useState(false);

  const fetchEvent = () => {
    axios
      .get(`https://popcorner.vercel.app/communities/${community.title}/events/${event}`)
      .then((data) => {
        const retrievedEvent = data.data;
        setCurrentEvent(retrievedEvent);
      })
      .catch((err) => {
        console.error("Error fetching event:", err);
      });
  };

  useFocusEffect(
    useCallback(() => {
        fetchEvent();
    }, [])
  );

  const handleAttendance = useCallback(() => {
    if (!attending) {
      Alert.alert(`You are now attending ${currentEvent.title}!`);
      setAttending(true);
    } else {
      Alert.alert(`You are no longer attending ${currentEvent.title}.`);
      setAttending(false);
    }
  }, [currentEvent, attending]);

  const handleGoToCommunity = () => {
    navigation.navigate("CommunityDetails", { community });
  }

  return (
      currentEvent ?
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.title}>
              {currentEvent.title}
            </Text>
            <TouchableOpacity style={styles.rowContainer} onPress={() => handleGoToCommunity()}>
              <Image source={{ uri: community.logo }} style={styles.logoIcon} />
              <Text style={styles.subheading}>
                {community.title}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {currentEvent.description}
            </Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.cardTitle}>
              Event Details
            </Text>
            <View style={styles.rowContainer}>
              <Text style={styles.textLight}>
                {currentEvent.attendeeCount} attendees
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowAttendees((prev) => !prev)}
              >
                <Text style={styles.buttonText}>
                {showAttendees ? "Hide attendees" : "Show attendees"}
                </Text>
              </TouchableOpacity>
            </View>
            {
              showAttendees &&
              <View style={styles.attendeesContainer}>
                <Text style={styles.attendeesHeading}>
                  Currently attending:
                </Text>
                { Object.values(currentEvent.attendees).map((attendee) => (
                  <Text key={attendee} style={styles.attendee}>
                    {attendee}
                  </Text>
                ))}
              </View>
            }
            <View style={styles.detailRow}>
              <Text style={styles.textLabel}>
                  Location:
              </Text>
              <Text style={styles.textLightBold}>
                {currentEvent.venue}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.textLabel}>
                  Date:
              </Text>
              <Text style={styles.textLightBold}>
                {currentEvent.date}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.textLabel}>
                  Time (24h):
              </Text>
              <Text style={styles.textLightBold}>
                {currentEvent.time}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
                  style={styles.wideButton}
                  onPress={() => handleAttendance()}
                >
                  <Text style={styles.buttonText}>
                    {attending ? "Unattend event" : "Attend event"}
                  </Text>
            </TouchableOpacity>
            <TouchableOpacity
                  style={styles.wideButtonOutline}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.buttonTextDark}>
                    Back
                  </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView> :
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#D41F2D" />
      </View>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#E2D0B9",
  },
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2D0B9",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  headingContainer: {
    marginBottom: 24,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  descriptionContainer: {
    marginBottom: 24
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 50
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    backgroundColor: "#d83542",
    borderRadius: 8,
    padding: 16,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4
  },
  attendeesContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#eea5ab",
    gap: 4
  },
  showAttendeesButton: {
    fontSize: 14,
    textAlign: "left"
  },
  attendeesHeading: {
    fontSize: 16,
    color: "#333"
  },
  attendee: {
    fontSize: 14,
    color: "#333"
  },
  detailRow: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center"
  },
  textLight: {
    color: "#fff",
    fontSize: 16
  },
  textLabel: {
    color: "#ededed",
    fontSize: 14
  },
  textLightBold: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#D41F2D",
    marginBottom: 4
  },
  description: {
    fontSize: 16,
    color: "#333",
  },
  subheading: {
    fontSize: 16,
    color: "#dd4c57",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    gap: 8,
    width: "100%"
  },
  wideButton: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#D41F2D",
    borderRadius: 8,
    width: "100%",
  },
  wideButtonOutline: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f1e8dc",
    borderColor: "#D41F2D",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 8,
    width: "100%",
  },
  button: {
    padding: 10,
    backgroundColor: "#D41F2D",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonTextDark: {
    color: "#333",
    fontWeight: "bold",
  }
});
