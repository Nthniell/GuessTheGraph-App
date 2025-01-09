import { View, Text } from 'react-native'
import React from 'react'

const Header = (props) => {
  return (
    <View style={{ height: 60, padding: 15, backgroundColor: '#77AAFF' }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23, fontFamily: 'Arial' }}>
            {props.name}
        </Text>
    </View>
  )
}

export default Header