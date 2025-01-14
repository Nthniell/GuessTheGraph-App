import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
      navigation.navigate("Home"); // Ganti 'Home' dengan nama halaman tujuan Anda setelah login
    } catch (error) {
      setLoading(false);
      alert(error.message);
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
      >
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text
            style={{ fontWeight: "bold", fontSize: 22, fontFamily: "Arial" }}
          >
            {" "}
            Login{" "}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Registration")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16, fontFamily: "Arial" }}>
          {" "}
          Register Here{" "}
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
