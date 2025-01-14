import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Svg, { Path, Line, Text as SvgText } from 'react-native-svg';

const Stack = createNativeStackNavigator();

const GraphDisplay = ({ equation, width, height }) => {
  const xMin = -3;
  const xMax = 3;
  const yMin = -3;
  const yMax = 3;
  
  const transformX = (x) => {
    return ((x - xMin) / (xMax - xMin)) * width;
  };

  const transformY = (y) => {
    const clampedY = Math.max(yMin, Math.min(yMax, y));
    return height - ((clampedY - yMin) / (yMax - yMin)) * height;
  };

  const evaluateExpression = (expr, x) => {
    try {
      // Basic math operations
      const expression = expr.replace(/\^/g, '**')  // Convert ^ to **
                            .replace(/x/g, `(${x})`); // Replace x with actual value
      return Function('"use strict";return (' + expression + ')')();
    } catch (error) {
      return NaN;
    }
  };

  const generatePoints = (equation) => {
    if (!equation) return '';
    
    let points = [];
    for (let x = xMin; x <= xMax; x += 0.05) {
      const y = evaluateExpression(equation, x);
      if (!isNaN(y) && isFinite(y)) {
        points.push(`${transformX(x)},${transformY(y)}`);
      }
    }
    return points.length > 0 ? `M ${points.join(' L ')}` : '';
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
        d={generatePoints(equation)}
        stroke="blue"
        strokeWidth="2"
        fill="none"
      />
    </Svg>
  );
};

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

const LevelDetailScreen = ({ route }) => {
  const { level } = route.params;
  const graphWidth = Dimensions.get('window').width - 40; // 40 for padding
  const graphHeight = graphWidth;
  const [equation, setEquation] = useState('');
  const [currentEquation, setCurrentEquation] = useState('');
  const [message, setMessage] = useState('');

  const getCorrectEquation = (level) => {
    switch(level) {
      case 1: return 'x^2';
      case 2: return '2*x^2';
      case 3: return 'x^2+1';
      default: return 'x^2';
    }
  };

  const handlePlot = () => {
    setCurrentEquation(equation);
  };

  const handleCheck = () => {
    const correctEq = getCorrectEquation(level);
    if (equation.replace(/\s/g, '') === correctEq.replace(/\s/g, '')) {
      setMessage('Benar!');
    } else {
      setMessage('Salah, coba lagi!');
    }
  };

  const handleClear = () => {
    setEquation('');
    setCurrentEquation('');
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.questionContainer}>
        <View style={styles.questionHeader}>
          <Text style={styles.questionText}>Level {level}</Text>
          <TouchableOpacity>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.equationInput}
            value={equation}
            onChangeText={setEquation}
            placeholder="Masukkan persamaan (contoh: x^2)"
          />
        </View>

        <View style={styles.graphContainer}>
          <GraphDisplay
            equation={currentEquation}
            width={graphWidth}
            height={graphHeight}
          />
        </View>

        {message ? (
          <Text style={styles.message}>{message}</Text>
        ) : null}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.plotButton]}
            onPress={handlePlot}
          >
            <Text style={styles.buttonText}>Plot</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.checkButton]}
            onPress={handleCheck}
          >
            <Text style={styles.buttonText}>Cek Jawaban</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleClear}
          >
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
    padding: 10,
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
  inputContainer: {
    marginBottom: 20,
  },
  equationInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});