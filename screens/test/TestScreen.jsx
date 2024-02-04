import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { AppBar, reuse } from '../../components'

export default function TestScreen({ navigation }) {
  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <View style={{ height: 50 }}>
        <AppBar
          title={'TEST'}
          backIcon={true}
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  )
}
