import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { firebase } from '../config'

const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  registerUser = async (email, password, firstName, lastName) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://guessthegraph-app.firebaseapp.com',
      })
      .then(() => {
        alert('Verification email sent')
      }).catch((error) => {
        alert(error.message)
      })
      .then(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          email: email,
          firstName: firstName,
          lastName: lastName,
        })
      })
      .catch((error) => {
        alert(error.message)
      })
    })
    .catch((error) => {
      alert(error.message)
    })
  }

  return(
    <View style = {styles.container}>
      <Text style = {{fontWeight: 'bold', fontSize: 24, fontFamily: 'Arial'}}>
        Register for an account
      </Text>
      <View style = {{marginTop: 40}}>
        <TextInput
          style = {styles.textInput}
          placeholder = 'First Name'
          onChangeText = {(firstName) => setFirstName(firstName)}
          autoCorrect = {false}
        />
        <TextInput
          style = {styles.textInput}
          placeholder = 'Last Name'
          onChangeText = {(lastName) => setLastName(lastName)}
          autoCorrect = {false} 
        />
        <TextInput
          style = {styles.textInput}
          placeholder = 'Email'
          onChangeText = {(email) => setEmail(email)}
          autoCapitalize = 'none'
          autoCorrect = {false}
        />
        <TextInput
          style = {styles.textInput}
          placeholder = 'Password'
          onChangeText = {(password) => setPassword(password)}
          autoCapitalize = 'none'
          autoCorrect = {false}
          secureTextEntry = {true}
        />
      </View>
      <TouchableOpacity
        onPress = {() => registerUser(email, password, firstName, lastName)}
        style = {styles.button}
      >
        <Text style = {{fontWeight: 'bold', fontSize: 22}}> Register </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Registration

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: -100,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  textInput: {
    fontFamily: 'Arial',
    paddingTop: 20,
    paddingBottom: 10,
    width: 300,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    fontFamily: 'Arial',
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: '#77AAFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  }
})