import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../config";
import { useNavigation } from "expo-router";

const Registration = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const registerUser = async (email, password, firstName, lastName) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const user = userCredential.user;

      // Cek akun udah authenticated atau belum
      if (firebase.auth().currentUser) {
        console.log("User authenticated:", firebase.auth().currentUser.uid);
      } else {
        console.error("User is not authenticated!");
      }

      console.log(
        "Current user after registration:",
        firebase.auth().currentUser
      );
      console.log("Verification email sent to:", email);
      console.log("user uid:", user.uid);
      // Cek Database users ada atau ngga
      try {
        // Cek koleksi "users" di Firestore
        const snapshot = await firebase.firestore().collection("users").get();

        // Jika koleksi ada tetapi kosong, snapshot.size akan 0
        if (snapshot.empty) {
          console.log("The 'users' collection exists, but it's empty.");
        } else {
          console.log("The 'users' collection exists and contains documents.");
        }
      } catch (error) {
        console.error("Error checking 'users' collection:", error);
      }
      // Simpan data pengguna ke Firestore
      try {
        console.log("Attempting to write to Firestore...");
        await firebase.firestore().collection("users").doc(user.uid).set(
          {
            email: email,
            firstName: firstName,
            lastName: lastName,
          },
          { merge: true }
        );
        console.log("Write completed successfully.");
      } catch (error) {
        console.error("Error writing to Firestore:", error);
        alert("Error writing to Firestore: " + error.message);
      }

      // Tampilkan pesan untuk meminta verifikasi email
      // alert(
      //   "Your account has been created. Please verify your email before proceeding."
      // );

      // Sign out user to prevent access without verification
      firebase.auth().signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error during registration:", error.message);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 24, fontFamily: "Arial" }}>
        Register for an account
      </Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => registerUser(email, password, firstName, lastName)}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22 }}> Register </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fffff",
  },
  textInput: {
    fontFamily: "Arial",
    paddingVertical: 10,
    width: 300,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 50,
    height: 60,
    width: 250,
    backgroundColor: "#77AAFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
