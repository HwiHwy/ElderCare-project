import { useFocusEffect } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ActivityIndicator, Image, View } from 'react-native'
import { COLORS, images } from '../../../constants'
import { LOGIN_MAIN } from '../../../constants/nameRoute'
import styleLogin from './login.style'

export default function LoginScreen({ navigation }) {
  useFocusEffect(() => {
    setTimeout(() => {
      navigation.navigate(LOGIN_MAIN)
    }, 2000)
  })

  return (
    <View style={styleLogin.container}>
      <StatusBar style="auto" />
      <Image source={images.backgroundv2} style={styleLogin.backgroundImage} />
      <View style={styleLogin.stack}>
        <Image source={images.logo} style={styleLogin.logo} />
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    </View>
  )
}
