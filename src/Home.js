import React , { useEffect }from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import Svg, { Path, Line, Text as SvgText } from 'react-native-svg';
import { firebase } from "../config"; // Pastikan Firebase diatur dengan benar
import { useNavigation } from "@react-navigation/native"; // Navigasi untuk redirect

const GraphDisplay = ({ equation, width, height }) => {
  // Mengubah skala untuk visualisasi yang lebih baik
  const xMin = -3;
  const xMax = 3;
  const yMin = -3;
  const yMax = 3;
  
  const transformX = (x) => {
    return ((x - xMin) / (xMax - xMin)) * width;
  };

  const transformY = (y) => {
    // Batasi nilai y agar tidak keluar dari area grafik
    const clampedY = Math.max(yMin, Math.min(yMax, y));
    return height - ((clampedY - yMin) / (yMax - yMin)) * height;
  };

  const generatePoints = (func) => {
    let points = [];
    // Tambah kepadatan titik untuk kurva yang lebih halus
    for (let x = xMin; x <= xMax; x += 0.05) {
      const y = func(x);
      if (!isNaN(y) && isFinite(y)) {  // Hanya tambahkan point yang valid
        points.push(`${transformX(x)},${transformY(y)}`);
      }
    }
    return points.length > 0 ? `M ${points.join(' L ')}` : '';
  };

  const getFunctionPath = () => {
    switch (equation) {
      case 'y = x²':
        return generatePoints(x => x * x);
      case 'y = -x²':
        return generatePoints(x => -x * x);
      case 'y = |x|':
        return generatePoints(x => Math.abs(x));
      case 'y = -|x|':
        return generatePoints(x => -Math.abs(x));
      case 'y = x²-x+1':
        return generatePoints(x => Math.pow(x, 2) - x + 1);
      case 'y = sin(x)':
        return generatePoints(x => Math.sin(x * Math.PI));
      default:
        return '';
    }
  };

  return (
    <Svg width={width} height={height}>
      {/* Grid lines */}
      {Array.from({ length: 7 }, (_, i) => i - 3).map(i => (
        <React.Fragment key={`grid-${i}`}>
          <Line
            x1={transformX(i)}
            y1={0}
            x2={transformX(i)}
            y2={height}
            stroke="#ddd"
            strokeWidth="0.5"
          />
          <Line
            x1={0}
            y1={transformY(i)}
            x2={width}
            y2={transformY(i)}
            stroke="#ddd"
            strokeWidth="0.5"
          />
        </React.Fragment>
      ))}
      
      {/* Axes */}
      <Line
        x1={transformX(xMin)}
        y1={transformY(0)}
        x2={transformX(xMax)}
        y2={transformY(0)}
        stroke="black"
        strokeWidth="1"
      />
      <Line
        x1={transformX(0)}
        y1={transformY(yMin)}
        x2={transformX(0)}
        y2={transformY(yMax)}
        stroke="black"
        strokeWidth="1"
      />
      
      {/* Function graph */}
      <Path
        d={getFunctionPath()}
        stroke="blue"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Equation */}
      <SvgText
        x="5"
        y="15"
        fill="black"
        fontSize="12"
      >
        {equation}
      </SvgText>
    </Svg>
  );
};

export default function Home() {
  const graphs = [
    { id: 1, equation: 'y = x²' },
    { id: 2, equation: 'y = -x²' },
    { id: 3, equation: 'y = x²-x+1' },
    { id: 4, equation: 'y = sin(x)' },
  ];

  const graphSize = (Dimensions.get('window').width - 48) / 2;
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Apa itu Guess the Graph?</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Guess the Graph adalah permainan menebak yang berkaitan dengan grafik fungsi. Guess the Graph merupakan game yang dapat diakses oleh siapapun. Pilihlah pernyataan yang benar mengenai grafik fungsi yang ditampilkan.
          </Text>
        </View>

        <Text style={styles.subtitle}>Apa itu grafik?</Text>

        <View style={styles.graphGrid}>
          {graphs.map((graph) => (
            <View key={graph.id} style={styles.graphItem}>
              <View style={styles.graphBox}>
                <GraphDisplay
                  equation={graph.equation}
                  width={graphSize - 16}  // Adjust for padding
                  height={graphSize - 16}  // Adjust for padding
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Grafik fungsi adalah representasi visual dari hubungan antara variabel. Misalnya pada bidang kartesius (sumbu x dan y), grafik menunjukkan hubungan antara nilai x yang diinput ke fungsi dengan output (y) yang dihasilkan karena fungsi.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.navigation}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  infoText: {
    color: '#1976D2',
    fontSize: 14,
    lineHeight: 20,
  },
  graphGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  graphItem: {
    width: '48%',
    marginBottom: 16,
  },
  graphBox: {
    aspectRatio: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    overflow: 'hidden'
  },
  graphEquation: {
    fontSize: 16,
    color: '#333',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});