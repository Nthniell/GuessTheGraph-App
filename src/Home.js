import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home() {
  const graphs = [
    { id: 1, equation: 'y = x²' },
    { id: 2, equation: 'y = -x²' },
    { id: 3, equation: 'y = |x|' },
    { id: 4, equation: 'y = -|x|' },
  ];

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
                <Text style={styles.graphEquation}>{graph.equation}</Text>
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