import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { firebase } from "../config"; // Pastikan Firebase diatur dengan benar
import Svg, { Path, Line, Text as SvgText } from "react-native-svg";
import { useNavigation } from "@react-navigation/native"; // Navigasi untuk redirect

const GraphDisplay = ({ equation, width, height }) => {
  // ... (kode GraphDisplay tetap sama)
};

export default function Home() {
  const navigation = useNavigation(); // Untuk navigasi ke halaman lain

  // Logika pemeriksaan autentikasi dan verifikasi
  const checkAuthenticationAndVerification = async () => {
    const user = firebase.auth().currentUser;

    if (!user) {
      // Jika tidak ada user yang login, arahkan ke halaman Login
      Alert.alert(
        "Authentication Error",
        "Please log in to access the application."
      );
      navigation.navigate("Login"); // Pastikan ada halaman Login
      return;
    }

    await user.reload(); // Refresh status user untuk mendapatkan status terbaru

    if (!user.emailVerified) {
      // Jika email belum diverifikasi, logout pengguna dan tampilkan pesan
      Alert.alert(
        "Email Verification Required",
        "Please verify your email address before accessing this page."
      );
      await firebase.auth().signOut();
      navigation.navigate("Login"); // Kembali ke halaman Login
    }
  };

  useEffect(() => {
    checkAuthenticationAndVerification();
  }, []);

  const graphs = [
    { id: 1, equation: "y = x²" },
    { id: 2, equation: "y = -x²" },
    { id: 3, equation: "y = x²-x+1" },
    { id: 4, equation: "y = sin(x)" },
  ];

  const graphSize = (Dimensions.get("window").width - 48) / 2;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Apa itu Guess the Graph?</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Guess the Graph adalah permainan menebak yang berkaitan dengan
            grafik fungsi. Guess the Graph merupakan game yang dapat diakses
            oleh siapapun. Pilihlah pernyataan yang benar mengenai grafik fungsi
            yang ditampilkan.
          </Text>
        </View>

        <Text style={styles.subtitle}>Apa itu grafik?</Text>

        <View style={styles.graphGrid}>
          {graphs.map((graph) => (
            <View key={graph.id} style={styles.graphItem}>
              <View style={styles.graphBox}>
                <GraphDisplay
                  equation={graph.equation}
                  width={graphSize - 16} // Adjust for padding
                  height={graphSize - 16} // Adjust for padding
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Grafik fungsi adalah representasi visual dari hubungan antara
            variabel. Misalnya pada bidang kartesius (sumbu x dan y), grafik
            menunjukkan hubungan antara nilai x yang diinput ke fungsi dengan
            output (y) yang dihasilkan karena fungsi.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.navigation}>
        {/* Tambahkan tombol navigasi jika diperlukan */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (gaya tetap sama)
});
