import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import { getMovieReviews } from "../../utils/api";

export default function MovieReviews({ movie_id }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);

      try {
        const reviewData = await getMovieReviews(movie_id);
        setReviews(reviewData.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError("Something went wrong, please try again");
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [movie_id]);

  if (isLoading) {
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

  const LeftContent = (props) => <Avatar.Icon {...props} icon="comment" />;

  return (
    <ScrollView>
      <Card>
        <Card.Title
          title="Reviews"
          left={LeftContent}
          titleStyle={{ fontSize: 25, fontWeight: "bold" }}
        />
        {reviews.length > 0 ? (
          reviews.map((review) => {
            const formattedDate = new Date(
              review.created_at
            ).toLocaleDateString();
            return (
              <Card.Content key={review.id}>
                <Text variant="bodyMedium">{review.author}</Text>
                <Text variant="bodyMedium">{formattedDate}</Text>
                <Text variant="bodyMedium">{review.content}</Text>
              </Card.Content>
            );
          })
        ) : (
          <Text>No reviews yet</Text>
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C1844",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
