import { Platform, StatusBar, StyleSheet } from 'react-native'
import { COLORS } from '../../constants'
const reuse = StyleSheet.create({
  containerAndroidSafeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  marginHorizontal: (x) => ({
    marginHorizontal: x,
  }),
  textMid: (X) => ({
    alignItems: X,
  }),
})

export default reuse
