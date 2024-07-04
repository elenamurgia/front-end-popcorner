import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useCallback, useState } from "react";
// import EditScreenInfo from "@/components/EditScreenInfo";
import { Link, useNavigation } from "@react-navigation/native";
// import { useNavigation } from "@react-navigation/native";

function Interests({ setIsLoggedIn }) {
  const navigation = useNavigation(); // Get the navigation object
  const navigateToTabLayout = () => {
    setIsLoggedIn(true);
    navigation.navigate("UserInfo");
  };

  const navigateToMainPage = () => {
    setIsLoggedIn(true);
    navigation.navigate("MainPage");
  };

  const interestList = [
    {
      category: "Tech 💻",
      list: [
        "Programming",
        "AI",
        "Electronics",
        "VR",
        "AR",
        "Blockchain/Crypto",
      ],
    },
    {
      category: "Movies 🍿",
      list: [
        "Horror",
        "Comedy",
        "Romance",
        "RomCom",
        "Bollywood",
        "Action",
        "Thriller",
      ],
    },
    {
      category: "Music 🎵",
      list: [
        "Hip-Hop",
        "Rock",
        "Country",
        "R&B",
        "Pop",
        "Soul",
        "Electronic",
        "Trance",
        "DnB",
      ],
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

  const [interests, setInterests] = useState([]);

  const handleInterestPress = (item) => {
    if (interests.length < 5 && !interests.includes(item)) {
      setInterests([...interests, item]);
    } else {
      if (interests.length >= 5) {
        alert("You have already selected all your interests");
      } else if (interests.includes(item)) {
        alert("You have already selected this interest");
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Select your interests</Text>

        <Text style={styles.subHeading}>
          {interests.length}/5 interests selected (min. 3 max. 5)
        </Text>
        {interestList.map((interest) => (
          <View key={interest.category} style={styles.interestsOuterBox}>
            <Text style={styles.categoryTitle}>{interest.category}</Text>
            <View style={styles.interestsContainer}>
              {interest.list.map((item, index) => (
                <View key={index} style={styles.interestBox}>
                  <TouchableOpacity onPress={() => handleInterestPress(item)}>
                    <Text style={styles.interestText}>{item}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity
          onPress={navigateToMainPage}
          style={styles.nextButton}
        >
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

    padding: 20,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    // : "80%",
  },
  item: {
    padding: 20,
    fontSize: 15,
    // marginTop: 5,
  },
  mainTitle: {
    fontSize: 40,
    textAlign: "center",
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
    // marginBottom: 10,
    marginTop: 2,
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20, // Increased margin between boxes
    width: "80%", // Shortened width
  },
  submitButton: {
    backgroundColor: "purple",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    width: "80%",
    marginVertical: 10,
    color: "white",
  },
  submitButtonText: {
    color: "white",
  },
  successText: {
    color: "green",
    marginTop: 10,
    fontSize: 17,
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
  interestsOuterBox: {
    marginBottom: 10,
    // height:"%20",
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
