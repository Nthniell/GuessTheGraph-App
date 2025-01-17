import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Svg, { Path, Line, Text as SvgText } from 'react-native-svg';
import * as math from 'mathjs';

const Stack = createNativeStackNavigator();

const GraphDisplay = ({ equation, width, height, points, questionPoints }) => {
  const xMin = -10;
  const xMax = 10;
  const yMin = -10;
  const yMax = 10;

  const transformX = (x) => ((x - xMin) / (xMax - xMin)) * width;
  const transformY = (y) => height - ((y - yMin) / (yMax - yMin)) * height;

  const generatePath = (pts) => {
    return pts.map((point, index) => `${index === 0 ? 'M' : 'L'} ${transformX(point.x)},${transformY(point.y)}`).join(' ');
  };

  return (
    <Svg width={width} height={height}>
      <Line x1={transformX(0)} y1={0} x2={transformX(0)} y2={height} stroke="black" strokeWidth="1" />
      <Line x1={0} y1={transformY(0)} x2={width} y2={transformY(0)} stroke="black" strokeWidth="1" />
      {questionPoints && <Path d={generatePath(questionPoints)} stroke="red" strokeWidth="2" fill="none" />}
      <Path d={generatePath(points)} stroke="blue" strokeWidth="2" fill="none" />
      <SvgText x="5" y="15" fill="black" fontSize="12">{equation}</SvgText>
    </Svg>
  );
};

const convertExponents = (equation) => {
  return equation.replace(/x\^(\d+)/g, (match, power) => {
    const times = parseInt(power);
    if (times <= 1) return 'x';
    return Array(times).fill('x').join('*');
  });
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
  const graphWidth = Dimensions.get('window').width - 40; 
  const graphHeight = graphWidth;
  const [equation, setEquation] = useState('');
  const [points, setPoints] = useState([]);
  const [message, setMessage] = useState('');
  const [questionPoints, setQuestionPoints] = useState([]);

  const getCorrectEquation = (level) => {
    switch(level) {
      case 1: return 'x^2';
      case 2: return '2*x^2';
      case 3: return 'sin(x)';
      default: return 'x^2';
    }
  };

  const plotQuestionGraph = (level) => {
    const correctEq = getCorrectEquation(level);
    try {
      const xValues = Array.from({ length: 401 }, (_, i) => -10 + (i * 0.05));
      const yValues = [];

      for (let x of xValues) {
        try {
          const scope = { x: x };
          const y = math.evaluate(correctEq, scope);
          
          if (typeof y === 'number' && !isNaN(y) && Math.abs(y) < 1000) {
            yValues.push({ x, y });
          }
        } catch (e) {
          continue;
        }
      }

      setQuestionPoints(yValues);
    } catch (error) {
      console.error('Invalid equation:', error);
      setQuestionPoints([]);
    }
  };

  useEffect(() => {
    plotQuestionGraph(level);
  }, [level]);

  const handlePlot = () => {
    if (!equation.trim()) {
      setPoints([]);
      return;
    }

    try {
      const xValues = Array.from({ length: 401 }, (_, i) => -10 + (i * 0.05));
      const yValues = [];

      let sanitizedEquation = convertExponents(equation)
        .replace(/\s+/g, '')
        .replace(/[×]/g, '*')
        .toLowerCase();

      for (let x of xValues) {
        try {
          const scope = { x: x };
          const y = math.evaluate(sanitizedEquation, scope);
          
          if (typeof y === 'number' && !isNaN(y) && Math.abs(y) < 1000) {
            yValues.push({ x, y });
          }
        } catch (e) {
          continue;
        }
      }

      setPoints(yValues);
    } catch (error) {
      console.error('Invalid equation:', error);
      setPoints([]);
    }
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
    setPoints([]);
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
            placeholder="Masukkan persamaan (Perkalian gunakan *)"
          />
        </View>

        <View style={styles.graphContainer}>
          <GraphDisplay
            equation={equation}
            width={graphWidth}
            height={graphHeight}
            points={points}
            questionPoints={questionPoints}
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