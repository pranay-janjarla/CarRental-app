import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();

  const register = () => {
    if (!email || !password || !phoneNumber) {
      Alert.alert(
        "Invalid Input",
        "Please fill all the fields",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        return setDoc(doc(db, "users", uid), {
          email: email,
          phoneNumber: phoneNumber,
        });
      })
      .then(() => {
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Registration Error: ", error.message);
        Alert.alert("Error", error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Sign Up</Text>
          <Text style={styles.subHeaderText}>Create Your Account</Text>
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
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter your phone number"
            placeholderTextColor="#222"
            style={styles.input}
            keyboardType="phone-pad"
          />
        </View>

        <Pressable onPress={register} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </Pressable>
        <Pressable
          style={styles.loginRedirect}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginRedirectText}>
            Already have an account? Sign in now
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
  headerText: {
    fontSize: 20,
    color: "#2a2a2a",
  },
  subHeaderText: {
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
  registerButton: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    marginTop: 20,
    borderRadius: 10,
  },
  registerButtonText: {
    color: "black",
    fontSize: 20,
  },
  loginRedirect: {
    marginTop: 20,
  },
  loginRedirectText: {
    color: "black",
    fontSize: 15,
    textAlign: "center",
  },
});

export default RegisterScreen;
