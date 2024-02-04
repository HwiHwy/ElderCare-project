import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import ReusedText from '../ReusedText'
import { COLORS, SIZES } from '../../../constants'

export default function AppBar({ title, color, onPress, backIcon }) {
  return (
    <View style={styles.overlay}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {backIcon ? (
          <Pressable style={styles.box(color)} onPress={onPress}>
            <AntDesign name="left" size={26} color={COLORS.primary} />
          </Pressable>
        ) : (
          <View></View>
        )}
        <ReusedText
          text={title}
          family="semibold"
          size={SIZES.large}
          color={COLORS.primary}
        />
        <View style={{ width: 30 }}></View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  box: (color) => ({
    backgroundColor: color,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  }),
})
