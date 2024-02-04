import { StyleSheet } from 'react-native'
import { COLORS } from '../../../constants'

const styleLoginMain = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: 'cover',
    width: 500,
    height: 900,
  },

  logo: {
    width: 380,
    height: 250,
    resizeMode: 'stretch',
  },
  stack: {
    position: 'absolute',
    top: 100,
    bottom: 0,
    left: 0,
    right: 0,
  },
  mainpart: {
    height: 550,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: COLORS.white,
  },
  inputComponent: {
    flexDirection: 'row',
    gap: 10,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
})

export default styleLoginMain
