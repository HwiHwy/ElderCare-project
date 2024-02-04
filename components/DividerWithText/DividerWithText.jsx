import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../constants'

const DividerWithText = ({ middletext }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <Text style={styles.text}>{middletext}</Text>
      <View style={styles.line}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray,
  },
  text: {
    marginHorizontal: 10, // Adjust the spacing as needed
    color: COLORS.gray,
  },
})

export default DividerWithText
