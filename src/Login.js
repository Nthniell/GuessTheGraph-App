import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../config"; // Pastikan Firebase sudah dikonfigurasi dengan benar
import { useNavigation } from "@react-navigation/native"; // Import untuk navigasi
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore
import Home from "./Home";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      const user = userCredential.user;

      await user.reload();

      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // Jika dokumen ada, kita bisa menggunakan data pengguna
        console.log("User data:", userDoc.data());
        // Buat dokumen di koleksi "user_level"
        const userLevelRef = doc(db, "user_level", user.uid);
        await setDoc(userLevelRef, {
          level: [false, false, false, false, false],
          score: 0,
        });
        console.log("User level data created for user:", user.uid);
      } else {
        console.log("No such document!");
      }

      setLoading(false);
      navigation.navigate(Home); // Pastikan nama layar sesuai dengan yang terdaftar di navigator
    } catch (error) {
      setLoading(false);
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 24, fontFamily: "Arial" }}>
        Login to your account
      </Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
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
        onPress={() => loginUser(email, password)}
        style={styles.button}
        disabled={loading} // Mencegah login saat loading
      >
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text
            style={{ fontWeight: "bold", fontSize: 22, fontFamily: "Arial" }}
          >
            Login
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Registration")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16, fontFamily: "Arial" }}>
          Register Here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: -100,
    justifyContent: "center",
    backgroundColor: "white",
  },
  textInput: {
    fontFamily: "Arial",
    paddingTop: 20,
    paddingBottom: 10,
    width: 300,
    fontSize: 16,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
    textAlign: "center",
    alignContent: "center",
  },
  button: {
    fontFamily: "Arial",
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: "#77AAFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
