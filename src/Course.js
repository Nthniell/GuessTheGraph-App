import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Dimensions } from 'react-native';

const Course = () => {
  const videos = [
    {
      id: 'kvU9sOzT2mk',
      url: 'https://www.youtube.com/watch?v=kvU9sOzT2mk',
      title: 'What is Functional Graph?',
    },
    {
      id: 'djT6-YamHaA',
      url: 'https://www.youtube.com/watch?v=djT6-YamHaA',
      title: 'Understanding Graphs: Part 1',
    },
    {
      id: 'uMMaefcypT8',
      url: 'https://www.youtube.com/watch?v=uMMaefcypT8',
      title: 'Introduction to Graph Theory',
    },
    {
      id: 'kvGsIo1TmsM',
      url: 'https://www.youtube.com/watch?v=kvGsIo1TmsM',
      title: 'Exploring Graph Functions',
    },
    {
      id: '2-dUHLHeyTY',
      url: 'https://www.youtube.com/watch?v=2-dUHLHeyTY',
      title: 'Graph Functions in Real Life',
    },
    {
      id: 'tfF_-Db8iSA',
      url: 'https://www.youtube.com/watch?v=tfF_-Db8iSA',
      title: 'Understanding Functional Graphs',
    },
    {
      id: '5xai-nzYqzk',
      url: 'https://www.youtube.com/watch?v=5xai-nzYqzk',
      title: 'Grafik Matematik TPT 1',
    },
    {
      id: 'BPSHt3dkQXM',
      url: 'https://www.youtube.com/watch?v=BPSHt3dkQXM',
      title: 'Grafik Matematik TPT 2',
    },
  ];

  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  const { width } = Dimensions.get('window'); // Get screen width
  const cardWidth = width < 768 ? width * 0.45 : width * 0.2; // Adjust card width based on screen size

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grafik Fungsi</Text>
      <View style={styles.grid}>
        {videos.map((video, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { width: cardWidth }]} // Dynamically set width
            onPress={() => openLink(video.url)}
          >
            <Image
              source={{ uri: `https://img.youtube.com/vi/${video.id}/0.jpg` }}
              style={styles.thumbnail}
            />
            <Text style={styles.cardText}>{video.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 100,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
});

export default Course;
