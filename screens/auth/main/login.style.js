import { StyleSheet } from 'react-native'

const styleLogin = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: 'cover',
    width: 500,
    height: 900,
  },
  logo: {
    width: 350,
    height: 200,
    alignItems: 'center',
  },
  stack: {
    position: 'absolute',
    top: 300,
    bottom: 50,
    left: 20,
    right: 20,
    marginBottom: 100,
  },
})

export default styleLogin
