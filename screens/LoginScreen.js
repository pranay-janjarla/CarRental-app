import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.navigate("Main");
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Invalid Input", "Please fill all the fields", [
        { text: "OK" },
      ]);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken(); // Get the ID token

      await AsyncStorage.setItem("userToken", token); // Store token in AsyncStorage
      navigation.navigate("Main"); // Navigate to the Main screen
    } catch (error) {
      console.error("Login Error: ", error.message);
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Sign Into Your Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            placeholder="Enter your Email Id"
            onChangeText={setEmail}
            placeholderTextColor="#222"
            style={styles.input}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#222"
            style={styles.input}
            secureTextEntry
          />
        </View>
        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
        <Pressable
          style={styles.registerLink}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerText}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
  },
  keyboardAvoidingView: {
    flex: 1,
    width: "100%",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  title: {
    fontSize: 20,
    color: "#2a2a2a",
  },
  subtitle: {
    fontSize: 25,
    color: "#2a2a2a",
  },
  inputContainer: {
    marginTop: 50,
    width: "100%",
  },
  label: {
    color: "#2a2a2a",
    fontSize: 20,
  },
  input: {
    fontSize: 20,
    color: "#2a2a2a",
    borderColor: "black",
    borderWidth: 1,
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },
  loginButton: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    marginTop: 20,
    borderRadius: 10,
  },
  loginButtonText: {
    color: "black",
    fontSize: 20,
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    color: "black",
    fontSize: 15,
    textAlign: "center",
  },
});

export default LoginScreen;
