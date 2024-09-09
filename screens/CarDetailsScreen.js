import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");

const CarDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { car } = route.params;

  const handleBookNow = () => {
    // Navigate to CheckoutScreen with the necessary data
    navigation.navigate("CheckoutScreen", {
      car: car.name,
      carNumber: "DL3CAA1111", // Example car number
      driverNumber: "9999999999", // Example driver number
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      cost: car.newPrice,
      discount: 10, // Example discount
      coupon: "SAVE10", // Example coupon
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: car.image }} style={styles.carImage} />
      <Text style={styles.carName}>{car.name}</Text>
      <Text style={styles.carMilage}>Mileage: {car.milage}</Text>
      <Text style={styles.carPrice}>Price: ₹{car.newPrice}</Text>
      <Text style={styles.oldPrice}>Old Price: ₹{car.oldprice}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features:</Text>
        {car.features.map((feature, index) => (
          <Text key={index} style={styles.featureItem}>
            • {feature}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Ratings:</Text>
        {car.ratings.map((rating, index) => (
          <View key={index} style={styles.ratingItem}>
            <Text style={styles.userName}>{rating.user}</Text>
            <Text style={styles.userComment}>{rating.comment}</Text>
            <Text style={styles.userRating}>Rating: {rating.rating} ★</Text>
          </View>
        ))}
      </View>

      {/* Book Now Button */}
      <View style={styles.bookNowButton}>
        <Button title="Book Now" onPress={handleBookNow} color="#0A2647" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  carImage: {
    width: screenWidth - 40, // Adjust width based on screen padding
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  carName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#0A2647",
  },
  carMilage: {
    fontSize: 18,
    color: "#666",
    marginVertical: 5,
  },
  carPrice: {
    fontSize: 20,
    fontWeight: "600",
    color: "green",
    marginVertical: 5,
  },
  oldPrice: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#888",
    marginVertical: 5,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0A2647",
  },
  featureItem: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  ratingItem: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0A2647",
  },
  userComment: {
    fontSize: 14,
    color: "#666",
  },
  userRating: {
    fontSize: 14,
    color: "#888",
  },
  bookNowButton: {
    marginTop: 20,
  },
});

export default CarDetailsScreen;
