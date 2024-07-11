import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Modal,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { getUsers } from "../utils/api";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";

function AddProfileInfo({ navigation, setNewUserInput, newUserInput }) {
  const [usersList, setUserList] = useState([]);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [date, setDate] = useState("12/12/2023");

  const handleDateSelect = (date) => {
    setDateOfBirth(new Date(date));
    setOpen(false);
  };

  function handleOnPress() {
    setOpen(!open);
  }

  function handleChange(propDate) {
    setDate(propDate);
    setNewUserInput({ ...newUserInput, dateOfBirth: date });
  }

  const onHandleSignup = () => {
    // Validation and error handling
    if (username.length < 3 || firstName.length < 2 || lastName.length < 2) {
      setErrorMessage("Please fill in all fields correctly.");
      return;
    }

    setNewUserInput({
      ...newUserInput,
      username,
      firstName,
      lastName,
      dateOfBirth,
    });
    navigation.navigate("Interests");
    Alert.alert("Success", "User profile info added successfully!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Sign Up (2/3)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter first name"
          autoCapitalize="none"
          autoCorrect={false}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter last name"
          autoCapitalize="none"
          autoCorrect={false}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <View style={styles.modalView}>
          <TouchableOpacity onPress={handleOnPress}>
            <Text> Select Date of Birth </Text>
          </TouchableOpacity>

          <Modal animationType="slide" transparent={true} visible={open}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  selected={date}
                  onDateChange={handleChange}
                />
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={handleOnPress}
                >
                  <Text style={styles.dateButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.button}
          onPress={() => onHandleSignup()}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
            Continue
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "red",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "red",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  dateContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: "red",
    height: 58,
    width: 100,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dateButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default AddProfileInfo;
