// import { Text, View } from "@/components/Themed";
import { StyleSheet, Image, ScrollView, Text, View } from "react-native";
import { getUser } from "../../utils/api";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
// import EditScreenInfo from "@/components/EditScreenInfo";
import { useEffect, useState } from "react";

function UserInfo({ isLoggedIn, user, navigation }) {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    interests: {},
    email: "",
    dateOfBirth: "",
    username: "",
    password: "",
    communities: {},
    events: {},
    cinemas: {},
    isBannedFrom: {},
    moderator: {},
  });
  useEffect(() => {
    getUser(user.username)
      .then((user) => {
        setUserInfo(user);
      })
      .catch((err) => {});
  }, [user]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {userInfo ? (
          <View style={styles.profileContainer}>
            <Text style={styles.mainTitle}>
              {" "}
              Hello {userInfo.firstName} {userInfo.lastName}
            </Text>

            {userInfo.avatar ? (
              <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
            ) : (
              <Text>No avatar</Text>
            )}
            <Text style={styles.title}> Communities: </Text>

            {userInfo.communities ? (
              Object.values(userInfo.communities).map((community, index) => (
                <Text style={styles.interestBox} key={index}>
                  {community}
                </Text>
              ))
            ) : (
              <Text> Not a member of any communties </Text>
            )}

            <Text style={styles.title}> Cinemas: </Text>
            {userInfo.cinemas ? (
              Object.values(userInfo.cinemas).map((cinemas, index) => (
                <Text style={styles.interestBox} key={index}>
                  {cinemas}
                </Text>
              ))
            ) : (
              <Text> No cinemas added </Text>
            )}

            <Text style={styles.title}> Events: </Text>
            {userInfo.events ? (
              Object.values(userInfo.events).map((events, index) => (
                <Text style={styles.interestBox} key={index}>
                  {events}
                </Text>
              ))
            ) : (
              <Text> No events added </Text>
            )}

            <Text style={styles.title}> Interests: </Text>
            {userInfo.cinemas ? (
              Object.values(userInfo.interests).map((interests, index) => (
                <Text style={styles.interestBox} key={index}>
                  {interests}
                </Text>
              ))
            ) : (
              <Text> No interests added </Text>
            )}

            <Text style={styles.title}> Moderator: </Text>
            {userInfo.moderator.moderatorOf ? (
              Object.values(userInfo.moderator.moderatorOf).map(
                (moderator, index) => (
                  <Text style={styles.interestBox} key={index}>
                    {moderator}
                  </Text>
                )
              )
            ) : (
              <Text> Not a moderator of any communties </Text>
            )}

            <Text style={styles.title}> Banned From: </Text>
            {userInfo.isBannedFrom ? (
              Object.values(userInfo.isBannedFrom).map(
                (isBannedFrom, index) => (
                  <Text style={styles.interestBox} key={index}>
                    {isBannedFrom}
                  </Text>
                )
              )
            ) : (
              <Text> Not banned from any events </Text>
            )}
          </View>
        ) : (
          <Text> Waiting for user info </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profileContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mainTitle: {
    fontSize: 40,
    textAlign: "center",
    paddingBottom: 50,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  interestBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
    color: "white",
  },
});

export default UserInfo;
