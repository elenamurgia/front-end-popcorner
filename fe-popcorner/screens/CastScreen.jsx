import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Text, Card, Divider } from "react-native-paper";
import { getCasting } from "../utils/api";

const { width, height } = Dimensions.get("window");

export default function CastScreen({ route }) {
  const { person_id } = route.params;
  const [cast, setCast] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async (person_id) => {
      setLoading(true);
      setError(null);

      try {
        const castData = await getCasting(person_id);
        setCast(castData);
      } catch (error) {
        setError("Something went wrong, please try again");
      } finally {
        setLoading(false);
      }
    };
    if (person_id) {
      fetchCast(person_id);
    }
  }, [person_id]);

  const calculateAge = (birthday, deathday = null) => {
    if (!birthday) return null;
    const birthDate = new Date(birthday);
    const endDate = deathday ? new Date(deathday) : new Date();
    return (
      endDate.getFullYear() -
      birthDate.getFullYear() -
      (endDate.getMonth() < birthDate.getMonth() ||
      (endDate.getMonth() === birthDate.getMonth() &&
        endDate.getDate() < birthDate.getDate())
        ? 1
        : 0)
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="pink" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <ScrollView scrollIndicatorInsets={{ right: 1 }}>
        <Card style={styles.card}>
          <Card.Title title={cast.name} titleStyle={styles.title} />
          <Card.Cover
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${cast.profile_path}`,
            }}
            style={styles.movieImage}
            resizeMode="cover"
          />
          <Divider />
          <View style={styles.infoContainer}>
            <Text variant="labelLarge" style={styles.sectionTitle}>
              Personal Info
            </Text>

            <Text style={styles.subTitle}>Known for</Text>
            <Text style={styles.infoText}>{cast.known_for_department}</Text>
            {cast.birthday && (
              <>
                <Text style={styles.subTitle}>Birthdate</Text>
                <Text style={styles.infoText}>
                  {formatDate(cast.birthday)} (
                  {calculateAge(cast.birthday, cast.deathday)} years old)
                </Text>
              </>
            )}
            {cast.deathday && (
              <>
                <Text style={styles.subTitle}>Date of Death</Text>
                <Text style={styles.infoText}>{formatDate(cast.deathday)}</Text>
              </>
            )}
            {cast.place_of_birth && (
              <>
                <Text style={styles.subTitle}>Place of Birth</Text>
                <Text style={styles.infoText}>{cast.place_of_birth}</Text>
              </>
            )}
            {cast.biography && (
              <>
                <Text variant="labelLarge" style={styles.sectionSecondTitle}>
                  Biography
                </Text>
                <Text style={styles.infoText}>{cast.biography}</Text>
              </>
            )}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: "#333",
  },
  card: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#333",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#F2055C",
  },
  movieImage: {
    width: "100%",
    height: height * 0.6,
    borderRadius: 15,
  },
  infoContainer: {
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#F2055C",
    paddingTop: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F2055C",
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
    color: "#EEEEEE",
  },
  sectionSecondTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#F2055C",
    paddingTop: 20,
  },
});
