import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../config"; // Pastikan Firebase diimpor

const Profile = () => {
  const [avatarUri, setAvatarUri] = useState("https://via.placeholder.com/100");
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState(""); // State untuk menyimpan nama lengkap

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      setUser(currentUser);
      const userProfileRef = firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid);

      userProfileRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const firstName = userData.firstName || "";
          const lastName = userData.lastName || "";
          setFullName(`${firstName} ${lastName}`); // Gabungkan firstName dan lastName

          setAvatarUri(userData.avatarUrl || avatarUri); // Mengupdate avatar
        }
      });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      alert("You have logged out successfully");
      // navigation.navigate("Login");
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  const handleChangeProfilePicture = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: [ImagePicker.MediaType.Images],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.uri;
        setAvatarUri(uri);
        uploadImage(uri);
      }
    } else {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to access the gallery."
      );
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const userId = firebase.auth().currentUser.uid;
    const storageRef = firebase
      .storage()
      .ref()
      .child(`profile_pictures/${userId}`);

    try {
      await storageRef.put(blob);
      const downloadUrl = await storageRef.getDownloadURL();
      const userProfileRef = firebase
        .firestore()
        .collection("users")
        .doc(userId);
      await userProfileRef.update({ avatarUrl: downloadUrl });

      Alert.alert(
        "Profile Picture Updated",
        "Your profile picture has been updated."
      );
    } catch (error) {
      console.error("Error uploading image: ", error);
      Alert.alert("Error", "There was an error uploading your image.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={handleChangeProfilePicture}>
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{fullName || "Your Name"}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>n</Text>
            </View>
            <Text style={styles.infoText}>Your Score</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>n</Text>
            </View>
            <Text style={styles.infoText}>Your Level</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#000",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F5F5F5",
    marginBottom: 20,
    backgroundColor: "#2A6CFF",
    width: 180,
    textAlign: "center",
    paddingVertical: 5,
    borderRadius: 5,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginBottom: 20,
  },
  infoItem: {
    alignItems: "center",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#a3d9f5",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    marginTop: 5,
    fontSize: 12,
    color: "#7a7a7a",
  },
  logoutButton: {
    backgroundColor: "#8b5cf6",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Profile;
