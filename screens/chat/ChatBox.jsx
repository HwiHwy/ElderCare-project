import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { ReusedButton, ReusedText, reuse } from '../../components'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ChatBox({  }) {
  const keyInStorage = 'userData'

  const handleTestStorage = async () => {
    try {
      const data = await AsyncStorage.getItem(keyInStorage)
      console.log('Data in AsyncStorage:', data)
    } catch (error) {
      console.error('Error reading AsyncStorage:', error)
    }
  }
  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
<Text>aaaaaa</Text>
    </SafeAreaView>
  )
}
