import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const Header_app = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.HeaderStyle}>
        <View style={{left: 145, top: 15}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            
          >
            <Image
              source={require('../assets/images/avatar.png')}
              style={styles.buttonImageIconStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={{left: -175, top: -55}}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.buttonImageIconStyle}
            />
        </View>
    </View>

  )
}

export default Header_app

const styles = StyleSheet.create({
    HeaderStyle: {
        height: 90,
        width: 800,
        backgroundColor: '#ffffff',
        elevation: 25,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#000000',
    },
    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 60,
        width: 60,
        resizeMode: 'stretch',
      },
})