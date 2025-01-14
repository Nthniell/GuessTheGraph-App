import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }} // Placeholder for avatar
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>Your Name</Text>
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
        <TouchableOpacity style={styles.logoutButton}>
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
