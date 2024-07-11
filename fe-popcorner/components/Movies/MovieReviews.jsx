import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Card, Avatar } from "react-native-paper";
import { getMovieReviews } from "../../utils/api";

export default function MovieReviews({ movie_id }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewsToShow, setReviewsToShow] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);

      try {
        const reviewData = await getMovieReviews(movie_id);
        setReviews(reviewData.results);
        setIsLoading(false);
      } catch (error) {
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

  const handleLoadMore = () => {
    setReviewsToShow(reviewsToShow + 1);
  };

  return (
    <View>
      {reviews.length > 0 ? (
        reviews.slice(0, reviewsToShow).map((review) => {
          const formattedDate = new Date(review.created_at).toLocaleDateString(
            "en-GB",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          );
          const avatarUri = review.author_details.avatar_path
            ? review.author_details.avatar_path.startsWith("/http")
              ? review.author_details.avatar_path.substring(1)
              : `https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}`
            : null;

          return (
            <Card.Content key={review.id} style={styles.reviewContent}>
              <View style={styles.avatarAuthorContainer}>
                {avatarUri ? (
                  <Image source={{ uri: avatarUri }} style={styles.avatar} />
                ) : (
                  <Avatar.Icon
                    size={30}
                    icon="account"
                    color="#D99CA7"
                    style={styles.avatarIcon}
                  />
                )}
                <Text variant="bodyMedium" style={styles.author}>
                  {review.author}
                </Text>
              </View>
              <Text variant="bodyMedium" style={styles.date}>
                {formattedDate}
              </Text>
              <Text variant="bodyMedium" style={styles.content}>
                {review.content}
              </Text>
            </Card.Content>
          );
        })
      ) : (
        <Text style={styles.noReviewsText}>No reviews yet</Text>
      )}
      {reviewsToShow < reviews.length && (
        <TouchableOpacity
          onPress={handleLoadMore}
          style={styles.loadMoreButton}
        >
          <Text style={styles.loadMoreText}>Load more reviews...</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#333",
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
  errorText: {
    color: "red",
    fontSize: 18,
  },
  card: {
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  reviewContent: {
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  avatarAuthorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 20,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  avatarIcon: {
    backgroundColor: "#A60321",
    marginRight: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F2055C",
  },

  date: {
    fontSize: 14,
    color: "#F2055C",
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: "#EEEEEE",
  },
  noReviewsText: {
    fontSize: 16,
    color: "#EEEEEE",
    textAlign: "center",
    padding: 20,
  },
  loadMoreButton: {
    padding: 10,
    alignItems: "center",
  },
  loadMoreText: {
    color: "#EEEEEE",
    fontSize: 16,
    fontWeight: "bold",
  },
});
