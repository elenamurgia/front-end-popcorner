import { StyleSheet, Image, ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

function UserInfo({ isLoggedIn, user, navigation, newUserInput, userInfo }) {
  const [interestsArray, setInterestsArray] = useState([]);

  const navigateToHome = () => {
    if (userInfo) {
      navigation.navigate("MainPage", { userInfo });
    }
  };

  useEffect(() => {
    if (userInfo?.interests && Object.keys(userInfo.interests).length > 0) {
      // Convert interests object to array
      const newInterestsArray = Object.values(userInfo.interests).flatMap(
        (category) => {
          return Object.values(category);
        }
      );
      setInterestsArray(newInterestsArray);
    } else {
      setInterestsArray([]);
    }
  }, [userInfo]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <View style={styles.container}> */}
      {userInfo ? (
        <View style={styles.profileContainer}>
          <Text className="text-4xl font-bold text-hotPink">
            Hello {userInfo.firstName} {userInfo.lastName}
          </Text>

          {userInfo.avatar ? (
            <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
          ) : (
            <Text>No avatar</Text>
          )}

          <Text className="text-3xl font-bold text-hotPink mt-4">
            {" "}
            Communities:{" "}
          </Text>
          {userInfo.communities &&
          Object.keys(userInfo.communities).length > 0 ? (
            Object.values(userInfo.communities).map((community, index) => (
              <Text
                className="bg-hotPink justify-center margin-5 rounded px-7 text-White m-1 py-5"
                key={index}
              >
                {community}
              </Text>
            ))
          ) : (
            <Text className="text-White">Not a member of any communities</Text>
          )}

          <Text className="text-3xl font-bold text-hotPink mt-4">
            {" "}
            Cinemas:{" "}
          </Text>
          {userInfo.cinemas && Object.keys(userInfo.cinemas).length > 0 ? (
            Object.values(userInfo.cinemas).map((cinema, index) => (
              <Text
                className="bg-hotPink justify-center margin-5 rounded px-7 text-White m-1 py-5"
                key={index}
              >
                {cinema}
              </Text>
            ))
          ) : (
            <Text className="text-White">No cinemas added</Text>
          )}

          <Text className="text-3xl font-bold text-hotPink mt-4">
            {" "}
            Events:{" "}
          </Text>
          {userInfo.events && Object.keys(userInfo.events).length > 0 ? (
            Object.values(userInfo.events).map((event, index) => (
              <Text style={styles.interestBox} key={index}>
                {event}
              </Text>
            ))
          ) : (
            <Text className="text-White">No events added</Text>
          )}

          <Text className="text-3xl font-bold text-hotPink mt-4">
            {" "}
            Interests:{" "}
          </Text>
          {interestsArray.length > 0 ? (
            interestsArray.map(
              (
                specificInterest,
                index // Ensure to specify the 'index' parameter in map function
              ) => (
                <Text
                  className="bg-hotPink justify-center margin-5 rounded px-7 text-White m-1 py-5"
                  key={index}
                >
                  {/* Specify 'key' prop for each mapped element */}
                  {specificInterest}
                </Text>
              )
            )
          ) : (
            <Text className="text-White">No interests added</Text>
          )}

          <Text className="text-3xl font-bold text-hotPink mt-4">
            {" "}
            Moderator:{" "}
          </Text>
          {userInfo.moderator &&
          userInfo.moderator.moderatorOf &&
          userInfo.moderator.moderatorOf.length > 0 ? (
            userInfo.moderator.moderatorOf.map((moderatorOf, index) => (
              <Text style={styles.interestBox} key={index}>
                {moderatorOf}
              </Text>
            ))
          ) : (
            <Text className="text-White">
              Not a moderator of any communities
            </Text>
          )}

          <Text className="text-3xl font-bold text-hotPink mt-4">
            {" "}
            Banned From:{" "}
          </Text>
          {userInfo.isBannedFrom &&
          Object.keys(userInfo.isBannedFrom).length > 0 ? (
            Object.values(userInfo.isBannedFrom).map((bannedFrom, index) => (
              <Text className="text-White" key={index}>
                {bannedFrom}
              </Text>
            ))
          ) : (
            <Text className="text-White">Not banned from any events</Text>
          )}

          <TouchableOpacity
            onPress={navigateToHome}
            className="bg-hotPink justify-center items-center px-5 py-2 mt-5 shadow-lg m-5"
          >
            <Text style={styles.backButtonText}> Back to home </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text className="text-White">Waiting for user info</Text>
      )}
      {/* </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 20,
  },
  profileContainer: {
    marginTop: 36,
    margin: 20,
    width: "100%",
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  mainTitle: {
    fontSize: 40,
    textAlign: "center",
    paddingBottom: 30,
    fontWeight: "bold",
    color: "Hotpink",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
  backButtonText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default UserInfo;
