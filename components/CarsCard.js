import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CarsCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => navigation.navigate("CarDetailsScreen", { car: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.milage}>Mileage: {item.milage}</Text>
        <Text style={styles.price}>
          Price: ₹{item.newPrice} (Old Price: ₹{item.oldprice})
        </Text>
        <Text style={styles.colors}>Available Colors:</Text>
        <View style={styles.colorContainer}>
          {item.colors.map((colorObj, index) => {
            const colorName = Object.values(colorObj)[0];
            return (
              <View
                key={index}
                style={[styles.colorCircle, { backgroundColor: colorName }]}
              />
            );
          })}
        </View>
      </View>
    </Pressable>
  );
};

export default CarsCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  infoContainer: {
    marginTop: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  milage: {
    fontSize: 14,
    color: "#555",
  },
  price: {
    fontSize: 16,
    color: "#333",
  },
  colors: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
  },
  colorContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
});
