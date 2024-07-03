import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  LogBox,
  Modal,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useCallback, useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import { Link } from "@react-navigation/native";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";

import moment from "moment";

function SignUp({ setIsLoggedIn, user, setUser, navigation }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [newUserInput, setNewUserInput] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("12/12/2023");
  const navigateToInterests = () => {
    navigation.navigate("Interests");
  };

  function handleOnPress() {
    setOpen(!open);
  }

  function handleChange(propDate) {
    setDate(propDate);
  }

  const [interestList, setInterestList] = useState([]);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handlefirstName = (text) => {
    setNewUserInput({ ...newUserInput, firstName: text });
  };
  const handleLastName = (text) => {
    setNewUserInput({ ...newUserInput, firstName: text });
  };

  const handleUsername = (text) => {
    setNewUserInput({ ...newUserInput, username: text });
  };
  const handleEmail = (text) => {
    setNewUserInput({ ...newUserInput, email: text });
  };
  const handlePassword = (text) => {
    setNewUserInput({ ...newUserInput, password: text });
  };

  const handleSubmit = () => {
    setUser(newUserInput);
    setIsRegistered(true);
    setIsLoggedIn(true);
    navigateToInterests();
  };

  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Welcome to the signup page </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        <View style={styles.name}>
          <TextInput
            style={styles.inputNameF}
            placeholder="First name"
            onChangeText={handlefirstName}
          />
          <TextInput
            style={styles.inputNameL}
            placeholder="Last name"
            onChangeText={handleLastName}
          />
        </View>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={handleOnPress}>
            <Text> Select Date of Birth </Text>
          </TouchableOpacity>

          <Modal animationType="slide" transparent={true} visible={open}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  // minimumDate={startDate}
                  selected={date}
                  onDateChange={handleChange}
                />
                <TouchableOpacity onPress={handleOnPress}>
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Create a username"
          onChangeText={handleUsername}
        />
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholder="Email"
          onChangeText={handleEmail}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Choose a Password"
          onChangeText={handlePassword}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Sign Up</Text>
        </TouchableOpacity>
        {isRegistered && (
          <Text style={styles.successText}>Registration successful!</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20, // Increased margin between boxes
    // width: "%", // Shortened width
    backgroundColor: "white",
  },

  inputDate: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20, // Increased margin between boxes
    width: "20%", // Shortened width
    textAlign: "left",
  },
  fullDOB: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  name: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  inputNameF: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20, // Increased margin between boxes
    width: "50%", // Shortened width,
    textAlign: "left",
    backgroundColor: "white",
  },
  inputNameL: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20, // Increased margin between boxes
    width: "50%", // Shortened width
    textAlign: "left",
    backgroundColor: "white",
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
});

export default SignUp;
