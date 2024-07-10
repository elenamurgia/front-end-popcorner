import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { postUser } from "../../utils/api";

function Interests({ setNewUserInput, newUserInput, setIsLoggedIn, setUser }) {

  const [interests, setInterests] = useState({});
  const navigation = useNavigation();

  const handleInterestPress = (category, item) => {
    const totalSelectedInterests = Object.values(interests).reduce((total, current) => total + current.length, 0);

    if (totalSelectedInterests >= 5) {
      alert("You have already selected all your interests");
      return;
    }

    if (!interests[category]) {
      setInterests({
        ...interests,
        [category]: [item],
      });
    } else if (!interests[category].includes(item)) {
      setInterests({
        ...interests,
        [category]: [...interests[category], item],
      });
    } else {
      alert("You have already selected this interest");
    }
  };

  const navigateToMainPage = () => {
    setNewUserInput((prevState) => {
      const updatedUserInput = { ...prevState, interests: interests };


      setUser({
        username: updatedUserInput.username,
        password: updatedUserInput.password,
        email: updatedUserInput.email.replace(".", "-"),
      });

      postUser(updatedUserInput);
      setIsLoggedIn(true);
      navigation.navigate("MainPage");

      return updatedUserInput;
    });
  };

  const interestList = [
    {
      category: "Tech 💻",
      list: ["Programming", "AI", "Electronics", "VR", "AR", "Blockchain/Crypto"],
    },
    {
      category: "Movies 🍿",
      list: ["Horror", "Comedy", "Romance", "RomCom", "Bollywood", "Action", "Thriller"],
    },
    {
      category: "Music 🎵",
      list: ["Hip-Hop", "Rock", "Country", "R&B", "Pop", "Soul", "Electronic", "Trance", "DnB"],
    },
    {
      category: "Sports 🏅",
      list: ["Football", "Rock-climbing", "Rugby", "Tennis", "Swimming"],
    },
    {
      category: "Arts 🎨",
      list: ["Painting", "Pottery", "Singing", "Photography", "Fashion-design"],
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Select your interests</Text>
        <Text style={styles.subHeading}>
          {Object.values(interests).flat().length}/5 interests selected (min. 3 max. 5)
        </Text>
        {interestList.map((interestCategory) => (
          <View key={interestCategory.category} style={styles.interestsOuterBox}>
            <Text style={styles.categoryTitle}>{interestCategory.category}</Text>
            <View style={styles.interestsContainer}>
              {interestCategory.list.map((interestItem, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.interestBox}
                  onPress={() => handleInterestPress(interestCategory.category, interestItem)}
                >
                  <Text style={styles.interestText}>{interestItem}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity onPress={navigateToMainPage} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  mainTitle: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 10,
    paddingBottom: 20,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 20,
    marginBottom: 10,
    marginTop: 5,
    fontWeight: "bold",
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 2,
    marginLeft: 5,
  },
  interestText: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },
  interestBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
  },
  btnActive: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
  },
  interestsOuterBox: {
    marginBottom: 10,
    backgroundColor: "white",
  },
  nextButtonText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  nextButton: {
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

export default Interests;
