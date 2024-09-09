import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import SearchResults from "../components/SearchResults";

const SearchScreen = () => {
  // Correct the useState declaration
  const [input, setInput] = useState("");

  const data = [
    {
      id: "0",
      place: "Banglore",
      placeImage: "https://dummyimage.com/300x200/000/fff",
      shortDescription: "City in Karnataka, India",
      properties: [
        {
          id: "10",
          name: "Baleno",
          image: "https://picsum.photos/200",
          milage: "22.5 kmpl",
          oldprice: 4600,
          newPrice: 3100,
          colors: [{ color1: "Red" }, { color2: "Blue" }, { color3: "Green" }],
          features: [
            "Air Conditioning",
            "Automatic Transmission",
            "GPS Navigation",
          ],
          ratings: [
            { user: "John Doe", comment: "Great car!", rating: 4.5 },
            {
              user: "Jane Smith",
              comment: "Comfortable and smooth ride.",
              rating: 4.7,
            },
          ],
        },
        {
          id: "9",
          name: "Swift",
          image: "https://picsum.photos/200",
          milage: "20.5 kmpl",
          oldprice: 2600,
          newPrice: 1100,
          colors: [{ color1: "Red" }, { color2: "Blue" }, { color3: "Green" }],
          features: [
            "Manual Transmission",
            "Bluetooth Connectivity",
            "Sunroof",
          ],
          ratings: [
            {
              user: "Alice Brown",
              comment: "Good value for money.",
              rating: 4.2,
            },
            { user: "Bob White", comment: "A decent car.", rating: 4.0 },
          ],
        },
      ],
    },
    {
      id: "1",
      place: "Hyderabad",
      placeImage: "https://dummyimage.com/300x200/000/fff",
      shortDescription: "City in Karnataka, India",
      properties: [
        {
          id: "8",
          name: "Baleno",
          image: "https://picsum.photos/200",
          milage: "22.5 kmpl",
          oldprice: 4600,
          newPrice: 3100,
          colors: [{ color1: "Red" }, { color2: "Blue" }, { color3: "Green" }],
          features: [
            "Air Conditioning",
            "Automatic Transmission",
            "GPS Navigation",
          ],
          ratings: [
            { user: "John Doe", comment: "Great car!", rating: 4.5 },
            {
              user: "Jane Smith",
              comment: "Comfortable and smooth ride.",
              rating: 4.7,
            },
          ],
        },
        {
          id: "7",
          name: "Swift",
          image: "https://picsum.photos/200",
          milage: "20.5 kmpl",
          oldprice: 2600,
          newPrice: 1100,
          colors: [{ color1: "Red" }, { color2: "Blue" }, { color3: "Green" }],
          features: [
            "Manual Transmission",
            "Bluetooth Connectivity",
            "Sunroof",
          ],
          ratings: [
            {
              user: "Alice Brown",
              comment: "Good value for money.",
              rating: 4.2,
            },
            { user: "Bob White", comment: "A decent car.", rating: 4.0 },
          ],
        },
      ],
    },
  ];

  return (
    <SafeAreaView>
      <View
        style={{
          padding: 10,
          fontSize: 20,
          marginTop: 60,
          marginHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: "gray",
          borderWidth: 2,
          borderRadius: 10,
        }}
      >
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="Enter your destination"
        />
        <Feather name="search" size={24} color="black" />
      </View>
      <SearchResults data={data} input={input} setInput={setInput} />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
