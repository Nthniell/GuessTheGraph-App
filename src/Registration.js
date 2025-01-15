import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../config"; // Pastikan Firebase sudah dikonfigurasi dengan benar

const Registration = () => {
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

      // Kirim email verifikasi
      await user.sendEmailVerification({
        handleCodeInApp: true,
        url: "https://guessthegraph-app.firebaseapp.com",
      });

      alert(
        "Verification email sent. Please verify your email before logging in."
      );

      // Simpan data pengguna ke Firestore
      await firebase.firestore().collection("users").doc(user.uid).set({
        email: email,
        firstName: firstName,
        lastName: lastName,
      });

      // Tampilkan pesan untuk meminta verifikasi email
      alert(
        "Your account has been created. Please verify your email before proceeding."
      );

      // Sign out user to prevent access without verification
      await firebase.auth().signOut();
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
    backgroundColor: "white",
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
    height: 70,
    width: 250,
    backgroundColor: "#77AAFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
