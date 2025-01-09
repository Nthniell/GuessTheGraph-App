import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Profile from '../src/Profile'

const Header_app = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.HeaderStyle}>
        <TouchableOpacity 
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Profile')}
        >
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.buttonImageIconStyle}
            />
        </TouchableOpacity>
    </View>
  )
}

export default Header_app

const styles = StyleSheet.create({
    HeaderStyle: {
        height: 70,
        width: 800,
        backgroundColor: '#ffffff',
        elevation: 25,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#000000',
    },
    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 50,
        width: 50,
        resizeMode: 'stretch',
      },
})