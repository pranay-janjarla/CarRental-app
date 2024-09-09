import React from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { useRoute } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");

const CheckoutScreen = () => {
  const route = useRoute();
  const { car, driverNumber, date, time, cost, discount, coupon } =
    route.params;

  const handlePayNow = () => {
    alert("Payment successful!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Car:</Text>
        <Text style={styles.value}>{car}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{date}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{time}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cost:</Text>
        <Text style={styles.value}>₹{cost}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Discount:</Text>
        <Text style={styles.value}>{discount}%</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Coupon:</Text>
        <Text style={styles.value}>{coupon}</Text>
      </View>

      <Button title="Pay Now" onPress={handlePayNow} color="#0A2647" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor: "#222",
    paddingVertical: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0A2647",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  payButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#0A2647",
    alignItems: "center",
    borderRadius: 5,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default CheckoutScreen;
