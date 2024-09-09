import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StackNavigator from "./stack.navigator";
import { ModalPortal } from "react-native-modals";
import { addCityWithProperties } from "./setupFirestore";

export default function App() {
  useEffect(() => {
    addCityWithProperties()
      .then(() => console.log("Data added to Firestore"))
      .catch((error) => console.error("Error adding data: ", error));
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StackNavigator />
      <ModalPortal />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
