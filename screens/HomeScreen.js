import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { Calendar } from "react-native-calendars";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  BottomModal,
  ModalButton,
  ModalContent,
  ModalFooter,
  ModalTitle,
} from "react-native-modals";

const { height: screenHeight } = Dimensions.get("window");

const HomeScreen = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cars, setCars] = useState(1);
  const [people, setPeople] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (route?.params?.input) {
      setInputValue(route.params.input);
    }
  }, [route?.params?.input]);

  useEffect(() => {
    console.log("Modal visibility:", modalVisible);
  }, [modalVisible]);

  const onDayPress = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
    } else {
      setEndDate(day.dateString);
      setCalendarVisible(false);
    }
  };

  const markedDates = {};
  if (startDate) {
    markedDates[startDate] = {
      startingDay: true,
      color: "#50cebb",
      textColor: "white",
    };
  }
  if (endDate) {
    markedDates[endDate] = {
      endingDay: true,
      color: "#50cebb",
      textColor: "white",
    };
  }
  if (startDate && endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    while (start < end) {
      const dateString = start.toISOString().split("T")[0];
      markedDates[dateString] = { color: "#70d7c7", textColor: "white" };
      start.setDate(start.getDate() + 1);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "AppName",
      headerTitleStyle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#0A2647",
        height: 110,
        borderBottomColor: "black",
        shadowColor: "black",
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{
            paddingRight: 10,
          }}
        />
      ),
    });
  }, [navigation]);

  const searchCars = () => {
    if (
      !inputValue ||
      !startDate ||
      !endDate ||
      isNaN(cars) ||
      cars < 1 ||
      isNaN(people) ||
      people < 1
    ) {
      Alert.alert("Invalid Input", "Please enter all required details.", [
        {
          text: "OK",
        },
      ]);
    } else {
      navigation.navigate("Cars", {
        place: inputValue,
        startDate: startDate,
        endDate: endDate,
        cars: cars,
        people: people,
      });
    }
  };

  return (
    <>
      <View
        style={{
          margin: 10,
          backgroundColor: "#9ba9bb",
          borderColor: "#707070",
          borderWidth: 2,
          borderRadius: 5,
        }}
      >
        <Header />
        <ScrollView>
          <View>
            {/* Location Input */}
            <Pressable
              onPress={() => navigation.navigate("Search")}
              style={styles.inputContainer}
            >
              <Ionicons name="location" size={24} color="black" />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your destination"
                placeholderTextColor="black"
                value={inputValue}
                editable={false}
              />
            </Pressable>

            {/* Date Range Button */}
            <Pressable
              onPress={() => setCalendarVisible(true)}
              style={styles.inputContainer}
            >
              <Entypo
                name="calendar"
                size={24}
                color="black"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.text}>
                {startDate ? `${startDate}` : "Start Date"} -{" "}
                {endDate ? `${endDate}` : "End Date"}
              </Text>
            </Pressable>

            {/* Cars and Number of People */}
            <Pressable
              onPress={() => setModalVisible(true)}
              style={styles.inputContainer}
            >
              <MaterialCommunityIcons
                name="account-circle"
                size={24}
                color="black"
              />
              <TextInput
                style={styles.textInput}
                placeholder={`${cars} Cars, ${people} People`}
                placeholderTextColor="black"
                editable={false}
              />
            </Pressable>

            {/* Search Button */}
            <Pressable onPress={searchCars} style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Apply</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      {/* Calendar Modal */}
      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setCalendarVisible(false)}
        swipeDirection={["down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Close"
              style={styles.modalButton}
              onPress={() => setCalendarVisible(false)}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select Dates" />}
        visible={calendarVisible}
        onTouchOutside={() => setCalendarVisible(false)}
        style={styles.bottomModal}
      >
        <ModalContent style={styles.modalContent}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={markedDates}
            markingType={"period"}
          />
        </ModalContent>
      </BottomModal>

      {/* Cars and People Modal */}
      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection={["down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Apply"
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select Cars and Number of People" />}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(false)}
        style={styles.bottomModal}
      >
        <ModalContent style={styles.modalContent}>
          <View style={styles.modalRow}>
            {/* Cars Selection */}
            <View>
              <Text style={styles.modalText}>Cars</Text>
              <View style={styles.counterContainer}>
                <Pressable
                  style={styles.counterButton}
                  onPress={() => setCars(Math.max(1, cars - 1))}
                >
                  <Entypo name="minus" size={24} color="white" />
                </Pressable>
                <Text>{cars}</Text>
                <Pressable
                  style={styles.counterButton}
                  onPress={() => setCars(cars + 1)}
                >
                  <Entypo name="plus" size={24} color="white" />
                </Pressable>
              </View>
            </View>

            {/* People Selection */}
            <View>
              <Text style={styles.modalText}>People</Text>
              <View style={styles.counterContainer}>
                <Pressable
                  style={styles.counterButton}
                  onPress={() => setPeople(Math.max(1, people - 1))}
                >
                  <Entypo name="minus" size={24} color="white" />
                </Pressable>
                <Text>{people}</Text>
                <Pressable
                  style={styles.counterButton}
                  onPress={() => setPeople(people + 1)}
                >
                  <Entypo name="plus" size={24} color="white" />
                </Pressable>
              </View>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderColor: "#222",
    borderWidth: 2,
    paddingVertical: 10,
    marginTop: 10,
  },
  textInput: {
    color: "white",
    paddingLeft: 20,
  },
  text: {
    paddingHorizontal: 15,
  },
  searchButton: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#0A2647",
    alignItems: "center",
    borderRadius: 5,
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
    height: screenHeight / 2,
  },
  modalContent: {
    padding: 20,
    backgroundColor: "white",
  },
  modalButton: {
    color: "black",
    fontWeight: "bold",
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
