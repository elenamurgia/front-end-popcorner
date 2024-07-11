import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
export default function CommunityDetails({ route, user }) {
  const { community } = route.params;
  const [selectedTab, setSelectedTab] = useState("posts");
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({ comment: "", author: "" });
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    author: "",
    commentCount: 0,
  });
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    attendeeCount: 0,
  });

  const handleVote = (item, type) => {};
  const handleComment = (post) => {
    if (newComment.comment.trim()) {
      axios
        .post(
          `https://popcorner.vercel.app/communities/${community.title}/posts/${post}/comments`,
          {
            comment: newComment.comment,
            author: user.username,
          }
        )
        .then((response) => {
          const updatedComments = { ...comments };
          updatedComments[post.id] = [
            ...(updatedComments[post.id] || []),
            response.data,
          ];
          setComments(updatedComments);
          setNewComment({ comment: "", author: "" });
        })
        .catch((error) => {
          console.error("Error posting comment:", error);
        });
    }
  };
  const handleAttendance = (event) => {};
  const handleCreatePost = () => {
    if (newPost.title.trim() && newPost.body.trim()) {
      axios.post(
        `https://popcorner.vercel.app/communities/${community.title}/posts`,
        newPost
      );
      setNewPost({ title: "", body: "", author: "", commentCount: 0 });
    }
  };
  const handleCreateEvent = () => {
    if (newEvent.title.trim() && newEvent.description.trim()) {
      axios.post(
        `https://popcorner.vercel.app/communities/${community.title}/events`,
        {
          title: newEvent.title,
          description: newEvent.description,
          venue: newEvent.venue,
          date: newEvent.date,
          time: newEvent.time,
          moderators: user.username,
          attendeeCount: 1,
          attendees: [user.username],
        }
      );
      setNewEvent({
        title: "",
        description: "",
        venue: "",
        date: "",
        time: "",
      });
    }
  };
  const renderMember = ({ item }) => <Text style={styles.member}>{item}</Text>;
  const renderComment = ({ item }) => (
    <View style={styles.comment}>
      <Text style={styles.commentAuthor}>{item.author}:</Text>
      <Text style={styles.commentBody}>{item.comment}</Text>
      <View style={styles.voteContainer}>
        <TouchableOpacity onPress={() => handleVote(item, "up")}>
          <Text style={styles.voteButton}>Upvote</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleVote(item, "down")}>
          <Text style={styles.voteButton}>Downvote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderPost = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardBody}>{item.body}</Text>
      <Text style={styles.cardAuthor}>By: {item.author}</Text>
      <View style={styles.voteContainer}>
        <TouchableOpacity onPress={() => handleVote(item, "up")}>
          <Text style={styles.voteButton}>Upvote</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleVote(item, "down")}>
          <Text style={styles.voteButton}>Downvote</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={comments[item.id] || []}
        renderItem={renderComment}
        keyExtractor={(comment, index) => `comment-${index}`}
        scrollEnabled={false}
      />
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        value={newComment.comment}
        onChangeText={setNewComment}
      />
      <Button title="Comment" onPress={() => handleComment(item.title)} />
    </View>
  );
  const renderEvent = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardBody}>{item.description}</Text>
      <Text style={styles.cardAuthor}>Venue: {item.venue}</Text>
      <Text style={styles.cardAuthor}>Date: {item.date}</Text>
      <Text style={styles.cardAuthor}>Time: {item.time}</Text>
      <Text style={styles.cardAuthor}>
        Attendee Count: {item.attendeeCount}
      </Text>
      <Button
        title="Confirm Attendance"
        onPress={() => handleAttendance(item)}
      />
      <Text style={styles.sectionTitle}>Attendees:</Text>
      <FlatList
        data={Object.values(item.attendees || {})}
        renderItem={renderMember}
        keyExtractor={(attendee, index) => `attendee-${index}`}
        scrollEnabled={false}
      />
    </View>
  );
  const renderContent = () => {
    if (selectedTab === "posts") {
      return (
        <>
          <TextInput
            style={styles.input}
            placeholder="Post Title"
            value={newPost.title}
            onChangeText={(text) =>
              setNewPost({
                title: text,
                author: user.username,
                commentCount: 0,
              })
            }
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Post Body"
            value={newPost.body}
            onChangeText={(text) => setNewPost({ ...newPost, body: text })}
            multiline
          />
          <Button title="Create Post" onPress={handleCreatePost} />
          <FlatList
            data={Object.values(community.posts || {})}
            renderItem={renderPost}
            keyExtractor={(item, index) => `post-${index}`}
            scrollEnabled={false}
          />
        </>
      );
    } else if (selectedTab === "events") {
      return (
        <>
          <TextInput
            style={styles.input}
            placeholder="Event Title"
            value={newEvent.title}
            onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Event Description"
            value={newEvent.description}
            onChangeText={(text) =>
              setNewEvent({ ...newEvent, description: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Event Venue"
            value={newEvent.venue}
            onChangeText={(text) => setNewEvent({ ...newEvent, venue: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Event Date"
            value={newEvent.date}
            onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Event Time"
            value={newEvent.time}
            onChangeText={(text) =>
              setNewEvent({
                ...newEvent,
                time: text,
                moderators: user.username,
                attendeeCount: 1,
                attendees: user.username,
              })
            }
          />
          <Button title="Create Event" onPress={handleCreateEvent} />
          <FlatList
            data={Object.values(community.events || {})}
            renderItem={renderEvent}
            keyExtractor={(item, index) => `event-${index}`}
            scrollEnabled={false}
          />
        </>
      );
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: community.logo }} style={styles.logo} />
        <Text style={styles.title}>{community.title}</Text>
        <Text style={styles.description}>{community.description}</Text>
      </View>
      <Text style={styles.sectionTitle}>Moderators:</Text>
      <FlatList
        data={Object.values(community.moderators)}
        renderItem={renderMember}
        keyExtractor={(item, index) => `moderator-${index}`}
        scrollEnabled={false}
      />
      <Text style={styles.sectionTitle}>Members:</Text>
      <FlatList
        data={Object.values(community.members)}
        renderItem={renderMember}
        keyExtractor={(item, index) => `member-${index}`}
        scrollEnabled={false}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedTab === "posts" && styles.selectedButton,
          ]}
          onPress={() => setSelectedTab("posts")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === "posts" && styles.selectedButtonText,
            ]}
          >
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedTab === "events" && styles.selectedButton,
          ]}
          onPress={() => setSelectedTab("events")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === "events" && styles.selectedButtonText,
            ]}
          >
            Events
          </Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2D0B9",
  },
  headerContainer: {
    backgroundColor: "#D41F2D",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    margin: 16,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    marginVertical: 8,
    color: "#fff",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#D41F2D",
    marginLeft: 16,
  },
  member: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 4,
    paddingLeft: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  button: {
    padding: 10,
    backgroundColor: "#D41F2D",
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: "#B31621",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  selectedButtonText: {
    color: "#FFD700",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 16,
    marginBottom: 8,
  },
  cardAuthor: {
    fontSize: 14,
    color: "gray",
  },
  voteContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  voteButton: {
    color: "#D41F2D",
    fontWeight: "bold",
  },
  comment: {
    backgroundColor: "#F0F0F0",
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  commentAuthor: {
    fontWeight: "bold",
  },
  commentBody: {
    marginLeft: 8,
  },
  commentInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  textArea: {
    height: 100,
  },
});
