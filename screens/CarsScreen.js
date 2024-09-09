import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import CarsCard from "../components/CarsCard";

const CarsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { place } = route.params || {};
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

  const selectedPlace = data.find((item) => item.place === place);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Premium Cars",
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
    });
  }, [navigation]);

  return (
    <View>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          justifyContent: "space-between",
          padding: 12,
          backgroundColor: "white",
        }}
      >
        <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="compare-arrows" size={24} color="#222" />
          <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 10 }}>
            Compare
          </Text>
        </Pressable>
        <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="filter-sharp" size={24} color="#222" />
          <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 10 }}>
            Filter
          </Text>
        </Pressable>
        <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="map-marker-alt" size={22} color="#222" />
          <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 10 }}>
            Location
          </Text>
        </Pressable>
      </Pressable>
      <ScrollView>
        {selectedPlace ? (
          selectedPlace.properties.map((car) => (
            <CarsCard key={car.id} item={car} />
          ))
        ) : (
          <Text>No cars available for this location.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default CarsScreen;

const styles = StyleSheet.create({
  // Your styles here
});
