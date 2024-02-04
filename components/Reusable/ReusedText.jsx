import React from 'react'
import { StyleSheet, Text } from 'react-native'

export default function ReusedText({ text, family, size, color }) {
  return <Text style={styles.textStyle(family, size, color)}>{text}</Text>
}

const styles = StyleSheet.create({
  textStyle: (family, size, color) => ({
    fontFamily: family,
    fontSize: size,
    color: color,
  }),
})
