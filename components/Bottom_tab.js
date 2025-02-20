import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image } from 'react-native';
import React from 'react';

import Home from '../src/Home';
import GuessTheGraph from '../src/GuessTheGraph';
import Course from '../src/Course';
import Profile from '../src/Profile';
// import Game from '../src/Game';

const Tab = createBottomTabNavigator();

const Bottom_tab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('../assets/images/Home.png');
          } else if (route.name === 'GuessTheGraph') {
            iconSource = require('../assets/images/game.png');
          } else if (route.name === 'Course') {
            iconSource = require('../assets/images/Course.png');
          } else if (route.name === 'Profile') {
            iconSource = require('../assets/images/avatar.png');
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#77AAFF' : 'gray',
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: '#77AAFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="GuessTheGraph" component={GuessTheGraph} />
      <Tab.Screen name="Course" component={Course} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Bottom_tab;

const styles = StyleSheet.create({
  tabBar: {
    borderRadius: 15,
    height: 90,
    marginHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tabBarItem: {
    top: 20,
    paddingBottom: 0, 
    height: 70, 
  },
});
