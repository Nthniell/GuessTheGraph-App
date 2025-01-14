import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Svg, { Path, Line, Text as SvgText } from 'react-native-svg';
import * as math from 'mathjs';
import { compile, range } from 'mathjs';

const GraphDisplay = ({ equation, width, height, points }) => {
  const xMin = -100;
  const xMax = 100;
  const yMin = -100;
  const yMax = 100;

  const transformX = (x) => ((x - xMin) / (xMax - xMin)) * width;
  const transformY = (y) => height - ((y - yMin) / (yMax - yMin)) * height;

  const generatePath = () => {
    return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${transformX(point.x)},${transformY(point.y)}`).join(' ');
  };

  return (
    <Svg width={width} height={height}>
      <Line x1={transformX(0)} y1={0} x2={transformX(0)} y2={height} stroke="black" strokeWidth="1" />
      <Line x1={0} y1={transformY(0)} x2={width} y2={transformY(0)} stroke="black" strokeWidth="1" />
      <Path d={generatePath()} stroke="blue" strokeWidth="2" fill="none" />
      <SvgText x="5" y="15" fill="black" fontSize="12">{equation}</SvgText>
    </Svg>
  );
};

const GuessTheGraph = () => {
  const [equation, setEquation] = useState('');
  const [points, setPoints] = useState([]);
  const [gameMessage, setGameMessage] = useState('');
  const width = Dimensions.get('window').width - 32;
  const height = width;

  const plotGraph = () => {
    if (!equation.trim()) {
      setPoints([]);
      return;
    }

    try {
      // Create x values from -100 to 100
      const xValues = Array.from({ length: 201 }, (_, i) => -100 + i);
      const yValues = [];

      // Sanitize equation by replacing ^ with ** for proper power operation
      const sanitizedEquation = equation.replace(/\^/g, '**');

      // Calculate y values
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

  const checkGuess = () => {
    const correctEquation = 'x^2 + 2*x + 1'; // Example game equation
    if (equation === correctEquation) {
      setGameMessage('Jawaban Anda benar!');
    } else {
      setGameMessage('Jawaban Anda salah. Coba lagi!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Guess the Graph</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan persamaan (contoh: x^2 + 2*x + 1)"
        value={equation}
        onChangeText={setEquation}
      />
      <View style={styles.buttonContainer}>
        <Button title="Plot Grafik" onPress={plotGraph} />
        <Button title="Cek Jawaban" onPress={checkGuess} />
      </View>
      <GraphDisplay equation={equation} width={width} height={height} points={points} />
      <Text style={styles.message}>{gameMessage}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  message: {
    marginTop: 16,
    fontSize: 18,
    color: 'green',
  },
});

export default GuessTheGraph;