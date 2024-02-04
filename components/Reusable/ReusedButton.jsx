import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLORS, SIZES } from '../../constants'

export default function ReusedButton({
  onPress,
  width,
  borderWidth,
  borderColor,
  backgroundColor,
  text,
  color,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(width, borderColor, borderWidth, backgroundColor)}
    >
      <Text style={styles.textBtnStyle(color)}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textBtnStyle: (color) => ({
    fontFamily: 'bold',
    fontSize: SIZES.medium,
    color: color,
    textTransform: 'uppercase',
  }),
  btnStyle: (width, borderColor, borderWidth, backgroundColor) => ({
    width: width,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    borderRadius: SIZES.small,
    borderWidth: borderWidth,
    borderColor: borderColor,
    height: 50,
    justifyContent: 'center',
  }),
})
