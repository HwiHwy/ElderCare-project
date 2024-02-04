import { Dimensions, StyleSheet } from 'react-native'
import { COLORS } from '../../constants'
const { width, height } = Dimensions.get('window')
const styleOnboarding = {
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  picturee: {
    alignItems: 'center',
    width: width * 0.9,
    height: width,
  },
  insidePic: {
    width: 300,
    height: 400,
  },
  doneButton: {
    padding: 20,
    backgroundColor: COLORS.primary,
    // borderTopLeftRadius: "100%",
    borderBottomLeftRadius: 100,
  },
}

export default styleOnboarding
