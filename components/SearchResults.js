import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchResults = ({ data = [], input = "", setInput }) => {
  const navigation = useNavigation();

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={Array.isArray(data) ? data : []}
        keyExtractor={(item) => item.id || Math.random().toString()}
        renderItem={({ item }) => {
          // Log each item to ensure it's structured correctly
          console.log("Rendering item:", item);

          // Check if item is valid and contains necessary properties
          if (
            item &&
            item.place &&
            input &&
            item.place.toLowerCase().includes(input.toLowerCase())
          ) {
            return (
              <Pressable
                onPress={() => {
                  setInput(item.place);
                  navigation.navigate("Home", {
                    input: item.place,
                  });
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <View>
                  <Image
                    style={{ width: 70, height: 50, marginHorizontal: 15 }}
                    source={{ uri: item.placeImage }}
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>
                    {item.place}
                  </Text>
                  <Text style={{ marginVertical: 5 }}>
                    {item.shortDescription}
                  </Text>
                  <Text style={{ color: "gray", fontSize: 15 }}>
                    {item.properties?.length} Cars
                  </Text>
                </View>
              </Pressable>
            );
          }

          // If item is not valid, return null
          return null;
        }}
        ListEmptyComponent={() => (
          <View style={{ padding: 20 }}>
            <Text>No results found</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({});
