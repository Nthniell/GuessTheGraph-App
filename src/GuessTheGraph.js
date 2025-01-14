import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Level Selection Screen
const LevelSelectionScreen = ({ navigation }) => {
  const levels = [1, 2, 3];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pilih Level</Text>
      <View style={styles.gridContainer}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level}
            style={styles.levelButton}
            onPress={() => navigation.navigate('LevelDetail', { level })}
          >
            <Text style={styles.levelButtonText}>Level {level}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

// Level Detail Screen
const LevelDetailScreen = ({ route }) => {
  const { level } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.questionContainer}>
        <View style={styles.questionHeader}>
          <Text style={styles.questionText}>Masukkan Persamaan x^2+1</Text>
          <TouchableOpacity>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.graphContainer}>
          <Text style={styles.graphText}>Grafik Soal</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.plotButton]}>
            <Text style={styles.buttonText}>Plot</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.checkButton]}>
            <Text style={styles.buttonText}>Cek Jawaban</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
            <Text style={styles.buttonText}>Hapus</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Main App Component
export default function App() {
  return (
      <Stack.Navigator initialRouteName="LevelSelection">
        <Stack.Screen 
          name="LevelSelection" 
          component={LevelSelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="LevelDetail" 
          component={LevelDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  levelButton: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    margin: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionContainer: {
    flex: 1,
    padding: 20,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
  },
  closeButton: {
    fontSize: 20,
    color: '#666',
  },
  graphContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  graphText: {
    fontSize: 18,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plotButton: {
    backgroundColor: '#007AFF',
  },
  checkButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});